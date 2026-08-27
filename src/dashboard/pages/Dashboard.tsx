import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';
import { useMyModules } from '@/hooks/useMyModules';
import { useLearningProgrammes } from '@/hooks/useLearningProgrammes';
import LearningProgrammeCard from '@/dashboard/components/LearningProgrammeCard';
import DashboardProgressCardSkeleton from '@/dashboard/components/DashboardProgressCardSkeleton';
import LearningProgrammeCardSkeleton from '@/dashboard/components/LearningProgrammeCardSkeleton';
import { MIND_SYNC_TEACHER_TRAINING_MODULE_01 } from '@/dashboard/data/mindSyncSyllabus';

const cardClass =
  'rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]';

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const { activeModule, loading: modulesLoading } = useMyModules();
  const { programmes, loading: programmesLoading } = useLearningProgrammes();

  const rawName = auth?.user?.username ?? auth?.user?.email ?? 'there';
  const displayName =
    rawName === 'there'
      ? rawName
      : rawName.charAt(0).toUpperCase() + rawName.slice(1);
  const progressPercent = activeModule?.progress_percent ?? 0;
  const remainingPercent = Math.max(0, 100 - progressPercent);
  const moduleTitle =
    activeModule?.title ?? MIND_SYNC_TEACHER_TRAINING_MODULE_01.title;
  const resumePath =
    activeModule?.route ?? '/dashboard/my-learning/mind-sync/modules/2';
  const programmeLabel =
    activeModule?.programme === 'mind-sync' ? 'Mind Sync' : 'Learning';

  return (
    <div className="min-h-full bg-[#F7F9FC] text-slate-900">
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2
              className="text-4xl font-bold tracking-tight mb-2"
              style={{ color: '#1F3864' }}
            >
              Welcome back, {displayName}
            </h2>
            <div className="flex items-center space-x-2 text-slate-500">
              <span
                className="material-symbols-outlined text-sm"
                style={{ color: '#1F7A7A' }}
              >
                auto_awesome
              </span>
              <p className="text-sm">
                {modulesLoading
                  ? 'Loading your learning progress…'
                  : `You've completed ${progressPercent}% of ${moduleTitle}. ${remainingPercent}% remaining.`}
              </p>
            </div>
          </div>
          <Link
            to={resumePath}
            className="px-6 py-3 rounded-full font-semibold flex items-center space-x-2 transition-colors text-white bg-[#2E7CF6] hover:bg-[#2563EB] shadow-[0_4px_14px_-4px_rgba(46,124,246,0.45)]"
          >
            <span>Resume Learning</span>
            <span className="material-symbols-outlined">play_arrow</span>
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-10">
            <section>
              {modulesLoading && !activeModule ? (
                <DashboardProgressCardSkeleton />
              ) : (
              <div className={`${cardClass} p-8 border-l-4 border-l-[#2E7CF6]`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{ color: '#1F3864' }}
                    >
                      {moduleTitle}
                    </h3>
                    <p className="text-slate-500 text-sm">{programmeLabel}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: '#2E7CF6' }}
                    >
                      {progressPercent}%
                    </span>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">
                      Progress
                    </p>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-8">
                  <div
                    className="bg-[#2E7CF6] h-full rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#F7F9FB] p-4 rounded-xl border border-slate-100">
                    <span
                      className="material-symbols-outlined mb-2"
                      style={{ color: '#2E7CF6' }}
                    >
                      menu_book
                    </span>
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: '#1F3864' }}
                    >
                      12 Modules
                    </h4>
                    <p className="text-xs text-slate-500">8 Completed</p>
                  </div>
                  <div className="bg-[#F7F9FB] p-4 rounded-xl border border-slate-100">
                    <span
                      className="material-symbols-outlined mb-2"
                      style={{ color: '#1F7A7A' }}
                    >
                      assignment
                    </span>
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: '#1F3864' }}
                    >
                      4 Quizzes
                    </h4>
                    <p className="text-xs text-slate-500">3 Mastered</p>
                  </div>
                  <div className="bg-[#F7F9FB] p-4 rounded-xl border border-slate-100">
                    <span className="material-symbols-outlined text-emerald-600 mb-2">
                      verified
                    </span>
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: '#1F3864' }}
                    >
                      Certification
                    </h4>
                    <p className="text-xs text-slate-500">Pending final exam</p>
                  </div>
                </div>
              </div>
              )}
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-xl font-bold"
                  style={{ color: '#1F3864' }}
                >
                  Available Learning
                </h3>
                <Link
                  to="/dashboard/my-learning"
                  className="text-sm font-semibold text-[#2E7CF6] hover:text-[#2563EB] transition-colors"
                >
                  View all
                </Link>
              </div>
              {programmesLoading && programmes.length === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <LearningProgrammeCardSkeleton />
                  <LearningProgrammeCardSkeleton />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {programmes.map((programme) => (
                    <LearningProgrammeCard
                      key={programme.programme_id}
                      programme={programme}
                      compact
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h3
                className="text-xl font-bold mb-6"
                style={{ color: '#1F3864' }}
              >
                Upcoming in your Journey
              </h3>
              <div className="space-y-4">
                <Link
                  to="/dashboard/my-learning/modules/1"
                  className={`${cardClass} p-5 flex items-center justify-between hover:border-[#2E7CF6]/30 transition-colors cursor-pointer group`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-[#2E7CF6]/10 flex items-center justify-center text-[#2E7CF6]">
                      <span className="material-symbols-outlined">
                        psychology
                      </span>
                    </div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: '#1F3864' }}
                      >
                        Neural Network Basics for Leaders
                      </h4>
                      <p className="text-xs text-slate-500">
                        Scheduled for Tomorrow, 10:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-slate-500 font-medium group-hover:text-[#2E7CF6] transition-colors">
                      Start module
                    </span>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-[#2E7CF6] transition-colors">
                      chevron_right
                    </span>
                  </div>
                </Link>
                <div
                  className={`${cardClass} p-5 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-[#1F7A7A]/10 flex items-center justify-center text-[#1F7A7A]">
                      <span className="material-symbols-outlined">
                        insights
                      </span>
                    </div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: '#1F3864' }}
                      >
                        Ethical AI Frameworks
                      </h4>
                      <p className="text-xs text-slate-500">
                        Unlocks on Friday
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="material-symbols-outlined text-slate-400">
                      lock
                    </span>
                  </div>
                </div>
                <div
                  className={`${cardClass} p-5 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer group`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                      <span className="material-symbols-outlined">hub</span>
                    </div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: '#1F3864' }}
                      >
                        Systemic Thinking Workshop
                      </h4>
                      <p className="text-xs text-slate-500">
                        Group session • July 12th
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-500 group-hover:text-[#2E7CF6]">
                    <span className="material-symbols-outlined">event</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className={`${cardClass} p-6`}>
              <h3
                className="text-lg font-bold mb-6"
                style={{ color: '#1F3864' }}
              >
                Quick Performance
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#2E7CF6]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#2E7CF6]">
                        done_all
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-2xl font-bold"
                        style={{ color: '#1F3864' }}
                      >
                        24
                      </p>
                      <p className="text-[10px] uppercase font-bold text-slate-500">
                        Modules Completed
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-600 font-bold flex items-center">
                    <span className="material-symbols-outlined text-xs mr-1">
                      trending_up
                    </span>
                    +4
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-[#1F7A7A]/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#1F7A7A]">
                        timer
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-2xl font-bold"
                        style={{ color: '#1F3864' }}
                      >
                        18.5h
                      </p>
                      <p className="text-[10px] uppercase font-bold text-slate-500">
                        Learning Time
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-bold">Total</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-amber-700">
                        military_tech
                      </span>
                    </div>
                    <div>
                      <p
                        className="text-2xl font-bold"
                        style={{ color: '#1F3864' }}
                      >
                        92%
                      </p>
                      <p className="text-[10px] uppercase font-bold text-slate-500">
                        Avg. Quiz Score
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-600 font-bold">
                    Top 5%
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest mb-4">
                  Quiz Heatmap
                </h4>
                <div className="flex gap-1">
                  <div className="flex-1 bg-emerald-500 h-8 rounded-sm opacity-20" />
                  <div className="flex-1 bg-emerald-500 h-8 rounded-sm opacity-40" />
                  <div className="flex-1 bg-emerald-500 h-8 rounded-sm opacity-100" />
                  <div className="flex-1 bg-emerald-500 h-8 rounded-sm opacity-60" />
                  <div className="flex-1 bg-emerald-500 h-8 rounded-sm opacity-80" />
                  <div className="flex-1 bg-emerald-500 h-8 rounded-sm opacity-30" />
                  <div className="flex-1 bg-emerald-500 h-8 rounded-sm opacity-90" />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-medium">
                  <span>Mon</span>
                  <span>Today</span>
                </div>
              </div>
            </div>

            <div className={`${cardClass} p-6`}>
              <h3
                className="text-lg font-bold mb-6"
                style={{ color: '#1F3864' }}
              >
                Expert Mentors
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      alt="Mentor portrait"
                      className="h-10 w-10 rounded-full object-cover border border-slate-200"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkvajZ-_8ti2aCujgeJSrXzxpoidYE0u2ILGuLHUTFXfgU8By8THHe4gpcrNIQpQsL2ouPD0VrpHfWcWw2GctjMGXthOTu6trBU8gdAPg7pRAJiNUwD_PF8GRt3ofvx6QlR5FhnreoHfOMfcMWwpXhZSTAWMhqHnTphDVhUMmFVRA7og1RCGWemf44cynNICdI_GWJV4DkgeFXDpEIq-_Kep8NHy5PpvSYGeszeC6EhXsih5_z3O74lLAM8XGrp5RzFN-xcIECZNk_"
                    />
                    <div>
                      <h4
                        className="text-sm font-semibold"
                        style={{ color: '#1F3864' }}
                      >
                        Dr. Marcus Chen
                      </h4>
                      <p className="text-xs text-slate-500">AI Specialist</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-2 text-[#2E7CF6] hover:bg-[#2E7CF6]/10 rounded-full transition-colors"
                    aria-label="Chat with Dr. Marcus Chen"
                  >
                    <span className="material-symbols-outlined text-sm">
                      chat
                    </span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      alt="Mentor portrait"
                      className="h-10 w-10 rounded-full object-cover border border-slate-200"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAyrKKa64BVUghFhu-rlspH6aZym8yquJMEvUqUjIs2NgoJNLEwmKx57Y7xLa7a3Xvzi1lXZp_X49nkop4wuLb0Zwoxd7uLCX1hQZjvmce01HVbDKKsFSzV4xP37iH6W3mR9xrYburuZmTDZwNjxBhWr4nPHwBcWJ1Zt3w47eO2_5zoa0ll0eUcsUqbry815D3VyTJ1i_yjEDRUGNj3U8x8D6oJeLmspef48DYJNP21IwCJhQ0We6UYnv5YHGDW0JgW-ARvlLmhnub"
                    />
                    <div>
                      <h4
                        className="text-sm font-semibold"
                        style={{ color: '#1F3864' }}
                      >
                        Elena Rodriguez
                      </h4>
                      <p className="text-xs text-slate-500">
                        Behavioral Design
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-2 text-[#2E7CF6] hover:bg-[#2E7CF6]/10 rounded-full transition-colors"
                    aria-label="Chat with Elena Rodriguez"
                  >
                    <span className="material-symbols-outlined text-sm">
                      chat
                    </span>
                  </button>
                </div>
              </div>
              <button
                type="button"
                className="w-full mt-6 py-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-[#1F3864] transition-colors"
              >
                View All Mentors
              </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
