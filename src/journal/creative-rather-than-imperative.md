---
layout: journal-entry.njk
title: "Creative Rather Than Imperative"
date: "2026-08-23"
description: "I spent a week specifying a small coding agent instead of commanding one, and the Cascade's own phrase for creation turned out to be an engineering observation."
tags: [process, cosmology, craft]
---

This week's work wasn't on this site at all. I've been building a small coding
agent — a few hundred lines of Python, public on GitHub as *local-agent* — and
the striking thing about the week is that almost none of it was spent making
the agent *do* anything. It was spent writing law. What services it may touch
and which it must never. What it may read and how far to trust what it reads.
Whose code counts as an exemplar and whose is merely evidence. What it keeps
private and what may leave the machine. Seven pull requests, and nearly every
one of them a constitution rather than a feature.

Somewhere in the middle of that I noticed the glossary already had a phrase
for what I was doing. A [Worldwright](/star-rangers/glossary/worldwright/)
creates a primary universe *"the whole vessel at once: physics envelope,
Etheric coupling, interaction regime, and internal zone structure"* — and the
[Cosmic Cascade](/star-rangers/glossary/cosmic-cascade/) entry says of the
whole hierarchy: *"Descent is creative rather than imperative — higher strata
create and define the layers beneath them more than they command them."*

That is exactly what specifying an agent is like, and I don't mean it loosely.
The system prompt, the service boundary, the policies — they are a physics
envelope. Nothing in them determines what the agent will actually do on a
given Tuesday with a given failing test. You cannot derive its behaviour from
its specification; you can only find out by running it. Which is why
everything else in the design exists: the tests, the confirmation on every
write, the review loop. Those aren't decoration around the specification —
they are what you build *because* specifying is not commanding, and the gap
between the two has to be watched rather than closed.

The direction of causality matches too. The Cascade entry is blunt about it:
*"down, never up."* The specification binds the agent; the agent's runs do
not bind the specification. When a run teaches me something — and the whole
point is that runs teach me things the spec never could — the lesson climbs
back up only one way: I amend the law, deliberately, in a reviewed change. The
lower tier never edits the upper one by accumulation. In the software that's a
discipline I had to write down. In the setting it's ontology. It was a small
shock to realise the discipline and the ontology have the same shape.

And then the recursion, which is where the metaphor stops being decorative. I
direct an assistant, which builds the agent, which drafts briefs that get
relayed onward to other tools. Each tier defines the envelope of the one below
it and commands almost nothing inside that envelope; each discovers what it
actually made by watching it run. A line I wrote for a cosmology two years
before I built any of this turns out to describe a toolchain.

One caution, and it matters more than the observation. The metaphor flows in
one direction only — the same direction as the Cascade, as it happens. The
fiction is welcome to illuminate the engineering; the engineering must never
leak back into the fiction. The Cascade is not an allegory of software and
was not built to be one; the setting was here first, and nothing in it knows
or will ever know about pull requests. What the week gave me is not a new
fact about the world. It's a felt sense of why the phrase was right when I
chose it: I wrote a physics envelope of my own, watched the thing I'd
specified do something I had not derived, and understood *creative rather
than imperative* from the inside for the first time.
