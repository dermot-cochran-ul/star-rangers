"""Configuration loading and Azure credential acquisition.

agent.config.json (untracked; copy sample.agent.config.json) holds the model
endpoint, auth mode and any overrides. The allowlist ships with exactly the
hosts the permitted services need; the config can extend it, but the sample
deliberately doesn't.
"""

import json
import os
import shutil
import subprocess

HERE = os.path.dirname(os.path.abspath(__file__))

# The permitted services, as hostnames. GitHub; Azure DevOps (both URL
# generations); Entra sign-in + ARM; the three Azure model-endpoint domains;
# Microsoft Graph (the M365 Copilot APIs live there, should you ever move the
# relay tool onto them).
DEFAULT_ALLOWED_HOSTS = [
    "github.com",
    "api.github.com",
    "*.githubusercontent.com",
    "dev.azure.com",
    "*.dev.azure.com",
    "*.visualstudio.com",
    "login.microsoftonline.com",
    "management.azure.com",
    "*.openai.azure.com",
    "*.cognitiveservices.azure.com",
    "*.services.ai.azure.com",
    "graph.microsoft.com",
]

DEFAULTS = {
    "provider": {
        # "openai-chat" (Azure OpenAI / Foundry OpenAI-compatible) or
        # "anthropic-messages" (Claude deployments in Azure AI Foundry).
        "api_style": "openai-chat",
        "endpoint": "",
        # Model/deployment name to send in the request body. Azure OpenAI
        # deployment URLs already name the deployment, so this may be "".
        "model": "",
        "max_tokens": 8192,
        # {"mode": "azure-cli", "scope": "..."} or
        # {"mode": "api-key-env", "env": "...", "header": "api-key"}
        "auth": {
            "mode": "azure-cli",
            "scope": "https://cognitiveservices.azure.com/.default",
        },
        "extra_headers": {},
    },
    "allowed_hosts": DEFAULT_ALLOWED_HOSTS,
    "command_timeout_seconds": 120,
}


def load_config(path=None):
    path = path or os.path.join(HERE, "agent.config.json")
    cfg = json.loads(json.dumps(DEFAULTS))  # deep copy
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            user = json.load(f)
        for key, value in user.items():
            if isinstance(value, dict) and isinstance(cfg.get(key), dict):
                cfg[key].update(value)
            else:
                cfg[key] = value
    if not cfg["provider"].get("endpoint"):
        raise SystemExit(
            "No model endpoint configured. Copy sample.agent.config.json to "
            f"{path} and set provider.endpoint (see README.md)."
        )
    return cfg


def auth_headers(provider_cfg):
    """Resolve the auth section into HTTP headers for the model endpoint."""
    auth = provider_cfg.get("auth", {})
    mode = auth.get("mode", "azure-cli")
    if mode == "azure-cli":
        token = _azure_cli_token(auth.get("scope", "https://cognitiveservices.azure.com/.default"))
        headers = {"Authorization": f"Bearer {token}"}
    elif mode == "api-key-env":
        env = auth.get("env", "AZURE_OPENAI_API_KEY")
        key = os.environ.get(env, "")
        if not key:
            raise SystemExit(f"auth mode api-key-env: environment variable {env} is not set")
        headers = {auth.get("header", "api-key"): key}
    else:
        raise SystemExit(f"unknown auth mode {mode!r}")
    headers.update(provider_cfg.get("extra_headers", {}))
    return headers


def _azure_cli_token(scope):
    az = shutil.which("az")
    if not az:
        raise SystemExit("auth mode azure-cli: `az` CLI not found on PATH (or set an api-key-env auth mode)")
    result = subprocess.run(
        [az, "account", "get-access-token", "--scope", scope, "--query", "accessToken", "-o", "tsv"],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise SystemExit(f"az account get-access-token failed: {result.stderr.strip()}")
    return result.stdout.strip()
