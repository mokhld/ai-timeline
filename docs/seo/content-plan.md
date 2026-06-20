# AI Timeline — pillar-and-cluster content plan

Compiled 2026-06-20 from `keyword-research.md` and the three research passes in
`research/`. This is the build spec: what to create, in priority order, grounded in
existing dataset content only.

## Architecture: hub and spoke

The site already has the spoke layer (milestone, era, category, tag, person, org
pages). What it lacks is the **hub layer** that ties spokes into rankable topical
narratives. The editorial-page type (`/history/[slug]`) is exactly that hub layer; only
3 hubs exist today. This plan adds focused new hubs and wires reciprocal links so
spokes stop being orphans.

```
                    history-of-artificial-intelligence   ← super-pillar (head term)
                   /        |          |          |      \
   neural-networks   LLMs   generative-ai   ai-winters   who-invented-ai
        |             |          |              |              |
   (milestone, era, person, org spokes — linked both directions)
   existing hubs: history-of-openai · history-of-ai-agents · most-important-ai-milestones
   plus: history-of-deepmind · gpt-timeline
```

No new routes are required: every new page is a record in `src/data/editorial-pages.ts`
and renders through the existing `/history/[slug]` template, sitemap, and schema.

## New pillar pages (priority order)

Each features only real milestone IDs (verified against `research/milestones-manifest.json`).

### Core set (P1–P3)

1. **`history-of-artificial-intelligence`** (P1, super-pillar) — primary: "history of
   artificial intelligence". Features: mcculloch-pitts-1943, turing-test-1950,
   dartmouth-conference-1956, perceptron-1957, minsky-papert-perceptrons-1969,
   lighthill-report-1973, backprop-rediscovery-1986, deep-blue-1997,
   deep-belief-networks-2006, alexnet-2012, alphago-2016, transformer-2017, gpt-3-2020,
   chatgpt-2022, gpt-4-2023, ai-agents-2025. Entities: alan-turing, geoffrey-hinton,
   openai, deepmind. Links out to every other hub.

2. **`history-of-neural-networks`** (P2) — primary: "history of neural networks" /
   "deep learning history" (one page; SERP overlap forbids splitting). Features:
   mcculloch-pitts-1943, perceptron-1957, minsky-papert-perceptrons-1969,
   backpropagation-theory-1974, hopfield-networks-1982, backprop-rediscovery-1986,
   lenet-1989, deep-belief-networks-2006, imagenet-2009, gpu-computing-2009,
   alexnet-2012, resnet-2015. Entities: warren-mcculloch, frank-rosenblatt,
   geoffrey-hinton, yann-lecun.

3. **`history-of-large-language-models`** (P2) — primary: "history of large language
   models". Features: word2vec-2013, transformer-2017, bert-2018, gpt-1-2018,
   gpt-2-2019, gpt-3-2020, chatgpt-2022, gpt-4-2023, claude-2023, llama-2-2023,
   o1-reasoning-2024. Entities: openai, anthropic, google, ilya-sutskever.

4. **`history-of-generative-ai`** (P2) — primary: "generative AI history". Features:
   gans-2014, dalle-2021, stable-diffusion-2022, chatgpt-2022, midjourney-v5-2023,
   gpt-4-2023, sora-2024. Entities: ian-goodfellow, openai, google.

5. **`history-of-ai-winters`** (P2) — primary: "AI winter" / "what caused the AI
   winter". Features: minsky-papert-perceptrons-1969, lighthill-report-1973,
   expert-systems-boom-1980, fifth-generation-1982, backprop-rediscovery-1986,
   ai-winter-2-1988. Entities: marvin-minsky, geoffrey-hinton. Fixes the orphaned
   `/era/first-winter` and `/era/second-winter` pages.

6. **`who-invented-ai`** (P3) — primary: "who invented AI" / "father of AI". Features:
   mcculloch-pitts-1943, turing-test-1950, dartmouth-conference-1956, logic-theorist-1956,
   perceptron-1957, lisp-1958. Entities: alan-turing, john-mccarthy, marvin-minsky,
   frank-rosenblatt.

7. **`history-of-deepmind`** (P3) — primary: "history of DeepMind". Features:
   deepmind-atari-2013, alphago-2016, alphago-zero-2017, alphastar-2019,
   alphafold-2-2020, nobel-prizes-ai-2024. Entities: demis-hassabis, deepmind, google.

8. **`gpt-timeline`** (P3) — primary: "history of GPT models" / "GPT timeline".
   Features: gpt-1-2018, gpt-2-2019, gpt-3-2020, chatgpt-2022, gpt-4-2023, gpt-4o-2024,
   o1-reasoning-2024, openai-o3-2025. Entities: openai, sam-altman, ilya-sutskever.

### Optional extension (P4)

9. **`history-of-machine-learning`** — samuel-checkers-1952, perceptron-1957,
   reinforcement-learning-1992, svm-1995, netflix-prize-2006, imagenet-2009,
   alexnet-2012, word2vec-2013.

10. **`history-of-chatbots`** — eliza-1966, shrdlu-1968, siri-2011, alexa-2014,
    chatgpt-2022, claude-2023, gpt-4o-2024.

## Shared infrastructure (built before content)

1. **FAQ on editorial pages.** Add optional `faqs: FaqItem[]` to `EditorialPage`,
   render as visible `<details>` Q&A, emit `FAQPage` JSON-LD (same pattern as milestone
   and era pages). Note: Google retired FAQ rich results for all sites on 2026-05-07,
   so the value here is **AI/LLM citation and on-page UX**, not a Google SERP feature.
   Each new pillar gets hand-written, dataset-grounded FAQs.

2. **Reciprocal spoke→hub links.** Add a data-driven "Featured in these guides" block to
   the milestone page template, computed from `featuredMilestoneIds` across all editorial
   pages. Turns milestone spokes from editorial orphans into linked nodes. Zero per-page
   authoring.

3. **Hub↔hub links.** Add optional `relatedGuideSlugs` to `EditorialPage` and render a
   "Related guides" block, so the super-pillar links to all hubs and siblings cross-link
   per the cluster matrix.

4. **Freshness.** Bump `SITE_UPDATED` (`structured-data.ts`) and `LAST_UPDATED`
   (`sitemap.ts`) on ship. Editorial pages are already auto-included in the sitemap.

## Cannibalization guardrails

- Do NOT split "deep learning history" from "history of neural networks" (SERP overlap 7).
- Do NOT split "GPT history" from "ChatGPT history" (overlap 5) — gpt-timeline covers the
  lineage; `/timeline/chatgpt-2022` covers the single event.
- "biggest AI breakthroughs" overlaps the existing `most-important-ai-milestones` hub —
  do not build a competing page; strengthen the existing one if needed.
- Pick one canonical target per year query (editorial vs `/year/[y]` facet).

## Excluded for truthfulness

`openclaw-2025` and `agentic-workforce-2026` are not referenced by any new SEO page until
the site owner confirms they are real events, not speculative dataset entries.
