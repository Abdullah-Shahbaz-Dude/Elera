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

const BLOCK_1_LESSONS: Lesson[] = [
  {
    id: 'thinking-differently-at-work',
    title: 'Thinking Differently at Work',
    slug: 'thinking-differently-at-work',
    status: 'active',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Understand that people naturally think, focus and process information differently.',
      'Reframe neurodiversity as a practical strength in modern workplaces.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'attention-focus-and-mental-energy',
    title: 'Attention, Focus and Mental Energy',
    slug: 'attention-focus-and-mental-energy',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Explores how different people manage attention and cognitive load in fast-paced environments.',
      'Helps teams understand how focus and performance vary across individuals.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'seeing-patterns-and-making-sense-of-complexity',
    title: 'Seeing Patterns and Making Sense of Complexity',
    slug: 'seeing-patterns-and-making-sense-of-complexity',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Explains how people interpret data and information in different ways.',
      'Helps learners understand how varied thinking improves problem-solving and decision-making.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'thinking-in-uncertainty',
    title: 'Thinking in Uncertainty',
    slug: 'thinking-in-uncertainty',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Explores how people respond to unclear, changing or ambiguous situations.',
      'Helps teams understand different approaches to decision-making when there is no single right answer.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'reasonable-adjustments-for-better-performance',
    title: 'Using Reasonable Adjustments for Better Performance',
    slug: 'reasonable-adjustments-for-better-performance',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Explains how small changes to ways of working can improve focus, output and consistency.',
      'Helps organisations use adjustments to improve performance, not just meet requirements.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'getting-the-best-out-of-different-thinkers',
    title: 'Getting the Best Out of Different Thinkers',
    slug: 'getting-the-best-out-of-different-thinkers',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Focuses on how managers and teams can work effectively with different thinking styles.',
      'Helps leaders adapt communication and expectations to bring out the best in each person.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
];

const BLOCK_2_LESSONS: Lesson[] = [
  {
    id: 'sunk-cost-fallacy',
    title: 'Why We Stick With Things That Aren’t Working',
    slug: 'why-we-stick-with-things-that-arent-working',
    status: 'active',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Shows how the sunk cost fallacy keeps people committed to failing ideas, projects, or systems, and how to make clearer, more rational decisions.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'groupthink-ownership',
    title: 'When Everyone Agrees but Nothing Moves Forward',
    slug: 'when-everyone-agrees-but-nothing-moves-forward',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Shows how groupthink and unclear ownership can create the illusion of progress while work actually stalls, and how to restore clarity and momentum.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'ideas-stuck-in-meetings',
    title: 'Why Good Ideas Get Stuck in Meetings',
    slug: 'why-good-ideas-get-stuck-in-meetings',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Shows how over-discussion, lack of decision-making, and unclear next steps prevent ideas from turning into action, and how to move from talking to doing.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'busy-work-vs-impact',
    title: 'When Busy Work Replaces Real Progress',
    slug: 'when-busy-work-replaces-real-progress',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Explains how activity can be mistaken for impact, leading teams to focus on low-value tasks instead of meaningful outcomes.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'why-change-feels-hard',
    title: 'Why Change Feels Hard (Even When It Makes Sense)',
    slug: 'why-change-feels-hard',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Shows how uncertainty, habits, and fear of getting it wrong can slow adoption of new ways of working, and how to introduce change more effectively.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'no-one-owns-the-decision',
    title: 'When No One Owns the Decision',
    slug: 'when-no-one-owns-the-decision',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Explains how unclear ownership leads to delays, confusion, and stalled progress, and how defining responsibility helps teams move forward faster.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
];

const BLOCK_3_LESSONS: Lesson[] = [
  {
    id: 'do-we-know-what-we-need',
    title: 'Do We Know What We Need and Will People Actually Use It?',
    slug: 'do-we-know-what-we-need-and-will-people-actually-use-it',
    status: 'active',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Helps organisations step back before investing in digital or AI solutions, focusing on real problems, user needs, and whether tools will actually be adopted in practice.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'understanding-our-digital-maturity',
    title: 'Understanding Our Digital Maturity',
    slug: 'understanding-our-digital-maturity',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Explains how to assess current capability, behaviours, and readiness for change, so organisations invest in solutions they are actually ready to use.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'building-vs-buying',
    title: 'Building vs Buying: Getting Digital Fit Right',
    slug: 'building-vs-buying-getting-digital-fit-right',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Shows how choosing between off-the-shelf and tailored solutions impacts usability, cost, and long-term success.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'pathways-for-ideas',
    title: 'Creating Pathways for Ideas from the Workforce',
    slug: 'creating-pathways-for-ideas-from-the-workforce',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Focuses on how to unlock ideas from employees closest to the work, creating simple routes for bottom-up innovation rather than relying only on top-down strategy.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'using-data-to-make-better-decisions',
    title: 'Using Data to Make Better Decisions (Not Just More Data)',
    slug: 'using-data-to-make-better-decisions',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Explains how to move from collecting data to actually using it to guide decisions, improve performance, and support digital change.',
    ],
    assets: [],
    videoSegments: [],
    takeaways: [],
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Foundational',
  },
  {
    id: 'digital-innovation-in-practice',
    title: 'Building Digital Innovation in Practice (Labs, Pilots & Testing)',
    slug: 'building-digital-innovation-in-practice',
    status: 'locked',
    duration: '30 min',
    videoClips: 1,
    assetsCount: 0,
    objectives: [
      'Shows how to test ideas safely through small pilots, innovation labs, and real-world experimentation, reducing risk and increasing the chances of success.',
    ],
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
    title: 'Neurodiversity for Strategic Advantage',
    progress: 0,
    category: 'ELARA Future Sync – Training',
    description:
      'Understand neurodiversity as a practical strength in modern workplaces and learn how to get the best out of different thinkers.',
    overviewTitle: 'Programme Overview',
    overviewBody: [
      'People naturally think, focus and process information differently. This programme helps learners understand neurodiversity as a practical strength in modern workplaces.',
      'It focuses on how thinking differences influence performance, decision-making and collaboration, and how small changes to ways of working can unlock better outcomes.',
    ],
    learnerGains: [
      'Understand how focus and performance vary across individuals.',
      'Improve problem-solving and decision-making through varied thinking.',
      'Use reasonable adjustments to improve performance and consistency.',
      'Adapt communication and expectations to get the best out of different thinkers.',
    ],
    sections: [
      {
        id: 's1',
        title: 'Modules',
        order: 1,
        lessons: BLOCK_1_LESSONS,
      },
    ],
  },
  '2': {
    id: '2',
    title: 'Why Work Stalls: The Psychology Behind Slow Progress',
    progress: 0,
    category: 'ELARA Future Sync – Training',
    description:
      'Understand the psychological patterns that slow progress and learn practical ways to restore clarity, ownership and momentum.',
    overviewTitle: 'Programme Overview',
    overviewBody: [
      'This programme explores the psychology behind stalled progress: sunk costs, groupthink, unclear ownership and decision paralysis.',
      'Learners gain practical tools to move from discussion to action and reduce friction that keeps work stuck.',
    ],
    learnerGains: [
      'Spot the hidden patterns that create the illusion of progress.',
      'Restore clarity in ownership, decisions and next steps.',
      'Reduce low-value busywork and increase meaningful outcomes.',
    ],
    sections: [
      {
        id: 's1',
        title: 'Modules',
        order: 1,
        lessons: BLOCK_2_LESSONS,
      },
    ],
  },
  '3': {
    id: '3',
    title:
      'Getting Digital Right: Preparing for the Future Without Costly Mistakes',
    progress: 0,
    category: 'ELARA Future Sync – Training',
    description:
      'Make better digital and AI decisions by focusing on real needs, readiness, adoption and safe piloting.',
    overviewTitle: 'Programme Overview',
    overviewBody: [
      'This programme helps organisations step back before investing in digital or AI solutions, focusing on real problems, user needs and adoption.',
      'Learners build a practical approach to digital maturity, build vs buy decisions, bottom-up innovation pathways and safe pilots.',
    ],
    learnerGains: [
      'Assess readiness and digital maturity before investing.',
      'Choose solutions that fit real user needs and constraints.',
      'Use pilots and testing to reduce risk and increase adoption.',
    ],
    sections: [
      {
        id: 's1',
        title: 'Modules',
        order: 1,
        lessons: BLOCK_3_LESSONS,
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
