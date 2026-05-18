import { useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getModuleById,
  getAllLessons,
  getModuleLessonSummary,
  getResumeLesson,
  FALLBACK_THUMBNAIL_URL,
} from '../data/moduleSyllabus';
import type { Lesson } from '../data/moduleSyllabus';

function getLessonThumbnail(lesson: Lesson): string {
  return (
    lesson.thumbnail ??
    lesson.videoSegments?.[0]?.thumbnail ??
    FALLBACK_THUMBNAIL_URL
  );
}

function getLessonDurationBadge(lesson: Lesson): string {
  const seg = lesson.videoSegments?.[0];
  if (seg?.duration) return seg.duration;
  const d = lesson.duration.trim();
  const m = d.match(/(\d+)\s*m(?:in|inutes)?/i);
  const h = d.match(/(\d+)\s*h/i);
  if (h && m) return `${h[1]}h ${m[1]}m`;
  if (h) return `${h[1]}h`;
  if (m) return `${m[1]}m`;
  return lesson.duration;
}

export default function ModuleLessons() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const module = moduleId ? getModuleById(moduleId) : null;

  if (!module) {
    return (
      <div className="flex-1 overflow-y-auto p-8 scroll-hide flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">Module not found.</p>
        <Link
          to="/dashboard/my-learning/modules"
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
        >
          Back to Modules
        </Link>
      </div>
    );
  }

  const lessons = getAllLessons(module);
  const { count, totalDuration } = getModuleLessonSummary(module);
  const resumeLesson = getResumeLesson(module);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({
        left: dir === 'left' ? -340 : 340,
        behavior: 'smooth',
      });
  };

  return (
    <div className="flex-1 overflow-y-auto min-h-0">
      {/* Hero – static at top, scrolls away with page */}
      <header className="relative shrink-0 h-[450px] hero-gradient flex flex-col justify-end p-12">
        <div className="absolute top-8 left-12">
          <Link
            to="/dashboard/my-learning/modules"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="text-sm font-medium uppercase tracking-widest">
              Back to Library
            </span>
          </Link>
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            {module.category && (
              <>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em]">
                  {module.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </>
            )}
            <span className="text-xs text-white/70 font-medium">
              {count} Lesson{count !== 1 ? 's' : ''} • {totalDuration} total
            </span>
          </div>
          <h2 className="text-6xl font-black text-white mb-6 leading-tight tracking-tight">
            {module.title}
          </h2>
          {module.description && (
            <p className="text-xl text-white/80 mb-10 max-w-2xl font-light leading-relaxed">
              {module.description}
            </p>
          )}
          <div className="flex items-center gap-4">
            {resumeLesson && (
              <Link
                to={`/dashboard/my-learning/modules/${moduleId}/lessons/${resumeLesson.id}`}
                className="px-8 py-4 bg-white text-indigo-700 rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-50 transition-all shadow-xl shadow-black/20"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                RESUME MODULE
              </Link>
            )}
            <button
              type="button"
              className="w-14 h-14 rounded-2xl border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Bookmark"
            >
              <span className="material-symbols-outlined">bookmark</span>
            </button>
            <button
              type="button"
              className="w-14 h-14 rounded-2xl border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Share"
            >
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />
        </div>
      </header>

      {/* Main – horizontal lesson cards */}
      <main>
        <div className="px-12 py-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              Module Lessons
            </h3>
            <p className="text-sm text-slate-400">
              Continue where you left off or jump to a specific topic
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="overflow-y-auto scroll-hide px-12 pb-12 grid grid-cols-3 gap-6 min-h-[280px]"
        >
          {lessons.map((lesson, index) => {
            const isLocked = lesson.status === 'locked';
            const isActive = lesson.status === 'active';
            const thumbnail = getLessonThumbnail(lesson);
            const durationBadge = getLessonDurationBadge(lesson);
            const lessonNum = String(index + 1).padStart(2, '0');

            return (
              <div
                key={lesson.id}
                role={isLocked ? undefined : 'button'}
                tabIndex={isLocked ? undefined : 0}
                onClick={() =>
                  !isLocked &&
                  navigate(
                    `/dashboard/my-learning/modules/${moduleId}/lessons/${lesson.id}`
                  )
                }
                onKeyDown={(e) =>
                  !isLocked &&
                  e.key === 'Enter' &&
                  navigate(
                    `/dashboard/my-learning/modules/${moduleId}/lessons/${lesson.id}`
                  )
                }
                className={`lesson-card p-6 rounded-[32px] flex flex-col gap-4 group transition-all duration-300 ${
                  isLocked
                    ? 'opacity-60 hover:opacity-100 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-2">
                  <img
                    alt=""
                    src={thumbnail}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {isLocked ? (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="material-symbols-outlined text-white/50 text-4xl">
                        lock
                      </span>
                    </div>
                  ) : (
                    <div
                      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                        isActive
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-white">
                          play_arrow
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded-md text-[10px] font-bold text-white">
                    {durationBadge}
                  </div>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 h-1 bg-indigo-500"
                      style={{ width: '45%' }}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest ${
                        isLocked ? 'text-indigo-400/60' : 'text-indigo-400'
                      }`}
                    >
                      Lesson {lessonNum}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 ${
                        lesson.status === 'completed'
                          ? 'text-emerald-400'
                          : lesson.status === 'active'
                            ? 'text-orange-400'
                            : 'text-slate-500'
                      }`}
                    >
                      {lesson.status === 'completed' && (
                        <>
                          <span className="material-symbols-outlined text-[12px]">
                            check_circle
                          </span>
                          Completed
                        </>
                      )}
                      {lesson.status === 'active' && 'In Progress'}
                      {lesson.status === 'locked' && 'Locked'}
                    </span>
                  </div>
                  <h4
                    className={`text-lg font-bold leading-snug group-hover:text-indigo-400 transition-colors ${
                      isLocked ? 'text-white/60' : 'text-white'
                    }`}
                  >
                    {lesson.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-slate-400">
                        <span className="material-symbols-outlined text-sm">
                          schedule
                        </span>
                        <span className="text-[10px]">{lesson.duration}</span>
                      </div>
                      {lesson.level && (
                        <div className="flex items-center gap-1 text-slate-400">
                          <span className="material-symbols-outlined text-sm">
                            signal_cellular_alt
                          </span>
                          <span className="text-[10px]">{lesson.level}</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 rounded hover:bg-white/5 text-slate-600 group-hover:text-indigo-400 transition-colors"
                      aria-label="More"
                    >
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
