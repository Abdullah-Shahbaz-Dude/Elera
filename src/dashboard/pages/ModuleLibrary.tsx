import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ModuleFiltersSidebar from '@/dashboard/components/ModuleFiltersSidebar';

type Category =
  | 'Data Science'
  | 'Leadership'
  | 'Engineering'
  | 'UX Design'
  | 'Product Mgmt';
type Level = 'Foundational' | 'Intermediate' | 'Advanced' | 'Expert';

interface LibraryModule {
  id: string;
  title: string;
  category: Category;
  level: Level;
  instructor: { name: string; avatar?: string; initials?: string };
  duration: string;
  progress: number | 'Done';
  lastAccessed: string;
  image?: string;
  imagePlaceholder?: 'code' | 'terminal';
}

const MODULES: LibraryModule[] = [
  {
    id: '1',
    title: 'Cognitive Bias in Data Science Architecture',
    category: 'Data Science',
    level: 'Intermediate',
    instructor: {
      name: 'Dr. Sarah Montgomery',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBYU57HKLRmf5WdwmsopikqI402D07j-i_BU3JlsYc9AvITUj8HGAR0lu6LLNRUvSFs5KuODCDeuzN6PabkM_zOPGaJYu1ajsNp7Fjr85cbXQZeBee1RBI-5Ifc_qVCbLigk3kfED27RFvr-cAu6Y2QjPgdSi6XEXAM-tHfluj7i8tSIkoU0LenK1HBOtHuFHm-EUVtFkMy9t17ySQLm8-C0UChtYOo0IzT-fU9TTheajqksb7M2HvSjPt6bqpHwACZW0SZv2d7RwJ2',
    },
    duration: '2h 45m',
    progress: 72,
    lastAccessed: '2 hours ago',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVSIptsR6tyP5SNmJmbayfwG--bPgaX2o-6DiAe7gDZtGqRR6b2zAMyUSmYVEE4Y1ScapuYCZ_Bki0iVFM_Ml-Hpt8ntvSiKrDXGMqCmjkYExpXYPzwLcUudrWNRDYocY8O_uWOiH7PTBnoSaEsXXekdyLH4w_SYTIFzF5l023iG_K8AOEP8QdBBT65NaGVTum_U6mj3NyT8YvTxgjqmmXwAMo-E7DDVllem_A2wMBLDJZAiomr-Pj9HWKdjcn-in5Ej8Ab97ruD8j',
  },
  {
    id: '2',
    title: 'Ethical AI Governance & Policy Foundations',
    category: 'Leadership',
    level: 'Expert',
    instructor: { name: 'Robert Kallis', initials: 'RK' },
    duration: '1h 12m',
    progress: 15,
    lastAccessed: 'Yesterday',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8Xor0hLRSs-ZBsXdlrfgRCC-MLz9TYUhAMUorMQ_TjBYSR-CjlChb-KdtU3QbCLz9twXWIqlSYOCWFrdl_86Q1AvKtsEvXZ1fnpKxrbgIWt9NMbCQVYgec6vd1MdTvfDdvrPa-9tUAhMpRimwBHqlSS55EI3edpyibXracr1eK5boIye_U5Lz_y5DERcEzO6Bn1HU8XQd46JpWI7cURc7kDXRBpXpGkNpqLyo3N0uIwqfJnnrE5J1kR5dH1UEYKiwZWHMLDhcUwQo',
  },
  {
    id: '3',
    title: 'Microservices Pattern Implementation',
    category: 'Engineering',
    level: 'Advanced',
    instructor: {
      name: 'Jordan Smith',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCnoIqIET21xTSpPj6ExMQ_7ttadHVHYjkD5ZY19Ge91HvO_LmIB95ojC7RqtMN9WEXkb7I1zoCY7KZZKGYWYFc1ZkK8vzDKyBtdDA-pMxzcywtFpk98k7JNdVeFaXjwNp_Fm2Va0kfgURE7kSadVSilm6SsC782MhK-Q3WwuqxFE1CAGGDo9KhpjpNTLA7EWtyw2JOOUKmZ3AcqraV-HZXgZaNpzgDEhDrAgCCjTWUtLMyi3xHIqU6KRsr0qh9CTMoklDoNaDkMF68',
    },
    duration: '4h 20m',
    progress: 'Done',
    lastAccessed: 'Oct 12, 2023',
    imagePlaceholder: 'code',
  },
  {
    id: '4',
    title: 'High-Performance User Experience Workshop',
    category: 'UX Design',
    level: 'Intermediate',
    instructor: { name: 'Elena Gomez', initials: 'EG' },
    duration: '3h 50m',
    progress: 45,
    lastAccessed: '3 days ago',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBFzyE5FKHpfR57kzIS6oW-G4bXkIfdc1hKC3QCn64muaNmBUN72--ivR3tgQuNBPN09FV1xiuN2znGmqAQ7qVUtx9R2Td9O5CkZtX-ak4iDUW30rTolD5h2CZH_Ih9v2CNsUO-Homk1vS6P6J4LcBK02ekIfFdcMgkN6B7CSEYjGbLGi5QkBz_8IPsooEP_2gq2_mqxjYEYSilV6VV2huVkRLmW2W3SM-tJR19Pb_tYUA8FAhE6RcBHp2YyrzVU8Q2qSI6je2jQb7E',
  },
  {
    id: '5',
    title: 'Rust Fundamentals for Systems Design',
    category: 'Engineering',
    level: 'Foundational',
    instructor: { name: 'Liam G.' },
    duration: '8h 15m',
    progress: 0,
    lastAccessed: 'Never',
    imagePlaceholder: 'terminal',
  },
];

const CATEGORIES: { value: string; label: string }[] = [
  { value: '', label: 'All Modules' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'UX Design', label: 'UX Design' },
  { value: 'Leadership', label: 'Leadership' },
  { value: 'Product Mgmt', label: 'Product Mgmt' },
];

function categoryColor(category: Category): string {
  const map: Record<Category, string> = {
    'Data Science': 'text-indigo-400',
    Leadership: 'text-purple-400',
    Engineering: 'text-emerald-400',
    'UX Design': 'text-amber-400',
    'Product Mgmt': 'text-slate-400',
  };
  return map[category] ?? 'text-slate-400';
}

const PAGE_SIZE = 5;

export default function ModuleLibrary() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [statusInProgress, setStatusInProgress] = useState(true);
  const [statusCompleted, setStatusCompleted] = useState(false);
  const [statusNotStarted, setStatusNotStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const filtered = useMemo(() => {
    return MODULES.filter((m) => {
      const matchSearch =
        !search.trim() ||
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.instructor.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || m.category === category;
      const anyStatusChecked =
        statusInProgress || statusCompleted || statusNotStarted;
      const matchStatus =
        !anyStatusChecked ||
        (statusInProgress &&
          typeof m.progress === 'number' &&
          m.progress > 0) ||
        (statusInProgress && m.progress === 'Done') ||
        m.progress !== 'Done' ||
        (statusCompleted && m.progress === 'Done') ||
        (statusNotStarted &&
          typeof m.progress === 'number' &&
          m.progress === 0);
      const matchDifficulty =
        !difficulty ||
        (difficulty === 'Lvl 1' && m.level === 'Foundational') ||
        (difficulty === 'Lvl 2' && m.level === 'Intermediate') ||
        (difficulty === 'Lvl 3' &&
          (m.level === 'Advanced' || m.level === 'Expert'));
      return matchSearch && matchCategory && matchStatus && matchDifficulty;
    });
  }, [
    search,
    category,
    statusInProgress,
    statusCompleted,
    statusNotStarted,
    difficulty,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(
    () =>
      filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage]
  );

  return (
    <div className="flex flex-col h-full overflow-hidden text-slate-100">
      <header className="h-20 flex items-center justify-between px-8 z-20 border-b border-white/5 glass-panel shrink-0">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold tracking-tight text-white">
            Module Library
          </h1>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-96 focus-within:border-indigo-500/50 transition-all">
            <span className="material-symbols-outlined text-slate-400 text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Filter modules by name, instructor, or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-slate-200 placeholder:text-slate-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setFiltersOpen((o) => !o)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filtersOpen
                  ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-400'
                  : 'border border-white/10 hover:bg-white/5 text-slate-300'
              }`}
              aria-label={filtersOpen ? 'Hide filters' : 'Show filters'}
            >
              <span className="material-symbols-outlined text-lg">
                filter_list
              </span>
              Filters
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-sm text-slate-300"
            >
              <span className="material-symbols-outlined text-lg">tune</span>
              Display
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-sm"
            >
              <span className="material-symbols-outlined text-lg">
                view_list
              </span>
              High-Density
            </button>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <button
            type="button"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-slate-300"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#0f0f19]" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {filtersOpen && (
          <aside className="w-64 border-r border-white/5 bg-black/20 p-6 flex flex-col gap-8 overflow-y-auto scroll-hide shrink-0">
            <ModuleFiltersSidebar
              categories={CATEGORIES}
              category={category}
              setCategory={setCategory}
              statusInProgress={statusInProgress}
              setStatusInProgress={setStatusInProgress}
              statusCompleted={statusCompleted}
              setStatusCompleted={setStatusCompleted}
              statusNotStarted={statusNotStarted}
              setStatusNotStarted={setStatusNotStarted}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
          </aside>
        )}

        <div className="flex-1 overflow-y-auto p-8 scroll-hide">
          <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Module Name
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Last Accessed
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginated.map((mod) => (
                  <tr
                    key={mod.id}
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      navigate(`/dashboard/my-learning/modules/${mod.id}`)
                    }
                    onKeyDown={(e) =>
                      e.key === 'Enter' &&
                      navigate(`/dashboard/my-learning/modules/${mod.id}`)
                    }
                    className="module-row group transition-all cursor-pointer border-b border-white/5 last:border-0"
                  >
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 rounded bg-slate-800 overflow-hidden shrink-0 border border-white/5">
                          {mod.image ? (
                            <img
                              alt=""
                              src={mod.image}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                            />
                          ) : (
                            <div
                              className={`w-full h-full flex items-center justify-center ${
                                mod.imagePlaceholder === 'code'
                                  ? 'bg-gradient-to-br from-indigo-900 to-indigo-600'
                                  : 'bg-gradient-to-br from-slate-700 to-slate-900'
                              }`}
                            >
                              <span className="material-symbols-outlined text-white/50 text-sm">
                                {mod.imagePlaceholder === 'code'
                                  ? 'code'
                                  : 'terminal'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold group-hover:text-indigo-300 transition-colors">
                            {mod.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className={`text-[10px] uppercase font-bold ${categoryColor(mod.category)}`}
                            >
                              {mod.category}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="text-[10px] text-slate-500 uppercase">
                              {mod.level}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        {mod.instructor.avatar ? (
                          <img
                            alt=""
                            src={mod.instructor.avatar}
                            className="w-6 h-6 rounded-full grayscale group-hover:grayscale-0 object-cover"
                          />
                        ) : mod.instructor.initials ? (
                          <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                            <span className="text-[10px] font-bold text-indigo-400">
                              {mod.instructor.initials}
                            </span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                            <span className="material-symbols-outlined text-xs text-slate-400">
                              person
                            </span>
                          </div>
                        )}
                        <span className="text-xs text-slate-300">
                          {mod.instructor.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs text-slate-400">
                        {mod.duration}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="w-32 flex items-center gap-3">
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden min-w-0">
                          <div
                            className={`h-full rounded-full ${
                              mod.progress === 'Done'
                                ? 'bg-emerald-500'
                                : mod.progress === 0
                                  ? 'bg-slate-600'
                                  : 'bg-indigo-500'
                            }`}
                            style={{
                              width:
                                mod.progress === 'Done'
                                  ? '100%'
                                  : `${mod.progress}%`,
                            }}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-bold shrink-0 ${
                            mod.progress === 'Done'
                              ? 'text-emerald-400'
                              : 'text-slate-300'
                          }`}
                        >
                          {mod.progress === 'Done'
                            ? 'Done'
                            : `${mod.progress}%`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-slate-400">
                      {mod.lastAccessed}
                    </td>
                    <td
                      className="px-6 py-3.5 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-lg"
                        aria-label="More"
                      >
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          more_horiz
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between px-2">
            <p className="text-xs text-slate-500">
              Showing{' '}
              <span className="text-slate-300 font-medium">
                {(currentPage - 1) * PAGE_SIZE + 1}-
                {Math.min(currentPage * PAGE_SIZE, filtered.length)}
              </span>{' '}
              of{' '}
              <span className="text-slate-300 font-medium">
                {filtered.length}
              </span>{' '}
              modules
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-2 rounded-lg border border-white/5 text-slate-500 hover:text-white hover:bg-white/5 disabled:opacity-50 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  chevron_left
                </span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    p === currentPage
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                      : 'hover:bg-white/5 text-slate-400'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-2 rounded-lg border border-white/5 text-slate-300 hover:text-white hover:bg-white/5 disabled:opacity-50 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
