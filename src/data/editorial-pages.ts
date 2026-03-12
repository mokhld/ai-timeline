import { milestones, type AITimelineMilestone } from "@/data/timeline";

export interface EditorialSectionLink {
  label: string;
  href: string;
}

export interface EditorialSection {
  heading: string;
  body: string[];
  links?: EditorialSectionLink[];
}

export interface EditorialRelatedEntity {
  type: "person" | "organization";
  slug: string;
  label: string;
}

export interface EditorialPage {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: EditorialSection[];
  featuredMilestoneIds: string[];
  relatedTags: string[];
  relatedEntities: EditorialRelatedEntity[];
  canonicalPath: `/history/${string}`;
}

const milestoneIndex = new Map(
  milestones.map((milestone) => [milestone.id, milestone])
);

function compareMilestones(a: AITimelineMilestone, b: AITimelineMilestone) {
  return (
    a.year - b.year ||
    (a.month ?? 0) - (b.month ?? 0) ||
    (a.day ?? 0) - (b.day ?? 0) ||
    a.title.localeCompare(b.title)
  );
}

export const editorialPages: EditorialPage[] = [
  {
    slug: "history-of-openai",
    title: "History of OpenAI",
    description:
      "A curated history of OpenAI from its 2015 founding through GPT, ChatGPT, multimodal systems, and reasoning-era products.",
    intro:
      "OpenAI moved from a mission-driven research lab into the defining consumer AI brand of the 2020s. Its history is also the history of how large language models went from an ambitious research program to mainstream infrastructure for work, creativity, and software.",
    sections: [
      {
        heading: "From nonprofit mission to frontier lab",
        body: [
          "OpenAI began in 2015 with an unusually public mission: build AGI that benefits all of humanity. That framing mattered because it positioned the company as both a research lab and a governance experiment, not just another startup chasing product-market fit.",
          "In its first phase, OpenAI built credibility by publishing research, recruiting top talent, and pushing the frontier of scalable language modeling. Those early bets set up the GPT line long before the public understood what large language models could become.",
        ],
        links: [
          { label: "OpenAI organization page", href: "/organization/openai" },
          { label: "Transformer milestone", href: "/timeline/transformer-2017" },
        ],
      },
      {
        heading: "The GPT sequence changed the tempo of AI",
        body: [
          "GPT-1, GPT-2, and GPT-3 were not just model upgrades. Together they established a new pattern for the industry: pre-train at scale, observe emergent capability, then turn research progress into APIs, developer ecosystems, and eventually consumer products.",
          "Each release widened the gap between what AI had previously been expected to do and what it could suddenly do in practice. GPT-2 introduced safety controversy, GPT-3 popularized API-native AI businesses, and ChatGPT made the interface legible to the world.",
        ],
        links: [
          { label: "History of AI Agents", href: "/history/history-of-ai-agents" },
          { label: "OpenAI tag archive", href: "/tag/openai" },
        ],
      },
      {
        heading: "From chatbot breakout to multimodal and reasoning systems",
        body: [
          "After ChatGPT, OpenAI became a company that had to operate simultaneously as a research organization, consumer platform, and infrastructure provider. GPT-4 raised the ceiling on reliability and reasoning, while GPT-4o and Sora broadened the frontier into voice, vision, and video.",
          "The later reasoning releases showed a second strategic shift: progress would not come only from larger base models, but also from systems that spend more compute thinking through harder tasks. That matters because it points toward agentic workflows, not just better chatbots.",
        ],
        links: [
          {
            label: "Most important AI milestones",
            href: "/history/most-important-ai-milestones",
          },
          { label: "Browse reasoning milestones", href: "/tag/reasoning" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "openai-founded-2015",
      "gpt-1-2018",
      "gpt-2-2019",
      "gpt-3-2020",
      "dalle-2021",
      "chatgpt-2022",
      "gpt-4-2023",
      "sora-2024",
      "o1-reasoning-2024",
      "openai-o3-2025",
    ],
    relatedTags: ["openai", "gpt", "multimodal", "reasoning"],
    relatedEntities: [
      { type: "organization", slug: "openai", label: "OpenAI" },
      { type: "person", slug: "sam-altman", label: "Sam Altman" },
      { type: "person", slug: "ilya-sutskever", label: "Ilya Sutskever" },
      { type: "person", slug: "greg-brockman", label: "Greg Brockman" },
    ],
    canonicalPath: "/history/history-of-openai",
  },
  {
    slug: "history-of-ai-agents",
    title: "History of AI Agents",
    description:
      "A narrative timeline of how AI agents evolved from theoretical ideas and brittle demos into real tool-using systems.",
    intro:
      "AI agents did not appear overnight in 2025. They emerged from decades of work on reasoning, planning, reinforcement learning, interfaces, and increasingly capable language models. The modern agent is really a stack of earlier ideas finally becoming usable at the same time.",
    sections: [
      {
        heading: "The idea came first",
        body: [
          "Long before anyone talked about agentic workflows, researchers were already asking what it would mean for machines to perceive, decide, and act. The Turing Test framed intelligence as behavior, ELIZA showed how quickly humans project agency onto software, and Shakey made the concept of a goal-directed robot concrete.",
          "These systems were narrow and fragile, but they introduced the core questions that still define agent design today: what world model does the system have, how does it choose actions, and how much autonomy should it be trusted with?",
        ],
        links: [
          { label: "Turing milestone", href: "/timeline/turing-test-1950" },
          { label: "Alan Turing", href: "/person/alan-turing" },
        ],
      },
      {
        heading: "Learning systems made autonomy practical",
        body: [
          "The next step was not conversational polish but decision-making competence. Reinforcement learning, Atari agents, AlphaGo, and AlphaStar proved that AI could operate over long horizons, learn strategies from feedback, and outperform humans in complex environments.",
          "Those milestones mattered because they made AI feel less like static pattern matching and more like an actor navigating state, uncertainty, and trade-offs. They were proto-agent systems even when they were not yet useful for everyday work.",
        ],
        links: [
          { label: "Browse agent-related tags", href: "/tag/agents" },
          { label: "Demis Hassabis", href: "/person/demis-hassabis" },
        ],
      },
      {
        heading: "LLMs turned agents into products",
        body: [
          "ChatGPT and GPT-4 made it normal to delegate open-ended cognitive work to AI. GPT-4o added fast multimodal interaction, and the 2025 agent wave made the leap from answering questions to using tools, browsing, writing code, and completing multi-step tasks.",
          "That transition is why the agent story is bigger than one product category. It changes the role of software from something you operate directly to something you increasingly supervise, evaluate, and redirect.",
        ],
        links: [
          { label: "Anthropic organization page", href: "/organization/anthropic" },
          { label: "OpenAI organization page", href: "/organization/openai" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "turing-test-1950",
      "eliza-1966",
      "shakey-1969",
      "reinforcement-learning-1992",
      "deepmind-atari-2013",
      "alphago-2016",
      "chatgpt-2022",
      "gpt-4-2023",
      "gpt-4o-2024",
      "ai-agents-2025",
      "ai-coding-agents-2025",
      "agentic-workforce-2026",
    ],
    relatedTags: ["agents", "autonomy", "tools", "reasoning"],
    relatedEntities: [
      { type: "person", slug: "alan-turing", label: "Alan Turing" },
      { type: "person", slug: "demis-hassabis", label: "Demis Hassabis" },
      { type: "organization", slug: "anthropic", label: "Anthropic" },
      { type: "organization", slug: "openai", label: "OpenAI" },
    ],
    canonicalPath: "/history/history-of-ai-agents",
  },
  {
    slug: "most-important-ai-milestones",
    title: "Most Important AI Milestones",
    description:
      "A curated shortlist of the AI milestones that most changed the direction, pace, or public meaning of the field.",
    intro:
      "Not every milestone matters in the same way. Some changed the technical direction of the field, some reoriented public expectations, and some proved that a previously speculative future had already arrived. This page focuses on the moments that genuinely bent the curve of AI history.",
    sections: [
      {
        heading: "Foundations that still define the field",
        body: [
          "AI history starts with a small set of ideas that never really disappeared. Turing framed machine intelligence as observable behavior, Dartmouth turned a loose set of questions into a named discipline, and early neural-network work established the lineage that modern deep learning still follows.",
          "These milestones remain important because nearly every later breakthrough can be read as a stronger answer to the same early questions: can machines reason, learn, generalize, and interact with the world in useful ways?",
        ],
        links: [
          { label: "Browse the earliest era", href: "/era/origins" },
          { label: "Research breakthroughs", href: "/category/research" },
        ],
      },
      {
        heading: "The modern acceleration points",
        body: [
          "AlexNet, the Transformer, and ChatGPT are the clearest acceleration points in modern AI history. AlexNet proved deep learning could dominate at scale, the Transformer created the architecture stack behind today’s frontier systems, and ChatGPT changed adoption from expert awareness to public ubiquity.",
          "If you want the shortest explanation for why AI feels different now than it did a decade ago, this is the sequence to study. It captures the move from promising research to mass-use software.",
        ],
        links: [
          { label: "History of OpenAI", href: "/history/history-of-openai" },
          { label: "Browse the transformer era", href: "/era/transformer" },
        ],
      },
      {
        heading: "Why the current moment feels different",
        body: [
          "The latest milestones are important not only because models are stronger, but because the surrounding product patterns are changing. GPT-4 normalized high-stakes reasoning, and the rise of AI agents shifted attention toward systems that can plan, use tools, and execute work across steps.",
          "That is why today’s milestones feel less like isolated demos and more like infrastructure for a new computing model. The field is no longer just producing better outputs; it is producing systems that increasingly participate in workflows.",
        ],
        links: [
          { label: "History of AI Agents", href: "/history/history-of-ai-agents" },
          { label: "Agent milestones", href: "/tag/agents" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "turing-test-1950",
      "dartmouth-conference-1956",
      "backprop-rediscovery-1986",
      "alexnet-2012",
      "alphago-2016",
      "transformer-2017",
      "chatgpt-2022",
      "gpt-4-2023",
      "ai-agents-2025",
    ],
    relatedTags: ["foundations", "transformer", "mainstream", "agents"],
    relatedEntities: [
      { type: "person", slug: "alan-turing", label: "Alan Turing" },
      { type: "person", slug: "geoffrey-hinton", label: "Geoffrey Hinton" },
      { type: "organization", slug: "openai", label: "OpenAI" },
      { type: "organization", slug: "deepmind", label: "DeepMind" },
    ],
    canonicalPath: "/history/most-important-ai-milestones",
  },
];

const editorialPagesBySlug = Object.fromEntries(
  editorialPages.map((page) => [page.slug, page])
) satisfies Record<string, EditorialPage>;

export function getAllEditorialPages() {
  return editorialPages;
}

export function getEditorialPageBySlug(slug: string) {
  return editorialPagesBySlug[slug];
}

export function getEditorialPageMilestones(page: EditorialPage) {
  return page.featuredMilestoneIds
    .map((milestoneId) => milestoneIndex.get(milestoneId))
    .filter((milestone): milestone is AITimelineMilestone => Boolean(milestone))
    .sort(compareMilestones);
}
