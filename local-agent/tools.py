"""The agent's tools.

Local-desktop tools (files, search, commands) plus the two sanctioned
hand-offs: delegate_to_copilot (GitHub Copilot coding agent, via `gh`) and
ask_m365_copilot (a human relay — the agent asks, you paste the question
into M365 Copilot and paste the answer back).

Safety posture: reads are free; every file write is shown as a diff and
confirmed; every command and every issue creation is shown and confirmed.
`ctx` carries {"root", "confirm", "command_timeout"} — confirm is injected
so --yes mode and the tests can override it.
"""

import difflib
import json
import os
import re
import shutil
import subprocess

MAX_READ_BYTES = 200_000
MAX_OUTPUT_CHARS = 20_000


def _clip(text, limit=MAX_OUTPUT_CHARS):
    if len(text) <= limit:
        return text
    return text[:limit] + f"\n... [truncated, {len(text)} chars total]"


def _resolve(path, ctx):
    return os.path.abspath(os.path.join(ctx["root"], os.path.expanduser(path)))


def _run(cmd_list, ctx, timeout=None):
    result = subprocess.run(
        cmd_list,
        capture_output=True,
        text=True,
        cwd=ctx["root"],
        timeout=timeout or ctx.get("command_timeout", 120),
    )
    return result


def read_file(args, ctx):
    path = _resolve(args["path"], ctx)
    with open(path, "rb") as f:
        data = f.read(MAX_READ_BYTES + 1)
    truncated = len(data) > MAX_READ_BYTES
    text = data[:MAX_READ_BYTES].decode("utf-8", errors="replace")
    if truncated:
        text += f"\n... [truncated at {MAX_READ_BYTES} bytes]"
    return text


def write_file(args, ctx):
    path = _resolve(args["path"], ctx)
    new = args["content"]
    old = ""
    if os.path.exists(path):
        with open(path, encoding="utf-8", errors="replace") as f:
            old = f.read()
    rel = os.path.relpath(path, ctx["root"])
    diff = "".join(
        difflib.unified_diff(
            old.splitlines(keepends=True),
            new.splitlines(keepends=True),
            fromfile=f"a/{rel}",
            tofile=f"b/{rel}",
        )
    )
    print(diff or f"(new empty file {rel})")
    if not ctx["confirm"](f"write {rel}?"):
        return "user declined the write; the file was not changed"
    os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(new)
    return f"wrote {len(new)} chars to {rel}"


def list_dir(args, ctx):
    path = _resolve(args.get("path", "."), ctx)
    entries = []
    for name in sorted(os.listdir(path)):
        full = os.path.join(path, name)
        entries.append(name + "/" if os.path.isdir(full) else name)
    return "\n".join(entries) or "(empty)"


def search_files(args, ctx):
    pattern = re.compile(args["pattern"])
    base = _resolve(args.get("path", "."), ctx)
    skip_dirs = {".git", "node_modules", "_site", "__pycache__", ".venv", "venv"}
    hits = []
    for dirpath, dirnames, filenames in os.walk(base):
        dirnames[:] = [d for d in dirnames if d not in skip_dirs]
        for name in filenames:
            full = os.path.join(dirpath, name)
            try:
                with open(full, "rb") as f:
                    raw = f.read(MAX_READ_BYTES)
            except OSError:
                continue
            if b"\x00" in raw:
                continue
            for i, line in enumerate(raw.decode("utf-8", errors="replace").splitlines(), 1):
                if pattern.search(line):
                    hits.append(f"{os.path.relpath(full, ctx['root'])}:{i}: {line.strip()[:200]}")
                    if len(hits) >= 200:
                        return _clip("\n".join(hits) + "\n... [stopped at 200 matches]")
    return "\n".join(hits) or "(no matches)"


def run_command(args, ctx):
    command = args["command"]
    cwd = _resolve(args.get("cwd", "."), ctx)
    print(f"$ {command}" + (f"   (in {cwd})" if cwd != ctx["root"] else ""))
    if not ctx["confirm"]("run this command?"):
        return "user declined; the command was not run"
    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            cwd=cwd,
            timeout=args.get("timeout_seconds") or ctx.get("command_timeout", 120),
        )
    except subprocess.TimeoutExpired:
        return "command timed out"
    out = f"exit code: {result.returncode}\n"
    if result.stdout:
        out += "stdout:\n" + _clip(result.stdout)
    if result.stderr:
        out += "\nstderr:\n" + _clip(result.stderr)
    return out


def delegate_to_copilot(args, ctx):
    """Create a GitHub issue and assign the Copilot coding agent to it."""
    gh = shutil.which("gh")
    if not gh:
        return "`gh` CLI not found on PATH; cannot delegate"
    repo, title, body = args["repo"], args["title"], args["body"]
    print(f"delegate to Copilot coding agent — issue in {repo}:\n  {title}\n{body}\n")
    if not ctx["confirm"]("create this issue and assign Copilot?"):
        return "user declined; nothing was created"
    created = _run([gh, "issue", "create", "-R", repo, "--title", title, "--body", body], ctx)
    if created.returncode != 0:
        return f"gh issue create failed:\n{created.stderr.strip()}"
    issue_url = created.stdout.strip().splitlines()[-1]
    number = issue_url.rstrip("/").rsplit("/", 1)[-1]
    owner, name = repo.split("/", 1)

    # Find the Copilot coding agent among the repo's assignable actors, then
    # assign it via GraphQL (it is a Bot, so the plain assignees API can't).
    actors = _run(
        [
            gh, "api", "graphql",
            "-f", "query=query($owner:String!,$name:String!){repository(owner:$owner,name:$name){"
            "suggestedActors(capabilities:[CAN_BE_ASSIGNED],first:100){nodes{login __typename ... on Bot{id}}}}}",
            "-f", f"owner={owner}", "-f", f"name={name}",
        ],
        ctx,
    )
    bot_id = None
    if actors.returncode == 0:
        try:
            nodes = json.loads(actors.stdout)["data"]["repository"]["suggestedActors"]["nodes"]
            for node in nodes:
                if node.get("login") == "copilot-swe-agent":
                    bot_id = node.get("id")
        except (json.JSONDecodeError, KeyError, TypeError):
            pass
    if not bot_id:
        return (
            f"created {issue_url}, but could not find the Copilot coding agent among "
            "assignable actors (is it enabled for this repo, and are credits available?). "
            "Assign 'Copilot' to the issue manually in the GitHub UI to start it."
        )
    issue_id = _run([gh, "api", f"repos/{repo}/issues/{number}", "--jq", ".node_id"], ctx)
    if issue_id.returncode != 0:
        return f"created {issue_url}, but could not resolve its node id; assign Copilot manually"
    assigned = _run(
        [
            gh, "api", "graphql",
            "-f", "query=mutation($issue:ID!,$actors:[ID!]!){replaceActorsForAssignable("
            "input:{assignableId:$issue,actorIds:$actors}){assignable{... on Issue{number}}}}",
            "-f", f"issue={issue_id.stdout.strip()}", "-f", f"actors={bot_id}",
        ],
        ctx,
    )
    if assigned.returncode != 0:
        return f"created {issue_url}, but assigning Copilot failed:\n{assigned.stderr.strip()}\nAssign it manually in the UI."
    return f"created {issue_url} and assigned the Copilot coding agent; it will open a draft PR when it starts"


def ask_m365_copilot(args, ctx):
    """Human relay to Microsoft 365 Copilot."""
    print("\n--- question for M365 Copilot (copy/paste it there) ---")
    print(args["question"])
    print("--- paste Copilot's answer below, then a line with just END ---")
    lines = []
    while True:
        try:
            line = input()
        except EOFError:
            break
        if line.strip() == "END":
            break
        lines.append(line)
    answer = "\n".join(lines).strip()
    return answer or "(the user provided no answer)"


TOOLS = [
    {
        "name": "read_file",
        "description": "Read a file. Paths are relative to the working directory.",
        "parameters": {
            "type": "object",
            "properties": {"path": {"type": "string"}},
            "required": ["path"],
        },
        "func": read_file,
    },
    {
        "name": "write_file",
        "description": "Create or overwrite a file with the given content. The user sees a diff and confirms before anything is written.",
        "parameters": {
            "type": "object",
            "properties": {"path": {"type": "string"}, "content": {"type": "string"}},
            "required": ["path", "content"],
        },
        "func": write_file,
    },
    {
        "name": "list_dir",
        "description": "List the entries of a directory (directories get a trailing slash).",
        "parameters": {
            "type": "object",
            "properties": {"path": {"type": "string", "description": "defaults to the working directory"}},
        },
        "func": list_dir,
    },
    {
        "name": "search_files",
        "description": "Search file contents under a directory with a Python regular expression; returns path:line: text matches.",
        "parameters": {
            "type": "object",
            "properties": {
                "pattern": {"type": "string"},
                "path": {"type": "string", "description": "defaults to the working directory"},
            },
            "required": ["pattern"],
        },
        "func": search_files,
    },
    {
        "name": "run_command",
        "description": (
            "Run a shell command (the user confirms first). Use this for git, and for the "
            "sanctioned CLIs: `gh` for GitHub, `az` for Azure and Azure DevOps (az repos / "
            "az boards / az pipelines). Never use it to reach any other network service."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "command": {"type": "string"},
                "cwd": {"type": "string", "description": "defaults to the working directory"},
                "timeout_seconds": {"type": "integer"},
            },
            "required": ["command"],
        },
        "func": run_command,
    },
    {
        "name": "delegate_to_copilot",
        "description": (
            "Hand a well-scoped task to the GitHub Copilot coding agent: creates an issue in "
            "the given GitHub repo and assigns Copilot, which then works autonomously and opens "
            "a draft PR. Use only when the user asks for or agrees to the delegation, and write "
            "the body as a complete standalone brief (context, acceptance criteria, constraints)."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "repo": {"type": "string", "description": "owner/name"},
                "title": {"type": "string"},
                "body": {"type": "string"},
            },
            "required": ["repo", "title", "body"],
        },
        "func": delegate_to_copilot,
    },
    {
        "name": "ask_m365_copilot",
        "description": (
            "Ask Microsoft 365 Copilot a question via the user, who relays it and pastes the "
            "answer back. Use for organisational knowledge — internal documents, SharePoint, "
            "Teams, email, company policy — that the local repo cannot answer."
        ),
        "parameters": {
            "type": "object",
            "properties": {"question": {"type": "string"}},
            "required": ["question"],
        },
        "func": ask_m365_copilot,
    },
]
