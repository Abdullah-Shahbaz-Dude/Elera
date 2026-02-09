import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getLesson,
  getNextLesson,
  getAllLessons,
  getModuleLessonSummary,
  FALLBACK_THUMBNAIL_URL,
} from '../data/moduleSyllabus';
import type { Lesson } from '../data/moduleSyllabus';

function getVideoThumbnail(lesson: Lesson): string {
  return lesson.videoSegments?.[0]?.thumbnail ?? lesson.thumbnail ?? FALLBACK_THUMBNAIL_URL;
}

export default function LessonView() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const data = moduleId && lessonId ? getLesson(moduleId, lessonId) : null;
  const [activeTab, setActiveTab] = useState<'notes' | 'transcript' | 'resources'>('notes');

  if (!data) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#121419] text-slate-400">
        <div className="text-center">
          <p>Lesson not found.</p>
          <Link to="/dashboard/my-learning/modules" className="text-indigo-400 hover:text-indigo-300 text-sm mt-2 inline-block">
            Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  const { module, lesson } = data;
  const nextLesson = getNextLesson(module, lesson.id);
  const allLessons = getAllLessons(module);
  const { count, totalDuration } = getModuleLessonSummary(module);
  const lessonIndex = allLessons.findIndex((l) => l.id === lesson.id) + 1;
  const videoThumbnail = getVideoThumbnail(lesson);
  const firstSegmentDuration = lesson.videoSegments?.[0]?.duration ?? '0:00';
  const totalDurationDisplay = lesson.duration.replace(/\s+/g, '').toLowerCase() || '34:20';

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#020617] text-white">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 z-20 border-b border-white/5 glass-panel shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to={`/dashboard/my-learning/modules/${moduleId}`}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Modules
          </Link>
          <span className="text-white/20">|</span>
          <h1 className="text-sm font-semibold tracking-tight text-slate-300 truncate max-w-md">
            {module.title} • <span className="text-white">Lesson {lessonIndex}: {lesson.title}</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{ width: `${module.progress}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium">{module.progress}% COMPLETE</span>
          </div>
        </div>
      </header>

      {/* Main: left content + right sidebar */}
      <main className="flex-1 flex overflow-hidden min-h-0">
        {/* Left column - scrollable content */}
        <div className="w-3/4 flex flex-col min-h-0 overflow-y-auto custom-scrollbar p-6 pb-32">
          <div className="flex flex-col space-y-8">
          {/* Large video player */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl shrink-0">
            <img
              alt="Video"
              src={videoThumbnail}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 video-gradient flex flex-col justify-end p-6">
              <div className="flex items-center gap-6 mb-4">
                <button
                  type="button"
                  className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-black hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </button>
                <div className="flex-1 min-w-0">
                  <div className="relative w-full h-1 bg-white/20 rounded-full cursor-pointer group">
                    <div
                      className="absolute h-full bg-indigo-500 rounded-full"
                      style={{ width: '35%' }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-white rounded-full -top-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ left: '35%' }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] text-white/70">
                      {firstSegmentDuration} / {totalDurationDisplay}
                    </span>
                    <div className="flex gap-4">
                      <span className="material-symbols-outlined text-sm text-white/70 cursor-pointer hover:text-white">
                        closed_caption
                      </span>
                      <span className="material-symbols-outlined text-sm text-white/70 cursor-pointer hover:text-white">
                        settings
                      </span>
                      <span className="material-symbols-outlined text-sm text-white/70 cursor-pointer hover:text-white">
                        fullscreen
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: Lesson Notes | Transcript | Resources */}
          <div className="flex flex-col">
            <div className="flex border-b border-white/5 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`px-6 py-3 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Lesson Notes
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('transcript')}
                className={`px-6 py-3 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === 'transcript'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Transcript
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('resources')}
                className={`px-6 py-3 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === 'resources'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Resources
              </button>
            </div>
            <div className="prose prose-invert max-w-none">
              {activeTab === 'notes' && (
                <>
                  <h2 className="text-xl font-bold mb-4">{lesson.title}</h2>
                  <p className="text-slate-400 leading-relaxed">
                    {lesson.objectives.length > 0
                      ? lesson.objectives[0]
                      : 'In this lesson we cover key concepts and practical applications. Use the resources below to deepen your understanding.'}
                  </p>
                </>
              )}
              {activeTab === 'transcript' && (
                <p className="text-slate-400 leading-relaxed">Transcript will appear here when available.</p>
              )}
              {activeTab === 'resources' && (
                <p className="text-slate-400 leading-relaxed">Additional resources and links will appear here.</p>
              )}
            </div>
          </div>

          {/* Lesson assets */}
          {lesson.assets.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
                Lesson Assets
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {lesson.assets.map((asset, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl flex items-center justify-between group hover:transition-all cursor-pointer ${
                      asset.icon === 'terminal'
                        ? 'bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600/20'
                        : 'bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600/20'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          asset.icon === 'terminal' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-purple-500/20 text-purple-400'
                        }`}
                      >
                        <span className="material-symbols-outlined text-3xl">
                          {asset.icon === 'terminal' ? 'terminal' : 'description'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{asset.title}</h4>
                        <p className="text-[10px] text-slate-500 uppercase font-medium">
                          {asset.type} • {asset.size}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined group-hover:translate-y-0.5 transition-transform ${
                        asset.icon === 'terminal' ? 'text-indigo-400' : 'text-purple-400'
                      }`}
                    >
                      download
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Learning objectives */}
          {lesson.objectives.length > 0 && (
            <section className="glass-panel rounded-2xl p-6 border border-white/5">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                Learning Objectives
              </h2>
              <ul className="grid grid-cols-2 gap-y-4 gap-x-12">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <span className="material-symbols-outlined text-indigo-400 mt-0.5 shrink-0">check_circle</span>
                    <span className="text-sm leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Comprehensive Quiz */}
          <section className="glass-panel rounded-2xl p-8 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 blur-[80px] rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <span className="material-symbols-outlined">quiz</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Comprehensive Quiz</h2>
                  <p className="text-xs text-slate-400">Lesson {lessonIndex} Assessment • 5 Questions</p>
                </div>
              </div>
              <form
                className="space-y-12"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-4 pb-8 neon-border-b">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold text-sm">01.</span>
                    <p className="text-slate-200 font-medium">
                      Which optimization strategy is generally more sample-efficient for high-dimensional search spaces?
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-3 ml-8">
                    <label className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all cursor-pointer group">
                      <input name="q1" type="radio" className="w-4 h-4 border-white/20 bg-transparent text-indigo-600 focus:ring-indigo-500/20" />
                      <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Grid Search</span>
                    </label>
                    <label className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all cursor-pointer group">
                      <input name="q1" type="radio" defaultChecked className="w-4 h-4 border-white/20 bg-transparent text-indigo-600 focus:ring-indigo-500/20" />
                      <span className="text-sm text-slate-200">Bayesian Optimization</span>
                    </label>
                    <label className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all cursor-pointer group">
                      <input name="q1" type="radio" className="w-4 h-4 border-white/20 bg-transparent text-indigo-600 focus:ring-indigo-500/20" />
                      <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">Manual Tuning</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-4 pb-8 neon-border-b">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold text-sm">02.</span>
                    <p className="text-slate-200 font-medium">
                      True or False: Random search is fundamentally incapable of finding the global optimum in a continuous search space.
                    </p>
                  </div>
                  <div className="flex gap-4 ml-8">
                    <label className="flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/[0.08] cursor-pointer transition-all">
                      <input name="q2" type="radio" className="w-4 h-4 border-white/20 bg-transparent text-indigo-600 focus:ring-indigo-500/20" />
                      <span className="text-sm font-medium text-slate-300">True</span>
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/[0.08] cursor-pointer transition-all">
                      <input name="q2" type="radio" className="w-4 h-4 border-white/20 bg-transparent text-indigo-600 focus:ring-indigo-500/20" />
                      <span className="text-sm font-medium text-slate-300">False</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-4 pb-8 neon-border-b">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold text-sm">03.</span>
                    <p className="text-slate-200 font-medium">
                      Briefly explain the &apos;Curse of Dimensionality&apos; in the context of Hyperparameter Optimization.
                    </p>
                  </div>
                  <div className="ml-8">
                    <textarea
                      className="w-full bg-white/5 border border-white/10 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-slate-300 placeholder-slate-600 text-sm p-3"
                      placeholder="Write your response here..."
                      rows={4}
                    />
                  </div>
                </div>
                <div className="space-y-4 pb-8 neon-border-b">
                  <div className="flex items-start gap-3">
                    <span className="text-indigo-400 font-bold text-sm">04.</span>
                    <p className="text-slate-200 font-medium">
                      Select all factors that influence the computation cost of a NAS pipeline:
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 ml-8">
                    {['Model Depth', 'Dataset Size', 'GPU Architecture', 'Search Space Size'].map((label) => (
                      <label
                        key={label}
                        className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/[0.08] cursor-pointer"
                      >
                        <input type="checkbox" className="rounded border-white/20 bg-transparent text-indigo-600 focus:ring-indigo-500/20" />
                        <span className="text-sm text-slate-400">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 rounded-xl text-white font-bold tracking-wide shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 group"
                  >
                    <span>SUBMIT ASSESSMENT</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                  </button>
                  <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-widest font-medium">
                    {nextLesson ? `Finalizing this quiz will unlock Lesson ${lessonIndex + 1}` : 'Complete the assessment to finish this lesson'}
                  </p>
                </div>
              </form>
            </div>
          </section>
          </div>
        </div>

        {/* Right sidebar - Module Contents */}
        <aside className="w-1/4 h-full border-l border-white/5 glass-panel flex flex-col shrink-0">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">Module Contents</h2>
            <p className="text-xs text-slate-400">{count} Lessons • {totalDuration} total</p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {allLessons.map((l, idx) => {
              const isCurrent = l.id === lesson.id;
              const isCompleted = l.status === 'completed';
              const isLocked = l.status === 'locked';
              const rowContent = (
                <>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {isCompleted && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px] text-emerald-500 font-bold">check</span>
                      </div>
                    )}
                    {isCurrent && (
                      <div className="w-6 h-6 rounded-full border border-indigo-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                      </div>
                    )}
                    {isLocked && (
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                        <span className="text-[10px] text-slate-500 font-bold">{idx + 1}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs truncate ${isCurrent ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>
                      {idx + 1}. {l.title}
                    </p>
                    <p className={`text-[10px] ${isCurrent ? 'text-indigo-400 font-semibold uppercase' : 'text-slate-500'}`}>
                      {isCurrent ? 'Currently Playing' : l.duration}
                    </p>
                  </div>
                </>
              );
              if (isLocked) {
                return (
                  <div
                    key={l.id}
                    className="p-4 border-b border-white/5 flex items-start gap-3 cursor-default opacity-80"
                  >
                    {rowContent}
                  </div>
                );
              }
              return (
                <Link
                  key={l.id}
                  to={`/dashboard/my-learning/modules/${moduleId}/lessons/${l.id}`}
                  className={`p-4 border-b flex items-start gap-3 transition-colors cursor-pointer group ${
                    isCurrent
                      ? 'border-white/10 active-lesson-glow bg-indigo-500/10'
                      : 'border-white/5 hover:bg-white/5'
                  }`}
                >
                  {rowContent}
                </Link>
              );
            })}
          </div>
          <div className="p-4 border-t border-white/10 glass-panel">
            {nextLesson && nextLesson.status !== 'locked' ? (
              <Link
                to={`/dashboard/my-learning/modules/${moduleId}/lessons/${nextLesson.id}`}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 border border-white/5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-white transition-colors"
              >
                Next Lesson
                <span className="material-symbols-outlined text-sm">skip_next</span>
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  disabled
                  className="w-full py-3 bg-indigo-600/50 cursor-not-allowed border border-white/5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-slate-400"
                >
                  Next Lesson
                  <span className="material-symbols-outlined text-sm">skip_next</span>
                </button>
                <p className="text-[9px] text-center mt-2 text-slate-500">Complete assessment to unlock</p>
              </>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
