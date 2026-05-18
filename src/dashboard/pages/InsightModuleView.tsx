import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import VideoLessonPlayer from '../components/VideoLessonPlayer';
import {
  getProgramme,
  getInsightBySlug,
  getInsightSectionsForModule,
  INSIGHT_SIDEBAR_TITLES,
} from '../data/elaraProgramme';
import { getModuleById, getAllLessons } from '../data/moduleSyllabus';

// Type definitions for questions and transcripts
interface Question {
  question: string;
  type: 'multiple-choice' | 'slider' | 'text';
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
  maxLength?: number;
}
// Pre-video questions for each module and insight
const PRE_VIDEO_QUESTIONS_BY_MODULE: { [key: string]: Question[][] } = {
  'thinking-differently-at-work': [
    [
      {
        question: 'How would you describe your thinking style at work?',
        type: 'multiple-choice',
        options: [
          'Quick and decisive',
          'Deep and thorough',
          'Pattern-focused',
          'Structure-oriented',
          'Creative and flexible',
        ],
      },
      {
        question:
          'What percentage of people do you think have different thinking styles?',
        type: 'slider',
        min: 5,
        max: 50,
        unit: '%',
      },
      {
        question:
          'How do you think digital tools affect different thinkers? (One sentence)',
        type: 'text',
        maxLength: 100,
      },
    ],
    [
      {
        question: 'Which thinking process feels most demanding for you?',
        type: 'multiple-choice',
        options: [
          'Taking in information',
          'Organizing information',
          'Holding information in mind',
          'Moving from thought to action',
        ],
      },
      {
        question: 'Rate your comfort with multitasking',
        type: 'slider',
        min: 1,
        max: 10,
        unit: '/10',
      },
      {
        question: 'Describe a work task that feels mentally smooth for you',
        type: 'text',
        maxLength: 80,
      },
    ],
    [
      {
        question:
          'Do you think job titles fully capture what people can contribute?',
        type: 'multiple-choice',
        options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'],
      },
      {
        question: 'How often do you notice hidden skills in colleagues?',
        type: 'slider',
        min: 1,
        max: 10,
        unit: '/10',
      },
      {
        question:
          "What's one skill you have that's not in your job description?",
        type: 'text',
        maxLength: 60,
      },
    ],
  ],
  'attention-focus-mental-energy': [[], [], []],
  // Alias: Future Sync syllabus slug
  'attention-focus-and-mental-energy': [[], [], []],
};

// Video transcripts for each module
const VIDEO_TRANSCRIPTS_BY_MODULE: { [key: string]: string[] } = {
  'thinking-differently-at-work': [
    `In this video, you'll understand what neurodiversity means and why different thinking styles matter more than ever in modern work.

Human brains naturally vary in how they think, focus, and process information.
• Some people think quickly.
• Some people think deeply.
• Some notice patterns without trying.
• Others do their best thinking when there's clarity, structure, or time to pause.

You'll recognise this at work, one person answers instantly in a meeting, while another needs time to think before they contribute.

None of these ways of thinking are better or worse. They're simply different.

As the way we work continues to change, becoming more data-driven and increasingly supported by digital tools and AI, humans and technology are working more closely together, than ever before.

This natural variation in how brains work is often described as **neurodiversity**.

Neurodiversity refers to the many different ways human brains work. It includes people with ADHD, autism, and other cognitive differences. As well as many people who simply think differently, whether they have a diagnosis or not.

**It's estimated that around 15-20% of people are neurodivergent**, that's roughly one in every five people in the workplace.

In a digital and AI-enabled workplace, organisations increasingly rely on people who bring:
• Thoughtful judgement
• Problem-solving from different angles
• Creativity and new ideas
• The ability to notice patterns others miss
• And the willingness to pause and question data, systems, or assumptions

The key point is simple: **when work becomes more digital, the way people think becomes a bigger part of performance**.

Understanding how different minds work, and how they interact with technology, helps people, systems, and AI work better together.

So as you move through this module, consider: Where does your thinking style help you most and where might the modern workplace make it harder?`,

    `In this video, you'll understand why the same task can feel easy for one person and mentally exhausting for another, even when the role is the same.

People often talk about "thinking" as if it's a single process. But in reality, **thinking is made up of several mental processes working together**.

They include:
• How we take in information
• How we organise it
• How we hold it in mind
• And how we move from thought to action

At work, these processes are happening all the time, often without us realising it.

Most people can only hold a limited amount of information in mind at once and that capacity varies between individuals.

What's important to understand is that **these mental processes don't work in the same way, or at the same pace, for everyone**.

Some people organise ideas quickly.
Others need time and structure before things make sense.
Some people move quickly from thinking to action.
Others need space to reflect before they feel confident moving forward.

This means **the same task, the same meeting, the same report, the same system, can place very different demands on different people**.

This is a key part of neurodiversity at work. **It's not about motivation or capability. It's about how different brains handle information and mental load**.

The key point to remember is this: understanding how thinking works helps explain why people approach the same work differently and why those differences are a natural and valuable part of how brains function at work. It's not because they care less or try less, they do so because their brains simply work differently.

As you move on, consider: Which parts of thinking does your work rely on most and how well does that match how your brain works?`,

    `In this video, you'll see how neurodiversity can show up in everyday work and how organisations can overlook valuable thinking by focusing only on job roles.

Some people focus very clearly on the task they were hired to do.
They take their role seriously.
They follow processes carefully.
They do what's been asked and they do it properly.

In many workplaces, these people are seen as reliable and consistent. They keep things running smoothly. They make sure nothing gets missed.

For people whose brains work in a more literal way, this focus can be a real strength.

At the same time, this way of thinking can mean that **skills or interests outside the job title aren't automatically seen as relevant to work**.

Not because those skills don't exist, but because the brain doesn't instinctively connect extra abilities with the role it was given.

This is one way neurodiversity can show up at work.

**Here's an example.**

A forklift truck driver working on a busy site was known as reliable and consistent. He followed procedures carefully and did his job well.

What most people didn't know was that outside of work, **he spent his evenings building AI Systems that were complex and forward thinking**.

Because of how his brain worked, he understood his role very literally:
Come to work. Drive the forklift. Go home.

His job and his personal interests stayed completely separate. At the same time, the organisation wanted to use AI and data to improve efficiency but they struggled to work out how.

**What they didn't realise was that the kind of thinking they needed already existed within the organisation**.

When his ideas were eventually noticed and shared, he moved into the data team and went on to lead AI and data work within the company.

The key point to remember is this: **People don't only contribute through their job title they contribute through how they think**.

When organisations become curious about how people process information, solve problems, and approach work, they are far more likely to spot strengths that would otherwise remain invisible.

As you move on, consider: Where might valuable ways of thinking be present in your workplace but currently overlooked?`,
  ],
  'attention-focus-mental-energy': [
    'Sample transcript (Insight 1): This video explores how attention is shaped by environment, task design, and digital interruption. In fast-paced settings, different brains regulate focus differently, and performance can fluctuate based on cognitive load.',
    'Sample transcript (Insight 2): This video looks at mental energy and switching costs. Notifications, context switching, and unclear priorities can drain working memory and reduce quality of thinking over time.',
    'Sample transcript (Insight 3): This video covers practical support. Small changes—clearer priorities, fewer interruptions, and better structure—can improve sustained focus and reduce cognitive strain across a team.',
  ],
  // Alias: Future Sync syllabus slug
  'attention-focus-and-mental-energy': [
    'Sample transcript (Insight 1): This video explores how attention is shaped by environment, task design, and digital interruption. In fast-paced settings, different brains regulate focus differently, and performance can fluctuate based on cognitive load.',
    'Sample transcript (Insight 2): This video looks at mental energy and switching costs. Notifications, context switching, and unclear priorities can drain working memory and reduce quality of thinking over time.',
    'Sample transcript (Insight 3): This video covers practical support. Small changes—clearer priorities, fewer interruptions, and better structure—can improve sustained focus and reduce cognitive strain across a team.',
  ],
};

export default function InsightModuleView() {
  const { programmeId, insightSlug } = useParams<{
    programmeId: string;
    insightSlug: string;
  }>();
  const programmeBase = `/dashboard/my-learning/programme/${programmeId ?? '1'}`;
  const insightProgramme = getProgramme();
  const syllabusProgramme = programmeId ? getModuleById(programmeId) : null;
  const syllabusLesson =
    syllabusProgramme && insightSlug
      ? (getAllLessons(syllabusProgramme).find((l) => l.slug === insightSlug) ??
        null)
      : null;

  const insightFromData = insightSlug ? getInsightBySlug(insightSlug) : null;
  const syllabusDescription = syllabusLesson
    ? syllabusLesson.objectives.join(' ')
    : '';
  const insight =
    insightFromData ??
    (syllabusLesson
      ? {
          id: syllabusLesson.id,
          slug: syllabusLesson.slug,
          title: syllabusLesson.title,
          description: syllabusDescription,
          longDescription: syllabusDescription,
        }
      : null);

  const fallbackInsightCount = insightFromData
    ? INSIGHT_SIDEBAR_TITLES.length
    : insightSlug === 'attention-focus-mental-energy' ||
        insightSlug === 'attention-focus-and-mental-energy'
      ? 3
      : 1;

  const sidebarTitles = insightFromData
    ? [...INSIGHT_SIDEBAR_TITLES]
    : Array.from(
        { length: fallbackInsightCount },
        (_, i) => `INSIGHT ${String(i + 1).padStart(2, '0')}`
      );

  const sections = insightFromData
    ? insight
      ? getInsightSectionsForModule(insight.slug)
      : []
    : sidebarTitles.map((t) => ({ title: t, questions: [] }));

  const insightCount = Math.max(1, sidebarTitles.length);
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);
  const [completedInsights, setCompletedInsights] = useState<boolean[]>(
    Array.from({ length: insightCount }, () => false)
  );
  const [sectionStates, setSectionStates] = useState<{
    questions: boolean[];
    videos: boolean[];
    reflections: boolean[];
  }>({
    questions: Array.from({ length: insightCount }, () => false),
    videos: Array.from({ length: insightCount }, () => false),
    reflections: Array.from({ length: insightCount }, () => false),
  });
  const [activeTab, setActiveTab] = useState<
    'questions' | 'reflection' | 'transcript'
  >('questions');
  const [tabStatePerInsight, setTabStatePerInsight] = useState<{
    [key: number]: 'questions' | 'reflection' | 'transcript';
  }>({
    0: 'questions',
  });

  const allInsightsCompleted = completedInsights.every(Boolean);

  const handleSaveAndContinue = (idx: number) => {
    setCompletedInsights((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
    setSectionStates((prev) => ({
      ...prev,
      reflections: prev.reflections.map((completed, i) =>
        i === idx ? true : completed
      ),
    }));
    if (idx < 2) setActiveInsightIndex(idx + 1);
  };

  const handleInsightNavigation = (idx: number) => {
    setActiveInsightIndex(idx);

    // Smooth scroll to Module Lessons section
    const moduleLessonsElement = document.getElementById('module-lessons');
    if (moduleLessonsElement) {
      moduleLessonsElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleQuestionsComplete = (idx: number) => {
    setSectionStates((prev) => ({
      ...prev,
      questions: prev.questions.map((completed, i) =>
        i === idx ? true : completed
      ),
    }));
  };

  // Scroll to top only when navigating to this page from external sources (dashboard main is the scroll container)
  useEffect(() => {
    window.scrollTo(0, 0);
    const el = document.querySelector('main.flex-1.overflow-y-auto.relative');
    if (el) (el as HTMLElement).scrollTop = 0;
  }, [insightSlug]);

  // Preserve and restore tab state when switching between insights
  useEffect(() => {
    const savedTab = tabStatePerInsight[activeInsightIndex];
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, [activeInsightIndex, tabStatePerInsight]);

  // Save tab state when user switches tabs
  const handleTabChange = (
    newTab: 'questions' | 'reflection' | 'transcript'
  ) => {
    setActiveTab(newTab);
    setTabStatePerInsight((prev) => ({
      ...prev,
      [activeInsightIndex]: newTab,
    }));
  };

  // Note: Removed scroll-to-top for sidebar navigation to maintain user's scroll position

  if (!insight) {
    return (
      <div className="flex-1 overflow-y-auto p-8 scroll-hide flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">Insight module not found.</p>
        <Link
          to={programmeBase}
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
        >
          Back to Programme
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-[#020617] text-white">
      <header className="relative shrink-0 min-h-[260px] hero-gradient flex flex-col justify-end p-10">
        <div className="absolute top-6 left-10 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            Module Insight Overview
          </span>
          <Link
            to={programmeBase}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="text-sm font-medium uppercase tracking-widest">
              Back to Programme
            </span>
          </Link>
        </div>
        <div className="absolute top-6 right-10 text-right">
          <span className="text-xs text-white/70 font-medium">
            {sidebarTitles.length} Insights • Part of{' '}
            {syllabusProgramme?.title ?? insightProgramme.title}
          </span>
        </div>
        <div className="relative z-10 max-w-4xl mt-10">
          <h1 className="text-4xl font-black text-white mb-4 leading-tight tracking-tight">
            {insight.title}
          </h1>
          <p className="text-lg text-white/80 max-w-2xl font-light leading-relaxed whitespace-pre-line">
            {insight.longDescription ?? insight.description}
          </p>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-white/10 rounded-full blur-[120px]" />
        </div>
      </header>

      <main className="flex w-full">
        <div className="w-3/4 flex flex-col p-8 space-y-10">
          {/* Intro: What Learners Will Gain (when available) */}
          {insight.whatLearnersWillGain &&
            insight.whatLearnersWillGain.length > 0 && (
              <section className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    What Learners Will Gain
                  </h3>
                  <ul className="space-y-2 text-slate-300">
                    {insight.whatLearnersWillGain.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-primary shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

          {/* Module Lessons: show only the active insight (Video + Self-Reflection) */}
          <h2
            id="module-lessons"
            className="text-2xl font-bold text-white scroll-mt-6"
          >
            Module Lessons
          </h2>

          {(() => {
            const idx = activeInsightIndex;
            const section = sections[idx];
            if (!section) return null;
            return (
              <article
                key={idx}
                id={`insight-${idx}`}
                className="scroll-mt-6 space-y-6"
              >
                <h3 className="text-lg font-bold text-white">
                  {idx + 1}. {sidebarTitles[idx]}
                </h3>

                {/* Video */}
                {(() => {
                  // Module-specific video URLs
                  const moduleVideos: { [key: string]: string[] } = {
                    'thinking-differently-at-work': [
                      'https://drive.google.com/file/d/1VnNxw9NXGcDp9RkXCfuZAhQN6kamxNNA/view?usp=drive_link',
                      'https://drive.google.com/file/d/1fZvwZJNZBSy_FJjZgplXaBgpcuoVDyMW/view?usp=drive_link',
                      'https://drive.google.com/file/d/1FkVrCoOKloLhF30SNHTNCMIEN3ROXE9d/view?usp=drive_link',
                    ],
                    'attention-focus-mental-energy': [
                      'https://drive.google.com/file/d/1nM33RGIgQqPVSQFbydCaAYiYNlZc2Gff/view?usp=drive_link',
                      'https://drive.google.com/file/d/1AeH8w5MrKi6A0phhtPZc0-exP437BBn9/view?usp=drive_link',
                      'https://drive.google.com/file/d/106DcHCXiHIt9JePL68pMU791oLMpMqyp/view?usp=drive_link',
                    ],
                    // Alias: Future Sync syllabus slug
                    'attention-focus-and-mental-energy': [
                      'https://drive.google.com/file/d/1nM33RGIgQqPVSQFbydCaAYiYNlZc2Gff/view?usp=drive_link',
                      'https://drive.google.com/file/d/1AeH8w5MrKi6A0phhtPZc0-exP437BBn9/view?usp=drive_link',
                      'https://drive.google.com/file/d/106DcHCXiHIt9JePL68pMU791oLMpMqyp/view?usp=drive_link',
                    ],
                  };

                  const currentModuleVideos = moduleVideos[insight.slug] || [];
                  const videoUrl = currentModuleVideos[idx];

                  return (
                    <VideoLessonPlayer
                      title={`Video ${idx + 1}: ${section.title}`}
                      videoUrl={videoUrl}
                      className="mb-6"
                    />
                  );
                })()}

                {/* Tab Navigation */}
                <div className="flex space-x-1 mb-8">
                  <button
                    type="button"
                    onClick={() => handleTabChange('questions')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeTab === 'questions'
                        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      quiz
                    </span>
                    Pre-Video Questions
                    {sectionStates.questions[idx] && (
                      <span className="material-symbols-outlined text-sm text-blue-400">
                        check_circle
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange('reflection')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeTab === 'reflection'
                        ? 'bg-purple-500/20 border border-purple-500/30 text-purple-400'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      psychology
                    </span>
                    Self-Reflection
                    {sectionStates.reflections[idx] && (
                      <span className="material-symbols-outlined text-sm text-purple-400">
                        check_circle
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange('transcript')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                      activeTab === 'transcript'
                        ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      subtitles
                    </span>
                    Transcript
                  </button>
                </div>

                {/* Questions Section (Pre-Video Assessment) */}
                {activeTab === 'questions' && (
                  <section className="glass-panel rounded-2xl p-8 border border-white/10 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-400">
                          quiz
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          Pre-Video Questions
                        </h4>
                        <p className="text-sm text-slate-400">
                          Test your current knowledge before watching the video.
                        </p>
                      </div>
                      <div className="ml-auto">
                        {sectionStates.questions[idx] && (
                          <div className="flex items-center gap-2 text-blue-400">
                            <span className="material-symbols-outlined text-sm">
                              check_circle
                            </span>
                            <span className="text-xs font-medium">
                              Completed
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-6">
                      {PRE_VIDEO_QUESTIONS_BY_MODULE[insight.slug]?.[idx]?.map(
                        (q: Question, qIdx: number) => (
                          <div key={qIdx} className="space-y-3">
                            <label className="text-sm font-medium text-slate-200">
                              {qIdx + 1}. {q.question}
                            </label>
                            {q.type === 'multiple-choice' && (
                              <div className="space-y-2">
                                {q.options?.map(
                                  (option: string, oIdx: number) => (
                                    <label
                                      key={oIdx}
                                      className="flex items-center gap-3 cursor-pointer group"
                                    >
                                      <input
                                        type="radio"
                                        name={`question-${idx}-${qIdx}`}
                                        className="w-4 h-4 text-blue-500 bg-white/5 border-white/20 focus:ring-blue-500 focus:ring-2"
                                      />
                                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                        {option}
                                      </span>
                                    </label>
                                  )
                                )}
                              </div>
                            )}
                            {q.type === 'slider' && (
                              <div className="space-y-2">
                                <input
                                  type="range"
                                  min={q.min}
                                  max={q.max}
                                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-slate-400">
                                  <span>
                                    {q.min}
                                    {q.unit}
                                  </span>
                                  <span>
                                    {q.max}
                                    {q.unit}
                                  </span>
                                </div>
                              </div>
                            )}
                            {q.type === 'text' && (
                              <input
                                type="text"
                                maxLength={q.maxLength}
                                className="w-full rounded-xl p-3 text-sm text-slate-200 bg-white/5 border border-white/10 focus:border-blue-500/50 outline-none transition-colors"
                                placeholder="Type your answer..."
                              />
                            )}
                          </div>
                        )
                      )}
                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => handleQuestionsComplete(idx)}
                          disabled={sectionStates.questions[idx]}
                          className={`px-6 py-3 transition-all rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg ${
                            sectionStates.questions[idx]
                              ? 'bg-blue-600/50 text-blue-200 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
                          }`}
                        >
                          {sectionStates.questions[idx]
                            ? 'Questions Completed'
                            : 'Complete Questions'}
                          <span className="material-symbols-outlined text-sm">
                            {sectionStates.questions[idx]
                              ? 'check'
                              : 'arrow_forward'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </section>
                )}

                {/* Self-Reflection Section (Post-Video) */}
                {activeTab === 'reflection' && (
                  <section className="glass-panel rounded-2xl p-8 border border-white/10 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-purple-400">
                          psychology
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          Self-Reflection
                        </h4>
                        <p className="text-sm text-slate-400">
                          {section.title} – Reflect on what you've learned from
                          the video.
                        </p>
                      </div>
                      <div className="ml-auto">
                        {sectionStates.reflections[idx] && (
                          <div className="flex items-center gap-2 text-purple-400">
                            <span className="material-symbols-outlined text-sm">
                              check_circle
                            </span>
                            <span className="text-xs font-medium">
                              Completed
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <form
                      className="space-y-6"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="space-y-4">
                        {section.questions.map((question, qIdx) => (
                          <div key={qIdx} className="space-y-2">
                            <label className="text-sm font-medium text-slate-200">
                              {qIdx + 1}. {question}
                            </label>
                            <div className="relative">
                              <textarea
                                className="w-full reflection-input rounded-xl p-4 text-sm text-slate-200 min-h-[120px] resize-none bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none transition-colors"
                                placeholder="Write your reflection... (50-150 words recommended)"
                              />
                              <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                                0/150
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => handleSaveAndContinue(idx)}
                          disabled={completedInsights[idx]}
                          className={`px-6 py-3 transition-all rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg ${
                            completedInsights[idx]
                              ? 'bg-purple-600/50 text-purple-200 cursor-not-allowed'
                              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20'
                          }`}
                        >
                          {completedInsights[idx]
                            ? 'Reflection Completed'
                            : 'Save Reflection & Continue'}
                          <span className="material-symbols-outlined text-sm">
                            {completedInsights[idx] ? 'check' : 'arrow_forward'}
                          </span>
                        </button>
                      </div>
                    </form>
                  </section>
                )}

                {/* Video Transcript Section (Reference) */}
                {activeTab === 'transcript' && (
                  <section className="glass-panel rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3 p-6 border-b border-white/10">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-emerald-400">
                          subtitles
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white">
                          Video Transcript
                        </h4>
                        <p className="text-sm text-slate-400">
                          Full transcript for reference and accessibility.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          content_copy
                        </span>
                        <span className="text-xs font-medium">Copy</span>
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="prose prose-invert prose-sm max-w-none">
                        <div className="text-slate-300 leading-relaxed whitespace-pre-line text-sm">
                          {VIDEO_TRANSCRIPTS_BY_MODULE[insight.slug]?.[idx]}
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </article>
            );
          })()}
        </div>

        {/* Right sidebar – Module Contents + Test Your Knowledge (gated) */}
        <aside className="w-1/4 border-l border-white/5 glass-panel flex flex-col shrink-0 sticky top-0 self-start">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">
              Module Contents
            </h2>
            <p className="text-xs text-slate-400">
              {sidebarTitles.length} Insights
            </p>
          </div>
          <div className="flex-1 custom-scrollbar">
            {sidebarTitles.map((title, idx) => {
              const isCurrent = activeInsightIndex === idx;
              const isCompleted = completedInsights[idx];
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => handleInsightNavigation(idx)}
                  className={`w-full text-left p-4 border-b flex items-start gap-3 transition-colors cursor-pointer ${
                    isCurrent
                      ? 'border-white/10 active-lesson-glow bg-indigo-500/10'
                      : 'border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {isCompleted && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px] text-emerald-500 font-bold">
                          check
                        </span>
                      </div>
                    )}
                    {!isCompleted && isCurrent && (
                      <div className="w-6 h-6 rounded-full border border-indigo-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                      </div>
                    )}
                    {!isCompleted && !isCurrent && (
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                        <span className="text-[10px] text-slate-500 font-bold">
                          {idx + 1}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs truncate ${isCurrent ? 'font-bold text-white' : 'font-medium text-slate-300'}`}
                    >
                      {idx + 1}. {title}
                    </p>
                    <p
                      className={`text-[10px] ${isCurrent ? 'text-indigo-400 font-semibold uppercase' : 'text-slate-500'}`}
                    >
                      {isCompleted
                        ? 'Completed'
                        : isCurrent
                          ? 'Currently Playing'
                          : 'Click to view'}
                    </p>
                  </div>
                </button>
              );
            })}
            <div
              className={`p-4 border-b border-white/5 flex items-start gap-3 ${!allInsightsCompleted ? 'opacity-60' : 'opacity-90'}`}
            >
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] text-slate-500 font-bold">4</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-300">
                  4. TEST YOUR KNOWLEDGE
                </p>
                <p className="text-[10px] text-slate-500">
                  {allInsightsCompleted
                    ? 'The test has yet to be completed, but will comprise 12 questions, all multiple choice.'
                    : `Complete all ${sidebarTitles.length} insights to unlock`}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
