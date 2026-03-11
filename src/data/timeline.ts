/**
 * Comprehensive AI Timeline Data
 * From the earliest origins (~1943) through March 11, 2026
 *
 * Each milestone includes:
 * - year/date: When it happened
 * - title: Short name of the milestone
 * - category: Type of milestone (research, product, cultural, regulation, infrastructure)
 * - people: Key people/organizations involved
 * - description: What happened
 * - impact: Why it mattered / lasting significance
 * - impactLevel: 1-5 scale of how much it "shocked the space"
 * - era: Which AI era it belongs to
 */

export type AIEra =
  | "origins"          // 1943-1955: Theoretical Foundations
  | "birth"            // 1956-1969: Birth of AI
  | "first-winter"     // 1970-1979: First AI Winter
  | "expert-systems"   // 1980-1987: Expert Systems Boom
  | "second-winter"    // 1988-1993: Second AI Winter
  | "emergence"        // 1994-2005: Quiet Emergence
  | "deep-learning"    // 2006-2011: Deep Learning Dawn
  | "breakthrough"     // 2012-2017: Deep Learning Breakthrough
  | "transformer"      // 2018-2021: The Transformer Era
  | "generative"       // 2022-2024: Generative AI Revolution
  | "agentic"          // 2025-2026: The Agentic Era

export type MilestoneCategory =
  | "research"       // Academic/research breakthroughs
  | "product"        // Commercial products and launches
  | "cultural"       // Cultural moments, movies, public awareness
  | "regulation"     // Policy, regulation, governance
  | "infrastructure" // Compute, datasets, platforms
  | "competition"    // Competitions, benchmarks, challenges
  | "open-source"    // Open-source releases

export interface AITimelineMilestone {
  id: string
  year: number
  month?: number
  day?: number
  title: string
  category: MilestoneCategory
  people: string[]
  organizations: string[]
  description: string
  impact: string
  impactLevel: 1 | 2 | 3 | 4 | 5
  era: AIEra
  tags: string[]
  imageUrl?: string
  imageAlt?: string
}

export interface AIEraInfo {
  id: AIEra
  name: string
  yearStart: number
  yearEnd: number
  description: string
  color: string
}

export const eras: AIEraInfo[] = [
  {
    id: "origins",
    name: "Theoretical Foundations",
    yearStart: 1943,
    yearEnd: 1955,
    description: "The mathematical and philosophical groundwork for artificial intelligence was laid by visionaries who dared to ask: can machines think?",
    color: "#4a5568",
  },
  {
    id: "birth",
    name: "The Birth of AI",
    yearStart: 1956,
    yearEnd: 1969,
    description: "AI was officially born as a field, and early programs showed surprising promise — leading to ambitious predictions about machine intelligence.",
    color: "#2b6cb0",
  },
  {
    id: "first-winter",
    name: "First AI Winter",
    yearStart: 1970,
    yearEnd: 1979,
    description: "Reality failed to match the hype. Funding dried up, criticism mounted, and AI entered its first period of disillusionment.",
    color: "#2c5282",
  },
  {
    id: "expert-systems",
    name: "Expert Systems Boom",
    yearStart: 1980,
    yearEnd: 1987,
    description: "Rule-based expert systems brought AI into the corporate world, creating a billion-dollar industry — and reviving neural network research in the background.",
    color: "#9b2c2c",
  },
  {
    id: "second-winter",
    name: "Second AI Winter",
    yearStart: 1988,
    yearEnd: 1993,
    description: "Expert systems proved brittle and expensive. The AI bubble burst again, but foundational work on learning algorithms continued quietly.",
    color: "#553c9a",
  },
  {
    id: "emergence",
    name: "Quiet Emergence",
    yearStart: 1994,
    yearEnd: 2005,
    description: "AI stopped trying to mimic human reasoning and embraced statistical approaches. Machines began beating humans at specific tasks.",
    color: "#2f855a",
  },
  {
    id: "deep-learning",
    name: "Deep Learning Dawn",
    yearStart: 2006,
    yearEnd: 2011,
    description: "Geoffrey Hinton's breakthroughs reignited neural networks. GPU computing made deep networks trainable. The revolution was beginning.",
    color: "#c05621",
  },
  {
    id: "breakthrough",
    name: "Deep Learning Breakthrough",
    yearStart: 2012,
    yearEnd: 2017,
    description: "AlexNet shocked the world. Deep learning conquered image recognition, games, and language. The Transformer architecture changed everything.",
    color: "#d69e2e",
  },
  {
    id: "transformer",
    name: "The Transformer Era",
    yearStart: 2018,
    yearEnd: 2021,
    description: "Transformers scaled to billions of parameters. GPT and BERT redefined NLP. AI began generating text, code, and images that stunned researchers.",
    color: "#e53e3e",
  },
  {
    id: "generative",
    name: "Generative AI Revolution",
    yearStart: 2022,
    yearEnd: 2024,
    description: "ChatGPT brought AI to the masses. Generative AI exploded across every industry. The world woke up to a new technological era.",
    color: "#805ad5",
  },
  {
    id: "agentic",
    name: "The Agentic Era",
    yearStart: 2025,
    yearEnd: 2026,
    description: "AI systems gained autonomy — reasoning, planning, and executing complex tasks. The age of AI agents arrived.",
    color: "#00b5d8",
  },
]

export const milestones: AITimelineMilestone[] = [
  // ═══════════════════════════════════════════════════════════════
  // ERA: THEORETICAL FOUNDATIONS (1943-1955)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "mcculloch-pitts-1943",
    year: 1943,
    title: "First Mathematical Model of Neural Networks",
    category: "research",
    people: ["Warren McCulloch", "Walter Pitts"],
    organizations: ["University of Chicago"],
    description:
      "McCulloch and Pitts published 'A Logical Calculus of Ideas Immanent in Nervous Activity,' creating the first mathematical model of an artificial neuron. They showed that simple binary neurons connected in networks could, in principle, compute any function computable by a Turing machine.",
    impact:
      "Established the theoretical foundation for all neural networks. Every modern AI system traces its conceptual lineage to this paper.",
    impactLevel: 4,
    era: "origins",
    tags: ["neural-networks", "theory", "neuroscience"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Artificial_neural_network.svg/300px-Artificial_neural_network.svg.png",
    imageAlt: "Artificial neural network diagram representing McCulloch-Pitts neuron model",
  },
  {
    id: "turing-test-1950",
    year: 1950,
    title: "Turing's 'Computing Machinery and Intelligence'",
    category: "research",
    people: ["Alan Turing"],
    organizations: ["University of Manchester"],
    description:
      "Alan Turing published his landmark paper in the journal Mind, proposing the 'Imitation Game' (now known as the Turing Test) as a way to evaluate machine intelligence. He asked: 'Can machines think?' and argued the question itself was meaningless — what mattered was whether a machine could convincingly imitate human conversation.",
    impact:
      "Defined the philosophical framework for AI research for decades. The Turing Test remains the most famous benchmark for machine intelligence, even as modern AI has moved beyond it.",
    impactLevel: 5,
    era: "origins",
    tags: ["philosophy", "turing-test", "foundations"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Alan_turing_header.jpg/300px-Alan_turing_header.jpg",
    imageAlt: "Portrait of Alan Turing",
  },
  {
    id: "samuel-checkers-1952",
    year: 1952,
    title: "Samuel's Checkers Program",
    category: "research",
    people: ["Arthur Samuel"],
    organizations: ["IBM"],
    description:
      "Arthur Samuel created a checkers-playing program at IBM that could learn from experience, improving its play over time. He coined the term 'machine learning' to describe programs that learn without being explicitly programmed.",
    impact:
      "First demonstration of machine learning. Coined the term that would define an entire field decades later.",
    impactLevel: 3,
    era: "origins",
    tags: ["machine-learning", "games", "ibm"],
  },

  {
    id: "logic-theorist-1956",
    year: 1956,
    title: "Logic Theorist: The First AI Program",
    category: "research",
    people: ["Allen Newell", "Herbert A. Simon", "Cliff Shaw"],
    organizations: ["RAND Corporation", "Carnegie Tech"],
    description:
      "Newell and Simon created the Logic Theorist, often called the first AI program. It could prove mathematical theorems from Whitehead and Russell's Principia Mathematica — and even found a more elegant proof than the original for one theorem. It was debuted at the Dartmouth Conference.",
    impact:
      "Demonstrated that machines could perform symbolic reasoning — thinking that had been considered uniquely human. Established the paradigm of AI as symbolic computation.",
    impactLevel: 3,
    era: "origins",
    tags: ["symbolic-ai", "theorem-proving", "reasoning"],
  },

  // ═══════════════════════════════════════════════════════════════
  // ERA: THE BIRTH OF AI (1956-1969)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "dartmouth-conference-1956",
    year: 1956,
    month: 6,
    title: "The Dartmouth Conference",
    category: "research",
    people: [
      "John McCarthy",
      "Marvin Minsky",
      "Nathaniel Rochester",
      "Claude Shannon",
    ],
    organizations: ["Dartmouth College", "MIT", "IBM", "Bell Labs"],
    description:
      "A two-month workshop at Dartmouth College where the term 'Artificial Intelligence' was officially coined. The proposal stated: 'Every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it.' This gathering brought together the founders of the field.",
    impact:
      "Founded AI as an academic discipline. The optimism and ambition set at Dartmouth drove decades of research — and the inevitable disappointment when early promises weren't met.",
    impactLevel: 5,
    era: "birth",
    tags: ["founding", "conference", "history"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/John_McCarthy_Stanford.jpg/300px-John_McCarthy_Stanford.jpg",
    imageAlt: "John McCarthy, organizer of the Dartmouth Conference",
  },
  {
    id: "perceptron-1957",
    year: 1957,
    title: "The Perceptron",
    category: "research",
    people: ["Frank Rosenblatt"],
    organizations: ["Cornell Aeronautical Laboratory"],
    description:
      "Frank Rosenblatt built the Mark I Perceptron, the first hardware implementation of an artificial neural network. It could learn to classify simple visual patterns. The New York Times reported it as an 'Electronic Brain' that the Navy expected would 'be able to walk, talk, see, write, reproduce itself and be conscious of its existence.'",
    impact:
      "First practical neural network. The media hype and subsequent backlash (Minsky & Papert's 1969 critique) set a pattern that AI would repeat for decades: overpromise, underdeliver, winter.",
    impactLevel: 4,
    era: "birth",
    tags: ["neural-networks", "hardware", "perception"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frank_Rosenblatt.jpg/300px-Frank_Rosenblatt.jpg",
    imageAlt: "Frank Rosenblatt, inventor of the Perceptron",
  },
  {
    id: "lisp-1958",
    year: 1958,
    title: "LISP Programming Language",
    category: "infrastructure",
    people: ["John McCarthy"],
    organizations: ["MIT"],
    description:
      "John McCarthy created LISP (LISt Processing), a programming language designed specifically for AI research. Its features — recursion, dynamic typing, garbage collection, and homoiconicity — were decades ahead of their time.",
    impact:
      "Became the dominant language of AI research for 30+ years. Introduced programming concepts that influenced every modern language. Still used in some AI applications today.",
    impactLevel: 3,
    era: "birth",
    tags: ["programming", "tools", "infrastructure"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Lisp_logo.svg/300px-Lisp_logo.svg.png",
    imageAlt: "Lisp programming language logo",
  },
  {
    id: "unimate-1961",
    year: 1961,
    title: "Unimate: First Industrial Robot",
    category: "product",
    people: ["George Devol", "Joseph Engelberger"],
    organizations: ["General Motors", "Unimation"],
    description:
      "The first Unimate robot was installed on a General Motors assembly line in New Jersey, performing die-casting and spot-welding tasks. It was the first industrial robot to replace humans on a production line.",
    impact:
      "Launched the industrial robotics revolution. Showed that machines could perform dangerous, repetitive physical tasks reliably.",
    impactLevel: 3,
    era: "birth",
    tags: ["robotics", "manufacturing", "automation"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Robot_polar.svg/300px-Robot_polar.svg.png",
    imageAlt: "Diagram of an industrial robot arm like Unimate",
  },
  {
    id: "eliza-1966",
    year: 1966,
    title: "ELIZA: The First Chatbot",
    category: "research",
    people: ["Joseph Weizenbaum"],
    organizations: ["MIT"],
    description:
      "Joseph Weizenbaum created ELIZA, a program that simulated a Rogerian psychotherapist using simple pattern matching. Despite being purely rule-based with no understanding, users became emotionally attached to it and insisted it truly understood them — a phenomenon Weizenbaum found deeply disturbing.",
    impact:
      "First demonstration of the 'ELIZA effect' — humans' tendency to attribute intelligence to machines. Presaged modern concerns about AI relationships and chatbot attachment, 57 years before ChatGPT.",
    impactLevel: 3,
    era: "birth",
    tags: ["nlp", "chatbot", "psychology"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/ELIZA_conversation.png/300px-ELIZA_conversation.png",
    imageAlt: "ELIZA chatbot conversation example",
  },
  {
    id: "shrdlu-1968",
    year: 1968,
    title: "SHRDLU: Natural Language Understanding",
    category: "research",
    people: ["Terry Winograd"],
    organizations: ["MIT"],
    description:
      "Terry Winograd created SHRDLU, a program that could understand and respond to English commands about a simulated 'blocks world.' Users could ask it to move objects, answer questions about their arrangement, and even understand pronouns and context within its limited domain.",
    impact:
      "Demonstrated that computers could process natural language in context — but only in a tiny, controlled world. Highlighted the enormous gap between narrow and general language understanding.",
    impactLevel: 2,
    era: "birth",
    tags: ["nlp", "reasoning", "knowledge-representation"],
  },
  {
    id: "2001-space-odyssey-1968",
    year: 1968,
    title: "2001: A Space Odyssey — HAL 9000",
    category: "cultural",
    people: ["Stanley Kubrick", "Arthur C. Clarke"],
    organizations: ["MGM"],
    description:
      "Stanley Kubrick's film introduced HAL 9000, an AI that could speak naturally, read lips, play chess, and ultimately turn against its human crew. HAL became the defining pop-culture image of artificial intelligence for generations.",
    impact:
      "Shaped public perception of AI for decades — both its promise (conversational, intelligent) and its danger (autonomous, uncontrollable). Every AI safety discussion still references HAL.",
    impactLevel: 3,
    era: "birth",
    tags: ["film", "culture", "safety"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/HAL9000.svg/300px-HAL9000.svg.png",
    imageAlt: "HAL 9000 from 2001: A Space Odyssey",
  },
  {
    id: "shakey-1969",
    year: 1969,
    title: "Shakey the Robot",
    category: "research",
    people: ["Charles Rosen", "Nils Nilsson"],
    organizations: ["Stanford Research Institute"],
    description:
      "Shakey was the first mobile robot that could reason about its actions. It combined computer vision, natural language processing, and planning to navigate rooms, push objects, and solve simple tasks. It used the A* search algorithm and STRIPS planner.",
    impact:
      "Pioneered robotics planning and reasoning. The A* algorithm it used remains fundamental to pathfinding in games and navigation systems worldwide.",
    impactLevel: 3,
    era: "birth",
    tags: ["robotics", "planning", "computer-vision"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/SRI_Shakey_robot%2C_1969%2C_Computer_History_Museum.jpg/300px-SRI_Shakey_robot%2C_1969%2C_Computer_History_Museum.jpg",
    imageAlt: "Shakey the robot at the Computer History Museum",
  },

  // ═══════════════════════════════════════════════════════════════
  // ERA: FIRST AI WINTER (1970-1979)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "minsky-papert-perceptrons-1969",
    year: 1969,
    title: "Perceptrons: The Book That Killed Neural Networks",
    category: "research",
    people: ["Marvin Minsky", "Seymour Papert"],
    organizations: ["MIT"],
    description:
      "Minsky and Papert published 'Perceptrons,' mathematically proving that single-layer perceptrons could not solve the XOR problem or other non-linearly separable tasks. While technically correct, the book was widely interpreted as proving neural networks were fundamentally limited — though multi-layer networks could solve these problems.",
    impact:
      "Effectively killed neural network research for over a decade. Funding dried up, researchers moved to other approaches. The damage was immense — and the book's conclusions were overgeneralized.",
    impactLevel: 4,
    era: "first-winter",
    tags: ["neural-networks", "criticism", "funding"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Marvin_Minsky_at_OLPCb_%283x4_cropped%29.jpg/300px-Marvin_Minsky_at_OLPCb_%283x4_cropped%29.jpg",
    imageAlt: "Marvin Minsky, co-author of Perceptrons",
  },
  {
    id: "lighthill-report-1973",
    year: 1973,
    title: "The Lighthill Report",
    category: "regulation",
    people: ["James Lighthill"],
    organizations: ["UK Science Research Council"],
    description:
      "British mathematician James Lighthill published a devastating critique of AI research, concluding that the field had failed to deliver on its promises. 'In no part of the field have the discoveries made so far produced the major impact that was then promised.' The report led to massive funding cuts for AI research in the UK.",
    impact:
      "Triggered the first AI Winter. UK AI research was decimated for a decade. Set the precedent for government skepticism about AI hype.",
    impactLevel: 4,
    era: "first-winter",
    tags: ["funding", "criticism", "uk", "policy"],
  },
  {
    id: "backpropagation-theory-1974",
    year: 1974,
    title: "Backpropagation Discovered (Initially Ignored)",
    category: "research",
    people: ["Paul Werbos"],
    organizations: ["Harvard University"],
    description:
      "Paul Werbos described the backpropagation algorithm in his PhD thesis — a method for training multi-layer neural networks by propagating errors backward through the network. However, in the anti-neural-network climate of the 1970s, the work went largely unnoticed.",
    impact:
      "Would later become the single most important algorithm in deep learning when rediscovered by Rumelhart, Hinton, and Williams in 1986. A decade of progress was lost.",
    impactLevel: 3,
    era: "first-winter",
    tags: ["neural-networks", "algorithms", "backpropagation"],
  },

  {
    id: "dendral-1965",
    year: 1965,
    title: "DENDRAL: The First Expert System",
    category: "research",
    people: ["Edward Feigenbaum", "Joshua Lederberg", "Bruce Buchanan"],
    organizations: ["Stanford University"],
    description:
      "DENDRAL automated chemical structure determination from mass spectrometry data. It used heuristic rules from domain experts to solve problems that normally required PhD-level expertise. Its successor Meta-DENDRAL could even generate new rules automatically.",
    impact:
      "Created the expert systems paradigm — encoding domain knowledge in rules to build practical AI. This approach would dominate AI commercially for two decades.",
    impactLevel: 3,
    era: "birth",
    tags: ["expert-systems", "chemistry", "knowledge-engineering"],
  },

  // ═══════════════════════════════════════════════════════════════
  // ERA: EXPERT SYSTEMS BOOM (1980-1987)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "hopfield-networks-1982",
    year: 1982,
    title: "Hopfield Networks: Physics Meets Neural Networks",
    category: "research",
    people: ["John Hopfield"],
    organizations: ["Caltech"],
    description:
      "Physicist John Hopfield showed that a type of recurrent neural network could serve as content-addressable memory, using concepts from statistical physics. The network would converge to stable states that could store and retrieve patterns — connecting neuroscience, physics, and computation.",
    impact:
      "Revived serious interest in neural networks among physicists. Made neural networks respectable again in the scientific community. Hopfield was awarded the 2024 Nobel Prize in Physics for this work.",
    impactLevel: 3,
    era: "expert-systems",
    tags: ["neural-networks", "physics", "theory", "nobel"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/John_J._Hopfield_delivering_his_lecture_at_the_2024_Nobel_Prize_Lectures_in_Stockholm.jpg/300px-John_J._Hopfield_delivering_his_lecture_at_the_2024_Nobel_Prize_Lectures_in_Stockholm.jpg",
    imageAlt: "John Hopfield, inventor of Hopfield networks",
  },
  {
    id: "expert-systems-boom-1980",
    year: 1980,
    title: "R1/XCON: Expert Systems Go Corporate",
    category: "product",
    people: ["John McDermott"],
    organizations: ["Carnegie Mellon University", "Digital Equipment Corporation"],
    description:
      "R1 (later XCON) was deployed at DEC to configure VAX computer systems. It saved DEC an estimated $40 million per year. This commercial success sparked a gold rush: by 1985, companies were spending over $1 billion per year on expert systems.",
    impact:
      "Proved AI could deliver real business value. Launched the expert systems industry and revived AI funding — but also set up the next crash.",
    impactLevel: 3,
    era: "expert-systems",
    tags: ["expert-systems", "business", "commercial"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Symbolics3640_Modified.JPG/300px-Symbolics3640_Modified.JPG",
    imageAlt: "Symbolics Lisp machine used for expert systems",
  },
  {
    id: "fifth-generation-1982",
    year: 1982,
    title: "Japan's Fifth Generation Computer Project",
    category: "infrastructure",
    people: [],
    organizations: ["MITI (Japan)"],
    description:
      "Japan's Ministry of International Trade and Industry launched a 10-year, $850 million project to build 'fifth generation' computers with AI capabilities — parallel processing machines that could understand natural language and reason like humans.",
    impact:
      "Sparked an international AI arms race. The US and UK launched competing initiatives (MCC and Alvey). When the project failed to deliver on its ambitious goals by 1992, it contributed to global AI disillusionment.",
    impactLevel: 3,
    era: "expert-systems",
    tags: ["funding", "japan", "government", "computing"],
  },
  {
    id: "backprop-rediscovery-1986",
    year: 1986,
    title: "Backpropagation Rediscovered",
    category: "research",
    people: ["David Rumelhart", "Geoffrey Hinton", "Ronald Williams"],
    organizations: ["UC San Diego", "Carnegie Mellon University"],
    description:
      "Rumelhart, Hinton, and Williams published 'Learning Representations by Back-propagating Errors' in Nature, demonstrating that backpropagation could train multi-layer neural networks effectively. The same year, the PDP (Parallel Distributed Processing) group published their influential two-volume work on connectionism.",
    impact:
      "Revived neural network research from its decade-long exile. Backpropagation became THE algorithm for training neural networks — it remains the foundation of all deep learning today.",
    impactLevel: 5,
    era: "expert-systems",
    tags: ["neural-networks", "backpropagation", "deep-learning"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Geoffrey_E._Hinton%2C_2024_Nobel_Prize_Laureate_in_Physics_%28cropped1%29.jpg/300px-Geoffrey_E._Hinton%2C_2024_Nobel_Prize_Laureate_in_Physics_%28cropped1%29.jpg",
    imageAlt: "Geoffrey Hinton, pioneer of backpropagation in neural networks",
  },
  {
    id: "nettalk-1987",
    year: 1987,
    title: "NETtalk: Neural Network Learns to Speak",
    category: "research",
    people: ["Terrence Sejnowski", "Charles Rosenberg"],
    organizations: ["Johns Hopkins University"],
    description:
      "NETtalk was a neural network that learned to pronounce English text aloud, starting from babbling sounds and gradually becoming intelligible — mimicking how a child learns to speak. It captured public imagination and demonstrated backpropagation's potential.",
    impact:
      "One of the first compelling public demonstrations of neural network learning. Showed these weren't just mathematical curiosities — they could learn real-world skills.",
    impactLevel: 2,
    era: "expert-systems",
    tags: ["neural-networks", "speech", "demonstration"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e4/NETtalk-Back-propagation.jpg",
    imageAlt: "NETtalk neural network back-propagation diagram",
  },

  // ═══════════════════════════════════════════════════════════════
  // ERA: SECOND AI WINTER (1988-1993)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "ai-winter-2-1988",
    year: 1988,
    title: "The Second AI Winter Begins",
    category: "cultural",
    people: [],
    organizations: [],
    description:
      "The expert systems bubble burst. LISP machine companies collapsed. The DARPA Strategic Computing Initiative was cut. Japan's Fifth Generation project was failing. Expert systems proved brittle, expensive to maintain, and unable to learn. The AI industry lost billions.",
    impact:
      "Another devastating crash for AI. Researchers avoided the term 'AI' entirely, rebranding their work as 'machine learning,' 'computational intelligence,' or 'knowledge systems.' The stigma lasted over a decade.",
    impactLevel: 4,
    era: "second-winter",
    tags: ["ai-winter", "funding", "industry"],
  },
  {
    id: "lenet-1989",
    year: 1989,
    title: "LeNet: Convolutional Neural Networks",
    category: "research",
    people: ["Yann LeCun"],
    organizations: ["AT&T Bell Labs"],
    description:
      "Yann LeCun demonstrated that convolutional neural networks (CNNs) could be trained with backpropagation to recognize handwritten digits. The refined LeNet-5 (1998) achieved 99%+ accuracy on MNIST and was deployed by banks to read checks — running in ATMs for years.",
    impact:
      "Invented the convolutional neural network architecture that would later revolutionize computer vision. LeNet proved neural networks could solve real commercial problems, even during the AI winter.",
    impactLevel: 4,
    era: "second-winter",
    tags: ["cnn", "computer-vision", "deep-learning", "commercial"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/LeNet-5_architecture.svg/300px-LeNet-5_architecture.svg.png",
    imageAlt: "LeNet-5 convolutional neural network architecture",
  },
  {
    id: "reinforcement-learning-1992",
    year: 1992,
    title: "TD-Gammon: Reinforcement Learning Plays Backgammon",
    category: "research",
    people: ["Gerald Tesauro"],
    organizations: ["IBM"],
    description:
      "Gerald Tesauro created TD-Gammon, a neural network that learned to play backgammon at expert level through self-play using temporal difference reinforcement learning. It discovered novel strategies that surprised human experts.",
    impact:
      "Pioneering demonstration of reinforcement learning + neural networks. Foreshadowed AlphaGo's self-play approach by 24 years.",
    impactLevel: 2,
    era: "second-winter",
    tags: ["reinforcement-learning", "games", "neural-networks"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Reinforcement_learning_diagram.svg/300px-Reinforcement_learning_diagram.svg.png",
    imageAlt: "Reinforcement learning agent-environment interaction diagram",
  },

  // ═══════════════════════════════════════════════════════════════
  // ERA: QUIET EMERGENCE (1994-2005)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "svm-1995",
    year: 1995,
    title: "Support Vector Machines",
    category: "research",
    people: ["Vladimir Vapnik", "Corinna Cortes"],
    organizations: ["AT&T Bell Labs"],
    description:
      "Vapnik and Cortes published their work on Support Vector Machines (SVMs), which became the dominant machine learning technique for over a decade. SVMs could find optimal decision boundaries in high-dimensional spaces with strong theoretical guarantees.",
    impact:
      "Dominated machine learning through the 2000s. Showed that statistical learning theory could produce practical, powerful classifiers — keeping ML alive during the neural network drought.",
    impactLevel: 3,
    era: "emergence",
    tags: ["machine-learning", "statistical-learning", "classification"],
  },
  {
    id: "deep-blue-1997",
    year: 1997,
    month: 5,
    title: "Deep Blue Defeats Kasparov",
    category: "competition",
    people: ["Garry Kasparov"],
    organizations: ["IBM"],
    description:
      "IBM's Deep Blue defeated world chess champion Garry Kasparov in a six-game match (3.5-2.5). It was the first time a reigning world champion lost a match to a computer under standard tournament conditions. Deep Blue evaluated 200 million positions per second using brute-force search and hand-crafted evaluation.",
    impact:
      "A watershed cultural moment. Front-page news worldwide. Proved machines could beat the best humans at the 'ultimate intellectual game.' But it was brute force, not intelligence — a distinction that mattered.",
    impactLevel: 5,
    era: "emergence",
    tags: ["games", "chess", "ibm", "milestone"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Deep_Blue.jpg/300px-Deep_Blue.jpg",
    imageAlt: "IBM Deep Blue chess computer",
  },
  {
    id: "lstm-1997",
    year: 1997,
    title: "Long Short-Term Memory (LSTM)",
    category: "research",
    people: ["Sepp Hochreiter", "Jürgen Schmidhuber"],
    organizations: ["Technical University of Munich"],
    description:
      "Hochreiter and Schmidhuber published the LSTM architecture, solving the vanishing gradient problem that plagued recurrent neural networks. LSTMs could learn long-range dependencies in sequential data by maintaining a memory cell with gates that controlled information flow.",
    impact:
      "Became the most important recurrent architecture for two decades. Powered speech recognition, machine translation, and text generation until Transformers replaced them. The most-cited neural network paper of the 20th century.",
    impactLevel: 4,
    era: "emergence",
    tags: ["neural-networks", "rnn", "sequential", "nlp"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/NN_LSTM-Cell_v2.svg/300px-NN_LSTM-Cell_v2.svg.png",
    imageAlt: "LSTM recurrent neural network cell diagram",
  },
  {
    id: "roomba-2002",
    year: 2002,
    title: "iRobot Roomba",
    category: "product",
    people: ["Colin Angle", "Helen Greiner", "Rodney Brooks"],
    organizations: ["iRobot"],
    description:
      "iRobot released the Roomba, a robotic vacuum cleaner that used sensors and algorithms to autonomously navigate and clean floors. At $200, it brought autonomous robots into millions of homes.",
    impact:
      "First mass-market autonomous robot. Proved that AI-powered robots could be consumer products, not just research curiosities. Sold millions of units.",
    impactLevel: 2,
    era: "emergence",
    tags: ["robotics", "consumer", "product"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Roomba_original.jpg/300px-Roomba_original.jpg",
    imageAlt: "Original iRobot Roomba vacuum robot",
  },
  {
    id: "darpa-grand-challenge-2004",
    year: 2004,
    title: "DARPA Grand Challenge: Self-Driving Cars Begin",
    category: "competition",
    people: ["Sebastian Thrun"],
    organizations: ["DARPA", "Stanford University", "Carnegie Mellon University"],
    description:
      "DARPA offered $1M for an autonomous vehicle to complete a 150-mile desert course. In 2004, no vehicle finished — the best went 7.4 miles. In 2005, Stanford's 'Stanley' (led by Sebastian Thrun) won by completing the course in under 7 hours. The 2007 Urban Challenge tested autonomous driving in traffic.",
    impact:
      "Launched the self-driving car revolution. Sebastian Thrun went on to lead Google's self-driving car project (now Waymo). Every autonomous vehicle company traces back to these challenges.",
    impactLevel: 4,
    era: "emergence",
    tags: ["autonomous-vehicles", "robotics", "competition"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Stanley2.JPG/300px-Stanley2.JPG",
    imageAlt: "Stanley, the autonomous vehicle that won the 2005 DARPA Grand Challenge",
  },

  // ═══════════════════════════════════════════════════════════════
  // ERA: DEEP LEARNING DAWN (2006-2011)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "deep-belief-networks-2006",
    year: 2006,
    title: "Deep Belief Networks: Hinton Revives Deep Learning",
    category: "research",
    people: ["Geoffrey Hinton", "Simon Osindero", "Yee-Whye Teh"],
    organizations: ["University of Toronto"],
    description:
      "Geoffrey Hinton published 'A Fast Learning Algorithm for Deep Belief Nets,' showing that deep neural networks could be effectively trained by pre-training each layer as a restricted Boltzmann machine. This solved the long-standing problem of training networks with many layers.",
    impact:
      "Reignited the deep learning revolution. Hinton proved that deep networks weren't dead — they just needed better training techniques. This paper is considered the starting gun for modern deep learning.",
    impactLevel: 5,
    era: "deep-learning",
    tags: ["deep-learning", "neural-networks", "training"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Deep_belief_net.svg/300px-Deep_belief_net.svg.png",
    imageAlt: "Deep belief network architecture diagram",
  },
  {
    id: "netflix-prize-2006",
    year: 2006,
    title: "The Netflix Prize",
    category: "competition",
    people: [],
    organizations: ["Netflix"],
    description:
      "Netflix offered $1 million to anyone who could improve their recommendation algorithm by 10%. The competition attracted thousands of teams and ran for 3 years (won in 2009). It popularized collaborative filtering, matrix factorization, and ensemble methods.",
    impact:
      "Democratized machine learning competition. Popularized the idea of data science as a competitive field. Directly inspired Kaggle (founded 2010), which became the world's largest ML competition platform.",
    impactLevel: 3,
    era: "deep-learning",
    tags: ["competition", "recommendation", "data-science"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Netflix_prize.jpg",
    imageAlt: "Netflix Prize competition announcement",
  },
  {
    id: "imagenet-2009",
    year: 2009,
    title: "ImageNet: The Dataset That Changed Everything",
    category: "infrastructure",
    people: ["Fei-Fei Li"],
    organizations: ["Stanford University", "Princeton University"],
    description:
      "Fei-Fei Li and her team created ImageNet, a dataset of over 14 million hand-labeled images in 20,000+ categories. Starting in 2010, the ImageNet Large Scale Visual Recognition Challenge (ILSVRC) became the benchmark for computer vision progress.",
    impact:
      "Provided the fuel for the deep learning revolution in computer vision. AlexNet's 2012 victory on ImageNet was the 'Big Bang' of modern AI — and it wouldn't have happened without this dataset.",
    impactLevel: 4,
    era: "deep-learning",
    tags: ["datasets", "computer-vision", "benchmark"],
  },
  {
    id: "gpu-computing-2009",
    year: 2009,
    title: "GPU Computing for Neural Networks",
    category: "infrastructure",
    people: ["Andrew Ng"],
    organizations: ["Stanford University", "NVIDIA"],
    description:
      "Researchers including Andrew Ng demonstrated that GPUs (graphics processing units) could train neural networks 10-70x faster than CPUs. NVIDIA's CUDA platform made GPU programming accessible. This hardware breakthrough removed the computational bottleneck that had held back deep learning.",
    impact:
      "Without GPUs, deep learning would have remained impractical. This hardware democratization was as important as any algorithmic breakthrough. NVIDIA would become the most valuable company in the world partly because of this shift.",
    impactLevel: 4,
    era: "deep-learning",
    tags: ["hardware", "gpu", "infrastructure", "compute"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Nvidia_CUDA_Logo.jpg/300px-Nvidia_CUDA_Logo.jpg",
    imageAlt: "NVIDIA CUDA GPU computing logo",
  },
  {
    id: "watson-jeopardy-2011",
    year: 2011,
    month: 2,
    title: "IBM Watson Wins Jeopardy!",
    category: "competition",
    people: ["Ken Jennings", "Brad Rutter"],
    organizations: ["IBM"],
    description:
      "IBM's Watson system defeated the two greatest Jeopardy! champions, Ken Jennings and Brad Rutter, in a televised match. Watson used natural language processing, information retrieval, and machine learning to understand nuanced questions with puns and wordplay.",
    impact:
      "Massive media event that brought AI back into public consciousness. Ken Jennings famously wrote 'I, for one, welcome our new computer overlords.' However, IBM's attempt to commercialize Watson largely failed.",
    impactLevel: 3,
    era: "deep-learning",
    tags: ["nlp", "ibm", "competition", "cultural"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/IBM_Watson.PNG/300px-IBM_Watson.PNG",
    imageAlt: "IBM Watson computer system",
  },
  {
    id: "siri-2011",
    year: 2011,
    month: 10,
    title: "Apple Launches Siri",
    category: "product",
    people: [],
    organizations: ["Apple"],
    description:
      "Apple introduced Siri as a built-in feature of the iPhone 4S — the first major voice assistant integrated into a mainstream consumer device. Users could ask questions, set reminders, and control their phone with natural speech.",
    impact:
      "Brought AI into hundreds of millions of pockets overnight. Normalized the idea of talking to a computer. Triggered the voice assistant arms race (Google Assistant, Alexa, Cortana).",
    impactLevel: 3,
    era: "deep-learning",
    tags: ["voice-assistant", "product", "consumer", "nlp"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Logo_Apple_Siri_iOS_2024.svg/300px-Logo_Apple_Siri_iOS_2024.svg.png",
    imageAlt: "Apple Siri voice assistant logo",
  },

  // ═══════════════════════════════════════════════════════════════
  // ERA: DEEP LEARNING BREAKTHROUGH (2012-2017)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "alexnet-2012",
    year: 2012,
    month: 9,
    title: "AlexNet: The ImageNet Moment",
    category: "research",
    people: ["Alex Krizhevsky", "Ilya Sutskever", "Geoffrey Hinton"],
    organizations: ["University of Toronto"],
    description:
      "AlexNet, a deep convolutional neural network, won the ImageNet competition by a staggering margin — reducing the error rate from 26% to 16%. Trained on two NVIDIA GTX 580 GPUs, it was dramatically deeper and more powerful than previous entries. The AI community was stunned.",
    impact:
      "THE inflection point of modern AI. AlexNet proved deep learning worked at scale and obliterated traditional computer vision overnight. Every major AI company traces its current approach to this moment. Ilya Sutskever went on to co-found OpenAI.",
    impactLevel: 5,
    era: "breakthrough",
    tags: ["deep-learning", "computer-vision", "imagenet", "gpu"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/AlexNet_block_diagram.svg/300px-AlexNet_block_diagram.svg.png",
    imageAlt: "AlexNet deep neural network architecture diagram",
  },
  {
    id: "word2vec-2013",
    year: 2013,
    title: "Word2Vec: Words as Vectors",
    category: "research",
    people: ["Tomas Mikolov"],
    organizations: ["Google"],
    description:
      "Google researchers published Word2Vec, showing that neural networks could learn meaningful vector representations of words from large text corpora. Famous example: vector('King') - vector('Man') + vector('Woman') ≈ vector('Queen'). Words with similar meanings clustered together in vector space.",
    impact:
      "Revolutionized NLP by giving computers a way to understand word meaning through geometry. Word embeddings became the foundation for all subsequent NLP breakthroughs, leading directly to the Transformer revolution.",
    impactLevel: 3,
    era: "breakthrough",
    tags: ["nlp", "embeddings", "representation-learning"],
  },
  {
    id: "deepmind-atari-2013",
    year: 2013,
    month: 12,
    title: "DeepMind's DQN Masters Atari Games",
    category: "research",
    people: ["Volodymyr Mnih", "Demis Hassabis"],
    organizations: ["DeepMind"],
    description:
      "DeepMind demonstrated a deep reinforcement learning agent (Deep Q-Network) that learned to play Atari 2600 games directly from pixel inputs, achieving superhuman performance on many games with no task-specific engineering. Google acquired DeepMind for ~$500 million shortly after.",
    impact:
      "Proved that deep learning + reinforcement learning could learn complex strategies from raw sensory data. Triggered the $500M Google acquisition that signaled Big Tech's aggressive entry into AI research.",
    impactLevel: 4,
    era: "breakthrough",
    tags: ["reinforcement-learning", "deep-learning", "games", "deepmind"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Google_DeepMind_logo.svg/300px-Google_DeepMind_logo.svg.png",
    imageAlt: "Google DeepMind logo",
  },
  {
    id: "gans-2014",
    year: 2014,
    month: 6,
    title: "Generative Adversarial Networks (GANs)",
    category: "research",
    people: ["Ian Goodfellow"],
    organizations: ["Université de Montréal"],
    description:
      "Ian Goodfellow introduced GANs — two neural networks (generator and discriminator) competing against each other, one creating fake data and the other trying to detect it. The concept allegedly came to him during a bar conversation. Yann LeCun called GANs 'the most interesting idea in the last 10 years in ML.'",
    impact:
      "Launched the generative AI revolution. GANs could create photorealistic faces, art, and data. Deepfakes, face generation, image editing, data augmentation — all trace back to this paper.",
    impactLevel: 4,
    era: "breakthrough",
    tags: ["generative", "neural-networks", "image-generation"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Generative_adversarial_network.svg/300px-Generative_adversarial_network.svg.png",
    imageAlt: "Generative Adversarial Network architecture diagram",
  },
  {
    id: "alexa-2014",
    year: 2014,
    month: 11,
    title: "Amazon Echo & Alexa",
    category: "product",
    people: [],
    organizations: ["Amazon"],
    description:
      "Amazon launched the Echo smart speaker with Alexa voice assistant, creating an entirely new product category. Alexa could play music, control smart home devices, answer questions, and run third-party 'skills.' It brought always-on AI into the living room.",
    impact:
      "Created the smart speaker market (100M+ units sold by 2019). Pioneered the concept of ambient computing — AI that's always listening and ready to help. Raised privacy concerns that persist today.",
    impactLevel: 3,
    era: "breakthrough",
    tags: ["voice-assistant", "product", "smart-home"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Amazon_Alexa_Logo_2024.svg/300px-Amazon_Alexa_Logo_2024.svg.png",
    imageAlt: "Amazon Alexa voice assistant logo",
  },
  {
    id: "openai-founded-2015",
    year: 2015,
    month: 12,
    title: "OpenAI Founded",
    category: "infrastructure",
    people: ["Sam Altman", "Elon Musk", "Ilya Sutskever", "Greg Brockman"],
    organizations: ["OpenAI"],
    description:
      "OpenAI was founded as a non-profit AI research lab with $1 billion in committed funding, aiming to ensure artificial general intelligence benefits all of humanity. Co-founded by Sam Altman (Y Combinator president), Elon Musk, and top researchers including Ilya Sutskever from Google Brain.",
    impact:
      "Created the organization that would produce GPT-2, GPT-3, GPT-4, DALL-E, and ChatGPT — arguably the most influential AI company of the 2020s. The non-profit-to-capped-profit transition would later become one of tech's most controversial governance stories.",
    impactLevel: 4,
    era: "breakthrough",
    tags: ["organization", "founding", "openai"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/300px-OpenAI_logo_2025_%28symbol%29.svg.png",
    imageAlt: "OpenAI logo",
  },
  {
    id: "resnet-2015",
    year: 2015,
    month: 12,
    title: "ResNet: Deeper Than Ever",
    category: "research",
    people: ["Kaiming He", "Xiangyu Zhang", "Shaoqing Ren", "Jian Sun"],
    organizations: ["Microsoft Research"],
    description:
      "Microsoft Research introduced ResNet with skip connections (residual connections), enabling the training of networks with 152+ layers — 8x deeper than previous networks. ResNet won ImageNet 2015 with 3.57% error, surpassing human-level performance (5.1%) for the first time.",
    impact:
      "First AI system to beat humans at large-scale image recognition. Residual connections became a fundamental building block in virtually all deep architectures, including Transformers.",
    impactLevel: 4,
    era: "breakthrough",
    tags: ["deep-learning", "computer-vision", "architecture"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/ResBlock.png/300px-ResBlock.png",
    imageAlt: "Residual network skip connection block diagram",
  },
  {
    id: "tensorflow-2015",
    year: 2015,
    month: 11,
    title: "TensorFlow Open-Sourced",
    category: "open-source",
    people: ["Jeff Dean"],
    organizations: ["Google Brain"],
    description:
      "Google open-sourced TensorFlow, its internal machine learning framework. This gave every researcher and developer access to the same tools Google used internally. PyTorch (Facebook, 2016) followed, creating a healthy competition that accelerated the entire field.",
    impact:
      "Democratized deep learning. Anyone with a laptop could now build state-of-the-art models. Accelerated AI research exponentially by removing infrastructure barriers.",
    impactLevel: 3,
    era: "breakthrough",
    tags: ["open-source", "tools", "infrastructure", "framework"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/TensorFlow_logo.svg/300px-TensorFlow_logo.svg.png",
    imageAlt: "TensorFlow machine learning framework logo",
  },
  {
    id: "alphago-2016",
    year: 2016,
    month: 3,
    title: "AlphaGo Defeats Lee Sedol",
    category: "competition",
    people: ["Demis Hassabis", "David Silver", "Lee Sedol"],
    organizations: ["DeepMind", "Google"],
    description:
      "DeepMind's AlphaGo defeated Lee Sedol, one of the greatest Go players ever, 4-1 in a five-game match in Seoul. Go has more possible positions than atoms in the universe — brute force was impossible. AlphaGo used deep reinforcement learning and Monte Carlo tree search. In Game 2, AlphaGo played Move 37 — a move so creative that experts called it 'beautiful' and 'not a human move.'",
    impact:
      "Arguably the most shocking AI moment since Deep Blue. Go was considered decades away from being solved. Move 37 showed AI could be creative, not just efficient. 200 million people watched. Lee Sedol later retired from Go, saying 'AI cannot be defeated.'",
    impactLevel: 5,
    era: "breakthrough",
    tags: ["games", "go", "reinforcement-learning", "deepmind"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/FloorGoban.JPG/300px-FloorGoban.JPG",
    imageAlt: "Go board game, the game AlphaGo mastered",
  },
  {
    id: "transformer-2017",
    year: 2017,
    month: 6,
    title: "Attention Is All You Need: The Transformer",
    category: "research",
    people: [
      "Ashish Vaswani",
      "Noam Shazeer",
      "Niki Parmar",
      "Jakob Uszkoreit",
      "Llion Jones",
      "Aidan Gomez",
      "Łukasz Kaiser",
      "Illia Polosukhin",
    ],
    organizations: ["Google Brain", "Google Research"],
    description:
      "Eight researchers at Google published 'Attention Is All You Need,' introducing the Transformer architecture. It replaced recurrence with self-attention mechanisms that could process entire sequences in parallel. The paper's title was deliberately bold — and proved prescient.",
    impact:
      "The single most important AI paper of the 2010s. Transformers are the architecture behind GPT, BERT, Claude, Gemini, Llama, DALL-E, Stable Diffusion, and virtually every frontier AI system. Several co-authors went on to found major AI companies (Cohere, Adept, Character.AI, Essential AI).",
    impactLevel: 5,
    era: "breakthrough",
    tags: [
      "transformer",
      "attention",
      "architecture",
      "nlp",
      "foundational",
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/The-Transformer-model-architecture.png/300px-The-Transformer-model-architecture.png",
    imageAlt: "The Transformer model architecture diagram from Attention Is All You Need",
  },
  {
    id: "alphago-zero-2017",
    year: 2017,
    month: 10,
    title: "AlphaGo Zero: Learning From Scratch",
    category: "research",
    people: ["David Silver"],
    organizations: ["DeepMind"],
    description:
      "AlphaGo Zero achieved superhuman Go performance with ZERO human knowledge — no training data from human games, no hand-crafted features. It learned entirely through self-play, and within 40 days surpassed all previous versions, including the one that beat Lee Sedol.",
    impact:
      "Demonstrated that AI could surpass all human knowledge in a domain starting from nothing. Raised profound questions about the nature of human expertise and whether AI could discover strategies humans never imagined.",
    impactLevel: 4,
    era: "breakthrough",
    tags: ["reinforcement-learning", "self-play", "deepmind", "go"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/FloorGoban.JPG/300px-FloorGoban.JPG",
    imageAlt: "Go board representing AlphaGo Zero's self-play mastery",
  },

  // ═══════════════════════════════════════════════════════════════
  // ERA: THE TRANSFORMER ERA (2018-2021)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "bert-2018",
    year: 2018,
    month: 10,
    title: "BERT: Bidirectional Language Understanding",
    category: "research",
    people: ["Jacob Devlin"],
    organizations: ["Google AI"],
    description:
      "Google published BERT (Bidirectional Encoder Representations from Transformers), which could understand language context from both directions simultaneously. BERT shattered records on 11 NLP benchmarks. Google integrated it into Search, affecting 10% of all queries.",
    impact:
      "Transformed NLP overnight. Pre-training + fine-tuning became the dominant paradigm. BERT showed that large language models, properly trained, could understand nuanced language in ways that shocked the field.",
    impactLevel: 4,
    era: "transformer",
    tags: ["transformer", "nlp", "pre-training", "google"],
  },
  {
    id: "gpt-1-2018",
    year: 2018,
    month: 6,
    title: "GPT-1: Generative Pre-training",
    category: "research",
    people: ["Alec Radford"],
    organizations: ["OpenAI"],
    description:
      "OpenAI released GPT-1, demonstrating that a Transformer trained on vast amounts of text using unsupervised pre-training could then be fine-tuned for specific NLP tasks. With 117 million parameters, it showed the potential of scaling language models.",
    impact:
      "Established the GPT paradigm: unsupervised pre-training at scale, then fine-tuning. Set the foundation for GPT-2, GPT-3, and the entire generative AI revolution.",
    impactLevel: 3,
    era: "transformer",
    tags: ["gpt", "openai", "language-model", "pre-training"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/300px-OpenAI_logo_2025_%28symbol%29.svg.png",
    imageAlt: "OpenAI logo",
  },
  {
    id: "gpt-2-2019",
    year: 2019,
    month: 2,
    title: "GPT-2: 'Too Dangerous to Release'",
    category: "research",
    people: ["Alec Radford"],
    organizations: ["OpenAI"],
    description:
      "OpenAI announced GPT-2 (1.5 billion parameters) but initially refused to release the full model, calling it 'too dangerous' due to its ability to generate convincing fake text. The decision was controversial — some praised the caution, others called it a publicity stunt. The full model was eventually released in November 2019.",
    impact:
      "First major AI safety controversy in the LLM era. Brought public attention to the dual-use nature of AI language models. The 'too dangerous to release' framing became a defining moment in AI safety discourse.",
    impactLevel: 3,
    era: "transformer",
    tags: ["gpt", "openai", "safety", "language-model"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/GPT2-talks-about-GPT2.png/300px-GPT2-talks-about-GPT2.png",
    imageAlt: "GPT-2 language model generating text about itself",
  },
  {
    id: "alphastar-2019",
    year: 2019,
    month: 1,
    title: "AlphaStar Masters StarCraft II",
    category: "competition",
    people: [],
    organizations: ["DeepMind"],
    description:
      "DeepMind's AlphaStar reached Grandmaster level in StarCraft II, a real-time strategy game requiring long-term planning, deception, and split-second tactics with incomplete information — far more complex than Go or chess.",
    impact:
      "Demonstrated AI could handle real-time, imperfect-information, multi-agent environments. A major step toward AI that can operate in the messy, complex real world.",
    impactLevel: 3,
    era: "transformer",
    tags: ["games", "reinforcement-learning", "deepmind", "real-time"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Google_DeepMind_logo.svg/300px-Google_DeepMind_logo.svg.png",
    imageAlt: "Google DeepMind logo, creators of AlphaStar",
  },
  {
    id: "gpt-3-2020",
    year: 2020,
    month: 6,
    title: "GPT-3: The 175 Billion Parameter Leap",
    category: "research",
    people: ["Tom Brown"],
    organizations: ["OpenAI"],
    description:
      "OpenAI released GPT-3 with 175 billion parameters — 100x larger than GPT-2. Without any fine-tuning, GPT-3 could write essays, code, poetry, translate languages, and answer questions through 'few-shot learning' (learning from just a few examples in the prompt). The API launched in beta, enabling thousands of applications.",
    impact:
      "A paradigm shift. GPT-3 showed that sheer scale could produce emergent capabilities no one predicted. It spawned an entire ecosystem of AI startups building on the API. The 'scaling hypothesis' — that bigger models would get smarter — gained enormous credibility.",
    impactLevel: 5,
    era: "transformer",
    tags: ["gpt", "openai", "scaling", "language-model", "api"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/300px-OpenAI_logo_2025_%28symbol%29.svg.png",
    imageAlt: "OpenAI logo",
  },
  {
    id: "alphafold-2-2020",
    year: 2020,
    month: 11,
    title: "AlphaFold 2: Protein Folding Solved",
    category: "research",
    people: ["John Jumper", "Demis Hassabis"],
    organizations: ["DeepMind"],
    description:
      "DeepMind's AlphaFold 2 solved the 50-year-old protein structure prediction problem, achieving accuracy comparable to experimental methods at CASP14. It could predict how proteins fold from their amino acid sequences — a problem that had stumped biologists for half a century.",
    impact:
      "Perhaps the most scientifically significant AI achievement ever. AlphaFold has since predicted structures for nearly all known proteins (200M+). Revolutionized drug discovery, biology, and medicine. Led to the 2024 Nobel Prize in Chemistry.",
    impactLevel: 5,
    era: "transformer",
    tags: ["science", "biology", "protein-folding", "deepmind", "nobel"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Protein_structure_%28full%29.png/300px-Protein_structure_%28full%29.png",
    imageAlt: "Protein structure visualization representing AlphaFold's predictions",
  },
  {
    id: "dalle-2021",
    year: 2021,
    month: 1,
    title: "DALL-E: Text to Image Generation",
    category: "research",
    people: [],
    organizations: ["OpenAI"],
    description:
      "OpenAI unveiled DALL-E, a model that could generate images from text descriptions — 'an armchair in the shape of an avocado' became iconic. Built on GPT-3's architecture adapted for images, it showed that language models could bridge the gap between text and visual creativity.",
    impact:
      "Launched the text-to-image revolution. Showed AI could be genuinely creative. Set the stage for DALL-E 2, Midjourney, and Stable Diffusion — the tools that brought AI art to the mainstream.",
    impactLevel: 4,
    era: "transformer",
    tags: ["image-generation", "generative", "multimodal", "openai"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/DALL-E_2_artificial_intelligence_digital_image_generated_photo.jpg/300px-DALL-E_2_artificial_intelligence_digital_image_generated_photo.jpg",
    imageAlt: "AI-generated image by DALL-E",
  },
  {
    id: "anthropic-founded-2021",
    year: 2021,
    title: "Anthropic Founded",
    category: "infrastructure",
    people: ["Dario Amodei", "Daniela Amodei"],
    organizations: ["Anthropic"],
    description:
      "Former OpenAI VP of Research Dario Amodei and his sister Daniela, along with several other OpenAI researchers, founded Anthropic — an AI safety company focused on building reliable, interpretable, and steerable AI systems.",
    impact:
      "Created one of the leading frontier AI labs with safety at its core. Anthropic would develop Constitutional AI and the Claude model family, becoming a major force in responsible AI development.",
    impactLevel: 3,
    era: "transformer",
    tags: ["organization", "founding", "anthropic", "safety"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Anthropic_logo.svg/300px-Anthropic_logo.svg.png",
    imageAlt: "Anthropic AI safety company logo",
  },
  {
    id: "github-copilot-2021",
    year: 2021,
    month: 6,
    title: "GitHub Copilot: AI Writes Code",
    category: "product",
    people: [],
    organizations: ["GitHub", "OpenAI", "Microsoft"],
    description:
      "GitHub launched Copilot as a technical preview — an AI pair programmer powered by OpenAI Codex that could autocomplete entire functions, write boilerplate, and suggest code from natural language comments. It was trained on billions of lines of public code.",
    impact:
      "First AI coding assistant to go mainstream. Changed how millions of developers write code. Sparked debates about code copyright, AI authorship, and the future of software engineering. Over 1M developers adopted it in the first year.",
    impactLevel: 4,
    era: "transformer",
    tags: ["coding", "developer-tools", "product", "openai"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/GitHub_Copilot_logo.svg/300px-GitHub_Copilot_logo.svg.png",
    imageAlt: "GitHub Copilot AI coding assistant logo",
  },

  // ═══════════════════════════════════════════════════════════════
  // ERA: GENERATIVE AI REVOLUTION (2022-2024)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "stable-diffusion-2022",
    year: 2022,
    month: 8,
    title: "Stable Diffusion: Open-Source Image Generation",
    category: "open-source",
    people: ["Emad Mostaque"],
    organizations: ["Stability AI", "CompVis (LMU Munich)", "Runway"],
    description:
      "Stable Diffusion was released as a fully open-source text-to-image model that could run on consumer hardware. Unlike DALL-E (API-only), anyone could download and run it locally. The model and weights were free. An explosion of community modifications, fine-tunes, and applications followed.",
    impact:
      "Democratized AI image generation overnight. Created an entire open-source ecosystem (LoRA, ControlNet, community models). Triggered the AI art revolution and massive copyright debates. Changed the art, design, and creative industries permanently.",
    impactLevel: 4,
    era: "generative",
    tags: ["image-generation", "open-source", "diffusion", "creative"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Astronaut_Riding_a_Horse_%28SD3.5%29.webp/300px-Astronaut_Riding_a_Horse_%28SD3.5%29.webp.png",
    imageAlt: "Astronaut riding a horse, iconic Stable Diffusion generated image",
  },
  {
    id: "chatgpt-2022",
    year: 2022,
    month: 11,
    day: 30,
    title: "ChatGPT: AI Goes Mainstream",
    category: "product",
    people: ["Sam Altman"],
    organizations: ["OpenAI"],
    description:
      "OpenAI released ChatGPT, a conversational AI based on GPT-3.5 fine-tuned with RLHF (Reinforcement Learning from Human Feedback). It reached 1 million users in 5 days and 100 million in 2 months — the fastest-growing consumer application in history. People used it to write emails, debug code, brainstorm ideas, and a thousand other tasks.",
    impact:
      "THE defining moment of the AI era. ChatGPT didn't just introduce AI to the public — it made AI feel personal, useful, and immediate. It triggered a global AI gold rush, billions in investment, and fundamentally changed how the world thinks about technology, work, and intelligence.",
    impactLevel: 5,
    era: "generative",
    tags: [
      "chatbot",
      "openai",
      "rlhf",
      "consumer",
      "mainstream",
      "cultural-moment",
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/300px-OpenAI_logo_2025_%28symbol%29.svg.png",
    imageAlt: "OpenAI logo, creators of ChatGPT",
  },
  {
    id: "gpt-4-2023",
    year: 2023,
    month: 3,
    title: "GPT-4: Multimodal Intelligence",
    category: "research",
    people: [],
    organizations: ["OpenAI"],
    description:
      "OpenAI released GPT-4, a multimodal model that could understand both text and images. It passed the bar exam (90th percentile), scored 1410 on the SAT, and demonstrated remarkably nuanced reasoning. It was a massive leap from GPT-3.5 in accuracy, safety, and capability.",
    impact:
      "Redefined what AI could do. GPT-4's performance on professional exams forced every industry to reckon with AI's capabilities. Microsoft invested $10B+ in OpenAI. The AI arms race between companies intensified dramatically.",
    impactLevel: 5,
    era: "generative",
    tags: ["gpt", "openai", "multimodal", "reasoning"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/300px-OpenAI_logo_2025_%28symbol%29.svg.png",
    imageAlt: "OpenAI logo",
  },
  {
    id: "claude-2023",
    year: 2023,
    month: 3,
    title: "Claude: Constitutional AI",
    category: "product",
    people: ["Dario Amodei", "Daniela Amodei"],
    organizations: ["Anthropic"],
    description:
      "Anthropic released Claude, an AI assistant built with Constitutional AI (CAI) — a novel approach where the model is trained to follow a set of principles rather than just optimizing for human preference ratings. Anthropic, founded by former OpenAI researchers, positioned Claude as the safety-focused alternative.",
    impact:
      "Established Anthropic as a major AI lab and introduced a new paradigm for AI alignment. Constitutional AI showed there were alternatives to pure RLHF for making models safe and helpful. Claude became a leading AI assistant.",
    impactLevel: 4,
    era: "generative",
    tags: ["anthropic", "safety", "constitutional-ai", "assistant"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Anthropic_logo.svg/300px-Anthropic_logo.svg.png",
    imageAlt: "Anthropic logo, creators of Claude",
  },
  {
    id: "llama-2-2023",
    year: 2023,
    month: 7,
    title: "Llama 2: Meta Opens the Floodgates",
    category: "open-source",
    people: ["Mark Zuckerberg"],
    organizations: ["Meta"],
    description:
      "Meta released Llama 2, a family of open-source large language models (7B, 13B, 70B parameters) with a permissive license allowing commercial use. This gave every company and researcher access to a frontier-quality model they could customize, deploy, and build upon.",
    impact:
      "Transformed the LLM landscape. Open-source models exploded — thousands of fine-tunes appeared within weeks. Proved that open-source AI could compete with closed models. Forced a rethinking of the 'API-only' business model.",
    impactLevel: 4,
    era: "generative",
    tags: ["open-source", "meta", "language-model", "commercial"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Meta_AI_Logo_%28Ring_Only%29.png/300px-Meta_AI_Logo_%28Ring_Only%29.png",
    imageAlt: "Meta AI logo",
  },
  {
    id: "midjourney-v5-2023",
    year: 2023,
    month: 3,
    title: "Midjourney V5: Photorealistic AI Art",
    category: "product",
    people: ["David Holz"],
    organizations: ["Midjourney"],
    description:
      "Midjourney V5 produced images so photorealistic that AI-generated photos went viral and were mistaken for real photographs — including a fake image of the Pope in a puffer jacket and fake photos of Trump's arrest. The line between AI-generated and real imagery effectively dissolved.",
    impact:
      "Forced society to confront the reality of AI-generated misinformation. Major outlets updated their policies. Sparked worldwide debates about deepfakes, trust, and visual media in the AI age.",
    impactLevel: 3,
    era: "generative",
    tags: ["image-generation", "misinformation", "cultural"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Midjourney_Emblem.svg/300px-Midjourney_Emblem.svg.png",
    imageAlt: "Midjourney AI image generation logo",
  },
  {
    id: "mixtral-2023",
    year: 2023,
    month: 12,
    title: "Mixtral 8x7B: Efficient Mixture of Experts",
    category: "open-source",
    people: [],
    organizations: ["Mistral AI"],
    description:
      "French startup Mistral AI released Mixtral 8x7B, a mixture-of-experts model that matched or beat GPT-3.5 while using a fraction of the compute per token. It demonstrated that clever architecture could compete with brute-force scaling.",
    impact:
      "Showed that you didn't need Google-scale compute to build competitive models. Boosted European AI confidence and proved that architectural innovation could beat raw scale.",
    impactLevel: 3,
    era: "generative",
    tags: ["open-source", "moe", "efficiency", "european-ai"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Mistral_AI_logo_%282025%E2%80%93%29.svg/300px-Mistral_AI_logo_%282025%E2%80%93%29.svg.png",
    imageAlt: "Mistral AI logo, creators of Mixtral",
  },
  {
    id: "gemini-2023",
    year: 2023,
    month: 12,
    title: "Gemini: Google's Multimodal Response",
    category: "product",
    people: ["Sundar Pichai", "Demis Hassabis"],
    organizations: ["Google DeepMind"],
    description:
      "Google launched Gemini, its most capable AI model family, natively multimodal across text, code, images, audio, and video. Gemini Ultra matched or exceeded GPT-4 on many benchmarks. It marked Google DeepMind's full response to OpenAI's dominance.",
    impact:
      "Established the multimodal AI race. Google showed it could compete at the frontier. The merging of Google Brain and DeepMind into Google DeepMind signaled the company's all-in bet on AI.",
    impactLevel: 4,
    era: "generative",
    tags: ["google", "multimodal", "frontier-model"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/300px-Google_Gemini_logo.svg.png",
    imageAlt: "Google Gemini AI model logo",
  },
  {
    id: "sora-2024",
    year: 2024,
    month: 2,
    title: "Sora: AI Video Generation",
    category: "research",
    people: [],
    organizations: ["OpenAI"],
    description:
      "OpenAI previewed Sora, a model that could generate photorealistic videos up to a minute long from text descriptions. The quality stunned the world — realistic physics, complex camera movements, and coherent scenes that looked like professional cinematography.",
    impact:
      "Shocked the film, advertising, and creative industries. For the first time, AI could generate convincing video — a capability many thought was years away. Accelerated existential debates about AI's impact on creative professions.",
    impactLevel: 4,
    era: "generative",
    tags: ["video-generation", "openai", "creative", "multimodal"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/300px-OpenAI_logo_2025_%28symbol%29.svg.png",
    imageAlt: "OpenAI logo, creators of Sora",
  },
  {
    id: "claude-3-2024",
    year: 2024,
    month: 3,
    title: "Claude 3: Approaching Human-Level",
    category: "product",
    people: [],
    organizations: ["Anthropic"],
    description:
      "Anthropic launched the Claude 3 family (Haiku, Sonnet, Opus), with Claude 3 Opus matching or exceeding GPT-4 on most benchmarks. It featured a 200K token context window, strong reasoning, nuanced instruction-following, and a 'personality' that users found distinctively thoughtful and careful.",
    impact:
      "Established Anthropic as a true frontier lab alongside OpenAI and Google. The 200K context window changed how people thought about AI capabilities. Claude's distinctive character showed that AI assistants could have different 'personalities' that mattered.",
    impactLevel: 4,
    era: "generative",
    tags: ["anthropic", "frontier-model", "context-window"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Anthropic_logo.svg/300px-Anthropic_logo.svg.png",
    imageAlt: "Anthropic logo, creators of Claude 3",
  },
  {
    id: "gpt-4o-2024",
    year: 2024,
    month: 5,
    title: "GPT-4o: Omni Model",
    category: "product",
    people: [],
    organizations: ["OpenAI"],
    description:
      "OpenAI released GPT-4o ('omni'), a unified model that natively processed text, audio, images, and video with near-instant response times. It could hold natural voice conversations with emotional expression, sing, laugh, and respond to visual input in real time.",
    impact:
      "Made AI interaction feel genuinely natural for the first time. The voice demo — where GPT-4o responded with emotion and humor — went viral and showed a glimpse of human-level conversational AI.",
    impactLevel: 3,
    era: "generative",
    tags: ["openai", "multimodal", "voice", "real-time"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/300px-OpenAI_logo_2025_%28symbol%29.svg.png",
    imageAlt: "OpenAI logo",
  },
  {
    id: "gemini-1-5-pro-2024",
    year: 2024,
    month: 2,
    title: "Gemini 1.5 Pro: Million-Token Context",
    category: "research",
    people: [],
    organizations: ["Google DeepMind"],
    description:
      "Google released Gemini 1.5 Pro with a 1 million token context window (later extended to 2M) — able to process entire codebases, books, or hours of video in a single prompt. It could find a needle in a haystack across millions of tokens with near-perfect recall.",
    impact:
      "Redefined what was possible with context length. Processing entire codebases or lengthy documents in one go opened entirely new use cases for AI assistants.",
    impactLevel: 3,
    era: "generative",
    tags: ["google", "context-window", "scaling"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/300px-Google_Gemini_logo.svg.png",
    imageAlt: "Google Gemini logo",
  },
  {
    id: "llama-3-2024",
    year: 2024,
    month: 4,
    title: "Llama 3: Open-Source Catches Up",
    category: "open-source",
    people: [],
    organizations: ["Meta"],
    description:
      "Meta released Llama 3 (8B and 70B, later 405B), closing the gap with closed-source frontier models. The 405B model matched GPT-4-class performance on many benchmarks while being fully open-source. Meta committed to the open-source AI strategy.",
    impact:
      "Proved open-source could match closed frontier models. Democratized access to near-frontier AI capabilities. Catalyzed the open-source AI ecosystem further.",
    impactLevel: 3,
    era: "generative",
    tags: ["open-source", "meta", "language-model"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Meta_AI_Logo_%28Ring_Only%29.png/300px-Meta_AI_Logo_%28Ring_Only%29.png",
    imageAlt: "Meta AI logo",
  },
  {
    id: "o1-reasoning-2024",
    year: 2024,
    month: 9,
    title: "OpenAI o1: Reasoning Models",
    category: "research",
    people: [],
    organizations: ["OpenAI"],
    description:
      "OpenAI released o1, a model trained to 'think before it speaks' using chain-of-thought reasoning at inference time. It could solve complex math, coding, and science problems by spending more compute thinking through multi-step solutions — trading speed for accuracy on hard problems.",
    impact:
      "Introduced a new paradigm: test-time compute scaling. Instead of just making models bigger, you could make them smarter by letting them think longer. Achieved PhD-level performance on scientific reasoning benchmarks.",
    impactLevel: 4,
    era: "generative",
    tags: ["reasoning", "openai", "chain-of-thought", "paradigm-shift"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/300px-OpenAI_logo_2025_%28symbol%29.svg.png",
    imageAlt: "OpenAI logo, creators of o1",
  },
  {
    id: "eu-ai-act-2024",
    year: 2024,
    month: 3,
    title: "EU AI Act: First Major AI Regulation",
    category: "regulation",
    people: [],
    organizations: ["European Union"],
    description:
      "The European Parliament approved the AI Act, the world's first comprehensive AI regulation. It established a risk-based framework: banning 'unacceptable risk' AI (social scoring, indiscriminate surveillance), heavily regulating 'high risk' applications, and requiring transparency for generative AI.",
    impact:
      "Set the global template for AI regulation. Forced every major AI company to consider compliance. Triggered regulatory activity worldwide and established the precedent that AI can and should be regulated.",
    impactLevel: 3,
    era: "generative",
    tags: ["regulation", "eu", "policy", "governance"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/300px-Flag_of_Europe.svg.png",
    imageAlt: "European Union flag representing the EU AI Act",
  },
  {
    id: "nobel-prizes-ai-2024",
    year: 2024,
    month: 10,
    title: "Nobel Prizes Awarded for AI Work",
    category: "research",
    people: [
      "Geoffrey Hinton",
      "John Hopfield",
      "Demis Hassabis",
      "John Jumper",
      "David Baker",
    ],
    organizations: ["Nobel Committee", "DeepMind", "University of Toronto"],
    description:
      "The 2024 Nobel Prize in Physics went to Geoffrey Hinton and John Hopfield for foundational work on neural networks and machine learning. The Nobel Prize in Chemistry went to Demis Hassabis and John Jumper (AlphaFold) alongside David Baker for computational protein design. AI research received the highest scientific recognition.",
    impact:
      "Validated AI as a transformative scientific discipline at the highest possible level. Hinton used his acceptance speech to warn about AI risks, creating a powerful juxtaposition of celebration and caution.",
    impactLevel: 4,
    era: "generative",
    tags: ["nobel", "recognition", "science", "safety"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Nobel_Prize.png/300px-Nobel_Prize.png",
    imageAlt: "Nobel Prize medal",
  },

  // ═══════════════════════════════════════════════════════════════
  // ERA: THE AGENTIC ERA (2025-2026)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "deepseek-r1-2025",
    year: 2025,
    month: 1,
    title: "DeepSeek R1: Open-Source Reasoning",
    category: "open-source",
    people: [],
    organizations: ["DeepSeek"],
    description:
      "Chinese AI lab DeepSeek released R1, an open-source reasoning model that matched OpenAI's o1 performance at a fraction of the cost. Trained with reportedly modest compute budgets, it challenged the assumption that frontier AI required massive Western-scale investment. The model was fully open-weight.",
    impact:
      "Sent shockwaves through the AI industry. NVIDIA stock dropped temporarily. Forced a reassessment of the 'scaling requires billions' narrative. Demonstrated that compute efficiency and algorithmic innovation could rival brute-force scaling.",
    impactLevel: 4,
    era: "agentic",
    tags: [
      "open-source",
      "reasoning",
      "china",
      "efficiency",
      "cost",
    ],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/DeepSeek_logo.svg/300px-DeepSeek_logo.svg.png",
    imageAlt: "DeepSeek AI logo",
  },
  {
    id: "claude-3-5-sonnet-2025",
    year: 2025,
    month: 1,
    title: "Claude 3.5 Sonnet: Best-in-Class Coding",
    category: "product",
    people: [],
    organizations: ["Anthropic"],
    description:
      "Anthropic's Claude 3.5 Sonnet became the top-performing model for coding tasks, with developers widely praising its code generation, debugging, and software engineering capabilities. It powered tools like Claude Code, enabling AI to work directly in developer environments.",
    impact:
      "Established Claude as the go-to model for software development. Showed that you could be the best at specific high-value tasks without winning every benchmark. The coding-first strategy proved commercially successful.",
    impactLevel: 3,
    era: "agentic",
    tags: ["anthropic", "coding", "developer-tools"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Anthropic_logo.svg/300px-Anthropic_logo.svg.png",
    imageAlt: "Anthropic logo",
  },
  {
    id: "ai-agents-2025",
    year: 2025,
    title: "The Rise of AI Agents",
    category: "product",
    people: [],
    organizations: [
      "Anthropic",
      "OpenAI",
      "Google",
      "Microsoft",
      "Various startups",
    ],
    description:
      "2025 became 'the year of agents.' AI systems evolved from conversation partners to autonomous workers that could browse the web, write and execute code, manage files, use tools, and complete multi-step tasks with minimal human oversight. Claude Code, OpenAI's Operator, Google's Project Mariner, and dozens of agent frameworks emerged.",
    impact:
      "Shifted the paradigm from AI-as-chatbot to AI-as-worker. For the first time, AI could take independent action in the real world — not just answer questions. This raised new questions about autonomy, oversight, and the future of knowledge work.",
    impactLevel: 5,
    era: "agentic",
    tags: ["agents", "autonomy", "tools", "paradigm-shift"],
  },
  {
    id: "claude-4-2025",
    year: 2025,
    month: 5,
    title: "Claude 4 / Opus 4: Frontier Reasoning",
    category: "product",
    people: [],
    organizations: ["Anthropic"],
    description:
      "Anthropic released Claude 4 Opus, a model with significantly enhanced reasoning, extended thinking capabilities, and the ability to sustain complex multi-step problem-solving over long contexts. It excelled at agentic tasks, code generation, and nuanced analysis.",
    impact:
      "Pushed the frontier of what AI assistants could accomplish autonomously. Extended thinking allowed the model to 'work through' complex problems systematically, approaching human expert-level performance on challenging tasks.",
    impactLevel: 4,
    era: "agentic",
    tags: ["anthropic", "reasoning", "frontier-model", "agentic"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Anthropic_logo.svg/300px-Anthropic_logo.svg.png",
    imageAlt: "Anthropic logo, creators of Claude 4",
  },
  {
    id: "openai-o3-2025",
    year: 2025,
    title: "OpenAI o3: Advanced Reasoning at Scale",
    category: "product",
    people: [],
    organizations: ["OpenAI"],
    description:
      "OpenAI released o3, the successor to o1, with dramatically improved reasoning capabilities. It achieved near-perfect scores on many math and coding benchmarks and could solve problems that previously required human experts with years of domain knowledge.",
    impact:
      "Advanced the reasoning model paradigm further. Combined with GPT-4o for conversational tasks, it gave OpenAI a two-model strategy: fast + deep thinking.",
    impactLevel: 3,
    era: "agentic",
    tags: ["openai", "reasoning", "frontier-model"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/OpenAI_logo_2025_%28symbol%29.svg/300px-OpenAI_logo_2025_%28symbol%29.svg.png",
    imageAlt: "OpenAI logo",
  },
  {
    id: "gemini-2-2025",
    year: 2025,
    title: "Gemini 2.0: Google's Agent Platform",
    category: "product",
    people: [],
    organizations: ["Google DeepMind"],
    description:
      "Google launched Gemini 2.0, designed from the ground up for the agentic era — with native tool use, code execution, and multi-step reasoning. Deeply integrated into Google's ecosystem (Search, Workspace, Android), it brought AI agent capabilities to billions of users.",
    impact:
      "Showed that AI agents would be integrated into existing platforms, not just standalone chatbots. Google's distribution advantage meant Gemini agents reached more users than any competitor.",
    impactLevel: 3,
    era: "agentic",
    tags: ["google", "agents", "platform", "integration"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/300px-Google_Gemini_logo.svg.png",
    imageAlt: "Google Gemini logo",
  },
  {
    id: "ai-coding-agents-2025",
    year: 2025,
    title: "AI Coding Agents Transform Software Development",
    category: "product",
    people: [],
    organizations: ["Anthropic", "Cursor", "GitHub", "Various"],
    description:
      "AI coding agents like Claude Code, Cursor, GitHub Copilot Workspace, and others became standard tools in software development. These agents could understand entire codebases, implement features from descriptions, fix bugs, write tests, and submit pull requests — not just autocomplete individual lines.",
    impact:
      "Fundamentally changed how software is built. Junior and senior developers alike reported 30-50% productivity gains. The nature of programming shifted from writing code to directing AI agents that write code.",
    impactLevel: 4,
    era: "agentic",
    tags: ["coding", "agents", "developer-tools", "productivity"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/GitHub_Copilot_logo.svg/300px-GitHub_Copilot_logo.svg.png",
    imageAlt: "GitHub Copilot logo representing the AI coding agents era",
  },
  {
    id: "claude-4-5-opus-2026",
    year: 2026,
    month: 1,
    title: "Claude 4.5 / 4.6 Opus: The Most Capable AI",
    category: "product",
    people: [],
    organizations: ["Anthropic"],
    description:
      "Anthropic released Claude 4.5 and 4.6 Opus, representing the frontier of AI capability in early 2026. These models demonstrated unprecedented reasoning depth, coding ability, and capacity for autonomous multi-step work. They could sustain complex agentic workflows, manage entire projects, and collaborate with other AI agents.",
    impact:
      "Marked a new threshold in AI capability where autonomous agent workflows became reliable enough for production use. The gap between AI and human expert performance on well-defined tasks narrowed significantly.",
    impactLevel: 4,
    era: "agentic",
    tags: ["anthropic", "frontier-model", "agentic", "autonomous"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Anthropic_logo.svg/300px-Anthropic_logo.svg.png",
    imageAlt: "Anthropic logo, creators of Claude 4.5 Opus",
  },
  {
    id: "agentic-workforce-2026",
    year: 2026,
    month: 3,
    title: "AI Agents in the Workforce: March 2026",
    category: "cultural",
    people: [],
    organizations: [],
    description:
      "By March 2026, AI agents were operating as genuine team members in organizations worldwide — handling customer support, writing code, managing projects, conducting research, and coordinating with other AI agents. The concept of 'agentic AI' moved from research demos to production reality.",
    impact:
      "The integration of AI agents into daily work represents the current frontier of the AI revolution. We are living in the most transformative period since the birth of AI in 1956 — and it's accelerating.",
    impactLevel: 5,
    era: "agentic",
    tags: ["agents", "workforce", "current", "transformation"],
  },
]

/**
 * Summary statistics for the timeline
 */
export const timelineStats = {
  totalMilestones: milestones.length,
  yearRange: {
    start: 1943,
    end: 2026,
  },
  spanYears: 83,
  eras: eras.length,
  categories: [
    "research",
    "product",
    "cultural",
    "regulation",
    "infrastructure",
    "competition",
    "open-source",
  ] as MilestoneCategory[],
  impactLevel5Count: milestones.filter((m) => m.impactLevel === 5).length,
}
