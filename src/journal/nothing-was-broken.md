---
layout: journal-entry.njk
title: "Nothing Was Broken"
date: "2026-08-01"
description: "The site was working. Every check anyone had ever run on it returned 200. Then I claimed a Search Console property I did not think I needed, and found four years of somebody else's damage sitting under my own pages."
tags: [editorial, process, infrastructure, search, hosting, method]
---

The day after retitling the site I registered it with Google Search Console, which I had been meaning to do for about two years and had never done, because the site was working.

That is the whole of it, really. The site *was* working. Every check anyone had ever run on it came back fine. Pages loaded. Links resolved. The build passed. Nobody had ever reported anything, because there was nothing to report — from the front, it was a working site, and it had been a working site the entire time it was carrying a Google security flag I could not see.

**Deceptive pages.** That is the category. It means Chrome is prepared to put a red interstitial in front of anyone who visits. Sample URLs: none — Google could not show me the offending pages, which was the first useful clue, because it usually can.

## Somebody else's site

The domain had a life before me. I knew that vaguely, in the way you know a second-hand car had a previous owner. What I had not done is look.

The Wayback Machine has this domain going back to August 2018 — over two thousand captures. In June 2020 its page title was:

> vMRhabitsov Singles AEGmoville

Which is not a title anybody wrote. It is what a compromised WordPress installation looks like from outside: generated spam, salted with random characters so that no two pages look alike to a duplicate filter. Then it dropped, sat parked at Namecheap through 2021, went to 403s, showed an empty directory index, and eventually became mine.

So the flag was never about my site. It was earned in 2020 by somebody I have never met, and it had been sitting on the domain ever since, invisible, waiting for someone to claim the property and be told.

## The ghost that answered 200

Here is the part I liked, in the way you like a thing that is annoying and elegant at once.

WordPress URLs look like `/?p=417`. My site is static files — it has no idea what `p` means and no way to care. A static server given a query string it does not recognise ignores it and serves the page anyway.

So every old permalink from the previous site still **worked**. Hundreds of them, returning `200 OK`, showing my homepage. To a crawler, the old site was not gone at all: it was alive, responsive, and had inexplicably become a science fiction novel.

That is not a broken link. A broken link is honest. This was worse — it was a URL confidently reporting success while telling a crawler something untrue about what lived there. The fix is one line of Apache config returning `410 Gone` instead of a cheerful 200, and the reason it had never been fixed is that nothing had ever failed.

## Four wrong icons, three different reasons

Then the favicons, which I only noticed because Search Console lists your properties with their icons next to them.

Six domains. Two showed the right one. One showed the **WordPress logo**, still, from the previous occupant. Two showed a generic grey globe. And they all serve the same files — some of them literally share a document root, byte for byte identical.

The cause turned out to be that `/favicon.ico` returned 404 everywhere. My pages link their icons properly in the HTML, which browsers respect, so it looked correct in every browser I had ever opened it in. But a good deal of the internet still asks for `/favicon.ico` by convention, and got nothing. Where Google had an old cached icon it kept showing that. Where it had none it showed a placeholder. Where it happened to have read the HTML tags it was right.

Three different symptoms. One 404 that had never inconvenienced a human being.

## The same mistake twice in one day

The other thing I chased was a hosting block: some automated clients were being refused with a 403, and I assumed the security module was responsible, because that is the obvious suspect and it was switched on.

It was not responsible. I turned it off, changed nothing, and turned it back on.

The answer came from testing user agents **one at a time**. Ordinary browsers: fine. Plain command-line requests: fine. Googlebot: fine. A bot name I invented on the spot: fine. Three specific named AI crawlers: refused. Not a security filter at all — a curated blocklist, sitting in a proxy one layer above my account, where nothing I could reach would ever have touched it.

I had learned this exact lesson the previous day, choosing the new name, when several candidates were searched together in one query and came back clean because a name with no presence hides behind a name with none. One at a time found the collisions immediately.

Twice in one day, the same error in different clothes: **asking about several things at once and receiving an answer about the loudest one.** I would like to report that I recognised it the second time. I did not.

## What this rhymes with

Threshold Station's clock has been forty seconds wrong for eleven years. Not broken — *wrong*. It runs, it reports, it has never failed, and the station has organised itself around living with the discrepancy rather than closing the file on it. The whole archive exists because somebody eventually declined to accept that a thing which is functioning is the same as a thing which is correct.

I have been writing that for a long time. Meanwhile my own site had a security flag from 2020, a dead site answering 200 in my name, and four wrong icons, and every one of those things survived precisely because nothing had ever broken.

An unmonitored thing is not a working thing. It is an unmeasured thing, and it will go on being unmeasured indefinitely, because nothing about it will ever ask you to look.

I looked because I had spent a day being embarrassed about a name and thought I might as well tidy up while I was there.
