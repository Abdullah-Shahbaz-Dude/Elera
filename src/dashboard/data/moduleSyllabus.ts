export type LessonStatus = 'completed' | 'active' | 'locked';

export interface LessonAsset {
  title: string;
  type: string;
  size: string;
  icon: 'terminal' | 'description';
}

export interface VideoSegment {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  completed?: boolean;
}

export interface TakeawayItem {
  id: string;
  title: string;
  content?: string;
  bullets?: string[];
  expanded?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  status: LessonStatus;
  duration: string;
  videoClips: number;
  assetsCount: number;
  objectives: string[];
  assets: LessonAsset[];
  videoSegments: VideoSegment[];
  takeaways: TakeawayItem[];
  nextLessonId?: string;
  prevLessonId?: string;
  thumbnail?: string;
  level?: string;
  overview?: string;
}

export interface SyllabusSection {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface SyllabusModule {
  id: string;
  title: string;
  progress: number;
  sections: SyllabusSection[];
  category?: string;
  description?: string;
  overviewTitle?: string;
  overviewBody?: string[];
  learnerGains?: string[];
}

const FALLBACK_THUMBNAIL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBVSIptsR6tyP5SNmJmbayfwG--bPgaX2o-6DiAe7gDZtGqRR6b2zAMyUSmYVEE4Y1ScapuYCZ_Bki0iVFM_Ml-Hpt8ntvSiKrDXGMqCmjkYExpXYPzwLcUudrWNRDYocY8O_uWOiH7PTBnoSaEsXXekdyLH4w_SYTIFzF5l023iG_K8AOEP8QdBBT65NaGVTum_U6mj3NyT8YvTxgjqmmXwAMo-E7DDVllem_A2wMBLDJZAiomr-Pj9HWKdjcn-in5Ej8Ab97ruD8j';

const ELARA_INSIGHT_LESSONS: Lesson[] = [
  {
    id: 'thinking-differently-at-work',
    title: 'Thinking Differently at Work',
    slug: 'thinking-differently-at-work',
    status: 'active',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Understand neurodiversity and how people think and process information.',
      'See how the same task can require different levels of mental effort.',
      'Identify where strengths may be overlooked when roles are defined too narrowly.',
      'Reflect on how digital tools and AI support or challenge different thinkers.',
      'Develop greater awareness of personal thinking patterns and how these influence performance.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
    overview:
      'This module explores how and why different thinking styles show up at work and why this matters in digital and AI-enabled environments. Learners gain a clear, practical understanding of what neurodiversity means in everyday workplace terms, how thinking is made up of different mental processes, and why the same task can place very different demands on different people.',
  },
  {
    id: 'attention-focus-mental-energy',
    title: 'Attention, Focus & Mental Energy',
    slug: 'attention-focus-mental-energy',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'seeing-patterns-complexity',
    title: 'Seeing Patterns & Making Sense of Complexity',
    slug: 'seeing-patterns-making-sense-of-complexity',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'speed-thinking-time-decisions',
    title: 'Speed, Thinking Time & Decisions',
    slug: 'speed-thinking-time-decisions',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'communication-at-work',
    title: 'Communication at Work',
    slug: 'communication-at-work',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'structure-clarity-support',
    title: 'Structure, Clarity & Support',
    slug: 'structure-clarity-support',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'creativity-ideas-new-ways',
    title: 'Creativity, Ideas & New Ways of Thinking',
    slug: 'creativity-ideas-new-ways-of-thinking',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'stress-pressure-sustainability',
    title: 'Stress, Pressure & Sustainability',
    slug: 'stress-pressure-sustainability',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'working-with-different-thinkers',
    title: 'Working With Different Thinkers',
    slug: 'working-with-different-thinkers',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'designing-better-work-future',
    title: 'Designing Better Work for the Future',
    slug: 'designing-better-work-for-the-future',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
];

const MODULES: Record<string, SyllabusModule> = {
  '1': {
    id: '1',
    title:
      'Seeing Things Differently: Neurodiversity in the Digital Future of Work',
    progress: 0,
    category: 'Neurodiversity & Work',
    description:
      'Explore how different thinking styles show up at work and why this matters in digital and AI-enabled environments.',
    overviewTitle: 'Programme Overview',
    overviewBody: [
      'The ELARA Insight Programme helps learners understand how different brains think, focus, decide, communicate, and problem-solve at work and why this matters more than ever in digital and AI-enabled environments.',
      'Rather than positioning neurodiversity as an inclusion issue or adjustment need, the programme reframes cognitive difference as a source of insight, innovation, and strategic advantage.',
      'Learners gain a practical, psychologically grounded understanding of how thinking styles vary, how digital systems interact with human cognition, and how work can be designed so people and technology function better together.',
      'The focus is not on labels or diagnoses, but on how work actually gets done and how organisations can unlock better outcomes by designing for different ways of thinking.',
    ],
    learnerGains: [
      'Understand why different thinking styles are a normal and necessary part of modern work.',
      'Recognise neurodiverse thinking as a source of insight, innovation, and risk awareness.',
      'See how digital tools and AI can amplify both strengths and challenges, depending on how work is designed.',
      'Develop greater awareness of their own thinking patterns and those of others.',
      'Make more informed decisions about how work, systems, roles, and teams are structured.',
    ],
    sections: [
      {
        id: 's1',
        title: 'Insight Modules',
        order: 1,
        lessons: ELARA_INSIGHT_LESSONS,
      },
    ],
  },
};

export function getModuleById(moduleId: string): SyllabusModule | null {
  return MODULES[moduleId] ?? null;
}

export function getLesson(
  moduleId: string,
  lessonId: string
): { module: SyllabusModule; lesson: Lesson } | null {
  const module = getModuleById(moduleId);
  if (!module) return null;
  for (const section of module.sections) {
    const lesson = section.lessons.find((l) => l.id === lessonId);
    if (lesson) return { module, lesson };
  }
  return null;
}

export function getAllLessons(module: SyllabusModule): Lesson[] {
  return module.sections.flatMap((s) => s.lessons);
}

/** Parse lesson duration string to minutes (e.g. "30 min" -> 30, "1h" -> 60). */
function parseDurationToMinutes(duration: string): number {
  const d = duration.trim();
  let total = 0;
  const hMatch = d.match(/(\d+)\s*h/i);
  const mMatch = d.match(/(\d+)\s*m(?:in|inutes)?/i);
  if (hMatch) total += parseInt(hMatch[1], 10) * 60;
  if (mMatch) total += parseInt(mMatch[1], 10);
  if (!hMatch && !mMatch && /^\d+$/.test(d)) total = parseInt(d, 10);
  return total;
}

/** Format total minutes as "Xh Ym" (e.g. 260 -> "4h 20m"). */
export function formatTotalDuration(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes}m`;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/** Return lesson count and total duration string for a module. */
export function getModuleLessonSummary(module: SyllabusModule): {
  count: number;
  totalDuration: string;
} {
  const lessons = getAllLessons(module);
  const totalMinutes = lessons.reduce(
    (sum, l) => sum + parseDurationToMinutes(l.duration),
    0
  );
  return {
    count: lessons.length,
    totalDuration: formatTotalDuration(totalMinutes),
  };
}

/** First lesson to resume: active lesson, else next after last completed, else first lesson. */
export function getResumeLesson(module: SyllabusModule): Lesson | null {
  const lessons = getAllLessons(module);
  const active = lessons.find((l) => l.status === 'active');
  if (active) return active;
  const lastCompletedIndex = lessons
    .map((l) => l.status)
    .lastIndexOf('completed');
  if (lastCompletedIndex >= 0 && lastCompletedIndex < lessons.length - 1)
    return lessons[lastCompletedIndex + 1];
  return lessons[0] ?? null;
}

export const FALLBACK_THUMBNAIL_URL = FALLBACK_THUMBNAIL;

export function getNextLesson(
  module: SyllabusModule,
  currentLessonId: string
): Lesson | null {
  const all = getAllLessons(module);
  const idx = all.findIndex((l) => l.id === currentLessonId);
  if (idx === -1 || idx >= all.length - 1) return null;
  return all[idx + 1];
}

export function getPrevLesson(
  module: SyllabusModule,
  currentLessonId: string
): Lesson | null {
  const all = getAllLessons(module);
  const idx = all.findIndex((l) => l.id === currentLessonId);
  if (idx <= 0) return null;
  return all[idx - 1];
}
