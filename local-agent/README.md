# local-agent

A local coding agent you run from a cloned repo on your own PC, built around one
rule: **it may connect to GitHub, Azure DevOps, Azure, and the local desktop —
and nothing else.** No other third-party or external service, ever. It can
delegate a task to the **GitHub Copilot coding agent** when you have credits,
and it can put a question to **Microsoft 365 Copilot** through you.

It is a single-user tool: plain Python (3.10+, standard library only — nothing
to `pip install`), driven from a terminal, with a human confirmation on every
file write, every command, and every issue it creates.

## How the boundary is honoured

| Destination | How it's reached | How it's enforced |
| --- | --- | --- |
| The model (the agent's brain) | An **Azure**-hosted endpoint: Azure OpenAI, or an Anthropic Claude deployment in Azure AI Foundry | `policy.py` — every HTTP request the agent originates passes through one function with a host allowlist; anything else raises `PolicyError` |
| GitHub | the `gh` CLI | `gh`'s own auth + your confirmation of each command |
| Azure DevOps / Azure | the `az` CLI (`az repos`, `az boards`, `az pipelines`, …) | `az`'s own auth + your confirmation of each command |
| Local desktop | file tools and shell commands | diff + confirmation on every write; confirmation on every command |
| GitHub Copilot coding agent | `delegate_to_copilot` tool (issue + assignment via `gh`) | explicit confirmation; only when you ask for it |
| Microsoft 365 Copilot | `ask_m365_copilot` tool — a **human relay**: the agent prints the question, you paste it into M365 Copilot and paste the answer back | you are the transport, so nothing leaves without you reading it |

What is enforced *in code* is the agent's own HTTP (the model calls). Commands
the agent runs (`git`, `gh`, `az`, builds, tests) open their own connections,
which no user-space allowlist can police; the system prompt forbids other
services, you see and approve every command before it runs, and if you want a
hard guarantee the right place is the one your organisation already has — the
corporate proxy/firewall, which this agent cooperates with (its HTTP honours
`HTTPS_PROXY`).

## Setup

Prerequisites on the work PC: Python 3.10+, `git`, `gh` (signed in:
`gh auth login`), `az` (signed in: `az login`; for Azure DevOps also
`az extension add --name azure-devops`).

1. Copy `sample.agent.config.json` to `agent.config.json` (untracked) and set
   the `provider` block. Two worked examples are embedded in the sample:
   - **Azure OpenAI** — `api_style: "openai-chat"`, the deployment's
     chat-completions URL as `endpoint`, and auth either `azure-cli` (a bearer
     token from `az account get-access-token`, no key to store) or
     `api-key-env` (key read from an environment variable, never from the repo).
   - **Claude on Azure AI Foundry** — `api_style: "anthropic-messages"`, the
     Foundry resource's `/anthropic/v1/messages` endpoint and your deployed
     Claude model name. Still an Azure endpoint, so still inside the boundary.
2. Run it from the repo you want to work on:

   ```
   python path\to\local-agent\agent.py            # REPL, working dir = current dir
   python agent.py --root C:\src\some-repo        # or point it at a repo
   python agent.py -p "summarise failing tests"   # one-shot
   ```

`/reset` clears the conversation, `/quit` exits, `--yes` skips confirmations
(for scripted use; not recommended interactively).

## Delegation and escalation

- **GitHub Copilot coding agent** (`delegate_to_copilot`): the agent drafts a
  standalone brief, creates an issue in the repo you name, and assigns the
  `copilot-swe-agent` bot to it (via `gh api graphql` — the plain assignees API
  can't assign a bot). Copilot then works autonomously and opens a draft PR. If
  assignment fails — Copilot not enabled on the repo, or no credits — the issue
  still exists and the agent tells you to assign **Copilot** by hand in the UI.
- **M365 Copilot** (`ask_m365_copilot`): for organisational knowledge — internal
  docs, SharePoint, Teams, policy — the agent prints the question, you relay it,
  and paste the answer back (finish with a line containing just `END`). This
  needs no tenant API enablement and keeps you in the loop on exactly what is
  asked. If your tenant later exposes the M365 Copilot APIs on Microsoft Graph,
  `graph.microsoft.com` is already in the allowlist and the tool can be swapped
  for a direct call.

## Layout

```
agent.py                  entry point: REPL, one-shot mode, the tool loop
llm.py                    openai-chat and anthropic-messages adapters
policy.py                 the egress allowlist — the one HTTP door
tools.py                  file/search/command tools + the two hand-offs
config.py                 config loading, allowlist defaults, az-CLI tokens
sample.agent.config.json  template for the untracked agent.config.json
tests/test_agent.py       offline tests (fake transports; no network, no model)
```

Tests: `python -m unittest discover tests` from this directory.

## Moving this to its own repo

The directory is deliberately self-contained (no imports from the rest of this
repository, its own `.gitignore`). To extract it, copy the directory into a new
repo — or, to keep history, `git subtree split` / `git filter-repo --path
local-agent/`. Nothing else in this repository references it.

## License

This directory is engine-side code and is covered by the repository's MIT
`LICENSE` (it is not part of the CC BY-NC-ND content paths listed in
`CONTENT-LICENSE.md`).
