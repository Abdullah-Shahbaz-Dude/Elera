import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MIND_SYNC_MODULE_01 } from '../data/mindSyncSyllabus';
import image from '../../assets/images/futuresync/module-1/Parenting-a-Child-1.jpg';

export default function MindSyncProgrammePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const title = MIND_SYNC_MODULE_01.title.toLowerCase();
    const matchSearch =
      !search.trim() || title.includes(search.trim().toLowerCase());
    return matchSearch ? [MIND_SYNC_MODULE_01] : [];
  }, [search]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="h-20 flex items-center justify-between px-8 z-20 border-b border-white/5 glass-nav shrink-0">
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold tracking-tight text-white">
            My Learning
          </h1>
          <button
            type="button"
            onClick={() => navigate('/dashboard/my-learning')}
            className="text-xs text-white/70 hover:text-white transition-colors"
          >
            Back
          </button>
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
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-slate-300"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-slate-900" />
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
                  navigate('/dashboard/my-learning/mind-sync/modules/1')
                }
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  navigate('/dashboard/my-learning/mind-sync/modules/1')
                }
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden dashboard-card border border-white/10 hover:border-primary/50 transition-all duration-500 shadow-2xl bg-card-dark cursor-pointer"
              >
                <img
                  alt={mod.title}
                  src={image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                    1 Module
                  </span>
                  <span className="px-2 py-1 rounded-lg backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 bg-indigo-600/20">
                    Beginner
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 module-card-overlay flex flex-col justify-end">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed line-clamp-2">
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
