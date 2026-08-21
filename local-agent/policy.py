"""Egress policy: the enforcement half of the project's one rule.

The agent may talk to GitHub, Azure DevOps, Azure and the local machine —
nothing else. Every HTTP request the agent itself originates goes through
http_json() below, which refuses any host not matched by the allowlist.
Subprocess tools (git, gh, az) make their own connections; the README
explains why those are covered by the CLIs' own scoping and, if you want a
hard guarantee, by your corporate proxy/firewall.
"""

import fnmatch
import json
import urllib.error
import urllib.request
from urllib.parse import urlsplit


class PolicyError(Exception):
    """A request was refused by the egress allowlist."""


def host_allowed(host, patterns):
    host = (host or "").lower().rstrip(".")
    if not host:
        return False
    for pat in patterns:
        pat = pat.lower().rstrip(".")
        if host == pat or fnmatch.fnmatch(host, pat):
            return True
    return False


def http_json(url, headers, body, allowed_hosts, timeout=300):
    """POST a JSON body and return the parsed JSON response.

    The single door for agent-originated HTTP: HTTPS only, host must match
    the allowlist. Honours HTTPS_PROXY et al. via urllib's default handlers,
    so it works behind a corporate proxy.
    """
    parts = urlsplit(url)
    if parts.scheme != "https":
        raise PolicyError(f"refusing non-HTTPS request to {url}")
    if not host_allowed(parts.hostname, allowed_hosts):
        raise PolicyError(
            f"host {parts.hostname!r} is not in allowed_hosts; refusing request. "
            "If this endpoint really is one of the permitted services, add its "
            "hostname to allowed_hosts in agent.config.json."
        )
    data = json.dumps(body).encode("utf-8")
    all_headers = {"Content-Type": "application/json"}
    all_headers.update(headers or {})
    req = urllib.request.Request(url, data=data, headers=all_headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {e.code} from {parts.hostname}: {detail[:2000]}") from None
