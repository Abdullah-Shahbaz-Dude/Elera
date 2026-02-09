import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const user = auth?.user as { userName?: string; email?: string } | null;
  const displayName = user?.userName ?? user?.email ?? 'there';

  return (
    <div className="min-h-full gradient-bg">
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2 text-white">
              Welcome back, {displayName}
            </h2>
            <div className="flex items-center space-x-2 text-slate-500">
              <span className="material-symbols-outlined text-sm">
                auto_awesome
              </span>
              <p className="text-sm">
                You&apos;ve completed 75% of your weekly learning goal.
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/my-learning/modules/1"
            className="px-6 py-3 bg-primary hover:bg-indigo-500 text-white rounded-full font-semibold flex items-center space-x-2 transition-all glow-soft"
          >
            <span>Resume Learning</span>
            <span className="material-symbols-outlined">play_arrow</span>
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-10">
            {/* Current path / course progress */}
            <section>
              <div className="gradient-border p-8 overflow-hidden group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-white">
                      Advanced Neuro-Leadership
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Current Path: Executive Management Tier 2
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-accent-blue">
                      72%
                    </span>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">
                      Progress
                    </p>
                  </div>
                </div>
                <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden mb-8">
                  <div
                    className="bg-gradient-to-r from-accent-purple to-accent-blue h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ width: '72%' }}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="material-symbols-outlined text-accent-purple mb-2">
                      menu_book
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      12 Modules
                    </h4>
                    <p className="text-xs text-slate-500">8 Completed</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="material-symbols-outlined text-accent-blue mb-2">
                      assignment
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      4 Quizzes
                    </h4>
                    <p className="text-xs text-slate-500">3 Mastered</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="material-symbols-outlined text-emerald-400 mb-2">
                      verified
                    </span>
                    <h4 className="text-sm font-semibold text-white">
                      Certification
                    </h4>
                    <p className="text-xs text-slate-500">Pending final exam</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Training */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  Featured Training
                </h3>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="p-2 rounded-full border border-white/10 hover:bg-white/5"
                    aria-label="Previous"
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full border border-white/10 hover:bg-white/5"
                    aria-label="Next"
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Link
                  to="/dashboard/my-learning/modules/1"
                  className="group relative overflow-hidden rounded-2xl bg-surface-dark border border-white/10 aspect-video flex items-end"
                >
                  <img
                    alt="Cybersecurity training abstract image"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJOHBD4BDAdUf6l0ySajyyLfHtX7N4U9zLHSb-OqpAY-pQM1Xm6vo3sOD4Uvoy5lvovxObOX429hy9aiLhYRATN0sq46BUzSiS75ZeUS-HnGVZ3r3W9PUZXqob7DUsBQugBITHdCD2-3pI6lM-Hn9iLmDR0g0EXCGXoYuY2qz8m23GwgavnrUTUqMDkWyvLSy37PT8z433CGasEIDs87-Jau6VoCWIWzk5NsinFzfHbHnixLPhBYX0nOqM-QQ9HIDQsLsHIee98E2c"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B13] via-transparent to-transparent" />
                  <div className="relative p-6 w-full">
                    <div className="bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded w-fit mb-2">
                      New Course
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      Cyber Resilience in AI
                    </h4>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-slate-400">
                        4.5 hours • Advanced
                      </span>
                      <span className="h-10 w-10 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
                <Link
                  to="#"
                  className="group relative overflow-hidden rounded-2xl bg-surface-dark border border-white/10 aspect-video flex items-end"
                >
                  <img
                    alt="Robotics and human collaboration"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN3QGSgsFCQ_zuWhUC3TyCyoCCQNnUmLpzJOnQ3XikE2yk_CZWrus4D1Z8FylhYBLJWHvWHwYeDfmsMvSu_zb7SBhuEFVLGy_r-rOK7YD0Pui2lNJVRsG8SXYm8G8f-Ur2Bo2jK3SnBlAypYK-INQ3HQ1SUK9aTZIsgBJvghb4nI2AQT2DE87DyayHn3nZtHLU8lwO4CqU7VSBZF_aFkktbjcqA1H27lrk8trfRsgn5CrahxJcUzjDOY7Ynqj-kSOWBHTRtnlAoaDO"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B13] via-transparent to-transparent" />
                  <div className="relative p-6 w-full">
                    <div className="bg-accent-purple/20 text-accent-purple text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded w-fit mb-2">
                      Popular
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      Collaborative Intelligence
                    </h4>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-slate-400">
                        2.5 hours • Intermediate
                      </span>
                      <span className="h-10 w-10 bg-white/10 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-sm">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            {/* Upcoming in your Journey */}
            <section>
              <h3 className="text-xl font-bold mb-6 text-white">
                Upcoming in your Journey
              </h3>
              <div className="space-y-4">
                <Link
                  to="/dashboard/my-learning/modules/1"
                  className="bg-surface-dark border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-accent-blue">
                      <span className="material-symbols-outlined">
                        psychology
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">
                        Neural Network Basics for Leaders
                      </h4>
                      <p className="text-xs text-slate-500">
                        Scheduled for Tomorrow, 10:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-slate-500 font-medium group-hover:text-primary transition-colors">
                      Start module
                    </span>
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">
                      chevron_right
                    </span>
                  </div>
                </Link>
                <div className="bg-surface-dark border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-accent-purple">
                      <span className="material-symbols-outlined">
                        insights
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">
                        Ethical AI Frameworks
                      </h4>
                      <p className="text-xs text-slate-500">
                        Unlocks on Friday
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="material-symbols-outlined text-slate-600">
                      lock
                    </span>
                  </div>
                </div>
                <div className="bg-surface-dark border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-amber-400">
                      <span className="material-symbols-outlined">hub</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">
                        Systemic Thinking Workshop
                      </h4>
                      <p className="text-xs text-slate-500">
                        Group session • July 12th
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-500 group-hover:text-primary">
                    <span className="material-symbols-outlined">event</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-surface-dark border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-6 text-white">
                Quick Performance
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-400">
                        done_all
                      </span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">24</p>
                      <p className="text-[10px] uppercase font-bold text-slate-500">
                        Modules Completed
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-400 font-bold flex items-center">
                    <span className="material-symbols-outlined text-xs mr-1">
                      trending_up
                    </span>
                    +4
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-purple-400">
                        timer
                      </span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">18.5h</p>
                      <p className="text-[10px] uppercase font-bold text-slate-500">
                        Learning Time
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 font-bold">Total</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-amber-400">
                        military_tech
                      </span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">92%</p>
                      <p className="text-[10px] uppercase font-bold text-slate-500">
                        Avg. Quiz Score
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-400 font-bold">
                    Top 5%
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5">
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

            <div className="bg-surface-dark border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-6 text-white">
                Expert Mentors
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      alt="Mentor portrait"
                      className="h-10 w-10 rounded-full object-cover border border-white/10"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkvajZ-_8ti2aCujgeJSrXzxpoidYE0u2ILGuLHUTFXfgU8By8THHe4gpcrNIQpQsL2ouPD0VrpHfWcWw2GctjMGXthOTu6trBU8gdAPg7pRAJiNUwD_PF8GRt3ofvx6QlR5FhnreoHfOMfcMWwpXhZSTAWMhqHnTphDVhUMmFVRA7og1RCGWemf44cynNICdI_GWJV4DkgeFXDpEIq-_Kep8NHy5PpvSYGeszeC6EhXsih5_z3O74lLAM8XGrp5RzFN-xcIECZNk_"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        Dr. Marcus Chen
                      </h4>
                      <p className="text-xs text-slate-500">AI Specialist</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
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
                      className="h-10 w-10 rounded-full object-cover border border-white/10"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAyrKKa64BVUghFhu-rlspH6aZym8yquJMEvUqUjIs2NgoJNLEwmKx57Y7xLa7a3Xvzi1lXZp_X49nkop4wuLb0Zwoxd7uLCX1hQZjvmce01HVbDKKsFSzV4xP37iH6W3mR9xrYburuZmTDZwNjxBhWr4nPHwBcWJ1Zt3w47eO2_5zoa0ll0eUcsUqbry815D3VyTJ1i_yjEDRUGNj3U8x8D6oJeLmspef48DYJNP21IwCJhQ0We6UYnv5YHGDW0JgW-ARvlLmhnub"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        Elena Rodriguez
                      </h4>
                      <p className="text-xs text-slate-500">
                        Behavioral Design
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
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
                className="w-full mt-6 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-white transition-colors"
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
