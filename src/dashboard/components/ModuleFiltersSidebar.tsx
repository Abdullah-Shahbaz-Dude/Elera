export interface ModuleFiltersSidebarProps {
  categories: { value: string; label: string }[];
  category: string;
  setCategory: (value: string) => void;
  statusInProgress: boolean;
  setStatusInProgress: (value: boolean) => void;
  statusCompleted: boolean;
  setStatusCompleted: (value: boolean) => void;
  statusNotStarted: boolean;
  setStatusNotStarted: (value: boolean) => void;
  difficulty: string | null;
  setDifficulty: (value: string | null) => void;
}

export default function ModuleFiltersSidebar({
  categories,
  category,
  setCategory,
  statusInProgress,
  setStatusInProgress,
  statusCompleted,
  setStatusCompleted,
  statusNotStarted,
  setStatusNotStarted,
  difficulty,
  setDifficulty,
}: ModuleFiltersSidebarProps) {
  return (
    <>
      <div>
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
          Categories
        </h3>
        <div className="space-y-1">
          {categories.map((c) => (
            <button
              key={c.value || 'all'}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                category === c.value
                  ? 'bg-white/5 text-white font-medium'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
          Status
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={statusInProgress}
              onChange={(e) => setStatusInProgress(e.target.checked)}
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 focus:ring-offset-0"
            />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
              In Progress
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={statusCompleted}
              onChange={(e) => setStatusCompleted(e.target.checked)}
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 focus:ring-offset-0"
            />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
              Completed
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={statusNotStarted}
              onChange={(e) => setStatusNotStarted(e.target.checked)}
              className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-0 focus:ring-offset-0"
            />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
              Not Started
            </span>
          </label>
        </div>
      </div>
      <div>
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
          Difficulty
        </h3>
        <div className="flex flex-wrap gap-2">
          {['Lvl 1', 'Lvl 2', 'Lvl 3'].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setDifficulty(difficulty === lvl ? null : lvl)}
              className={`px-2 py-1 rounded border text-[10px] uppercase font-bold transition-all ${
                difficulty === lvl
                  ? 'border-indigo-500/50 text-indigo-400 bg-indigo-500/10'
                  : 'border-white/10 text-slate-400 hover:border-indigo-500/50'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
