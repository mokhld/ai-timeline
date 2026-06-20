# AI Timeline — keyword research (master doc)

Prepared: 2026-06-20. Single ranked source compiled from three research passes:
informational (`research/informational-keywords.md`), high-intent list/comparison
(`research/highintent-keywords.md`), and SERP-overlap clustering
(`research/cluster-analysis.md`). The per-pass files hold the long tables and the
full SERP overlap matrix.

## Read this first

- **All search volumes are reasoned estimates.** No keyword-volume API is connected
  (no DataForSEO / Ahrefs / GSC). Demand is expressed as relative tiers
  (High / Medium / Low) inferred from autocomplete, "People also ask", related
  searches, and who currently ranks. Connect a volume source before treating any
  number as real.
- **This is a reference site, not a business.** `aitimeline.world` sells nothing:
  no products, pricing, checkout, service area, or location. Commercial and local
  search intent are not applicable and are deliberately not targeted. Chasing them
  would only create intent mismatch. Every keyword below is informational, list,
  comparison, definitional, or resource intent.
- **Every target is grounded in existing content.** Keywords map only to milestones,
  people, organizations, eras, categories, and tags that already exist in
  `src/data/timeline.ts` (81 milestones). No keyword assumes content the site does
  not have.
- **Head terms are a long game.** "history of artificial intelligence" and "AI
  timeline" are owned by Wikipedia, Britannica, IBM, Coursera, and TechTarget. The
  winnable surface is the mid-tail: specific milestones, people, labs, eras, model
  lineages, and the AI-winter / neural-network / LLM / generative sub-histories.

## Top 20 priority keywords

Ranked by demand estimate × winnability × content readiness.

| # | Keyword | Intent | Demand (est.) | Difficulty | Target page |
|---|---------|--------|---------------|------------|-------------|
| 1 | most important AI milestones | list | High | Med | `/history/most-important-ai-milestones` (exists) |
| 2 | history of artificial intelligence | informational | High | High | NEW `/history/history-of-artificial-intelligence` + home |
| 3 | history of AI agents / agentic AI | informational | High | Med | `/history/history-of-ai-agents` (exists) + `/era/agentic` |
| 4 | history of OpenAI | informational | High | Med | `/history/history-of-openai` (exists) |
| 5 | when was ChatGPT released | informational | High | Low | `/timeline/chatgpt-2022` |
| 6 | what is the Turing test | informational | High | Med | `/timeline/turing-test-1950` |
| 7 | history of large language models | informational | High | Med | NEW `/history/history-of-large-language-models` |
| 8 | history of neural networks / deep learning history | informational | High | Med | NEW `/history/history-of-neural-networks` |
| 9 | who invented AI / father of AI | definitional | High | Med | NEW `/history/who-invented-ai` |
| 10 | AI winter / what caused the AI winter | informational | Med | Low | NEW `/history/history-of-ai-winters` |
| 11 | generative AI history | informational | Med | Med | NEW `/history/history-of-generative-ai` |
| 12 | attention is all you need explained | informational | Med | Low | `/timeline/transformer-2017` |
| 13 | AlphaGo explained | informational | Med | Low | `/timeline/alphago-2016` |
| 14 | history of GPT models / GPT timeline | list | Med | Med | NEW `/history/gpt-timeline` |
| 15 | AlexNet significance | informational | Med | Low | `/timeline/alexnet-2012` |
| 16 | Dartmouth Conference 1956 | informational | Med | Low | `/timeline/dartmouth-conference-1956` |
| 17 | GPT-3 explained / history | informational | Med | Low | `/timeline/gpt-3-2020` |
| 18 | history of DeepMind | informational | Med | Med | NEW `/history/history-of-deepmind` |
| 19 | Geoffrey Hinton contributions to AI | informational | Med | Low | `/person/geoffrey-hinton` |
| 20 | AlphaFold protein folding explained | informational | Med | Low | `/timeline/alphafold-2-2020` |

## Full keyword set by intent → page type

### Informational head/mid-tail → editorial pillars + era pages
history of artificial intelligence · AI timeline · evolution of AI · how did AI start ·
when did AI become popular · history of large language models · history of neural
networks · deep learning history · history of machine learning · history of computer
vision · history of reinforcement learning · history of NLP · history of chatbots ·
generative AI history · history of AI image generation · transformer architecture
history · AI winter · first AI winter · second AI winter · expert systems history ·
the transformer era · agentic AI

### Definitional / "who/what" → pillars + milestone/person pages
who invented AI · father of artificial intelligence · who created ChatGPT · what is the
Turing test · what is a neural network (history framing) · what was the first AI
program · what was the first chatbot · when was AI invented · is AI a new technology

### Model / event long-tail → milestone pages (`/timeline/[id]`)
when was ChatGPT released · GPT-3 explained · GPT-4 explained · attention is all you
need explained · AlexNet significance · AlphaGo vs Lee Sedol · AlphaFold explained ·
Deep Blue vs Kasparov · ELIZA first chatbot · Dartmouth Conference · the perceptron ·
BERT explained · DALL-E history · Stable Diffusion history · GANs explained ·
Watson Jeopardy

### People → person pages (`/person/[slug]`)
Alan Turing AI · John McCarthy AI founder · Marvin Minsky · Geoffrey Hinton
contributions to AI · Yann LeCun · Demis Hassabis · Ilya Sutskever · Frank Rosenblatt ·
Fei-Fei Li · Warren McCulloch
(Note: Yoshua Bengio is not in the dataset — do not create a target for him.)

### Organizations → org pages (`/organization/[slug]`) + pillars
history of OpenAI · history of DeepMind · history of Anthropic · Google AI history ·
Meta AI history · IBM AI history
(Note: "DeepMind" and "Google DeepMind" derive as two separate entity slugs — pick the
canonical one when wiring links.)

### List / comparison / resource → editorial pages
most important AI milestones · biggest AI breakthroughs · AI milestones 2023 / 2024 /
2025 · AI by decade · GPT models timeline · GPT-3 vs GPT-4 · AlphaGo vs AlphaZero ·
OpenAI vs DeepMind · open-source AI models history · AI timeline PDF / printable

## Not applicable (documented, not targeted)

Commercial, transactional, and local intent: no products, no "buy/pricing/near me/best
[tool]" queries. Targeting them would mismatch the reference content and raise bounce.

## Content gaps → mapped to the build plan

The clustering pass validated (by SERP overlap) which gaps deserve their own pillar
versus folding into an existing page. The resulting build set, with the real milestone
IDs each new page features, is in `content-plan.md`.

Two dataset entries (`openclaw-2025`, `agentic-workforce-2026`) could not be verified as
real-world events in research. They are excluded from all keyword targeting until
confirmed by the site owner.
