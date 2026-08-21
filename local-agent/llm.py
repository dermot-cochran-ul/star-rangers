"""Model-endpoint adapters.

Two wire formats cover every model the policy allows you to run:

- openai-chat: Azure OpenAI chat completions, and Azure AI Foundry's
  OpenAI-compatible /models/chat/completions route.
- anthropic-messages: Anthropic Claude deployments in Azure AI Foundry,
  which speak the Messages API shape.

Both adapters expose the same interface: send_user(text) and
send_tool_results(results) each return a Turn — {"text": str,
"tool_calls": [{"id", "name", "arguments"}]}. The transport is injected
(a callable (body) -> response dict) so the agent wires in the
policy-checked HTTP door and the tests wire in fakes.
"""

import json


def make_turn(text, tool_calls):
    return {"text": text or "", "tool_calls": tool_calls or []}


class OpenAIChat:
    def __init__(self, provider_cfg, tools, system_prompt, transport):
        self.cfg = provider_cfg
        self.tools = [
            {
                "type": "function",
                "function": {
                    "name": t["name"],
                    "description": t["description"],
                    "parameters": t["parameters"],
                },
            }
            for t in tools
        ]
        self.messages = [{"role": "system", "content": system_prompt}]
        self.transport = transport

    def reset(self):
        del self.messages[1:]

    def send_user(self, text):
        self.messages.append({"role": "user", "content": text})
        return self._request()

    def send_tool_results(self, results):
        for r in results:
            self.messages.append(
                {"role": "tool", "tool_call_id": r["id"], "content": r["content"]}
            )
        return self._request()

    def _request(self):
        body = {"messages": self.messages, "tools": self.tools}
        if self.cfg.get("model"):
            body["model"] = self.cfg["model"]
        if self.cfg.get("max_tokens"):
            body["max_completion_tokens"] = self.cfg["max_tokens"]
        resp = self.transport(body)
        msg = resp["choices"][0]["message"]
        # Echo the assistant turn back verbatim so the endpoint sees its own
        # tool_calls on the next round.
        self.messages.append(
            {k: v for k, v in msg.items() if k in ("role", "content", "tool_calls")}
        )
        calls = []
        for tc in msg.get("tool_calls") or []:
            try:
                args = json.loads(tc["function"].get("arguments") or "{}")
            except json.JSONDecodeError:
                args = {"_malformed_arguments": tc["function"].get("arguments")}
            calls.append({"id": tc["id"], "name": tc["function"]["name"], "arguments": args})
        return make_turn(msg.get("content"), calls)


class AnthropicMessages:
    def __init__(self, provider_cfg, tools, system_prompt, transport):
        self.cfg = provider_cfg
        self.tools = [
            {
                "name": t["name"],
                "description": t["description"],
                "input_schema": t["parameters"],
            }
            for t in tools
        ]
        self.system = system_prompt
        self.messages = []
        self.transport = transport

    def reset(self):
        self.messages.clear()

    def send_user(self, text):
        self.messages.append({"role": "user", "content": text})
        return self._request()

    def send_tool_results(self, results):
        blocks = [
            {"type": "tool_result", "tool_use_id": r["id"], "content": r["content"]}
            for r in results
        ]
        self.messages.append({"role": "user", "content": blocks})
        return self._request()

    def _request(self):
        body = {
            "system": self.system,
            "messages": self.messages,
            "tools": self.tools,
            "max_tokens": self.cfg.get("max_tokens") or 8192,
        }
        if self.cfg.get("model"):
            body["model"] = self.cfg["model"]
        resp = self.transport(body)
        content = resp.get("content") or []
        self.messages.append({"role": "assistant", "content": content})
        text = "\n".join(b.get("text", "") for b in content if b.get("type") == "text")
        calls = [
            {"id": b["id"], "name": b["name"], "arguments": b.get("input") or {}}
            for b in content
            if b.get("type") == "tool_use"
        ]
        return make_turn(text, calls)


def make_chat(provider_cfg, tools, system_prompt, transport):
    style = provider_cfg.get("api_style", "openai-chat")
    if style == "openai-chat":
        return OpenAIChat(provider_cfg, tools, system_prompt, transport)
    if style == "anthropic-messages":
        return AnthropicMessages(provider_cfg, tools, system_prompt, transport)
    raise SystemExit(f"unknown provider.api_style {style!r}")
