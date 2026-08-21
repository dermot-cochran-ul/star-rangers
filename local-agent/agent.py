#!/usr/bin/env python3
"""A local coding agent with a hard service boundary.

Runs from a cloned repo on your own machine. The model lives on an Azure
endpoint; the tools reach GitHub (gh), Azure DevOps / Azure (az) and the
local desktop; every other network destination is refused in policy.py.

Usage:
    python agent.py                 # interactive REPL in the current directory
    python agent.py -p "prompt"     # one-shot
    python agent.py --root ../repo --config path/to/agent.config.json
    python agent.py --yes           # skip confirmations (careful)
"""

import argparse
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import config as config_mod  # noqa: E402
import llm  # noqa: E402
import policy  # noqa: E402
import tools as tools_mod  # noqa: E402

MAX_TOOL_ROUNDS = 40

SYSTEM_PROMPT = """You are a local coding agent running on the user's work PC, \
in the working directory {root}.

Hard service boundary — the only things you may touch are GitHub, Azure DevOps, \
Azure, and the local machine. Use `gh` for GitHub and `az` for Azure and Azure \
DevOps (az repos / az boards / az pipelines), via run_command. Never contact, or \
propose contacting, any other network service, and never suggest tooling that \
requires one; if a package must be installed, use the organisation's approved \
package source and let the user run the install.

Your tools: read_file, write_file, list_dir, search_files, run_command (the user \
confirms every write and every command before it runs), delegate_to_copilot (hand \
a well-scoped task to the GitHub Copilot coding agent — only when the user asks \
for or agrees to it, since it spends credits), and ask_m365_copilot (a human-\
relayed question to Microsoft 365 Copilot, for organisational knowledge the repo \
cannot answer).

Working style: investigate before editing; keep changes minimal and consistent \
with the surrounding code; run the project's own tests or linters after changing \
code; report plainly what you did, including anything you could not verify. For \
large or destructive changes, describe the plan and get agreement first."""


def confirm_factory(auto_yes):
    def confirm(prompt):
        if auto_yes:
            print(f"{prompt} [auto-approved]")
            return True
        while True:
            answer = input(f"{prompt} [y/N] ").strip().lower()
            if answer in ("y", "yes"):
                return True
            if answer in ("", "n", "no"):
                return False

    return confirm


def make_transport(cfg):
    provider = cfg["provider"]

    def transport(body):
        headers = config_mod.auth_headers(provider)  # re-resolved so CLI tokens stay fresh
        return policy.http_json(provider["endpoint"], headers, body, cfg["allowed_hosts"])

    return transport


def run_turn(chat, tool_ctx, user_text, tool_table):
    turn = chat.send_user(user_text)
    rounds = 0
    while turn["tool_calls"]:
        rounds += 1
        if rounds > MAX_TOOL_ROUNDS:
            return turn["text"] + "\n[stopped: too many tool rounds]"
        if turn["text"]:
            print(turn["text"])
        results = []
        for call in turn["tool_calls"]:
            name, args = call["name"], call["arguments"]
            summary = ", ".join(f"{k}={str(v)[:60]!r}" for k, v in args.items() if k != "content")
            print(f"→ {name}({summary})")
            func = tool_table.get(name)
            if func is None:
                content = f"unknown tool {name!r}"
            else:
                try:
                    content = func(args, tool_ctx)
                except Exception as e:  # tool errors go back to the model, not the floor
                    content = f"tool error: {type(e).__name__}: {e}"
            results.append({"id": call["id"], "content": str(content)})
        turn = chat.send_tool_results(results)
    return turn["text"]


def main(argv=None):
    parser = argparse.ArgumentParser(description="local coding agent (GitHub / Azure DevOps / Azure / desktop only)")
    parser.add_argument("--config", help="path to agent.config.json (default: alongside this script)")
    parser.add_argument("--root", default=".", help="working directory the agent operates in (default: cwd)")
    parser.add_argument("--yes", action="store_true", help="skip confirmation prompts")
    parser.add_argument("-p", "--prompt", help="run one prompt and exit instead of starting the REPL")
    args = parser.parse_args(argv)

    cfg = config_mod.load_config(args.config)
    root = os.path.abspath(args.root)
    tool_ctx = {
        "root": root,
        "confirm": confirm_factory(args.yes),
        "command_timeout": cfg.get("command_timeout_seconds", 120),
    }
    tool_table = {t["name"]: t["func"] for t in tools_mod.TOOLS}
    chat = llm.make_chat(
        cfg["provider"], tools_mod.TOOLS, SYSTEM_PROMPT.format(root=root), make_transport(cfg)
    )

    if args.prompt:
        print(run_turn(chat, tool_ctx, args.prompt, tool_table))
        return

    print(f"local agent · {cfg['provider']['api_style']} · root {root}")
    print("commands: /quit  /reset  (Ctrl-C cancels a turn)")
    while True:
        try:
            user_text = input("\nyou> ").strip()
        except (EOFError, KeyboardInterrupt):
            print()
            break
        if not user_text:
            continue
        if user_text == "/quit":
            break
        if user_text == "/reset":
            chat.reset()
            print("(conversation cleared)")
            continue
        try:
            print("\n" + run_turn(chat, tool_ctx, user_text, tool_table))
        except KeyboardInterrupt:
            print("\n(turn cancelled)")
        except (policy.PolicyError, RuntimeError) as e:
            print(f"\nerror: {e}")


if __name__ == "__main__":
    main()
