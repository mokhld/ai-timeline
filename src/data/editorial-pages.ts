import { milestones, type AITimelineMilestone } from "@/data/timeline";
import type { FaqItem } from "@/lib/faq";

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
  // Hand-written, dataset-grounded Q&A. Rendered as visible <details> and emitted
  // as FAQPage JSON-LD for AI/answer-engine citation (Google retired FAQ rich
  // results in May 2026, so the value here is citability and on-page UX).
  faqs?: FaqItem[];
  // Slugs of sibling editorial guides to cross-link, wiring the hub-and-spoke
  // architecture (super-pillar links to all hubs; siblings cross-link by topic).
  relatedGuideSlugs?: string[];
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
    relatedGuideSlugs: [
      "history-of-artificial-intelligence",
      "gpt-timeline",
      "history-of-large-language-models",
      "history-of-ai-agents",
    ],
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
    relatedGuideSlugs: [
      "history-of-artificial-intelligence",
      "history-of-large-language-models",
      "history-of-deepmind",
      "most-important-ai-milestones",
    ],
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
    relatedGuideSlugs: [
      "history-of-artificial-intelligence",
      "history-of-neural-networks",
      "history-of-large-language-models",
      "history-of-ai-winters",
    ],
  },
  {
    slug: "history-of-artificial-intelligence",
    title: "History of Artificial Intelligence",
    description:
      "The history of artificial intelligence, from 1943 neural theory through the Dartmouth Conference, AI winters, deep learning, and the LLM and agent eras.",
    intro:
      "The history of artificial intelligence runs from a 1943 mathematical model of a neuron to systems that now write code and complete multi-step work. It is a story of a few durable ideas, two long winters of disappointment, and a deep learning revival that turned research into mainstream software. This page is the overview that ties the whole arc together and links out to every guide on the site.",
    sections: [
      {
        heading: "Theoretical foundations, 1943 to 1955",
        body: [
          "AI had a theory before it had a name. In 1943 Warren McCulloch and Walter Pitts published 'A Logical Calculus of Ideas Immanent in Nervous Activity,' the first mathematical model of an artificial neuron. They showed that simple binary neurons wired into networks could, in principle, compute any function a Turing machine could compute. Every modern neural network traces its conceptual lineage to that paper. In 1950 Alan Turing reframed the central question in 'Computing Machinery and Intelligence,' arguing that 'Can machines think?' was the wrong thing to ask. What mattered was whether a machine could convincingly imitate human conversation, an idea now known as the Turing Test.",
          "These two contributions set the two poles that the field still works between: a bottom-up account of intelligence as something networks of simple units learn, and a behavioral test that judges intelligence by what a system does rather than how it is built. Neither author had the computing power to test their ideas at scale, so for more than a decade the work stayed mostly on paper. That gap between a clear idea and the hardware to run it is a pattern that recurs throughout the history of artificial intelligence.",
        ],
        links: [
          { label: "First mathematical model of neural networks (1943)", href: "/timeline/mcculloch-pitts-1943" },
          { label: "Turing's 1950 paper and the Turing Test", href: "/timeline/turing-test-1950" },
          { label: "Alan Turing", href: "/person/alan-turing" },
        ],
      },
      {
        heading: "The field is born, 1956 and the early optimism",
        body: [
          "Artificial intelligence became a named discipline at a two-month workshop at Dartmouth College in the summer of 1956. John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon organized it, and the proposal stated that 'every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it.' The gathering coined the term 'artificial intelligence' and brought together most of the people who would lead the field for the next two decades. A year later, in 1957, Frank Rosenblatt built the Mark I Perceptron at Cornell, the first hardware implementation of a neural network, able to learn to classify simple visual patterns.",
          "The optimism of this period was real and, in retrospect, overstated. The New York Times reported the Perceptron as an 'Electronic Brain' that the Navy expected would one day walk, talk, see, and be conscious of its existence. The ambition set at Dartmouth drove decades of funded research, but it also created promises the technology could not keep. The overpromise-and-underdeliver cycle that started here would repeat, and it is the direct cause of the funding collapses that followed.",
        ],
        links: [
          { label: "The 1956 Dartmouth Conference", href: "/timeline/dartmouth-conference-1956" },
          { label: "The Perceptron (1957)", href: "/timeline/perceptron-1957" },
          { label: "John McCarthy", href: "/person/john-mccarthy" },
        ],
      },
      {
        heading: "The AI winters and what went wrong",
        body: [
          "The first reversal came from inside the field. In 1969 Marvin Minsky and Seymour Papert published 'Perceptrons,' proving mathematically that a single-layer perceptron could not solve the XOR problem or other tasks that are not linearly separable. The proof was correct but widely overgeneralized: multi-layer networks could solve those problems, yet the book was read as proof that neural networks were fundamentally limited. Funding and researchers moved elsewhere, and neural network research stalled for over a decade. In 1973 the Lighthill Report delivered a broader verdict in the United Kingdom, concluding that 'in no part of the field have the discoveries made so far produced the major impact that was then promised,' which triggered deep funding cuts.",
          "What went wrong was not the underlying ideas but the gap between narrow successes and the general intelligence that had been promised. When a field sells human-level capability and delivers pattern classifiers, a backlash follows. The damage was real: important work, including the backpropagation algorithm, sat largely ignored through the anti-neural-network climate of the 1970s. The lesson that inflated expectations invite funding collapse is the throughline of both AI winters, and it is worth studying on its own.",
        ],
        links: [
          { label: "Perceptrons: the book that stalled neural nets (1969)", href: "/timeline/minsky-papert-perceptrons-1969" },
          { label: "The Lighthill Report (1973)", href: "/timeline/lighthill-report-1973" },
          { label: "History of AI winters", href: "/history/history-of-ai-winters" },
        ],
      },
      {
        heading: "The deep learning revival, 2006 to 2017",
        body: [
          "The recovery began with a training breakthrough. In 1986 David Rumelhart, Geoffrey Hinton, and Ronald Williams published 'Learning Representations by Back-propagating Errors' in Nature, showing that backpropagation could train multi-layer networks effectively and reviving the line of research the 1969 critique had buried. Twenty years later, in 2006, Hinton's work on deep belief networks showed that deep networks could be trained layer by layer, often treated as the starting gun for modern deep learning. The decisive proof arrived in 2012, when AlexNet, built by Alex Krizhevsky, Ilya Sutskever, and Hinton, won the ImageNet competition by a large margin and cut the error rate sharply while training on two consumer GPUs.",
          "AlexNet settled the question of whether deep learning worked at scale, and the field reorganized around it almost overnight. In 2016 DeepMind's AlphaGo beat Lee Sedol four games to one at Go, a game long considered decades away from being solved, and its Move 37 showed the system could be creative rather than merely fast. Earlier, in 1997, IBM's Deep Blue had beaten world chess champion Garry Kasparov, but that was brute-force search rather than learning, a distinction that mattered. The 2006 to 2017 span is where AI moved from promising research to systems that outperformed the best humans in hard domains.",
        ],
        links: [
          { label: "Backpropagation rediscovered (1986)", href: "/timeline/backprop-rediscovery-1986" },
          { label: "AlexNet: the ImageNet moment (2012)", href: "/timeline/alexnet-2012" },
          { label: "History of neural networks", href: "/history/history-of-neural-networks" },
        ],
      },
      {
        heading: "The transformer and the LLM era",
        body: [
          "In June 2017 eight researchers at Google published 'Attention Is All You Need,' introducing the Transformer architecture. It replaced recurrence with self-attention, which let models process whole sequences in parallel and scale far beyond what came before. The Transformer is the architecture behind GPT, BERT, Claude, Gemini, and nearly every frontier system since, which makes it the most consequential AI paper of the 2010s. In 2020 OpenAI released GPT-3 with 175 billion parameters, a hundred times larger than its predecessor, and without fine-tuning it could write essays, code, and poetry from a few examples in the prompt. GPT-3 gave the scaling hypothesis, the idea that bigger models would simply get more capable, real credibility.",
          "The public arrived in November 2022. ChatGPT, built on GPT-3.5 and tuned with reinforcement learning from human feedback, reached one million users in five days and a hundred million in two months, the fastest-growing consumer application on record. GPT-4 followed in March 2023 as a multimodal model that read text and images, passed the bar exam near the 90th percentile, and forced every industry to reckon with what these systems could do. This is the stretch where AI stopped being expert knowledge and became something most people had used.",
        ],
        links: [
          { label: "Attention Is All You Need: the Transformer (2017)", href: "/timeline/transformer-2017" },
          { label: "ChatGPT goes mainstream (2022)", href: "/timeline/chatgpt-2022" },
          { label: "History of large language models", href: "/history/history-of-large-language-models" },
        ],
      },
      {
        heading: "The agentic era and where things stand",
        body: [
          "By 2025 the frontier shifted from better answers to systems that could act. Frontier models were wrapped in software that could browse the web, call tools, edit files, execute code, manage state, and carry multi-step tasks forward with limited supervision. Claude Code, OpenAI's Operator, Google's Project Mariner, and a wave of agent frameworks turned 'AI agent' from a research label into a product category. The change was less about conversation quality and more about systems that observe, plan, and act across real software environments.",
          "That shift raised sharper questions than the chatbot era did: permissions, oversight, reliability, and what happens to knowledge work when software can execute rather than only suggest. Read against the full arc, the agentic era is a stronger answer to the same questions Turing and the Dartmouth founders posed, namely whether machines can reason, learn, and act usefully in the world. The history of artificial intelligence is still being written, and the open problems now are about trust and control as much as raw capability.",
        ],
        links: [
          { label: "GPT-3 and the scaling leap (2020)", href: "/timeline/gpt-3-2020" },
          { label: "The rise of AI agents (2025)", href: "/timeline/ai-agents-2025" },
          { label: "History of AI agents", href: "/history/history-of-ai-agents" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "mcculloch-pitts-1943",
      "turing-test-1950",
      "dartmouth-conference-1956",
      "perceptron-1957",
      "minsky-papert-perceptrons-1969",
      "lighthill-report-1973",
      "backprop-rediscovery-1986",
      "deep-blue-1997",
      "deep-belief-networks-2006",
      "alexnet-2012",
      "alphago-2016",
      "transformer-2017",
      "gpt-3-2020",
      "chatgpt-2022",
      "gpt-4-2023",
      "ai-agents-2025",
    ],
    relatedTags: ["foundations", "history", "milestone", "paradigm-shift", "neural-networks"],
    relatedEntities: [
      { type: "person", slug: "alan-turing", label: "Alan Turing" },
      { type: "person", slug: "john-mccarthy", label: "John McCarthy" },
      { type: "person", slug: "geoffrey-hinton", label: "Geoffrey Hinton" },
      { type: "organization", slug: "openai", label: "OpenAI" },
      { type: "organization", slug: "deepmind", label: "DeepMind" },
    ],
    canonicalPath: "/history/history-of-artificial-intelligence",
    faqs: [
      {
        question: "What is the history of artificial intelligence?",
        answer:
          "The history of artificial intelligence runs from a 1943 mathematical model of a neuron and Alan Turing's 1950 test for machine intelligence, through the 1956 Dartmouth Conference that named the field, two AI winters caused by overpromising, a deep learning revival that peaked with AlexNet in 2012, the 2017 Transformer and the large language model era, and the agent systems of the 2020s.",
      },
      {
        question: "When was AI invented?",
        answer:
          "AI was founded as an academic discipline at the Dartmouth Conference in the summer of 1956, where the term 'artificial intelligence' was coined. The theoretical groundwork came earlier, including the 1943 McCulloch-Pitts model of an artificial neuron and Alan Turing's 1950 paper on machine intelligence.",
      },
      {
        question: "Who invented AI?",
        answer:
          "No single person invented AI. John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon organized the 1956 Dartmouth Conference that named and launched the field. McCarthy coined the term 'artificial intelligence,' while earlier work by Warren McCulloch, Walter Pitts, and Alan Turing laid its theoretical foundations.",
      },
      {
        question: "What are the main eras of AI history?",
        answer:
          "The main eras are the theoretical foundations (1943 to 1955), the birth of the field at Dartmouth (1956) and the early optimism that followed, the AI winters of the 1970s and 1980s, the deep learning revival (2006 to 2017), the Transformer and large language model era starting in 2017, and the agentic era of the 2020s.",
      },
      {
        question: "What caused the AI winters?",
        answer:
          "The AI winters were caused by a gap between inflated promises and actual results. Minsky and Papert's 1969 book 'Perceptrons' was read as proof that neural networks were fundamentally limited, stalling that research for over a decade, and the 1973 Lighthill Report concluded the field had not delivered on its promises, triggering deep funding cuts in the United Kingdom.",
      },
      {
        question: "When did AI become mainstream?",
        answer:
          "AI became mainstream in late 2022 with the release of ChatGPT, which reached one million users in five days and a hundred million in two months, the fastest-growing consumer application on record. GPT-4 in March 2023 extended that reach into professional and multimodal use.",
      },
    ],
    relatedGuideSlugs: [
      "history-of-neural-networks",
      "history-of-large-language-models",
      "history-of-generative-ai",
      "history-of-ai-winters",
      "who-invented-ai",
      "history-of-deepmind",
      "gpt-timeline",
      "history-of-openai",
      "history-of-ai-agents",
      "most-important-ai-milestones",
    ],
  },
  {
    slug: "history-of-neural-networks",
    title: "History of Neural Networks",
    description:
      "A history of neural networks and deep learning, from the 1943 artificial neuron through the perceptron, backpropagation, and the 2012 AlexNet breakthrough.",
    intro:
      "The history of neural networks runs from a 1943 mathematical model of a single neuron to the deep systems that now dominate AI. This page also covers deep learning history, because the two stories are the same lineage: the same core idea of trainable layered networks, abandoned and revived twice before the data, compute, and algorithms finally lined up.",
    sections: [
      {
        heading: "The first mathematical model and the perceptron",
        body: [
          "Neural networks started as a question about logic, not biology. In 1943, Warren McCulloch and Walter Pitts published a model of an artificial neuron and showed that simple binary neurons wired into networks could, in principle, compute any function a Turing machine could. That paper gave the field its conceptual foundation: intelligence might be assembled from large numbers of simple connected units.",
          "In 1957, Frank Rosenblatt turned the idea into hardware with the Mark I Perceptron, the first physical neural network, which learned to classify simple visual patterns. The press treated it as an electronic brain on the verge of consciousness. That gap between a working classifier and the claims made for it set a pattern the field would repeat: overpromise, underdeliver, retreat.",
        ],
        links: [
          { label: "First mathematical model of a neuron", href: "/timeline/mcculloch-pitts-1943" },
          { label: "Warren McCulloch", href: "/person/warren-mcculloch" },
          { label: "The Perceptron", href: "/timeline/perceptron-1957" },
        ],
      },
      {
        heading: "The Perceptrons book and the connectionist setback",
        body: [
          "In 1969, Marvin Minsky and Seymour Papert published Perceptrons, proving that a single-layer perceptron could not solve the XOR problem or other tasks that are not linearly separable. The math was correct. The interpretation that spread beyond it was not: many readers took the book to mean neural networks themselves were a dead end, even though multi-layer networks could handle the very problems the proof ruled out for single layers.",
          "The effect was a funding and research freeze that lasted more than a decade. Money moved to symbolic AI, and the connectionist program went quiet. This is one of the clearest cases in AI history of a narrow technical result being read as a verdict on a whole approach, and it set up the first AI winter for the field's neural-network wing.",
        ],
        links: [
          { label: "Perceptrons and the neural network freeze", href: "/timeline/minsky-papert-perceptrons-1969" },
          { label: "Browse neural network milestones", href: "/tag/neural-networks" },
          { label: "How AI winters unfolded", href: "/history/history-of-ai-winters" },
        ],
      },
      {
        heading: "Backpropagation: discovered, ignored, then rediscovered",
        body: [
          "The method that would eventually train deep networks existed during the freeze. In 1974, Paul Werbos described backpropagation in his PhD thesis, a way to train multi-layer networks by propagating errors backward through the layers. In the anti-neural-network climate of the 1970s, the work went largely unnoticed, a reminder that an algorithm can be available years before a field is willing to use it.",
          "The idea returned in 1986, when David Rumelhart, Geoffrey Hinton, and Ronald Williams published a Nature paper showing backpropagation could train multi-layer networks effectively, alongside the connectionist Parallel Distributed Processing volumes. Backpropagation became the standard training method and the algorithmic backbone of the deep learning wave that followed.",
        ],
        links: [
          { label: "Backpropagation discovered and ignored", href: "/timeline/backpropagation-theory-1974" },
          { label: "Backpropagation rediscovered", href: "/timeline/backprop-rediscovery-1986" },
          { label: "Geoffrey Hinton", href: "/person/geoffrey-hinton" },
        ],
      },
      {
        heading: "Convolutional networks and the data and GPU ingredients",
        body: [
          "Even with backpropagation working, neural networks needed an architecture suited to images and enough data and compute to train it. Yann LeCun supplied the architecture in 1989, showing that convolutional neural networks could be trained with backpropagation to read handwritten digits. The refined LeNet-5 later hit over 99 percent accuracy on MNIST and ran in bank check readers and ATMs for years, proving these networks could do real commercial work even during the second AI winter.",
          "The other two ingredients arrived around 2009. Fei-Fei Li's team built ImageNet, a dataset of over 14 million labeled images that gave vision research a benchmark at an unprecedented scale. The same year, researchers including Andrew Ng showed that GPUs could train neural networks tens of times faster than CPUs, removing the compute bottleneck. Hinton's 2006 deep belief networks had already shown deep networks could be trained layer by layer; now the data and hardware were in place.",
        ],
        links: [
          { label: "LeNet and convolutional networks", href: "/timeline/lenet-1989" },
          { label: "ImageNet, the dataset that changed vision", href: "/timeline/imagenet-2009" },
          { label: "GPU computing for neural networks", href: "/timeline/gpu-computing-2009" },
        ],
      },
      {
        heading: "The 2012 AlexNet breakthrough and modern depth",
        body: [
          "In 2012, the ingredients came together. AlexNet, a deep convolutional network built by Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton, won the ImageNet competition by a wide margin, cutting the top error rate from 26 percent to 16 percent. Trained on two NVIDIA GTX 580 GPUs, it was deeper than anything before it, and it ended the debate about whether deep learning worked at scale. Traditional computer vision pipelines were obsolete almost overnight.",
          "Depth kept growing. In 2015, Microsoft Research introduced ResNet, whose skip connections let networks reach 152 layers and beyond without breaking during training. ResNet won ImageNet 2015 with a 3.57 percent error rate, passing human-level performance on the benchmark for the first time. Residual connections then became a standard building block across deep architectures, including the Transformers that power today's frontier models.",
        ],
        links: [
          { label: "AlexNet, the ImageNet moment", href: "/timeline/alexnet-2012" },
          { label: "ResNet and residual connections", href: "/timeline/resnet-2015" },
          { label: "Yann LeCun", href: "/person/yann-lecun" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "mcculloch-pitts-1943",
      "perceptron-1957",
      "minsky-papert-perceptrons-1969",
      "backpropagation-theory-1974",
      "hopfield-networks-1982",
      "backprop-rediscovery-1986",
      "lenet-1989",
      "deep-belief-networks-2006",
      "imagenet-2009",
      "gpu-computing-2009",
      "alexnet-2012",
      "resnet-2015",
    ],
    relatedTags: ["neural-networks", "deep-learning", "backpropagation", "cnn", "imagenet"],
    relatedEntities: [
      { type: "person", slug: "warren-mcculloch", label: "Warren McCulloch" },
      { type: "person", slug: "frank-rosenblatt", label: "Frank Rosenblatt" },
      { type: "person", slug: "geoffrey-hinton", label: "Geoffrey Hinton" },
      { type: "person", slug: "yann-lecun", label: "Yann LeCun" },
    ],
    relatedGuideSlugs: [
      "history-of-artificial-intelligence",
      "history-of-large-language-models",
      "history-of-deepmind",
      "history-of-ai-winters",
    ],
    canonicalPath: "/history/history-of-neural-networks",
    faqs: [
      {
        question: "What is the history of neural networks?",
        answer:
          "Neural networks began with the 1943 McCulloch-Pitts model of an artificial neuron and Frank Rosenblatt's 1957 perceptron. After a long setback, backpropagation made multi-layer training practical in 1986, and the rise of large datasets and GPUs led to the 2012 AlexNet breakthrough that started the modern deep learning era.",
      },
      {
        question: "Who invented the neural network?",
        answer:
          "Warren McCulloch and Walter Pitts created the first mathematical model of a neuron in 1943, and Frank Rosenblatt built the first working neural network hardware, the perceptron, in 1957. There is no single inventor: the field is the work of many people across these milestones.",
      },
      {
        question: "What is backpropagation and who discovered it?",
        answer:
          "Backpropagation is a method for training multi-layer neural networks by propagating errors backward through the layers to adjust weights. Paul Werbos described it in his 1974 PhD thesis, but it was largely ignored until David Rumelhart, Geoffrey Hinton, and Ronald Williams popularized it in a 1986 Nature paper.",
      },
      {
        question: "Why did neural networks fall out of favor?",
        answer:
          "In 1969, Minsky and Papert's book Perceptrons proved that single-layer perceptrons could not solve problems like XOR. The result was widely read as a verdict on neural networks in general, which cut funding and research for over a decade even though multi-layer networks could solve those problems.",
      },
      {
        question: "What was AlexNet and why did it matter?",
        answer:
          "AlexNet was a deep convolutional neural network that won the 2012 ImageNet competition by a large margin, cutting the top error rate from 26 percent to 16 percent. Trained on two NVIDIA GPUs, it proved deep learning worked at scale and made it the dominant approach in computer vision and beyond.",
      },
    ],
  },
  {
    slug: "history-of-large-language-models",
    title: "History of Large Language Models",
    description:
      "How large language models evolved from word embeddings and the transformer through BERT, the GPT line, ChatGPT, and reasoning models.",
    intro:
      "The history of large language models runs from a handful of research papers on representing words as numbers to systems that millions of people now use for writing, code, and conversation. This page traces that arc through the milestones that defined it: Word2Vec, the transformer, BERT and the GPT line, the ChatGPT breakout, and the turn toward open weights and reasoning. Each step built on the previous one, and the dataset behind this page keeps the story grounded in real dates, people, and results.",
    sections: [
      {
        heading: "Word embeddings and the pre-transformer groundwork",
        body: [
          "Before models could generate fluent text, they needed a way to represent meaning that a network could work with. In 2013, Google researchers led by Tomas Mikolov published Word2Vec, which showed that relatively small neural networks could learn vector representations of words from large text corpora. The well-known example, king minus man plus woman lands near queen, made the idea concrete: semantic relationships could be captured as geometry in vector space.",
          "Word2Vec mattered because it gave natural language processing a shared representation layer that was cheap to train and easy to reuse across tasks. It helped bridge the older statistical NLP tradition and the neural language-model era that followed. The embeddings were static, one vector per word regardless of context, a limit that later transformer-based models would remove. But the core idea that meaning could live in a learned vector space carried straight into everything that came after.",
        ],
        links: [
          { label: "Word2Vec milestone", href: "/timeline/word2vec-2013" },
          { label: "Browse natural language processing milestones", href: "/tag/nlp" },
          { label: "How neural networks developed", href: "/history/history-of-neural-networks" },
        ],
      },
      {
        heading: "The transformer architecture and the attention shift",
        body: [
          "In June 2017, eight researchers at Google published 'Attention Is All You Need,' introducing the transformer. It replaced the recurrence that older sequence models depended on with self-attention, a mechanism that lets the model weigh every token against every other token and process the whole sequence in parallel. That parallelism is what made training at scale practical, because it mapped cleanly onto modern GPU hardware in a way that recurrent networks never did.",
          "The architecture is the reason the modern LLM era exists. Transformers sit behind GPT, BERT, Claude, Llama, and effectively every frontier system that followed, and several of the paper's co-authors went on to found their own AI companies. The shift was as much about engineering as theory: once attention removed the sequential bottleneck, the question stopped being how to design a better recurrent cell and became how far scale and data could push a single, uniform architecture.",
        ],
        links: [
          { label: "Transformer milestone", href: "/timeline/transformer-2017" },
          { label: "Browse transformer milestones", href: "/tag/transformer" },
          { label: "Google organization page", href: "/organization/google" },
        ],
      },
      {
        heading: "The pretraining era: BERT and the GPT line",
        body: [
          "Two transformer-based approaches set the template for what came next, and they read the same text in opposite ways. In June 2018, OpenAI released GPT-1, a 117-million-parameter model that learned by predicting the next token across large amounts of text, then fine-tuned for specific tasks. Four months later, Google published BERT, which read context from both directions at once, broke records on 11 NLP benchmarks, and was folded into Google Search where it affected about 10 percent of queries.",
          "The shared lesson was that pre-training on unlabeled text, then adapting the result, beat building task-specific systems from scratch. GPT-2 pushed the generative side of that idea in 2019 with 1.5 billion parameters, and OpenAI's initial decision to withhold the full model, calling it too dangerous to release, became the first major safety controversy of the LLM era. The full GPT-2 weights shipped later that year, but the episode set the tone for how labs would talk about release decisions going forward.",
        ],
        links: [
          { label: "BERT milestone", href: "/timeline/bert-2018" },
          { label: "GPT-1 milestone", href: "/timeline/gpt-1-2018" },
          { label: "GPT-2 milestone", href: "/timeline/gpt-2-2019" },
        ],
      },
      {
        heading: "Scale and the ChatGPT breakout",
        body: [
          "In June 2020, OpenAI released GPT-3 with 175 billion parameters, about 100 times the size of GPT-2. Without fine-tuning, it could write essays, code, and poetry and translate languages through few-shot learning, picking up a task from a few examples placed in the prompt. GPT-3 gave the scaling hypothesis real credibility: bigger models produced capabilities no one had explicitly trained for, and the API launch spawned an ecosystem of startups built on top of it.",
          "The public turning point came on 30 November 2022, when OpenAI released ChatGPT, built on GPT-3.5 and tuned with reinforcement learning from human feedback. It reached a million users in five days and 100 million in two months, the fastest consumer adoption on record, and it made the technology legible to people who had never read an AI paper. GPT-4 followed in March 2023, adding image understanding and passing professional exams such as the bar at the 90th percentile, which pushed every industry to take the capabilities seriously and intensified the competition between labs.",
        ],
        links: [
          { label: "GPT-3 milestone", href: "/timeline/gpt-3-2020" },
          { label: "ChatGPT milestone", href: "/timeline/chatgpt-2022" },
          { label: "OpenAI organization page", href: "/organization/openai" },
        ],
      },
      {
        heading: "The competitive and open frontier plus reasoning",
        body: [
          "After ChatGPT, the field stopped being a single-lab story. Anthropic, founded by former OpenAI researchers, released Claude in March 2023, trained with Constitutional AI, an approach where the model follows a written set of principles rather than relying only on human preference ratings. In July 2023, Meta released Llama 2 as open weights with broad commercial use permitted, which made self-hosted, customizable frontier-quality models a mainstream option and produced thousands of fine-tunes within weeks.",
          "The next shift was about how models spend compute rather than how large they are. In September 2024, OpenAI released o1, trained to reason through chain-of-thought at inference time, spending more compute to work through hard math, coding, and science problems step by step. That introduced test-time compute scaling as a second lever alongside model size, and it pointed the field toward systems that deliberate before answering rather than only predicting the next token faster.",
        ],
        links: [
          { label: "Claude milestone", href: "/timeline/claude-2023" },
          { label: "Llama 2 milestone", href: "/timeline/llama-2-2023" },
          { label: "OpenAI o1 reasoning milestone", href: "/timeline/o1-reasoning-2024" },
          { label: "Anthropic organization page", href: "/organization/anthropic" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "word2vec-2013",
      "transformer-2017",
      "bert-2018",
      "gpt-1-2018",
      "gpt-2-2019",
      "gpt-3-2020",
      "chatgpt-2022",
      "gpt-4-2023",
      "claude-2023",
      "llama-2-2023",
      "o1-reasoning-2024",
    ],
    relatedTags: ["language-model", "transformer", "gpt", "nlp", "reasoning"],
    relatedEntities: [
      { type: "organization", slug: "openai", label: "OpenAI" },
      { type: "organization", slug: "anthropic", label: "Anthropic" },
      { type: "organization", slug: "google", label: "Google" },
      { type: "person", slug: "ilya-sutskever", label: "Ilya Sutskever" },
    ],
    canonicalPath: "/history/history-of-large-language-models",
    faqs: [
      {
        question: "What is the history of large language models?",
        answer:
          "Large language models grew out of a sequence of milestones in natural language processing. Word2Vec (2013) showed that words could be represented as learned vectors. The transformer architecture (2017) replaced recurrence with self-attention and made training at scale practical. BERT and GPT-1 (2018) established pre-training on large text corpora, GPT-3 (2020) demonstrated that scale produced new capabilities, and ChatGPT (2022) brought the technology to the public. Later releases such as Claude, Llama 2, and OpenAI o1 broadened the field into safety-focused, open-weight, and reasoning systems.",
      },
      {
        question: "What was the first large language model?",
        answer:
          "GPT-1, released by OpenAI in June 2018, is commonly cited as the first model in the modern large language model line. It used the transformer architecture, learned by predicting the next token across large amounts of text, and had 117 million parameters. Its core method, unsupervised pre-training followed by task-specific fine-tuning, set the template that GPT-2, GPT-3, and later systems scaled up.",
      },
      {
        question: "How did the transformer change AI?",
        answer:
          "The transformer, introduced in the 2017 paper 'Attention Is All You Need,' replaced the sequential recurrence of earlier models with self-attention, which lets a model process an entire sequence in parallel and weigh every token against every other token. That parallelism made training at large scale practical on GPU hardware. The architecture now sits behind GPT, BERT, Claude, Llama, and almost every frontier AI system, which is why it is regarded as the foundation of the modern LLM era.",
      },
      {
        question: "What is the difference between GPT and BERT?",
        answer:
          "GPT and BERT are both transformer-based models released in 2018, but they read text differently. GPT (from OpenAI) is trained to predict the next token left to right, which makes it well suited to generating text. BERT (from Google) reads context from both directions at once, which makes it well suited to understanding tasks such as search and classification. BERT broke records on 11 NLP benchmarks and was integrated into Google Search, while the GPT line carried the generative approach forward into GPT-2, GPT-3, and ChatGPT.",
      },
      {
        question: "When did LLMs become mainstream?",
        answer:
          "Large language models reached the general public on 30 November 2022, when OpenAI released ChatGPT. Built on GPT-3.5 and tuned with reinforcement learning from human feedback, it reached one million users in five days and 100 million in two months, the fastest consumer adoption on record. GPT-3 (2020) had already shown the underlying capability through its API, but ChatGPT's conversational interface is what made the technology widely usable and triggered the broad public and investment response.",
      },
    ],
    relatedGuideSlugs: [
      "history-of-artificial-intelligence",
      "history-of-neural-networks",
      "history-of-generative-ai",
      "gpt-timeline",
      "history-of-openai",
      "history-of-ai-agents",
    ],
  },
  {
    slug: "history-of-generative-ai",
    title: "History of Generative AI",
    description:
      "The history of generative AI, from GANs in 2014 through DALL-E, Stable Diffusion, ChatGPT, Midjourney, and Sora's text-to-video.",
    intro:
      "The history of generative AI runs from a 2014 research idea about networks that compete to create data through to systems that write text, paint images, and generate video on demand. This page traces that arc across the milestones that turned generation from a lab curiosity into everyday creative software, and it explains how each step built on the one before it.",
    sections: [
      {
        heading: "GANs and the idea of machines that generate",
        body: [
          "In 2014 Ian Goodfellow introduced Generative Adversarial Networks, a setup where two neural networks compete: a generator creates fake data while a discriminator tries to tell real from fake. The two improve against each other until the generated output becomes hard to distinguish from the genuine article. Yann LeCun called GANs the most interesting idea in machine learning of the prior decade.",
          "GANs mattered because they reframed what neural networks were for. Earlier deep learning had focused on classification, on telling images and sounds apart. GANs showed networks could produce photorealistic faces, art, and synthetic data instead of only labeling it. Face generation, image editing, deepfakes, and data augmentation all trace back to this work, and it set the direction for the generative wave that followed.",
        ],
        links: [
          { label: "Generative Adversarial Networks milestone", href: "/timeline/gans-2014" },
          { label: "Ian Goodfellow", href: "/person/ian-goodfellow" },
          { label: "Browse generative milestones", href: "/tag/generative" },
        ],
      },
      {
        heading: "Text-to-image arrives: DALL-E and diffusion",
        body: [
          "OpenAI unveiled DALL-E in January 2021, a model that generated images from written descriptions. Built on GPT-3's architecture adapted for images, it produced things like an armchair in the shape of an avocado and showed that a language model could bridge text and visual creativity. DALL-E pointed at a future where anyone could describe a picture in words and get one back.",
          "The next year shifted who could use that capability. Stable Diffusion, released in August 2022 by Stability AI with CompVis and Runway, distributed its model weights openly rather than locking the model behind an API. Anyone could download it, run it on consumer hardware, and build on top of it, which set off a wave of community fine-tunes and tools. DALL-E and Stable Diffusion together brought AI image generation into the mainstream and started long-running debates about copyright and the creative industries.",
        ],
        links: [
          { label: "DALL-E milestone", href: "/timeline/dalle-2021" },
          { label: "Stable Diffusion milestone", href: "/timeline/stable-diffusion-2022" },
          { label: "Stability AI", href: "/organization/stability-ai" },
        ],
      },
      {
        heading: "Generative text goes mainstream and the creative-tools wave",
        body: [
          "ChatGPT, released by OpenAI on November 30, 2022, was the moment generation reached the public. Based on GPT-3.5 fine-tuned with reinforcement learning from human feedback, it reached one million users in five days and one hundred million in two months, the fastest-growing consumer application to that point. People used it to write, debug code, and brainstorm, which made text generation feel personal and immediate. GPT-4 followed in March 2023, a multimodal model that read both text and images, passed the bar exam in the 90th percentile, and pushed accuracy and reasoning well past GPT-3.5.",
          "Image generation hit its own public peak in the same month. Midjourney V5 produced images so photorealistic that AI photos went viral as real ones, including a fake image of the Pope in a puffer jacket. The line between generated and real imagery effectively dissolved, news outlets revised their policies, and the world argued over deepfakes and visual trust. The text and image tracks together defined the generative AI revolution of 2022 to 2024.",
        ],
        links: [
          { label: "ChatGPT milestone", href: "/timeline/chatgpt-2022" },
          { label: "GPT-4 milestone", href: "/timeline/gpt-4-2023" },
          { label: "Midjourney V5 milestone", href: "/timeline/midjourney-v5-2023" },
        ],
      },
      {
        heading: "Toward video and multimodal generation",
        body: [
          "In February 2024 OpenAI previewed Sora, a model that generated photorealistic video up to a minute long from text descriptions. The clips showed realistic physics, complex camera movement, and coherent scenes that looked like professional cinematography. Many people had expected convincing AI video to be years away, so the preview landed hard across the film, advertising, and creative industries.",
          "Sora extended the same idea that ran through DALL-E and Stable Diffusion: describe something in language and get a generated artifact back, now moving image rather than a still. It also fit the broader move toward multimodal systems that work across text, images, and video at once. The capability sharpened debates about what AI generation means for creative professions.",
        ],
        links: [
          { label: "Sora milestone", href: "/timeline/sora-2024" },
          { label: "OpenAI organization page", href: "/organization/openai" },
          { label: "Browse video-generation milestones", href: "/tag/video-generation" },
        ],
      },
      {
        heading: "What generative AI changed about creative work",
        body: [
          "Across a decade, generation moved from an adversarial training trick to a default interface for making things. The pattern repeated: a research result (GANs, DALL-E), then wider access (Stable Diffusion's open weights, ChatGPT's free web app), then a creative-tools wave that put the capability in front of millions. Each medium followed roughly the same path, from text to still images to video.",
          "That shift changed the daily mechanics of creative work. Drafting, concept art, and rough cuts could now start from a prompt, which moved human effort toward direction and editing. It also forced new questions about authorship, training data, and trust in images, questions that Stable Diffusion's open ecosystem and Midjourney's viral fakes made concrete rather than hypothetical.",
        ],
        links: [
          { label: "Browse diffusion milestones", href: "/tag/diffusion" },
          { label: "Browse multimodal milestones", href: "/tag/multimodal" },
          { label: "History of large language models", href: "/history/history-of-large-language-models" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "gans-2014",
      "dalle-2021",
      "stable-diffusion-2022",
      "chatgpt-2022",
      "midjourney-v5-2023",
      "gpt-4-2023",
      "sora-2024",
    ],
    relatedTags: ["generative", "image-generation", "diffusion", "multimodal", "video-generation"],
    relatedEntities: [
      { type: "person", slug: "ian-goodfellow", label: "Ian Goodfellow" },
      { type: "organization", slug: "openai", label: "OpenAI" },
      { type: "organization", slug: "google", label: "Google" },
      { type: "organization", slug: "stability-ai", label: "Stability AI" },
    ],
    canonicalPath: "/history/history-of-generative-ai",
    relatedGuideSlugs: [
      "history-of-artificial-intelligence",
      "history-of-large-language-models",
      "history-of-openai",
    ],
    faqs: [
      {
        question: "What is the history of generative AI?",
        answer:
          "Generative AI is the history of systems that create new content rather than only classifying existing data. It begins with Generative Adversarial Networks in 2014, moves to text-to-image with DALL-E in 2021 and Stable Diffusion in 2022, reaches the public through ChatGPT in late 2022 and GPT-4 and Midjourney V5 in 2023, and extends to text-to-video with Sora in 2024.",
      },
      {
        question: "When did generative AI start?",
        answer:
          "The modern technical starting point is 2014, when Ian Goodfellow introduced Generative Adversarial Networks, a method for training neural networks to produce realistic synthetic data. The public breakout came later, with DALL-E in 2021 for images and ChatGPT in November 2022 for text.",
      },
      {
        question: "What were GANs and why did they matter?",
        answer:
          "GANs, or Generative Adversarial Networks, were introduced by Ian Goodfellow in 2014. They pair two neural networks, a generator that creates fake data and a discriminator that tries to detect it, and train them against each other until the output looks real. They mattered because they showed neural networks could generate photorealistic faces, art, and synthetic data, which started the generative AI revolution.",
      },
      {
        question: "When did AI image generation become possible?",
        answer:
          "Practical text-to-image generation arrived with OpenAI's DALL-E in January 2021, which produced images from written descriptions. Stable Diffusion in August 2022 made it widely accessible by releasing model weights that ran on consumer hardware, and Midjourney V5 in March 2023 reached photorealism convincing enough to be mistaken for real photographs.",
      },
      {
        question: "What is the difference between GANs and diffusion models?",
        answer:
          "GANs, introduced in 2014, generate images through two competing networks, a generator and a discriminator, that improve against each other. Diffusion models, used in Stable Diffusion in 2022, generate images by starting from noise and gradually refining it into a coherent picture. Both create images from learned patterns, but diffusion-based systems became the basis for the widely used text-to-image tools of the 2020s.",
      },
    ],
  },
  {
    slug: "history-of-ai-winters",
    title: "History of the AI Winters",
    description:
      "How the AI winters happened: the Perceptrons critique, the Lighthill Report, the expert systems crash, and what each AI winter taught the field.",
    intro:
      "An AI winter is a period when funding and interest in artificial intelligence collapse after a wave of inflated expectations. The field has lived through two of them, and the same boom-bust pattern shaped how researchers and funders judged AI for decades. This page traces what caused each AI winter and what eventually ended them.",
    sections: [
      {
        heading: "What an AI winter is and why the pattern repeats",
        body: [
          "An AI winter is a stretch of reduced funding, lost credibility, and abandoned research lines that follows a period of overpromising. The mechanism is consistent. A narrow success gets read as evidence of imminent general intelligence, money and attention pour in, and then the gap between the demo and the claim becomes impossible to ignore. When that gap is exposed, funders pull back hard, and the correction overshoots the actual technical setback.",
          "The pattern was visible long before anyone named it. Frank Rosenblatt's Perceptron arrived in 1957 with press coverage promising machines that would walk, talk, and be conscious. That kind of framing set up the backlash that followed, and it became the template AI repeated: overpromise, underdeliver, winter. Understanding the two winters means watching how technical critiques and budget decisions reinforced each other.",
        ],
        links: [
          { label: "Browse AI winter milestones", href: "/tag/ai-winter" },
          { label: "The first AI winter era", href: "/era/first-winter" },
          { label: "How funding shaped AI history", href: "/tag/funding" },
        ],
      },
      {
        heading: "The first AI winter: the Perceptrons critique and the Lighthill Report",
        body: [
          "The first winter had two triggers. In 1969, Marvin Minsky and Seymour Papert published 'Perceptrons,' proving that a single-layer perceptron could not solve the XOR problem or other tasks that are not linearly separable. The proof was correct, but it was widely read as showing that neural networks were fundamentally limited, even though multi-layer networks could handle those cases. The interpretation, more than the math, drained funding and talent from neural network research for over a decade.",
          "The second trigger came from across the Atlantic. In 1973, British mathematician James Lighthill reported to the UK Science Research Council that AI had failed to deliver on its promises, writing that no part of the field had produced the major impact once promised. The report led to deep funding cuts for AI in the United Kingdom and stands as a clear example of how narrow successes mistaken for general intelligence can provoke a backlash once the difference is noticed.",
        ],
        links: [
          { label: "Perceptrons: the book that stalled neural nets", href: "/timeline/minsky-papert-perceptrons-1969" },
          { label: "The Lighthill Report", href: "/timeline/lighthill-report-1973" },
          { label: "Marvin Minsky", href: "/person/marvin-minsky" },
        ],
      },
      {
        heading: "The expert systems boom that briefly revived funding",
        body: [
          "AI thawed in the 1980s on the back of expert systems, software that encoded specialist knowledge as rules to solve narrow, high-value problems. The breakout case was R1, later renamed XCON, deployed at Digital Equipment Corporation in 1980 to configure VAX computer systems. It saved DEC an estimated 40 million dollars a year, and that result sparked a gold rush. By 1985, companies were spending over a billion dollars a year on expert systems.",
          "Governments joined the race. In 1982, Japan's Ministry of International Trade and Industry launched the Fifth Generation Computer Project, a ten-year, 850 million dollar effort to build parallel machines that could understand language and reason like humans. It pushed the United States and the United Kingdom to start competing programs. The ambition was real, but the goals were set far beyond what the technology could reach, which set up the next crash.",
        ],
        links: [
          { label: "R1/XCON goes corporate", href: "/timeline/expert-systems-boom-1980" },
          { label: "Japan's Fifth Generation project", href: "/timeline/fifth-generation-1982" },
          { label: "Expert systems milestones", href: "/tag/expert-systems" },
        ],
      },
      {
        heading: "The second AI winter: why expert systems collapsed",
        body: [
          "The expert systems bubble burst in 1988. The specialized LISP machine companies that the industry ran on collapsed, the DARPA Strategic Computing Initiative was cut, and Japan's Fifth Generation project was visibly failing to meet its goals. The technology itself was the deeper problem. Expert systems turned out to be brittle, expensive to maintain, and unable to learn anything outside the rules a human had hand-coded, so they broke down at the edges of their narrow domains.",
          "The fallout reached past budgets and into language. The industry lost billions, and the term 'AI' itself became a liability. Researchers rebranded their work as machine learning, computational intelligence, or knowledge systems to keep funding flowing, and that stigma lasted more than a decade. The second winter confirmed the lesson of the first: a commercial success mistaken for a path to general intelligence invites a brutal correction.",
        ],
        links: [
          { label: "The second AI winter begins", href: "/timeline/ai-winter-2-1988" },
          { label: "The second AI winter era", href: "/era/second-winter" },
          { label: "Criticism that shaped the field", href: "/tag/criticism" },
        ],
      },
      {
        heading: "The thaw: backpropagation's 1986 revival and the lessons",
        body: [
          "The recovery had already started quietly inside the boom. In 1986, David Rumelhart, Geoffrey Hinton, and Ronald Williams published 'Learning Representations by Back-propagating Errors' in Nature, showing that backpropagation could train multi-layer neural networks effectively. That mattered because the limitation Minsky and Papert had identified applied to single-layer networks, and backpropagation gave the field a practical way to train the deeper networks that did not share it. The same idea had been described by Paul Werbos back in 1974 but ignored in the anti-neural-network climate of the time.",
          "Backpropagation became the standard training method for multi-layer networks and laid the groundwork for the deep learning wave that followed. The broader lesson from both winters is about expectations rather than algorithms. The technical work rarely stopped during a winter; what collapsed was the inflated promise attached to it. The field recovered each time by quietly improving the methods that survived the backlash, then letting results, not press releases, set the pace.",
        ],
        links: [
          { label: "Backpropagation rediscovered", href: "/timeline/backprop-rediscovery-1986" },
          { label: "Geoffrey Hinton", href: "/person/geoffrey-hinton" },
          { label: "History of neural networks", href: "/history/history-of-neural-networks" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "minsky-papert-perceptrons-1969",
      "lighthill-report-1973",
      "expert-systems-boom-1980",
      "fifth-generation-1982",
      "backprop-rediscovery-1986",
      "ai-winter-2-1988",
    ],
    relatedTags: ["ai-winter", "expert-systems", "funding", "criticism", "symbolic-ai"],
    relatedEntities: [
      { type: "person", slug: "marvin-minsky", label: "Marvin Minsky" },
      { type: "person", slug: "geoffrey-hinton", label: "Geoffrey Hinton" },
    ],
    relatedGuideSlugs: [
      "history-of-artificial-intelligence",
      "history-of-neural-networks",
      "who-invented-ai",
    ],
    canonicalPath: "/history/history-of-ai-winters",
    faqs: [
      {
        question: "What is an AI winter?",
        answer:
          "An AI winter is a period when funding, interest, and credibility in artificial intelligence collapse after a wave of inflated expectations. It follows a recurring pattern: a narrow success is mistaken for proof of imminent general intelligence, money and attention surge, and then funders pull back sharply once the gap between the claims and the results is exposed. The field has gone through two of them.",
      },
      {
        question: "What caused the first AI winter?",
        answer:
          "Two critiques drove the first AI winter in the 1970s. In 1969, Marvin Minsky and Seymour Papert's book 'Perceptrons' proved that single-layer perceptrons could not solve problems like XOR, and it was widely read as showing neural networks were fundamentally limited. Then in 1973, the Lighthill Report concluded that AI had failed to deliver on its promises, triggering heavy funding cuts in the United Kingdom.",
      },
      {
        question: "What caused the second AI winter?",
        answer:
          "The second AI winter began in 1988 when the expert systems bubble burst. Expert systems proved brittle, expensive to maintain, and unable to learn beyond their hand-coded rules. The LISP machine companies collapsed, the DARPA Strategic Computing Initiative was cut, and Japan's Fifth Generation project was failing to meet its goals. The industry lost billions and the term 'AI' became a liability researchers avoided.",
      },
      {
        question: "How many AI winters have there been?",
        answer:
          "There have been two major AI winters. The first ran through the 1970s, set off by the Perceptrons critique of 1969 and the Lighthill Report of 1973. The second ran from 1988 into the early 1990s after the expert systems boom collapsed. A short revival in the early-to-mid 1980s, driven by commercial expert systems, separated the two.",
      },
      {
        question: "What ended the AI winters?",
        answer:
          "Each winter ended when surviving technical work quietly matured into usable methods. The 1980s revival came from commercial expert systems like R1/XCON. The recovery from the second winter built on backpropagation, which Rumelhart, Hinton, and Williams showed in 1986 could train multi-layer neural networks, opening the path to modern deep learning. In both cases the field recovered by letting results rather than promises set the pace.",
      },
    ],
  },
  {
    slug: "who-invented-ai",
    title: "Who Invented AI?",
    description:
      "No single person invented AI. A clear guide to who invented AI, from Turing and McCulloch-Pitts to McCarthy, Minsky, and Rosenblatt.",
    intro:
      "No single person invented AI. The field was built by many people across the 1940s and 1950s, including Warren McCulloch and Walter Pitts, Alan Turing, John McCarthy, Marvin Minsky, and Frank Rosenblatt. McCarthy coined the name artificial intelligence in 1956, but the ideas behind it came from a wider group working on logic, computation, and learning machines.",
    sections: [
      {
        heading: "The short answer: no single inventor",
        body: [
          "There is no one inventor of AI, and anyone who gives you a single name is simplifying. Artificial intelligence came together from separate lines of work: a mathematical model of the neuron, a philosophical test for machine intelligence, a programming language, the first reasoning programs, and the first trainable neural network hardware. Different people led each of these, often without a shared plan.",
          "What ties them together is a date and a place. In 1956 a summer workshop at Dartmouth College gave the field its name and gathered several of its founders in one room. That moment is the closest thing AI has to a founding event, which is why the people associated with it, especially John McCarthy and Marvin Minsky, are the names most often cited when someone asks who created artificial intelligence.",
        ],
        links: [
          { label: "Browse the earliest era", href: "/era/origins" },
          { label: "The Dartmouth Conference milestone", href: "/timeline/dartmouth-conference-1956" },
          { label: "Foundations tag archive", href: "/tag/foundations" },
        ],
      },
      {
        heading: "The theoretical groundwork: McCulloch, Pitts, and Turing",
        body: [
          "The earliest piece arrived in 1943, before there were programmable computers to run anything on. Warren McCulloch and Walter Pitts published a mathematical model of an artificial neuron and showed that networks of simple binary units could, in principle, compute any function a Turing machine could. This is the conceptual ancestor of every neural network that followed, and it framed thought itself as something a machine might carry out.",
          "In 1950 Alan Turing gave the field its guiding question. His paper in the journal Mind asked whether machines can think, then argued the question was less useful than a practical test: could a machine imitate human conversation well enough to fool a person? The Turing Test set the terms for decades of debate about what machine intelligence even means, which is why Turing is so often named as a father of the field even though he never built an AI program.",
        ],
        links: [
          { label: "McCulloch-Pitts neuron milestone", href: "/timeline/mcculloch-pitts-1943" },
          { label: "Turing's 1950 paper milestone", href: "/timeline/turing-test-1950" },
          { label: "Alan Turing", href: "/person/alan-turing" },
        ],
      },
      {
        heading: "John McCarthy, Dartmouth, and the naming of the field",
        body: [
          "John McCarthy is the person who named the field. In 1956 he organized the Dartmouth workshop and coined the term artificial intelligence in the proposal, which claimed that every feature of intelligence could in principle be described precisely enough for a machine to simulate it. McCarthy ran the gathering alongside Marvin Minsky, Nathaniel Rochester, and Claude Shannon, and the optimism set there drove the next two decades of research.",
          "McCarthy's contribution did not stop at naming. In 1958 he created LISP, a language built for AI work, with features such as recursion, dynamic typing, and garbage collection that were far ahead of their time. LISP became the dominant language of AI research for more than thirty years. Between coining the term and building the field's main tool, McCarthy has a stronger claim than almost anyone to the father of AI title.",
        ],
        links: [
          { label: "The Dartmouth Conference milestone", href: "/timeline/dartmouth-conference-1956" },
          { label: "LISP milestone", href: "/timeline/lisp-1958" },
          { label: "John McCarthy", href: "/person/john-mccarthy" },
        ],
      },
      {
        heading: "The first programs and the perceptron",
        body: [
          "Naming a field is one thing; building something that works is another. That same year, Allen Newell and Herbert Simon (with Cliff Shaw) brought the Logic Theorist to Dartmouth, often called the first AI program. It proved theorems from Whitehead and Russell's Principia Mathematica and even found a more elegant proof than the original for one of them, showing that symbolic manipulation could automate reasoning once treated as uniquely human.",
          "A different tradition took shape in 1957 when Frank Rosenblatt built the Mark I Perceptron, the first hardware implementation of an artificial neural network. It learned to classify simple visual patterns, and the press hailed it as an electronic brain. The Logic Theorist and the Perceptron mark the two paths AI would follow, symbolic reasoning and learning from data, and the tension between them shaped the field for decades.",
        ],
        links: [
          { label: "Logic Theorist milestone", href: "/timeline/logic-theorist-1956" },
          { label: "The Perceptron milestone", href: "/timeline/perceptron-1957" },
          { label: "Frank Rosenblatt", href: "/person/frank-rosenblatt" },
        ],
      },
      {
        heading: "Who is called the father of AI, and why it is contested",
        body: [
          "The father of AI title gets attached to several people, depending on what you count as the founding act. John McCarthy is the most common pick because he coined the name and organized Dartmouth. Alan Turing is named for setting the field's central question in 1950. Marvin Minsky is cited as a co-founder of the discipline and a long-running force at MIT, and pioneers like Frank Rosenblatt are credited for the neural-network branch that now dominates.",
          "The honest position is that the title is contested precisely because the work was distributed. McCulloch and Pitts supplied the neuron, Turing supplied the test, McCarthy supplied the name and the tools, Newell and Simon supplied the first programs, and Rosenblatt supplied the first learning hardware. Calling any one of them the inventor of AI overstates a single contribution and erases the others.",
        ],
        links: [
          { label: "Marvin Minsky", href: "/person/marvin-minsky" },
          { label: "The founding of AI tag", href: "/tag/founding" },
          { label: "History of neural networks", href: "/history/history-of-neural-networks" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "mcculloch-pitts-1943",
      "turing-test-1950",
      "dartmouth-conference-1956",
      "logic-theorist-1956",
      "perceptron-1957",
      "lisp-1958",
    ],
    relatedTags: ["foundations", "founding", "turing-test", "philosophy", "history"],
    relatedEntities: [
      { type: "person", slug: "alan-turing", label: "Alan Turing" },
      { type: "person", slug: "john-mccarthy", label: "John McCarthy" },
      { type: "person", slug: "marvin-minsky", label: "Marvin Minsky" },
      { type: "person", slug: "frank-rosenblatt", label: "Frank Rosenblatt" },
    ],
    relatedGuideSlugs: [
      "history-of-artificial-intelligence",
      "history-of-neural-networks",
      "history-of-ai-winters",
    ],
    canonicalPath: "/history/who-invented-ai",
    faqs: [
      {
        question: "Who invented AI?",
        answer:
          "No single person invented AI. It was built by many researchers in the 1940s and 1950s. Warren McCulloch and Walter Pitts modeled the artificial neuron in 1943, Alan Turing framed machine intelligence in 1950, and John McCarthy coined the term artificial intelligence in 1956 and organized the Dartmouth Conference with Marvin Minsky and others. Frank Rosenblatt built the first trainable neural network, the Perceptron, in 1957.",
      },
      {
        question: "Who is the father of artificial intelligence?",
        answer:
          "The title is contested. John McCarthy is the most frequent answer because he coined the term artificial intelligence in 1956, organized the Dartmouth Conference, and created the LISP language in 1958. Alan Turing is also named for setting the field's central question in 1950, and Marvin Minsky is cited as a co-founder. There is no single agreed father of AI.",
      },
      {
        question: "When was AI invented?",
        answer:
          "AI emerged over the 1940s and 1950s rather than on a single date. Key moments include the McCulloch-Pitts neuron model in 1943 and Turing's paper on machine intelligence in 1950. The field was formally named and founded as a discipline at the Dartmouth Conference in 1956, which is the date most often cited as the birth of AI.",
      },
      {
        question: "Who coined the term artificial intelligence?",
        answer:
          "John McCarthy coined the term artificial intelligence in 1956, in the proposal for the Dartmouth Summer Research Project on Artificial Intelligence. The two-month workshop at Dartmouth College gave the field both its name and its founding gathering of researchers.",
      },
      {
        question: "What was the first AI program?",
        answer:
          "The Logic Theorist, created by Allen Newell, Herbert Simon, and Cliff Shaw in 1956, is often called the first AI program. It proved mathematical theorems from Whitehead and Russell's Principia Mathematica and even found a more elegant proof than the original for one theorem. It was demonstrated at the Dartmouth Conference.",
      },
    ],
  },
  {
    slug: "history-of-deepmind",
    title: "History of DeepMind",
    description:
      "A grounded history of DeepMind, from its deep reinforcement learning work on Atari to AlphaGo, AlphaStar, AlphaFold, and the 2024 Nobel Prizes.",
    intro:
      "DeepMind was founded in London in 2010 and acquired by Google in 2014. Its history tracks how reinforcement learning moved from playing Atari games to solving a 50-year-old biology problem, and how a games-focused research lab ended up tied to Nobel Prize work. This page follows that path through the lab's most cited milestones.",
    sections: [
      {
        heading: "Deep reinforcement learning and the Atari breakthrough",
        body: [
          "In December 2013 DeepMind demonstrated a Deep Q-Network (DQN) that learned to play Atari 2600 games directly from raw pixel inputs, reaching superhuman performance on many of them with no task-specific engineering. The same architecture handled different games without being rebuilt for each one, which is what made the result stand out from earlier game-playing systems.",
          "The work combined deep learning with reinforcement learning, showing that an agent could learn complex strategies from raw sensory data rather than hand-coded features. Google acquired DeepMind for roughly 500 million dollars shortly after, a deal that signaled Big Tech's aggressive entry into frontier AI research.",
        ],
        links: [
          { label: "DeepMind's DQN masters Atari", href: "/timeline/deepmind-atari-2013" },
          { label: "Reinforcement learning milestones", href: "/tag/reinforcement-learning" },
          { label: "DeepMind organization page", href: "/organization/deepmind" },
        ],
      },
      {
        heading: "AlphaGo, the Go milestone, and self-play",
        body: [
          "In March 2016 DeepMind's AlphaGo defeated Lee Sedol, one of the strongest Go players ever, 4-1 in a five-game match in Seoul. Go has more possible positions than there are atoms in the universe, so brute force was not an option. AlphaGo combined deep reinforcement learning with Monte Carlo tree search, and its Move 37 in Game 2 was creative enough that experts described it as a move no human would play. Around 200 million people watched.",
          "In October 2017 AlphaGo Zero went further by learning entirely through self-play, with no human game data and no hand-crafted features. Within 40 days it surpassed every earlier version, including the one that beat Lee Sedol. That result raised a sharper question than the original match: whether AI starting from nothing could discover strategies humans had never found.",
        ],
        links: [
          { label: "AlphaGo defeats Lee Sedol", href: "/timeline/alphago-2016" },
          { label: "AlphaGo Zero learns from scratch", href: "/timeline/alphago-zero-2017" },
          { label: "Self-play milestones", href: "/tag/self-play" },
        ],
      },
      {
        heading: "Mastering real-time strategy with AlphaStar",
        body: [
          "In January 2019 DeepMind's AlphaStar reached Grandmaster level in StarCraft II, a real-time strategy game that demands long-term planning, deception, and fast tactical decisions under incomplete information. That mix of constraints made it harder than Go or chess, where both players see the full board.",
          "The result mattered because it pushed reinforcement learning into real-time, imperfect-information, multi-agent environments. Those conditions are closer to the messiness of the real world than the clean turn-based games that came before, which is why AlphaStar reads as a step toward agents that operate outside tidy rule sets.",
        ],
        links: [
          { label: "AlphaStar masters StarCraft II", href: "/timeline/alphastar-2019" },
          { label: "Game-playing AI milestones", href: "/tag/games" },
          { label: "History of AI agents", href: "/history/history-of-ai-agents" },
        ],
      },
      {
        heading: "AlphaFold and protein folding as a scientific contribution",
        body: [
          "In November 2020 DeepMind's AlphaFold 2 solved the 50-year-old protein structure prediction problem, reaching accuracy comparable to experimental methods at the CASP14 assessment. It could predict how a protein folds from its amino acid sequence, a problem that had stumped biologists for half a century.",
          "This is where the lab's methods left games behind and entered science directly. AlphaFold has since predicted structures for more than 200 million known proteins, with effects on drug discovery, biology, and medicine. The work moved DeepMind from competition results to a contribution that other researchers build on, and it set up the recognition that followed.",
        ],
        links: [
          { label: "AlphaFold 2 solves protein folding", href: "/timeline/alphafold-2-2020" },
          { label: "Demis Hassabis", href: "/person/demis-hassabis" },
          { label: "History of artificial intelligence", href: "/history/history-of-artificial-intelligence" },
        ],
      },
      {
        heading: "Recognition: the 2024 Nobel Prizes",
        body: [
          "In October 2024 AI research received the highest scientific recognition. The Nobel Prize in Chemistry went to Demis Hassabis and John Jumper for AlphaFold, alongside David Baker for computational protein design. In the same week, the Nobel Prize in Physics went to Geoffrey Hinton and John Hopfield for foundational work on neural networks and machine learning.",
          "For DeepMind the chemistry prize closed the loop that started with AlphaFold in 2020, turning a research result into a Nobel-recognized contribution. Hinton used his acceptance to warn about AI risks, which put celebration and caution side by side at the field's most public moment.",
        ],
        links: [
          { label: "Nobel Prizes awarded for AI work", href: "/timeline/nobel-prizes-ai-2024" },
          { label: "Research category", href: "/category/research" },
          { label: "Google organization page", href: "/organization/google" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "deepmind-atari-2013",
      "alphago-2016",
      "alphago-zero-2017",
      "alphastar-2019",
      "alphafold-2-2020",
      "nobel-prizes-ai-2024",
    ],
    relatedTags: ["deepmind", "reinforcement-learning", "games", "go", "self-play"],
    relatedEntities: [
      { type: "person", slug: "demis-hassabis", label: "Demis Hassabis" },
      { type: "organization", slug: "deepmind", label: "DeepMind" },
      { type: "organization", slug: "google", label: "Google" },
    ],
    relatedGuideSlugs: [
      "history-of-artificial-intelligence",
      "history-of-neural-networks",
      "history-of-ai-agents",
    ],
    canonicalPath: "/history/history-of-deepmind",
    faqs: [
      {
        question: "What is the history of DeepMind?",
        answer:
          "DeepMind was founded in London in 2010 and acquired by Google in 2014. Its research moved from a Deep Q-Network that learned Atari games from pixels in 2013, to AlphaGo's defeat of Lee Sedol in 2016 and AlphaGo Zero's self-play mastery in 2017, to AlphaStar reaching Grandmaster level in StarCraft II in 2019, and then to AlphaFold 2 solving protein structure prediction in 2020. That AlphaFold work led to a 2024 Nobel Prize in Chemistry.",
      },
      {
        question: "What has DeepMind achieved?",
        answer:
          "DeepMind built a deep reinforcement learning agent that mastered Atari games from raw pixels (2013), AlphaGo, which beat top Go player Lee Sedol (2016), AlphaGo Zero, which surpassed all prior versions through self-play alone (2017), AlphaStar, which reached Grandmaster level in StarCraft II (2019), and AlphaFold 2, which solved the protein structure prediction problem (2020). In 2024, Demis Hassabis and John Jumper shared the Nobel Prize in Chemistry for AlphaFold.",
      },
      {
        question: "What is AlphaGo?",
        answer:
          "AlphaGo is a Go-playing program built by DeepMind. In March 2016 it defeated Lee Sedol, one of the strongest Go players ever, 4-1 in a five-game match in Seoul, watched by around 200 million people. It combined deep reinforcement learning with Monte Carlo tree search. Its Move 37 in Game 2 was creative enough that experts said no human would have played it. A later version, AlphaGo Zero, learned Go entirely through self-play with no human game data.",
      },
      {
        question: "What is AlphaFold and why does it matter?",
        answer:
          "AlphaFold is a DeepMind system that predicts how a protein folds from its amino acid sequence. In November 2020, AlphaFold 2 solved this 50-year-old problem at the CASP14 assessment, reaching accuracy comparable to experimental methods. It matters because it has since predicted structures for more than 200 million known proteins, affecting drug discovery, biology, and medicine, and it led to the 2024 Nobel Prize in Chemistry for Demis Hassabis and John Jumper.",
      },
      {
        question: "Who owns DeepMind?",
        answer:
          "DeepMind is owned by Google. Founded in London in 2010, the lab was acquired by Google in 2014 for roughly 500 million dollars, shortly after its Deep Q-Network learned to play Atari games from raw pixels. The acquisition signaled Big Tech's move into frontier AI research.",
      },
    ],
  },
  {
    slug: "gpt-timeline",
    title: "GPT Timeline: Every Model from GPT-1 to o3",
    description:
      "A GPT timeline tracing every OpenAI model from GPT-1 in 2018 through GPT-3, ChatGPT, GPT-4, GPT-4o, and the o1 and o3 reasoning models.",
    intro:
      "This GPT timeline follows OpenAI's model lineage from a 117 million parameter research prototype to the reasoning systems of the mid-2020s. The history of GPT models is the history of one idea, pre-train a Transformer on huge amounts of text, pushed to its limits and then extended. Read in order, the releases show how a research method became consumer software and then a new way to spend compute on hard problems.",
    sections: [
      {
        heading: "GPT-1 and the pre-training idea",
        body: [
          "GPT-1 arrived in June 2018 with 117 million parameters. Its contribution was a recipe rather than a product: train a Transformer on vast amounts of unlabeled text using unsupervised pre-training, then fine-tune that base model for specific language tasks. OpenAI showed that a single pre-trained model could be adapted across many natural language problems instead of building a fresh system for each one.",
          "That two-stage approach (pre-train at scale, fine-tune for the task) set the template every later GPT model would follow. GPT-1 was modest on its own, but it established the paradigm that GPT-2 and GPT-3 would scale, and it placed OpenAI on the path that the rest of this timeline traces.",
        ],
        links: [
          { label: "GPT-1 milestone", href: "/timeline/gpt-1-2018" },
          { label: "OpenAI organization page", href: "/organization/openai" },
          { label: "Language model milestones", href: "/tag/language-model" },
        ],
      },
      {
        heading: "GPT-2 and the staged-release controversy",
        body: [
          "OpenAI announced GPT-2 in February 2019 at 1.5 billion parameters, more than ten times the size of GPT-1. The model generated convincing passages of text, and OpenAI initially declined to release the full version, describing it as too dangerous because of the risk of mass-produced fake content. The full model was eventually released in November 2019.",
          "The decision split observers: some read it as responsible caution about the dual-use nature of language models, others as a publicity move. Either way, GPT-2 produced the first major AI safety debate of the large language model era, and the phrase too dangerous to release became a reference point in arguments about how labs should publish powerful models.",
        ],
        links: [
          { label: "GPT-2 milestone", href: "/timeline/gpt-2-2019" },
          { label: "Ilya Sutskever", href: "/person/ilya-sutskever" },
          { label: "Research breakthroughs", href: "/category/research" },
        ],
      },
      {
        heading: "GPT-3 and the scaling leap, then ChatGPT",
        body: [
          "GPT-3 followed in June 2020 with 175 billion parameters, roughly 100 times larger than GPT-2. Without any task-specific fine-tuning, it could write essays, code, and poetry and learn a task from a few examples placed in the prompt, a behavior known as few-shot learning. The API launched in beta and an ecosystem of startups grew on top of it, and the scaling hypothesis (that bigger models would simply get more capable) gained credibility.",
          "The public turn came in November 2022. ChatGPT wrapped a GPT-3.5 model fine-tuned with reinforcement learning from human feedback in a plain chat interface. It reached one million users in five days and 100 million in two months, the fastest-growing consumer application to that point. The model underneath was familiar, but the conversational framing made the capability legible to people who had never touched an API.",
        ],
        links: [
          { label: "GPT-3 milestone", href: "/timeline/gpt-3-2020" },
          { label: "ChatGPT milestone", href: "/timeline/chatgpt-2022" },
          { label: "History of large language models", href: "/history/history-of-large-language-models" },
        ],
      },
      {
        heading: "GPT-4 and the omni models",
        body: [
          "GPT-4, released in March 2023, was multimodal: it accepted both text and images. It passed the bar exam around the 90th percentile, scored 1410 on the SAT, and showed clearly stronger reasoning and reliability than GPT-3.5. Its results on professional exams pushed many industries to take model capability seriously, and Microsoft committed more than 10 billion dollars to OpenAI.",
          "GPT-4o, the omni model, arrived in May 2024. It processed text, audio, images, and video in a single model with near-instant responses, holding spoken conversations with emotional inflection and reacting to what a camera saw in real time. Where GPT-4 raised the reasoning ceiling, GPT-4o made multimodal interaction feel immediate, moving the interface from typed text toward voice and vision.",
        ],
        links: [
          { label: "GPT-4 milestone", href: "/timeline/gpt-4-2023" },
          { label: "GPT-4o milestone", href: "/timeline/gpt-4o-2024" },
          { label: "Multimodal milestones", href: "/tag/multimodal" },
        ],
      },
      {
        heading: "The reasoning turn with o1 and o3",
        body: [
          "In September 2024 OpenAI released o1, a model trained to think before it answers by working through chain-of-thought reasoning at inference time. Instead of producing an answer immediately, o1 spends more compute on multi-step solutions to math, coding, and science problems, trading speed for accuracy and reaching PhD-level results on some scientific reasoning benchmarks. This introduced test-time compute scaling: a model can get smarter by thinking longer, not only by being larger.",
          "o3 followed in 2025 as the successor to o1, with stronger reasoning and state-of-the-art results on many math and coding benchmarks. Paired with GPT-4o for fast conversational work, it gave OpenAI a two-model strategy: a quick responder and a deeper thinker. The reasoning turn marks where the GPT timeline stops being only about larger base models and starts pointing toward agentic systems that plan and work across steps.",
        ],
        links: [
          { label: "OpenAI o1 milestone", href: "/timeline/o1-reasoning-2024" },
          { label: "OpenAI o3 milestone", href: "/timeline/openai-o3-2025" },
          { label: "Reasoning milestones", href: "/tag/reasoning" },
        ],
      },
    ],
    featuredMilestoneIds: [
      "gpt-1-2018",
      "gpt-2-2019",
      "gpt-3-2020",
      "chatgpt-2022",
      "gpt-4-2023",
      "gpt-4o-2024",
      "o1-reasoning-2024",
      "openai-o3-2025",
    ],
    relatedTags: ["gpt", "openai", "language-model", "reasoning", "multimodal"],
    relatedEntities: [
      { type: "organization", slug: "openai", label: "OpenAI" },
      { type: "person", slug: "sam-altman", label: "Sam Altman" },
      { type: "person", slug: "ilya-sutskever", label: "Ilya Sutskever" },
    ],
    canonicalPath: "/history/gpt-timeline",
    faqs: [
      {
        question: "What are the GPT models in order?",
        answer:
          "In release order, OpenAI's GPT line runs GPT-1 (June 2018), GPT-2 (February 2019), GPT-3 (June 2020), the GPT-3.5-based ChatGPT (November 2022), GPT-4 (March 2023), and GPT-4o (May 2024). The reasoning models o1 (September 2024) and o3 (2025) extend the same lineage with chain-of-thought reasoning at inference time.",
      },
      {
        question: "When was GPT-1 released?",
        answer:
          "OpenAI released GPT-1 in June 2018. It had 117 million parameters and showed that a Transformer pre-trained on large amounts of unlabeled text could then be fine-tuned for specific language tasks, establishing the pre-train then fine-tune recipe used by every later GPT model.",
      },
      {
        question: "What is the difference between GPT-3 and GPT-4?",
        answer:
          "GPT-3 (2020) had 175 billion parameters and handled text only, learning tasks from a few examples in the prompt. GPT-4 (2023) was multimodal, accepting both text and images, and was markedly more accurate and reliable. GPT-4 passed the bar exam around the 90th percentile and scored 1410 on the SAT, a large step up in reasoning over the GPT-3.5 generation.",
      },
      {
        question: "What is the difference between GPT-4 and GPT-4o?",
        answer:
          "GPT-4 (March 2023) accepted text and images and raised the ceiling on reasoning and reliability. GPT-4o (May 2024), the omni model, natively processed text, audio, images, and video in one model with near-instant responses, supporting real-time voice conversations and live visual input. GPT-4o's gains were mainly in speed and multimodal interaction rather than raw exam scores.",
      },
      {
        question: "What are OpenAI's o1 and o3 reasoning models?",
        answer:
          "o1 (September 2024) is a model trained to reason step by step at inference time, spending more compute to solve hard math, coding, and science problems and reaching PhD-level results on some benchmarks. o3 (2025) is its successor, with stronger reasoning and state-of-the-art results on many math and coding benchmarks. Together they introduced test-time compute scaling: making a model smarter by letting it think longer rather than only making it larger.",
      },
    ],
    relatedGuideSlugs: [
      "history-of-large-language-models",
      "history-of-openai",
      "history-of-artificial-intelligence",
    ],
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

// Reverse index: which editorial guides feature a given milestone. Lets a
// milestone (spoke) page link back to the hubs that cover it, so spokes are no
// longer editorial orphans.
const editorialPagesByMilestoneId = (() => {
  const index = new Map<string, EditorialPage[]>();
  for (const page of editorialPages) {
    for (const milestoneId of page.featuredMilestoneIds) {
      const list = index.get(milestoneId) ?? [];
      list.push(page);
      index.set(milestoneId, list);
    }
  }
  return index;
})();

export function getEditorialPagesForMilestone(milestoneId: string) {
  return editorialPagesByMilestoneId.get(milestoneId) ?? [];
}

export function getRelatedGuides(page: EditorialPage) {
  return (page.relatedGuideSlugs ?? [])
    .map((slug) => editorialPagesBySlug[slug])
    .filter((guide): guide is EditorialPage => Boolean(guide));
}
