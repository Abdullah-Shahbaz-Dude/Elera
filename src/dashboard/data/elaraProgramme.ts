/**
 * ELARA Insight Programme: Seeing Things Differently – Neurodiversity in the Digital Future of Work.
 * Single source of truth for the programme, 10 insight modules, and the 3 insights per module (sidebar).
 */

/** Fixed 3 insight titles shown in Module Contents for every insight module (not the 10 lessons from modules/1). */
export const INSIGHT_SIDEBAR_TITLES = [
  'THINKING DIFFERENTLY AT WORK.',
  'UNDERSTANDING HOW THINKING WORKS AT WORK',
  'WHAT THIS LOOKS LIKE AT WORK',
] as const;

/** One of the 3 insights: title + self-reflection questions. */
export interface InsightSection {
  title: string;
  questions: string[];
}

/** Self-reflection questions for "Thinking Differently at Work" (and reused for other modules until copy is added). */
const THINKING_DIFFERENTLY_SECTIONS: InsightSection[] = [
  {
    title: 'THINKING DIFFERENTLY AT WORK.',
    questions: [
      'What stood out to you most in this video, and why?',
      'What thinking style described in this video do you recognise most in yourself and how does it show up in your day-to-day work?',
      'Can you think of one way digital tools or systems currently support how you think and one way they make work harder for you or others?',
    ],
  },
  {
    title: 'UNDERSTANDING HOW THINKING WORKS AT WORK',
    questions: [
      'Which part of thinking do you find most demanding at work, taking in information, organising it, holding it in mind, or moving into action?',
      "Can you give an example of a task where thinking feels smooth for you, and one where it feels harder? What's different between them?",
      'Are there particular types of tasks that consistently require more mental effort from you? Why do you think that is?',
      'What does this help you notice about how others might experience the same task differently, even when the role is the same?',
    ],
  },
  {
    title: 'WHAT THIS LOOKS LIKE AT WORK',
    questions: [
      "Where might there be strengths or interests in your workplace that aren't visible through job titles alone?",
      "Have you ever assumed something wasn't relevant to your role, even though it might have been useful at work?",
      'How might curiosity about how people think change the way work, decisions, or change are approached in your organisation?',
      'As digital tools and AI become more common, how could different thinkers be better supported to contribute effectively?',
    ],
  },
];

export function getInsightSectionsForModule(
  _insightSlug: string
): InsightSection[] {
  return THINKING_DIFFERENTLY_SECTIONS;
}

/** Optional extended intro and learning gains shown on the insight module page (e.g. below the hero). */
export interface InsightModule {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Longer intro paragraph(s) for the module page. */
  longDescription?: string;
  /** "What Learners Will Gain" bullets for this module page. */
  whatLearnersWillGain?: string[];
}

export interface ElaraProgramme {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  programmeOverview: string;
  whatLearnersWillGain: string[];
  insightModules: InsightModule[];
}

const PROGRAMME_OVERVIEW = `The ELARA Insight Programme helps learners understand how different brains think, focus, decide, communicate, and problem-solve at work and why this matters more than ever in digital and AI-enabled environments.
Rather than positioning neurodiversity as an inclusion issue or adjustment need, the programme reframes cognitive difference as a source of insight, innovation, and strategic advantage. Learners gain a practical, psychologically grounded understanding of how thinking styles vary, how digital systems interact with human cognition, and how work can be designed so people and technology function better together.
The focus is not on labels or diagnoses, but on how work actually gets done and how organisations can unlock better outcomes by designing for different ways of thinking.`;

const PROGRAMME_LEARNING_GAINS = [
  'Understand why different thinking styles are a normal and necessary part of modern work',
  'Recognise neurodiverse thinking as a source of insight, innovation, and risk awareness',
  'See how digital tools and AI can amplify both strengths and challenges, depending on how work is designed',
  'Develop greater awareness of their own thinking patterns and those of others',
  'Make more informed decisions about how work, systems, roles, and teams are structured',
];

const THINKING_DIFFERENTLY_LEARNING_GAINS = [
  'Understand neurodiversity and how people think and process information',
  'See how the same task can require different levels of mental effort',
  'Identify where strengths may be overlooked when roles are defined too narrowly',
  'Reflect on how digital tools and AI support or challenge different thinkers',
  'Develop greater awareness of their own thinking patterns and how these influence performance',
];

const INSIGHT_MODULES: InsightModule[] = [
  {
    id: 'thinking-differently-at-work',
    slug: 'thinking-differently-at-work',
    title: 'Thinking Differently at Work',
    description:
      'Explore how and why different thinking styles show up at work and why this matters in digital and AI-enabled environments.',
    longDescription:
      'This module explores how and why different thinking styles show up at work and why this matters in digital and AI-enabled environments.\n\nLearners gain a clear, practical understanding of what neurodiversity means in everyday workplace terms, how thinking is made up of different mental processes, and why the same task can place very different demands on different people.',
    whatLearnersWillGain: THINKING_DIFFERENTLY_LEARNING_GAINS,
  },
  {
    id: 'attention-focus-mental-energy',
    slug: 'attention-focus-mental-energy',
    title: 'Attention, Focus & Mental Energy',
    description:
      'This insight module explores attention, focus, and mental energy at work.',
  },
  {
    id: 'seeing-patterns-complexity',
    slug: 'seeing-patterns-complexity',
    title: 'Seeing Patterns & Making Sense of Complexity',
    description:
      'This insight module explores how we see patterns and make sense of complexity.',
  },
  {
    id: 'speed-thinking-decisions',
    slug: 'speed-thinking-decisions',
    title: 'Speed, Thinking Time & Decisions',
    description:
      'This insight module explores speed, thinking time, and decisions at work.',
  },
  {
    id: 'communication-at-work',
    slug: 'communication-at-work',
    title: 'Communication at Work',
    description: 'This insight module explores communication at work.',
  },
  {
    id: 'structure-clarity-support',
    slug: 'structure-clarity-support',
    title: 'Structure, Clarity & Support',
    description:
      'This insight module explores structure, clarity, and support.',
  },
  {
    id: 'creativity-ideas',
    slug: 'creativity-ideas',
    title: 'Creativity, Ideas & New Ways of Thinking',
    description:
      'This insight module explores creativity and new ways of thinking.',
  },
  {
    id: 'stress-pressure-sustainability',
    slug: 'stress-pressure-sustainability',
    title: 'Stress, Pressure & Sustainability',
    description:
      'This insight module explores stress, pressure, and sustainability.',
  },
  {
    id: 'working-with-different-thinkers',
    slug: 'working-with-different-thinkers',
    title: 'Working With Different Thinkers',
    description:
      'This insight module explores working with different thinkers.',
  },
  {
    id: 'designing-better-work',
    slug: 'designing-better-work',
    title: 'Designing Better Work for the Future',
    description:
      'This insight module explores designing better work for the future.',
  },
];

export const ELARA_PROGRAMME: ElaraProgramme = {
  id: 'neurodiversity',
  slug: 'neurodiversity',
  title:
    'Seeing Things Differently: Neurodiversity in the Digital Future of Work',
  shortDescription:
    'Understand how different brains think, focus, decide, and problem-solve at work and why this matters in digital and AI-enabled environments.',
  category: 'INSIGHT PROGRAMME',
  programmeOverview: PROGRAMME_OVERVIEW,
  whatLearnersWillGain: PROGRAMME_LEARNING_GAINS,
  insightModules: INSIGHT_MODULES,
};

export function getProgramme(): ElaraProgramme {
  return ELARA_PROGRAMME;
}

export function getInsightBySlug(slug: string): InsightModule | null {
  return ELARA_PROGRAMME.insightModules.find((m) => m.slug === slug) ?? null;
}
