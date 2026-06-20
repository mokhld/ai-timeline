# High-intent keyword research — aitimeline.world

Scope: list / comparison / definitional / resource keywords for a free, independent
reference site on the history of artificial intelligence (1943-2026). Built from the
ground-truth dataset: 81 milestones, 86 people, 57 organizations, 11 eras, 7 categories
(see `milestones-manifest.json` and `src/data/timeline.ts`).

## All demand figures are reasoned estimates

There is no volume API behind this file. Every "demand" value is a RELATIVE estimate
(High / Med / Low) reasoned from autocomplete patterns, "People also ask", related
searches, and what currently ranks (Wikipedia, Britannica, vendor blogs, Medium,
Substack, university LibGuides). Treat tiers as ordering, not absolute numbers.
"Winnable?" is judged for a focused, well-linked reference page on an established
independent site, against the realistic competition for each query.

## Commercial, transactional, and local intent are N/A here

This site sells nothing: no products, no services, no pricing, no checkout, no quotes,
no service area, no physical location. So the classic high-value SEO buckets do not
apply and I have NOT invented keywords the site cannot honestly serve:

- Commercial / transactional ("buy", "price", "discount", "free trial", "best AI tool
  to buy", "AI software pricing"): N/A. The site has nothing to transact. Targeting
  these would create intent mismatch, high bounce, and zero conversion because there is
  no conversion to make.
- Local / geographic ("AI company near me", "AI consultant [city]", "[city] AI agency"):
  N/A. No location, no service area, no map-pack eligibility.
- Lead-gen / B2B service intent ("hire AI developer", "AI consulting"): N/A. Not a
  service business.

The closest honest analogs to high-intent queries, and what this research targets:
list / roundup intent, comparison / disambiguation intent, high-CTR definitional head
terms, and resource / citation intent (students, educators, journalists who need a
reference to read, cite, or link). Every keyword below maps to a page the site can
honestly serve from existing data.

## Page types referenced

- `timeline/[slug]` — single milestone page (exists for all 81 milestones)
- `era/[eraId]` — era page (11 exist)
- `organization/[slug]`, `person/[slug]` — entity pages
- `category/[category]`, `tag/[tag]`, `year/[year]` — facet pages
- `history/[slug]` — editorial pillar/landing page (3 exist: history-of-openai,
  history-of-ai-agents, most-important-ai-milestones). NEW pages proposed below use
  this type.

---

## Ranked keyword table (~55)

Ranked by a blend of demand and winnability (best opportunities first).

| # | Keyword | Intent | Demand (est.) | Difficulty | Winnable? | Page type | Target page / slug |
|---|---------|--------|---------------|------------|-----------|-----------|--------------------|
| 1 | history of AI timeline | list | High | High | Yes (mid-tail) | pillar | `/history/most-important-ai-milestones` (+ `/timeline`) |
| 2 | most important AI milestones | list | High | Med | Yes | pillar | `/history/most-important-ai-milestones` |
| 3 | biggest AI breakthroughs | list | High | Med | Yes | pillar (new) | `/history/biggest-ai-breakthroughs` |
| 4 | AI timeline | list/definitional | High | High | Partial | pillar | `/timeline` + `/history/most-important-ai-milestones` |
| 5 | who invented artificial intelligence | definitional | High | High | Yes | pillar (new) | `/history/who-invented-ai` |
| 6 | father of AI | definitional | High | Med | Yes | pillar (new) | `/history/who-invented-ai` |
| 7 | GPT-3 vs GPT-4 | comparison | High | Med | Yes | comparison (new) | `/history/gpt-3-vs-gpt-4` |
| 8 | history of ChatGPT | list/definitional | High | Med | Yes | milestone/pillar | `/timeline/chatgpt-2022` |
| 9 | AI breakthroughs 2024 | list | High | Med | Yes | year/pillar (new) | `/history/ai-milestones-2024` |
| 10 | AI breakthroughs 2025 | list | High | Med | Yes | year/pillar (new) | `/history/ai-milestones-2025` |
| 11 | history of OpenAI | list | Med | Med | Yes (live) | pillar | `/history/history-of-openai` |
| 12 | when was AI invented | definitional | High | Med | Yes | pillar (new) | `/history/who-invented-ai` |
| 13 | AlphaGo vs AlphaZero | comparison | Med | Low | Yes | comparison (new) | `/history/alphago-vs-alphazero` |
| 14 | AI winter explained | definitional | Med | Low | Yes | era | `/era/first-winter` + `/era/second-winter` |
| 15 | Dartmouth conference AI | definitional | Med | Low | Yes | milestone | `/timeline/dartmouth-conference-1956` |
| 16 | history of AI agents | list/definitional | Med | Med | Yes (live) | pillar | `/history/history-of-ai-agents` |
| 17 | Deep Blue vs Kasparov | comparison/definitional | Med | Low | Yes | milestone | `/timeline/deep-blue-1997` |
| 18 | OpenAI vs DeepMind | comparison | Med | Med | Yes | comparison (new) | `/history/openai-vs-deepmind` |
| 19 | Turing test explained | definitional | High | High | Partial | milestone | `/timeline/turing-test-1950` |
| 20 | transformer architecture history | definitional | Med | Med | Yes | milestone | `/timeline/transformer-2017` |
| 21 | AlexNet 2012 significance | definitional | Med | Low | Yes | milestone | `/timeline/alexnet-2012` |
| 22 | AI timeline PDF | resource | Med | Low | Yes | resource page (new) | `/history/ai-timeline-pdf` |
| 23 | history of AI for students | resource | Med | Low | Yes | pillar | `/history/most-important-ai-milestones` |
| 24 | GPT models timeline | list | Med | Med | Yes | pillar (new) | `/history/gpt-timeline` |
| 25 | evolution of GPT | list | Med | Med | Yes | pillar (new) | `/history/gpt-timeline` |
| 26 | Claude vs GPT-4 | comparison | Med | High | Partial | comparison (new) | `/history/claude-vs-gpt` |
| 27 | first AI program ever | definitional | Med | Low | Yes | milestone | `/timeline/logic-theorist-1956` |
| 28 | first chatbot ELIZA | definitional | Med | Low | Yes | milestone | `/timeline/eliza-1966` |
| 29 | AlphaFold protein folding explained | definitional | Med | Med | Yes | milestone | `/timeline/alphafold-2-2020` |
| 30 | history of neural networks | list | Med | High | Partial | tag/pillar (new) | `/tag/neural-networks` |
| 31 | history of deep learning | list | Med | High | Partial | era | `/era/deep-learning` + `/era/breakthrough` |
| 32 | AI milestones 2023 | list | Med | Med | Yes | pillar (new) | `/history/ai-milestones-2023` |
| 33 | GANs explained history | definitional | Med | Low | Yes | milestone | `/timeline/gans-2014` |
| 34 | BERT vs GPT | comparison | Med | Med | Yes | comparison (new) | `/history/bert-vs-gpt` |
| 35 | who created ChatGPT | definitional | High | Med | Yes | milestone | `/timeline/chatgpt-2022` |
| 36 | AI history decade by decade | list | Low | Low | Yes | pillar (new) | `/history/ai-by-decade` |
| 37 | expert systems history | definitional | Low | Low | Yes | era | `/era/expert-systems` |
| 38 | Perceptron history Rosenblatt | definitional | Low | Low | Yes | milestone | `/timeline/perceptron-1957` |
| 39 | backpropagation history | definitional | Low | Med | Yes | milestone | `/timeline/backprop-rediscovery-1986` |
| 40 | Geoffrey Hinton contributions | definitional | Med | Med | Yes | person | `/person/geoffrey-hinton` |
| 41 | DeepMind history | list | Med | Med | Yes | organization | `/organization/deepmind` |
| 42 | Anthropic history | list | Med | Med | Yes | organization | `/organization/anthropic` |
| 43 | open source vs closed AI models | comparison | Med | Med | Partial | category/pillar (new) | `/history/open-vs-closed-ai` |
| 44 | Llama vs GPT | comparison | Med | Med | Partial | comparison (new) | `/history/llama-vs-gpt` |
| 45 | AlphaGo Lee Sedol match | definitional | Med | Low | Yes | milestone | `/timeline/alphago-2016` |
| 46 | reasoning models o1 o3 explained | definitional | Med | Med | Yes | milestone | `/timeline/o1-reasoning-2024` |
| 47 | rise of AI agents 2025 | list/definitional | Med | Med | Yes (live) | pillar | `/history/history-of-ai-agents` |
| 48 | DALL-E vs Stable Diffusion vs Midjourney | comparison | Med | Med | Yes | comparison (new) | `/history/image-generation-models` |
| 49 | best AI moments of all time | list | Low | Low | Yes | pillar | `/history/most-important-ai-milestones` |
| 50 | history of generative AI | list | Med | Med | Yes | era | `/era/generative` |
| 51 | what is the Turing test in simple terms | definitional | Med | High | Partial | milestone | `/timeline/turing-test-1950` |
| 52 | AI nobel prize 2024 | definitional | Med | Low | Yes | milestone | `/timeline/nobel-prizes-ai-2024` |
| 53 | EU AI Act summary | definitional | Med | High | Partial | milestone | `/timeline/eu-ai-act-2024` |
| 54 | history of self-driving cars AI | list | Med | Med | Yes | milestone/tag | `/timeline/darpa-grand-challenge-2004` |
| 55 | DeepSeek R1 explained | definitional | Med | Med | Yes | milestone | `/timeline/deepseek-r1-2025` |

---

## Top 15

Best blend of estimated demand and winnability for a focused reference page.

1. most important AI milestones — list — pillar exists, strengthen `/history/most-important-ai-milestones`.
2. biggest AI breakthroughs — list — new pillar `/history/biggest-ai-breakthroughs`.
3. who invented artificial intelligence / father of AI — definitional — new pillar `/history/who-invented-ai`.
4. GPT-3 vs GPT-4 — comparison — new comparison `/history/gpt-3-vs-gpt-4`.
5. AI breakthroughs 2024 — list — new `/history/ai-milestones-2024` (or `/year/2024`).
6. AI breakthroughs 2025 — list — new `/history/ai-milestones-2025`.
7. history of ChatGPT / who created ChatGPT — definitional — `/timeline/chatgpt-2022`.
8. AlphaGo vs AlphaZero — comparison — new `/history/alphago-vs-alphazero` (low difficulty, clear winner).
9. AI winter explained — definitional — `/era/first-winter` and `/era/second-winter`.
10. Dartmouth conference AI — definitional — `/timeline/dartmouth-conference-1956`.
11. OpenAI vs DeepMind — comparison — new `/history/openai-vs-deepmind`.
12. GPT models timeline / evolution of GPT — list — new `/history/gpt-timeline`.
13. AI timeline PDF — resource — new `/history/ai-timeline-pdf` (download/cite landing).
14. transformer architecture history — definitional — `/timeline/transformer-2017`.
15. history of OpenAI — list — pillar exists, `/history/history-of-openai`.

Why these and not the head terms: "AI timeline", "Turing test explained", and "history
of artificial intelligence" are higher demand but Wikipedia and Britannica own them.
The list above targets mid-tail and comparison queries where vendor blogs, Medium, and
Substack currently rank and a structured, well-linked reference can realistically beat
them.

---

## Proposed list / comparison / resource pages

All slugs use the existing `history/[slug]` editorial pillar route. Milestone IDs are
real IDs from `milestones-manifest.json`. These extend the existing `editorialPages`
array in `src/data/editorial-pages.ts` (same schema: slug, title, featuredMilestoneIds,
relatedTags, relatedEntities).

### List / roundup pages

1. Biggest AI breakthroughs
   - slug: `biggest-ai-breakthroughs`
   - title: "The Biggest AI Breakthroughs in History"
   - target keyword: biggest AI breakthroughs / top AI breakthroughs
   - milestone IDs (impact-5 set): `dartmouth-conference-1956`, `turing-test-1950`,
     `backprop-rediscovery-1986`, `deep-belief-networks-2006`, `deep-blue-1997`,
     `alexnet-2012`, `alphago-2016`, `transformer-2017`, `gpt-3-2020`,
     `alphafold-2-2020`, `chatgpt-2022`, `gpt-4-2023`, `ai-agents-2025`,
     `agentic-workforce-2026`

2. GPT models timeline / evolution of GPT
   - slug: `gpt-timeline`
   - title: "The Evolution of GPT: GPT-1 to GPT-5"
   - target keyword: GPT models timeline / evolution of GPT
   - milestone IDs: `gpt-1-2018`, `gpt-2-2019`, `gpt-3-2020`, `chatgpt-2022`,
     `gpt-4-2023`, `gpt-4o-2024`, `o1-reasoning-2024`, `openai-o3-2025`

3. AI milestones of 2023
   - slug: `ai-milestones-2023`
   - title: "AI Milestones of 2023: The Year Generative AI Exploded"
   - target keyword: AI breakthroughs 2023 / biggest AI moments 2023
   - milestone IDs: `gpt-4-2023`, `claude-2023`, `llama-2-2023`, `midjourney-v5-2023`,
     `mixtral-2023`, `gemini-2023`

4. AI milestones of 2024
   - slug: `ai-milestones-2024`
   - title: "AI Milestones of 2024: Reasoning, Video, and Nobel Prizes"
   - target keyword: AI breakthroughs 2024 / biggest AI moments 2024
   - milestone IDs: `sora-2024`, `claude-3-2024`, `gpt-4o-2024`, `gemini-1-5-pro-2024`,
     `llama-3-2024`, `o1-reasoning-2024`, `eu-ai-act-2024`, `nobel-prizes-ai-2024`

5. AI milestones of 2025
   - slug: `ai-milestones-2025`
   - title: "AI Milestones of 2025: The Agentic Year"
   - target keyword: AI breakthroughs 2025 / biggest AI moments 2025
   - milestone IDs: `deepseek-r1-2025`, `claude-3-5-sonnet-2025`, `ai-agents-2025`,
     `claude-4-2025`, `openai-o3-2025`, `gemini-2-2025`, `ai-coding-agents-2025`,
     `openclaw-2025`

6. AI history decade by decade
   - slug: `ai-by-decade`
   - title: "The History of AI, Decade by Decade"
   - target keyword: AI history decade by decade / AI history timeline
   - milestone IDs (one anchor per decade): `mcculloch-pitts-1943`,
     `dartmouth-conference-1956`, `lighthill-report-1973`,
     `backprop-rediscovery-1986`, `deep-blue-1997`, `imagenet-2009`, `alexnet-2012`,
     `transformer-2017`, `chatgpt-2022`, `ai-agents-2025`

### Comparison / disambiguation pages

7. GPT-3 vs GPT-4
   - slug: `gpt-3-vs-gpt-4`
   - title: "GPT-3 vs GPT-4: What Changed"
   - target keyword: GPT-3 vs GPT-4
   - milestone IDs: `gpt-3-2020`, `gpt-4-2023` (context: `gpt-4o-2024`)

8. AlphaGo vs AlphaZero
   - slug: `alphago-vs-alphazero`
   - title: "AlphaGo vs AlphaGo Zero vs AlphaZero"
   - target keyword: AlphaGo vs AlphaZero
   - milestone IDs: `alphago-2016`, `alphago-zero-2017` (context: `deepmind-atari-2013`,
     `alphastar-2019`)

9. OpenAI vs DeepMind
   - slug: `openai-vs-deepmind`
   - title: "OpenAI vs DeepMind: Two Paths to AGI"
   - target keyword: OpenAI vs DeepMind
   - milestone IDs: `openai-founded-2015`, `deepmind-atari-2013`, `alphago-2016`,
     `alphafold-2-2020`, `gpt-3-2020`, `chatgpt-2022`, `gemini-2023`
   - related entities: org `openai`, org `deepmind`

10. Claude vs GPT
    - slug: `claude-vs-gpt`
    - title: "Claude vs GPT: Anthropic and OpenAI Compared"
    - target keyword: Claude vs GPT-4 / Claude vs ChatGPT
    - milestone IDs: `claude-2023`, `gpt-4-2023`, `claude-3-2024`, `gpt-4o-2024`,
      `claude-4-2025`, `openai-o3-2025`
    - related entities: org `anthropic`, org `openai`

11. BERT vs GPT
    - slug: `bert-vs-gpt`
    - title: "BERT vs GPT: Two Transformer Families"
    - target keyword: BERT vs GPT
    - milestone IDs: `transformer-2017`, `bert-2018`, `gpt-1-2018`, `gpt-2-2019`

12. Llama vs GPT (open vs closed)
    - slug: `llama-vs-gpt`
    - title: "Llama vs GPT: Open Weights vs Closed Frontier"
    - target keyword: Llama vs GPT / open vs closed AI models
    - milestone IDs: `llama-2-2023`, `llama-3-2024`, `gpt-4-2023`, `gpt-4o-2024`,
      `mixtral-2023`, `deepseek-r1-2025`

13. AI image generation models compared
    - slug: `image-generation-models`
    - title: "DALL-E vs Stable Diffusion vs Midjourney"
    - target keyword: DALL-E vs Stable Diffusion vs Midjourney
    - milestone IDs: `gans-2014`, `dalle-2021`, `stable-diffusion-2022`,
      `midjourney-v5-2023`, `sora-2024`

### Definitional / "who/what" pages

14. Who invented AI
    - slug: `who-invented-ai`
    - title: "Who Invented Artificial Intelligence?"
    - target keyword: who invented AI / father of AI / when was AI invented
    - milestone IDs: `mcculloch-pitts-1943`, `turing-test-1950`,
      `dartmouth-conference-1956`, `logic-theorist-1956`, `perceptron-1957`,
      `lisp-1958`
    - related entities: person `alan-turing`, person `john-mccarthy`,
      person `marvin-minsky` (verify slugs against `/people`)

### Resource / citation pages

15. AI timeline PDF / printable reference
    - slug: `ai-timeline-pdf`
    - title: "AI Timeline (Printable / Citable Reference)"
    - target keyword: AI timeline PDF / AI history cheat sheet
    - content: a download/print-friendly and cite-able rendering of the impact-4-and-5
      milestone set, with a clear "how to cite this page" block for students,
      educators, and journalists. Reuses the same milestone IDs as
      `biggest-ai-breakthroughs` plus key era anchors. This is the honest analog to
      "get the resource" / lead-magnet intent for a reference site.

### Notes for implementation

- Verify person slugs (`john-mccarthy`, `marvin-minsky`) against `/people` before
  wiring `relatedEntities`; only `sam-altman`, `ilya-sutskever`, `greg-brockman`,
  `alan-turing`, `demis-hassabis`, `geoffrey-hinton` are confirmed used in existing
  pillar pages.
- The year-roundup pages (`ai-milestones-2023/2024/2025`) overlap with the existing
  `/year/[year]` facet route. Decide one canonical target per year to avoid
  cannibalization: a curated editorial pillar will read better and link better than
  the raw facet page, so point internal links and the title tag at the pillar and keep
  `/year/[year]` as a thin facet.
- Every proposed page is grounded in milestones that already exist in the dataset. No
  page requires content the site cannot honestly serve.
