import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ModuleFiltersSidebar from '@/dashboard/components/ModuleFiltersSidebar';

type Level = 'Beginner' | 'Intermediate' | 'Advanced';
type Category =
  | 'AI & Machine Learning'
  | 'Data Science'
  | 'Leadership'
  | 'Other';

interface CatalogModule {
  id: string;
  title: string;
  duration: string;
  level: Level;
  progress: number;
  category: Category;
  image: string;
}

const MODULES: CatalogModule[] = [
  {
    id: '1',
    title: 'Neural Architecture Search',
    duration: '4h 20m',
    level: 'Advanced',
    progress: 65,
    category: 'AI & Machine Learning',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVSIptsR6tyP5SNmJmbayfwG--bPgaX2o-6DiAe7gDZtGqRR6b2zAMyUSmYVEE4Y1ScapuYCZ_Bki0iVFM_Ml-Hpt8ntvSiKrDXGMqCmjkYExpXYPzwLcUudrWNRDYocY8O_uWOiH7PTBnoSaEsXXekdyLH4w_SYTIFzF5l023iG_K8AOEP8QdBBT65NaGVTum_U6mj3NyT8YvTxgjqmmXwAMo-E7DDVllem_A2wMBLDJZAiomr-Pj9HWKdjcn-in5Ej8Ab97ruD8j',
  },
  {
    id: '2',
    title: 'Ethical AI Frameworks',
    duration: '2h 15m',
    level: 'Intermediate',
    progress: 25,
    category: 'AI & Machine Learning',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8Xor0hLRSs-ZBsXdlrfgRCC-MLz9TYUhAMUorMQ_TjBYSR-CjlChb-KdtU3QbCLz9twXWIqlSYOCWFrdl_86Q1AvKtsEvXZ1fnpKxrbgIWt9NMbCQVYgec6vd1MdTvfDdvrPa-9tUAhMpRimwBHqlSS55EI3edpyibXracr1eK5boIye_U5Lz_y5DERcEzO6Bn1HU8XQd46JpWI7cURc7kDXRBpXpGkNpqLyo3N0uIwqfJnnrE5J1kR5dH1UEYKiwZWHMLDhcUwQo',
  },
  {
    id: '3',
    title: 'Quantum Computing 101',
    duration: '5h 45m',
    level: 'Beginner',
    progress: 88,
    category: 'Data Science',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYU57HKLRmf5WdwmsopikqI402D07j-i_BU3JlsYc9AvITUj8HGAR0lu6LLNRUvSFs5KuODCDeuzN6PabkM_zOPGaJYu1ajsNp7Fjr85cbXQZeBee1RBI-5Ifc_qVCbLigk3kfED27RFvr-cAu6Y2QjPgdSi6XEXAM-tHfluj7i8tSIkoU0LenK1HBOtHuFHm-EUVtFkMy9t17ySQLm8-C0UChtYOo0IzT-fU9TTheajqksb7M2HvSjPt6bqpHwACZW0SZv2d7RwJ2',
  },
  {
    id: '4',
    title: 'Distributed Systems Design',
    duration: '1h 30m',
    level: 'Advanced',
    progress: 42,
    category: 'Data Science',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnoIqIET21xTSpPj6ExMQ_7ttadHVHYjkD5ZY19Ge91HvO_LmIB95ojC7RqtMN9WEXkb7I1zoCY7KZZKGYWYFc1ZkK8vzDKyBtdDA-pMxzcywtFpk98k7JNdVeFaXjwNp_Fm2Va0kfgURE7kSadVSilm6SsC782MhK-Q3WwuqxFE1CAGGDo9KhpjpNTLA7EWtyw2JOOUKmZ3AcqraV-HZXgZaNpzgDEhDrAgCCjTWUtLMyi3xHIqU6KRsr0qh9CTMoklDoNaDkMF68',
  },
  {
    id: '5',
    title: 'Natural Language Processing',
    duration: '3h 50m',
    level: 'Intermediate',
    progress: 12,
    category: 'AI & Machine Learning',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBFzyE5FKHpfR57kzIS6oW-G4bXkIfdc1hKC3QCn64muaNmBUN72--ivR3tgQuNBPN09FV1xiuN2znGmqAQ7qVUtx9R2Td9O5CkZtX-ak4iDUW30rTolD5h2CZH_Ih9v2CNsUO-Homk1vS6P6J4LcBK02ekIfFdcMgkN6B7CSEYjGbLGi5QkBz_8IPsooEP_2gq2_mqxjYEYSilV6VV2huVkRLmW2W3SM-tJR19Pb_tYUA8FAhE6RcBHp2YyrzVU8Q2qSI6je2jQb7E',
  },
  {
    id: '6',
    title: 'Behavioral Economics',
    duration: '2h 45m',
    level: 'Beginner',
    progress: 55,
    category: 'Leadership',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYU57HKLRmf5WdwmsopikqI402D07j-i_BU3JlsYc9AvITUj8HGAR0lu6LLNRUvSFs5KuODCDeuzN6PabkM_zOPGaJYu1ajsNp7Fjr85cbXQZeBee1RBI-5Ifc_qVCbLigk3kfED27RFvr-cAu6Y2QjPgdSi6XEXAM-tHfluj7i8tSIkoU0LenK1HBOtHuFHm-EUVtFkMy9t17ySQLm8-C0UChtYOo0IzT-fU9TTheajqksb7M2HvSjPt6bqpHwACZW0SZv2d7RwJ2',
  },
  {
    id: '7',
    title: 'Cybersecurity Operations',
    duration: '6h 10m',
    level: 'Advanced',
    progress: 78,
    category: 'Data Science',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBVSIptsR6tyP5SNmJmbayfwG--bPgaX2o-6DiAe7gDZtGqRR6b2zAMyUSmYVEE4Y1ScapuYCZ_Bki0iVFM_Ml-Hpt8ntvSiKrDXGMqCmjkYExpXYPzwLcUudrWNRDYocY8O_uWOiH7PTBnoSaEsXXekdyLH4w_SYTIFzF5l023iG_K8AOEP8QdBBT65NaGVTum_U6mj3NyT8YvTxgjqmmXwAMo-E7DDVllem_A2wMBLDJZAiomr-Pj9HWKdjcn-in5Ej8Ab97ruD8j',
  },
  {
    id: '8',
    title: 'Advanced UX Strategy',
    duration: '1h 15m',
    level: 'Intermediate',
    progress: 33,
    category: 'Leadership',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8Xor0hLRSs-ZBsXdlrfgRCC-MLz9TYUhAMUorMQ_TjBYSR-CjlChb-KdtU3QbCLz9twXWIqlSYOCWFrdl_86Q1AvKtsEvXZ1fnpKxrbgIWt9NMbCQVYgec6vd1MdTvfDdvrPa-9tUAhMpRimwBHqlSS55EI3edpyibXracr1eK5boIye_U5Lz_y5DERcEzO6Bn1HU8XQd46JpWI7cURc7kDXRBpXpGkNpqLyo3N0uIwqfJnnrE5J1kR5dH1UEYKiwZWHMLDhcUwQo',
  },
  {
    id: '9',
    title: 'Cloud Infrastructure Scale',
    duration: '4h 00m',
    level: 'Advanced',
    progress: 95,
    category: 'Data Science',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBYU57HKLRmf5WdwmsopikqI402D07j-i_BU3JlsYc9AvITUj8HGAR0lu6LLNRUvSFs5KuODCDeuzN6PabkM_zOPGaJYu1ajsNp7Fjr85cbXQZeBee1RBI-5Ifc_qVCbLigk3kfED27RFvr-cAu6Y2QjPgdSi6XEXAM-tHfluj7i8tSIkoU0LenK1HBOtHuFHm-EUVtFkMy9t17ySQLm8-C0UChtYOo0IzT-fU9TTheajqksb7M2HvSjPt6bqpHwACZW0SZv2d7RwJ2',
  },
];

const CATEGORIES: { value: string; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'AI & Machine Learning', label: 'AI & Machine Learning' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Leadership', label: 'Leadership' },
];

function levelBadgeClass(level: Level): string {
  switch (level) {
    case 'Beginner':
      return 'bg-emerald-600/80';
    case 'Intermediate':
      return 'bg-purple-600/80';
    case 'Advanced':
      return 'bg-indigo-600/80';
    default:
      return 'bg-slate-600/80';
  }
}

export default function ModuleCatalog() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [statusInProgress, setStatusInProgress] = useState(true);
  const [statusCompleted, setStatusCompleted] = useState(false);
  const [statusNotStarted, setStatusNotStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return MODULES.filter((m) => {
      const matchSearch =
        !search.trim() || m.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || m.category === category;
      const anyStatusChecked =
        statusInProgress || statusCompleted || statusNotStarted;
      const matchStatus =
        !anyStatusChecked ||
        (statusInProgress && m.progress > 0 && m.progress < 100) ||
        (statusCompleted && m.progress >= 100) ||
        (statusNotStarted && m.progress === 0);
      const matchDifficulty =
        !difficulty ||
        (difficulty === 'Lvl 1' && m.level === 'Beginner') ||
        (difficulty === 'Lvl 2' && m.level === 'Intermediate') ||
        (difficulty === 'Lvl 3' && m.level === 'Advanced');
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

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="h-20 flex items-center justify-between px-8 z-20 border-b border-white/5 glass-nav shrink-0">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold tracking-tight text-white">
            My Learning
          </h1>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-80 focus-within:border-primary/50 transition-all">
            <span className="material-symbols-outlined text-slate-400 text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Find modules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-xs w-full outline-none text-slate-200 placeholder:text-slate-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
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
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-slate-300"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-slate-900" />
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
        <main className="flex-1 overflow-y-auto p-8 scroll-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((mod) => (
              <div
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
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden dashboard-card border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl bg-card-dark cursor-pointer"
              >
                <img
                  alt={mod.title}
                  src={mod.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                    {mod.duration}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-lg backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 ${levelBadgeClass(
                      mod.level
                    )}`}
                  >
                    {mod.level}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 module-card-overlay flex flex-col justify-end">
                  <h3 className="text-lg font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {mod.title}
                  </h3>
                  <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent-blue progress-glow rounded-full"
                      style={{ width: `${mod.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
