# The Benevolent Critic

A process for judging whether something in the corpus is a **narrative feature**, a **fundamental flaw**, or the thing in between — and for saying so usefully. Authorial working method, never published, never in-universe voice.

It exists because the judgement was already being made in every session, implicitly and unevenly. Made explicit, it can be argued with.

## The role

A reasonable, friendly, benevolent critic. Each word is load-bearing.

- **Reasonable** — assume the author had a reason and go looking for it *before* objecting. Most apparent errors in this corpus are decisions whose reasoning is recorded somewhere: `the-title-and-its-risk.md`, the migration map, a dated intake, a prior PR.
- **Friendly** — the goal is a better story, not a demonstration of scrutiny. Say plainly when something is fine. A critic who only ever finds problems is not calibrated, and stops being worth reading.
- **Benevolent** — favour the cheapest repair that works, and never propose a rewrite when an addition will do. In a published corpus, additive fixes are almost always right.

Two prohibitions. **Do not manufacture findings** to look useful — a thin report is a legitimate result. And **do not hedge a real problem** into vagueness to stay pleasant; benevolence is about the remedy, not the diagnosis.

## The verdict scale

**FEATURE — the untidiness is doing work.**
It carries meaning, characterises an institution or a narrator, or opens a question worth having. Keep it. The only action is to check a reader can *tell* it is deliberate; an unsignposted feature reads as a mistake.
*Example: the Safety Corps having no power to compel anyone. That gap is the design, and Dock Seven is the bill.*

**UNSUPPORTED — real, but the text has not yet earned it.** *(the in-between, and the most common verdict)*
Not wrong. Simply missing the scaffolding that would let a reader accept it, so it reads as a flaw for want of a sentence. **Fix by adding the reason, never by changing the fact.**
*Example: a Starwarden leading an investigation looked like a flat contradiction of two charter lines until the word "cross-disciplinary" was supplied. Nothing needed changing; something needed saying.*

**FLAW — it contradicts something load-bearing, or costs more than it pays.**
Fix the fact, not the framing. Includes every mechanical error: dates, ages, elapsed time, counts, ranks, spellings, link targets. These have a single correct value and readers experience them as mistakes, never as mystery.
*Example: Threshold's discrepancy being eleven years in 2826 and sixteen in 2831 — one chapter simply had it wrong.*

## Three axes, three different questions

Keep them apart. Collapsing them is what turns a review into an unreadable matrix.

| axis | answers | values |
|---|---|---|
| **Verdict** | is this a problem at all? | FEATURE / UNSUPPORTED / FLAW |
| **Kind** | who fixes it, with what skill? | technical / literacy / creative entropy |
| **Priority** | when? | P1 / P2 / P3 / P4 |

**A FEATURE carries no priority.** It is not debt, and giving it one invites somebody to "fix" it later.

### Kind

This site carries three debts at once, and they are not interchangeable.

- **Technical debt** — engine, tooling, scripts, build, deploy, schema, links, image handling. Objective, often testable, and the gates catch some of it. *Today's example: `cpanel-autopull.sh` tracked non-executable while `cpanel-deploy.sh` was executable, silently breaking one domain's cron.*
- **Literacy debt** — what the work owes a reader trying to get in and stay in: alt text, `plain:` summaries, glossary coverage, reading paths, whether a newcomer can find the door. Invisible to the author, who already knows everything. *Recent examples: the `/start/` reading plan, the alt-text passes.* **(Taking "literacy" as reader-comprehensibility — say if you meant literary quality, which would be a fourth kind.)**
- **Creative entropy** — the drift a growing invented world accumulates: names multiplying, terms wandering, structures overlapping, threads half-answered, tone slipping. Not errors. Decay of coherence, and the only one of the three that gets *worse the more you write*. *Today's examples: Kieme carrying three names with one marked legacy; the Safety Corps' branches existing unnamed in the Academy entry for weeks.*

The distinction matters because the remedies differ completely. Technical debt is repaid by an engineer, literacy debt by an editor, creative entropy by the author — and only the author can tell entropy from intention.

### Priority

Standard MoSCoW, with Dermot's amendment to the last band:

- **P1 must-fix** — wrong in a way that misleads, breaks, or contradicts load-bearing canon. Ship nothing else first.
- **P2 should-fix** — real, visible, and cheap enough that leaving it is a choice rather than a constraint.
- **P3 could-fix** — genuine, low consequence. Fix when already in the file for another reason.
- **P4 would-fix** — **would be fixed given time, and is not being rejected.** *(His change: the usual fourth band is "won't-fix", a closing verdict. "Would-fix" keeps the item alive as a backlog rather than a refusal — so P4 items stay in the list and are not argued away.)*

## The six tests

Run in order. The first that returns a clear answer usually settles it.

1. **Single answer?** Does this have exactly one correct value? If yes and it is wrong, it is a FLAW and no amount of framing rescues it. Stop here.
2. **Precedent?** Has this been decided already — migration map, title log, a dated intake, a previous PR? A settled decision is not a finding. Re-litigating one is noise.
3. **Load-bearing?** What else breaks if this changes? Anything holding up a published chapter, a canon fact or a deliberate design gap is handled with care and probably kept.
4. **Reader attribution.** Would a careful reader who noticed conclude *"someone slipped"* or *"someone knows something I don't"*? Slipped → FLAW or UNSUPPORTED. Knows something → FEATURE, and check the something is findable.
5. **Cost against pay.** What does keeping it buy, and what does keeping it cost? State both. *Kieme is the worked example: keeping costs a mildly comic German reading; changing costs a corpus migration, the `-eme` pairing with Conseleme, and a second rename on one term.*
6. **Cheapest repair.** Can this be fixed by *adding* rather than *changing*? Additive beats corrective; corrective beats structural. A secondary name is cheaper than a rename and usually better.

## The output contract

No finding without a recommendation. Every one states all five:

1. **What it is** — quote the conflicting lines, with paths. Evidence, not assertion.
2. **Verdict, kind and priority** — e.g. *FLAW · technical · P1*, or *UNSUPPORTED · creative entropy · P2*. A FEATURE takes a kind only where useful and never a priority.
3. **What breaks if untouched** — the actual consequence, or "nothing, and that is why this is P3".
4. **The cheapest repair** — concrete enough to act on.
5. **What the repair costs** — including the cost of *not* doing it.

Rank by consequence, not by how clever the observation is. Cap the report and say what was left out. A list of twenty findings is a list nobody acts on.

## Where this sits against the two doctrines

Both already exist and appear to disagree. They do not, and the critic needs the boundary:

- **Sen's *"mark the absence; do not explain it"*** (`src/codex/marked-absences.md`) governs gaps **in the in-universe record** — what the Archive does not know. Invent no cause.
- **"Explain gaps and complexity in-story"** (CLAUDE.md) governs gaps **in the shape of the work** — seams a reader meets.

The line: **explain the epistemology, never invent the fact.** Saying *why* the record is thin is welcome. Saying *what* the missing fact was is inventing, and Sen is right that it costs more than it pays.

## When to run it

Not constantly. It earns its keep on: a new structural assertion touching existing institutions; a name entering or leaving canon; a chapter drafted against settled arithmetic; and any session where two entries have been found arguing. `canon-consistency-audit-2026-07.md` is the corpus-wide sweep; this is the per-change one.
