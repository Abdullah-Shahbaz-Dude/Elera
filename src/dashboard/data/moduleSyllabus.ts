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
}

const FALLBACK_THUMBNAIL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVSIptsR6tyP5SNmJmbayfwG--bPgaX2o-6DiAe7gDZtGqRR6b2zAMyUSmYVEE4Y1ScapuYCZ_Bki0iVFM_Ml-Hpt8ntvSiKrDXGMqCmjkYExpXYPzwLcUudrWNRDYocY8O_uWOiH7PTBnoSaEsXXekdyLH4w_SYTIFzF5l023iG_K8AOEP8QdBBT65NaGVTum_U6mj3NyT8YvTxgjqmmXwAMo-E7DDVllem_A2wMBLDJZAiomr-Pj9HWKdjcn-in5Ej8Ab97ruD8j';

const NAS_LESSONS_S1: Lesson[] = [
  {
    id: 'intro-nas',
    title: 'Introduction to NAS',
    slug: 'introduction-to-nas',
    status: 'completed',
    duration: '30 min',
    videoClips: 2,
    assetsCount: 1,
    objectives: ['Understand NAS motivation', 'Survey existing methods'],
    assets: [],
    videoSegments: [],
    takeaways: [],
    nextLessonId: 'search-space-design',
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Beginner',
  },
  {
    id: 'search-space-design',
    title: 'Search Space Design',
    slug: 'search-space-design',
    status: 'active',
    duration: '45 Minutes',
    videoClips: 3,
    assetsCount: 2,
    objectives: [
      'Define the constraints of a macro-architecture search space.',
      'Implement cell-based search strategies for recurrent networks.',
      'Understand the trade-offs between search flexibility and efficiency.',
      'Analyze NAS-Bench-101 benchmarking metrics.',
    ],
    assets: [
      { title: 'Notebook: NAS Experiments', type: 'Jupyter Notebook', size: '4.2 MB', icon: 'terminal' },
      { title: 'Architectural Cheat Sheet', type: 'PDF Document', size: '1.8 MB', icon: 'description' },
    ],
    videoSegments: [
      {
        id: 'v1',
        title: 'Macro-Architecture Search Space Basics',
        description: 'In this segment, we explore how the outer skeleton of a neural network is defined before the search process begins.',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVSIptsR6tyP5SNmJmbayfwG--bPgaX2o-6DiAe7gDZtGqRR6b2zAMyUSmYVEE4Y1ScapuYCZ_Bki0iVFM_Ml-Hpt8ntvSiKrDXGMqCmjkYExpXYPzwLcUudrWNRDYocY8O_uWOiH7PTBnoSaEsXXekdyLH4w_SYTIFzF5l023iG_K8AOEP8QdBBT65NaGVTum_U6mj3NyT8YvTxgjqmmXwAMo-E7DDVllem_A2wMBLDJZAiomr-Pj9HWKdjcn-in5Ej8Ab97ruD8j',
        duration: '12:45',
        completed: true,
      },
      {
        id: 'v2',
        title: 'Cell-Based vs Global Search',
        description: 'Comparative analysis of modular cell repeat patterns versus high-degree-of-freedom global architecture search.',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnoIqIET21xTSpPj6ExMQ_7ttadHVHYjkD5ZY19Ge91HvO_LmIB95ojC7RqtMN9WEXkb7I1zoCY7KZZKGYWYFc1ZkK8vzDKyBtdDA-pMxzcywtFpk98k7JNdVeFaXjwNp_Fm2Va0kfgURE7kSadVSilm6SsC782MhK-Q3WwuqxFE1CAGGDo9KhpjpNTLA7EWtyw2JOOUKmZ3AcqraV-HZXgZaNpzgDEhDrAgCCjTWUtLMyi3xHIqU6KRsr0qh9CTMoklDoNaDkMF68',
        duration: '18:20',
      },
    ],
    takeaways: [
      { id: 't1', title: 'The Search Space Constraint Problem', expanded: false },
      {
        id: 't2',
        title: 'Memory Efficiency in Cell Design',
        content: "One of the most critical factors in NAS is ensuring the searched cell doesn't explode in memory consumption. We use weighted sum operations during the search phase to keep gradients manageable.",
        bullets: [
          'Always prioritize identity mapping in early search steps.',
          'Limit the number of parallel branches to 4 per cell.',
          'Use separable convolutions to reduce parameter count.',
        ],
        expanded: true,
      },
      { id: 't3', title: 'Benchmarking Against Human Design', expanded: false },
    ],
    prevLessonId: 'intro-nas',
    nextLessonId: 'performance-estimation',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8Xor0hLRSs-ZBsXdlrfgRCC-MLz9TYUhAMUorMQ_TjBYSR-CjlChb-KdtU3QbCLz9twXWIqlSYOCWFrdl_86Q1AvKtsEvXZ1fnpKxrbgIWt9NMbCQVYgec6vd1MdTvfDdvrPa-9tUAhMpRimwBHqlSS55EI3edpyibXracr1eK5boIye_U5Lz_y5DERcEzO6Bn1HU8XQd46JpWI7cURc7kDXRBpXpGkNpqLyo3N0uIwqfJnnrE5J1kR5dH1UEYKiwZWHMLDhcUwQo',
    level: 'Intermediate',
  },
  {
    id: 'performance-estimation',
    title: 'Performance Estimation',
    slug: 'performance-estimation',
    status: 'locked',
    duration: '50 min',
    videoClips: 2,
    assetsCount: 0,
    objectives: [],
    assets: [],
    videoSegments: [],
    takeaways: [],
    prevLessonId: 'search-space-design',
    thumbnail: FALLBACK_THUMBNAIL,
    level: 'Advanced',
  },
];

const NAS_LESSONS_S2: Lesson[] = [
  { id: 'rl', title: 'Reinforcement Learning', slug: 'rl', status: 'locked', duration: '1h', videoClips: 0, assetsCount: 0, objectives: [], assets: [], videoSegments: [], takeaways: [], thumbnail: FALLBACK_THUMBNAIL, level: 'Expert' },
  { id: 'evolutionary', title: 'Evolutionary Algorithms', slug: 'evolutionary', status: 'locked', duration: '1h', videoClips: 0, assetsCount: 0, objectives: [], assets: [], videoSegments: [], takeaways: [], thumbnail: FALLBACK_THUMBNAIL, level: 'Advanced' },
  { id: 'differentiable', title: 'Differentiable Search', slug: 'differentiable', status: 'locked', duration: '1h', videoClips: 0, assetsCount: 0, objectives: [], assets: [], videoSegments: [], takeaways: [], thumbnail: FALLBACK_THUMBNAIL, level: 'Advanced' },
];

const MODULES: Record<string, SyllabusModule> = {
  '1': {
    id: '1',
    title: 'Neural Architecture Search & Optimization',
    progress: 45,
    category: 'Artificial Intelligence',
    description: 'Master the automated design of artificial neural networks, a crucial subfield of machine learning that automates the design of architectures.',
    sections: [
      { id: 's1', title: '01. Fundamentals', order: 1, lessons: NAS_LESSONS_S1 },
      { id: 's2', title: '02. Search Strategies', order: 2, lessons: NAS_LESSONS_S2 },
      { id: 's3', title: '03. Practical Implementation', order: 3, lessons: [] },
    ],
  },
  '2': {
    id: '2',
    title: 'Ethical AI Governance & Policy Foundations',
    progress: 15,
    sections: [
      { id: 's1', title: '01. Overview', order: 1, lessons: [{ id: 'intro', title: 'Introduction', slug: 'intro', status: 'active', duration: '20 min', videoClips: 1, assetsCount: 0, objectives: [], assets: [], videoSegments: [], takeaways: [] }] },
    ],
  },
  '3': {
    id: '3',
    title: 'Microservices Pattern Implementation',
    progress: 100,
    sections: [
      { id: 's1', title: '01. Core Concepts', order: 1, lessons: [{ id: 'core', title: 'Core Concepts', slug: 'core', status: 'completed', duration: '45 min', videoClips: 2, assetsCount: 1, objectives: [], assets: [], videoSegments: [], takeaways: [] }] },
    ],
  },
  '4': {
    id: '4',
    title: 'High-Performance User Experience Workshop',
    progress: 45,
    sections: [
      { id: 's1', title: '01. Foundations', order: 1, lessons: [{ id: 'foundations', title: 'UX Foundations', slug: 'foundations', status: 'active', duration: '30 min', videoClips: 1, assetsCount: 0, objectives: [], assets: [], videoSegments: [], takeaways: [] }] },
    ],
  },
  '5': {
    id: '5',
    title: 'Rust Fundamentals for Systems Design',
    progress: 0,
    sections: [
      { id: 's1', title: '01. Getting Started', order: 1, lessons: [{ id: 'start', title: 'Getting Started', slug: 'start', status: 'locked', duration: '25 min', videoClips: 0, assetsCount: 0, objectives: [], assets: [], videoSegments: [], takeaways: [] }] },
    ],
  },
  '6': {
    id: '6',
    title: 'Behavioral Economics',
    progress: 55,
    sections: [{ id: 's1', title: '01. Overview', order: 1, lessons: [{ id: 'intro', title: 'Introduction', slug: 'intro', status: 'active', duration: '30 min', videoClips: 1, assetsCount: 0, objectives: [], assets: [], videoSegments: [], takeaways: [] }] }],
  },
  '7': {
    id: '7',
    title: 'Cybersecurity Operations',
    progress: 78,
    sections: [{ id: 's1', title: '01. Core', order: 1, lessons: [{ id: 'core', title: 'Core Concepts', slug: 'core', status: 'completed', duration: '45 min', videoClips: 2, assetsCount: 0, objectives: [], assets: [], videoSegments: [], takeaways: [] }] }],
  },
  '8': {
    id: '8',
    title: 'Advanced UX Strategy',
    progress: 33,
    sections: [{ id: 's1', title: '01. Foundations', order: 1, lessons: [{ id: 'foundations', title: 'Foundations', slug: 'foundations', status: 'active', duration: '20 min', videoClips: 1, assetsCount: 0, objectives: [], assets: [], videoSegments: [], takeaways: [] }] }],
  },
  '9': {
    id: '9',
    title: 'Cloud Infrastructure Scale',
    progress: 95,
    sections: [{ id: 's1', title: '01. Overview', order: 1, lessons: [{ id: 'overview', title: 'Overview', slug: 'overview', status: 'completed', duration: '1h', videoClips: 2, assetsCount: 1, objectives: [], assets: [], videoSegments: [], takeaways: [] }] }],
  },
};

export function getModuleById(moduleId: string): SyllabusModule | null {
  return MODULES[moduleId] ?? null;
}

export function getLesson(moduleId: string, lessonId: string): { module: SyllabusModule; lesson: Lesson } | null {
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
export function getModuleLessonSummary(module: SyllabusModule): { count: number; totalDuration: string } {
  const lessons = getAllLessons(module);
  const totalMinutes = lessons.reduce((sum, l) => sum + parseDurationToMinutes(l.duration), 0);
  return { count: lessons.length, totalDuration: formatTotalDuration(totalMinutes) };
}

/** First lesson to resume: active lesson, else next after last completed, else first lesson. */
export function getResumeLesson(module: SyllabusModule): Lesson | null {
  const lessons = getAllLessons(module);
  const active = lessons.find((l) => l.status === 'active');
  if (active) return active;
  const lastCompletedIndex = lessons.map((l) => l.status).lastIndexOf('completed');
  if (lastCompletedIndex >= 0 && lastCompletedIndex < lessons.length - 1) return lessons[lastCompletedIndex + 1];
  return lessons[0] ?? null;
}

export const FALLBACK_THUMBNAIL_URL = FALLBACK_THUMBNAIL;

export function getNextLesson(module: SyllabusModule, currentLessonId: string): Lesson | null {
  const all = getAllLessons(module);
  const idx = all.findIndex((l) => l.id === currentLessonId);
  if (idx === -1 || idx >= all.length - 1) return null;
  return all[idx + 1];
}

export function getPrevLesson(module: SyllabusModule, currentLessonId: string): Lesson | null {
  const all = getAllLessons(module);
  const idx = all.findIndex((l) => l.id === currentLessonId);
  if (idx <= 0) return null;
  return all[idx - 1];
}
