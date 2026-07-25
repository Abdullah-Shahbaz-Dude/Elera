import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MIND_SYNC_MODULE_01,
  MIND_SYNC_TEACHER_TRAINING_MODULE_01,
} from '../data/mindSyncSyllabus';
import image from '../../assets/images/mindsync/2.jpg';

export default function MindSyncProgrammePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const modules = [MIND_SYNC_MODULE_01, MIND_SYNC_TEACHER_TRAINING_MODULE_01];
    const q = search.trim().toLowerCase();
    if (!q) return modules;
    return modules.filter((m) => m.title.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F7F9FC]">
      <header className="h-20 flex items-center justify-between px-8 z-20 border-b border-slate-200 bg-white shrink-0">
        <div className="flex items-center gap-6 md:gap-8 min-w-0">
          <h1
            className="text-xl font-bold tracking-tight shrink-0"
            style={{ color: '#1F3864' }}
          >
            My Learning
          </h1>
          <button
            type="button"
            onClick={() => navigate('/dashboard/my-learning')}
            className="text-xs font-medium text-slate-500 hover:text-[#1F3864] transition-colors shrink-0"
          >
            Back
          </button>
          <div className="hidden sm:flex items-center gap-3 bg-[#F7F9FB] border border-slate-200 px-4 py-2 rounded-full w-80 focus-within:border-[#2E7CF6]/40 transition-all">
            <span className="material-symbols-outlined text-slate-400 text-sm">
              search
            </span>
            <input
              type="text"
              placeholder="Find modules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-xs w-full outline-none text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <button
            type="button"
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EEF4FF] transition-colors text-slate-500 hover:text-[#1F3864]"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#2E7CF6] rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8 scroll-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((mod) => (
              <div
                key={mod.id}
                role="button"
                tabIndex={0}
                onClick={() =>
                  navigate(`/dashboard/my-learning/mind-sync/modules/${mod.id}`)
                }
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  navigate(`/dashboard/my-learning/mind-sync/modules/${mod.id}`)
                }
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)] hover:border-[#2E7CF6]/30 transition-all duration-500 cursor-pointer"
              >
                <img
                  alt={mod.title}
                  src={image}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border border-slate-200 text-[#1F3864]">
                    1 Module
                  </span>
                  <span
                    className="px-2 py-1 rounded-lg backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border border-[#2E7CF6]/20 text-[#2E7CF6]"
                    style={{ backgroundColor: 'rgba(238, 244, 255, 0.95)' }}
                  >
                    Beginner
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#1F3864]/95 via-[#1F3864]/55 to-transparent flex flex-col justify-end">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#bdd2f8] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                    {mod.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
