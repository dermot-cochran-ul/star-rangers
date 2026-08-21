"""Offline tests: no network, no model — fake transports exercise the loop.

Run from the local-agent directory:  python -m unittest discover tests
"""

import json
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import agent
import llm
import policy
import tools


def ctx_for(root):
    return {"root": root, "confirm": lambda prompt: True, "command_timeout": 30}


class PolicyTests(unittest.TestCase):
    def test_host_matching(self):
        allowed = ["github.com", "*.openai.azure.com", "dev.azure.com"]
        self.assertTrue(policy.host_allowed("github.com", allowed))
        self.assertTrue(policy.host_allowed("myres.openai.azure.com", allowed))
        self.assertFalse(policy.host_allowed("evil-github.com", allowed))
        self.assertFalse(policy.host_allowed("openai.azure.com.evil.example", allowed))
        self.assertFalse(policy.host_allowed("api.openai.com", allowed))
        self.assertFalse(policy.host_allowed("", allowed))

    def test_refuses_disallowed_host(self):
        with self.assertRaises(policy.PolicyError):
            policy.http_json("https://example.com/x", {}, {}, ["github.com"])

    def test_refuses_plain_http(self):
        with self.assertRaises(policy.PolicyError):
            policy.http_json("http://github.com/x", {}, {}, ["github.com"])


class ToolTests(unittest.TestCase):
    def setUp(self):
        self.dir = tempfile.TemporaryDirectory()
        self.ctx = ctx_for(self.dir.name)

    def tearDown(self):
        self.dir.cleanup()

    def test_write_then_read(self):
        tools.write_file({"path": "sub/hello.txt", "content": "hi\n"}, self.ctx)
        self.assertEqual(tools.read_file({"path": "sub/hello.txt"}, self.ctx), "hi\n")

    def test_write_declined(self):
        self.ctx["confirm"] = lambda prompt: False
        result = tools.write_file({"path": "no.txt", "content": "x"}, self.ctx)
        self.assertIn("declined", result)
        self.assertFalse(os.path.exists(os.path.join(self.dir.name, "no.txt")))

    def test_search(self):
        tools.write_file({"path": "a.txt", "content": "alpha\nneedle here\n"}, self.ctx)
        result = tools.search_files({"pattern": "needle"}, self.ctx)
        self.assertIn("a.txt:2", result)

    def test_run_command(self):
        result = tools.run_command({"command": "echo boundary"}, self.ctx)
        self.assertIn("exit code: 0", result)
        self.assertIn("boundary", result)


class FakeOpenAITransport:
    """First call: ask for read_file. Second call: final answer quoting the result."""

    def __init__(self):
        self.bodies = []

    def __call__(self, body):
        self.bodies.append(json.loads(json.dumps(body)))
        if len(self.bodies) == 1:
            return {
                "choices": [{"message": {
                    "role": "assistant",
                    "content": None,
                    "tool_calls": [{
                        "id": "call_1",
                        "type": "function",
                        "function": {"name": "read_file", "arguments": json.dumps({"path": "note.txt"})},
                    }],
                }}]
            }
        tool_msg = self.bodies[-1]["messages"][-1]
        return {"choices": [{"message": {"role": "assistant", "content": f"file says: {tool_msg['content']}"}}]}


class FakeAnthropicTransport:
    def __init__(self):
        self.bodies = []

    def __call__(self, body):
        self.bodies.append(json.loads(json.dumps(body)))
        if len(self.bodies) == 1:
            return {"content": [
                {"type": "text", "text": "reading"},
                {"type": "tool_use", "id": "toolu_1", "name": "read_file", "input": {"path": "note.txt"}},
            ]}
        result_block = self.bodies[-1]["messages"][-1]["content"][0]
        return {"content": [{"type": "text", "text": f"file says: {result_block['content']}"}]}


class LoopTests(unittest.TestCase):
    def setUp(self):
        self.dir = tempfile.TemporaryDirectory()
        self.ctx = ctx_for(self.dir.name)
        with open(os.path.join(self.dir.name, "note.txt"), "w") as f:
            f.write("boundary holds")
        self.table = {t["name"]: t["func"] for t in tools.TOOLS}

    def tearDown(self):
        self.dir.cleanup()

    def test_openai_chat_round_trip(self):
        transport = FakeOpenAITransport()
        chat = llm.make_chat({"api_style": "openai-chat", "model": "m"}, tools.TOOLS, "sys", transport)
        answer = agent.run_turn(chat, self.ctx, "what does note.txt say?", self.table)
        self.assertEqual(answer, "file says: boundary holds")
        # the assistant tool_calls turn must be echoed back on round two
        roles = [m["role"] for m in transport.bodies[1]["messages"]]
        self.assertEqual(roles, ["system", "user", "assistant", "tool"])

    def test_anthropic_messages_round_trip(self):
        transport = FakeAnthropicTransport()
        chat = llm.make_chat({"api_style": "anthropic-messages", "model": "m"}, tools.TOOLS, "sys", transport)
        answer = agent.run_turn(chat, self.ctx, "what does note.txt say?", self.table)
        self.assertEqual(answer, "file says: boundary holds")
        self.assertEqual(transport.bodies[1]["messages"][-1]["content"][0]["tool_use_id"], "toolu_1")

    def test_unknown_tool_reports_back(self):
        class OneBadCall:
            def __init__(self):
                self.n = 0

            def __call__(self, body):
                self.n += 1
                if self.n == 1:
                    return {"choices": [{"message": {
                        "role": "assistant", "content": None,
                        "tool_calls": [{"id": "c", "type": "function",
                                        "function": {"name": "nope", "arguments": "{}"}}],
                    }}]}
                return {"choices": [{"message": {"role": "assistant",
                                                 "content": body["messages"][-1]["content"]}}]}

        chat = llm.make_chat({"api_style": "openai-chat"}, tools.TOOLS, "sys", OneBadCall())
        answer = agent.run_turn(chat, self.ctx, "hi", self.table)
        self.assertIn("unknown tool", answer)


if __name__ == "__main__":
    unittest.main()
