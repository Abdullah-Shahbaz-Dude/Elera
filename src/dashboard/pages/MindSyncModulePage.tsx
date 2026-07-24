import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MIND_SYNC_MODULE_01 } from '../data/mindSyncSyllabus';
import VideoLessonPlayer from '../components/VideoLessonPlayer';
import image from '../../assets/images/mindsync/2.jpg';
import aboutimage1 from '../../assets/images/mindsync/4.jpg';
import aboutImage from '../../assets/images/mindsync/3.jpg';

import { useParams, Navigate } from 'react-router-dom';
import MindSyncTeacherTrainingModule01Page from './MindSyncTeacherTrainingModule01Page';

// import aboutImage from '../../assets/images/mindsync/3.jpg';
import structureWatchImage from '../../assets/images/mindsync/5.jpg';
import structureLearnImage from '../../assets/images/mindsync/6.jpg';
import structurePracticeImage from '../../assets/images/mindsync/Untitled design.jpg';
import structureTakeawayImage from '../../assets/images/mindsync/7.jpg';

type TabKey =
  | 'introduction'
  | 'video'
  | 'learn'
  | 'practice'
  | 'takeaway'
  | 'reflection';

interface TocItem {
  key: TabKey;
  label: string;
}

type PracticeOptionKey = 'A' | 'B' | 'C' | 'D';

interface PracticeOption {
  key: PracticeOptionKey;
  title: string;
  body: string;
}

interface PracticeScenario {
  title: string;
  situation: string;
  question: string;
  options: PracticeOption[];
  feedback: Record<PracticeOptionKey, { title: string; body: string }>;
  point: string;
  bestOption: PracticeOptionKey;
}

const TOC: TocItem[] = [
  { key: 'introduction', label: 'Introduction' },
  { key: 'video', label: 'Watch' },
  { key: 'learn', label: 'Learn' },
  { key: 'practice', label: 'Practice' },
  { key: 'takeaway', label: 'Take away' },
];

const PRACTICE_SCENARIOS: PracticeScenario[] = [
  {
    title: 'Scenario 1, The Breakfast Storm',
    situation:
      "It's 7:48 on a school morning. Your son needs to leave at 8:00. He's still in his pyjamas. You've reminded him three times. The fourth time, your voice is slightly louder. He snaps: \"I HEARD YOU, GOD!\" and slams his cereal bowl down hard enough that milk splashes on the table. You feel the heat rise immediately. You have about three seconds.",
    question: 'What would you do?',
    options: [
      {
        key: 'A',
        title:
          "Tell him firmly that's not how we speak in this house, and add a consequence, maybe no phone tonight.",
        body: '',
      },
      {
        key: 'B',
        title:
          'Match his energy: "Don\'t shout at me, you\'re going to be late!"',
        body: '',
      },
      {
        key: 'C',
        title:
          "Take one slow breath, place down whatever you're holding, and say: \"I get it. I'm going to grab your bag. We'll talk in the car.\" Then leave the room.",
        body: '',
      },
      {
        key: 'D',
        title: 'Say nothing, walk out, and let him figure it out.',
        body: '',
      },
    ],
    feedback: {
      A: {
        title: 'Option A, Looks reasonable, almost always backfires',
        body: "Firm and consistent, both good things in principle. But you're delivering a consequence while your own nervous system is firing, which usually carries more frustration than you intend. The lesson he'll absorb is the emotion, not the rule. He'll remember you were angry, not why. And in the heat of a school morning, you'll often not follow through on the phone consequence, which quietly teaches him the rule was negotiable.",
      },
      B: {
        title: 'Option B - Almost guaranteed to escalate',
        body: "The most natural ADHD-on-ADHD response. His tone fired your nervous system, and yours fires back at the same volume. He doesn't have the brain space right now to receive the message; he only has space to react to your tone. Within 30 seconds you're both shouting and the morning is gone. This isn't bad parenting, it's just the cycle the module is teaching you to interrupt.",
      },
      C: {
        title: 'Option C - This is the technique in action',
        body: 'You caught the rise. You acknowledged him without rewarding the tone ("I get it"). You set a clear next step that doesn\'t require him to apologise on the spot ("we\'ll talk in the car"). And you removed yourself from the heat without disappearing. Most importantly, you didn\'t try to address the rudeness in the moment, you left that for the car, when both nervous systems will have dropped.',
      },
      D: {
        title: 'Option D - Better than B, but missing something',
        body: 'Walking out is better than escalating. But silence without acknowledgement can land as withdrawal of love, especially for an ADHD teen. He\'s already in a flood state, and a silent exit can leave him feeling abandoned, which often grows the meltdown rather than fades it. The small phrase before leaving ("I get it. I\'ll meet you in the car") is the difference between a useful pause and a cold shutdown.',
      },
    },
    point:
      "The difference between the worst and best options isn't whether you're firm or lenient. It's whether you spoke from a regulated state or a flooded one. Same words, different nervous system, completely different landing.",
    bestOption: 'C',
  },
  {
    title: 'Scenario 2, The Saturday Build-Up',
    situation:
      'Slow Saturday. Your son has been gaming for about two hours. You\'ve been doing housework. He\'s asked you the same question three times in 20 minutes: "Can my friend come over?" Each time you\'ve said "maybe later, I need to think." The third time, your voice has a slight edge. You can feel something building. Shoulders up. Jaw tight. Close to your limit.',
    question: "What's the most useful thing to do right now?",
    options: [
      {
        key: 'A',
        title:
          "Push through. He's not asking unreasonable things, and you don't want to make a scene out of nothing.",
        body: '',
      },
      {
        key: 'B',
        title:
          'Snap at him: "I said LATER, can you stop asking?" At least it\'ll get him to stop.',
        body: '',
      },
      {
        key: 'C',
        title:
          "Pause, find him, and say: \"I noticed I'm getting a bit short. Let's both have a 20-minute break, I need to reset. Then I'll give you a real answer.\"",
        body: '',
      },
      {
        key: 'D',
        title:
          'Avoid him for a while, go into a different part of the house and hope the urge passes.',
        body: '',
      },
    ],
    feedback: {
      A: {
        title: 'Option A, The most common mistake',
        body: "Pushing through is what most parents do, and it's how the snap eventually happens. Your nervous system has been signalling for 20 minutes that it needs a reset, but you've been ignoring it because the requests felt small. ADHD nervous systems don't need a big trigger, they need a long enough build-up. This doesn't cause a meltdown now, but it makes one much more likely in the next hour.",
      },
      B: {
        title: 'Option B, Predictable but costly',
        body: "Yes, it'll get him to stop asking. It'll also damage trust in a way that takes days to repair. He didn't do anything wrong, he asked a reasonable question three times because his ADHD brain forgets the answer when it isn't given clearly. Snapping teaches him that asking you things is risky, which makes him less likely to bring real concerns to you later.",
      },
      C: {
        title: 'Option C, Catching the rise before it crests',
        body: "The highest-skill version of the technique. You've noticed your own state before it tipped. You've named it without making it his fault. You've taken a clear, defined break with a return time. Crucially, you've signalled a real answer is coming, so the question doesn't keep coming back. This kind of pre-emptive reset prevents most of the snaps that would otherwise happen later in the day.",
      },
      D: {
        title: 'Option D, Half right, half a missed opportunity',
        body: 'Stepping away from a building wave is genuinely useful. But disappearing without naming it leaves him confused, and his ADHD brain will likely interpret it as something he did wrong. The fix is small: one sentence before you step away. "I\'m going to take a quick reset, back in 20 minutes." That sentence transforms avoidance into intentional self-care.',
      },
    },
    point:
      "Catching the rise isn't only about big moments. The hardest version is catching it during a slow build-up, because the body's signals are quieter and easier to ignore. Most snaps aren't sudden. They're twenty minutes in the making.",
    bestOption: 'C',
  },
  {
    title: 'Scenario 3, The After-the-Fact Apology',
    situation:
      "You shouted at him 20 minutes ago over something minor, he forgot to feed the dog. You both know your reaction was bigger than the moment deserved. He's now in his room, headphones on, ignoring you. Your nervous system has settled. You feel guilty.",
    question: "What's the best thing to do now?",
    options: [
      {
        key: 'A',
        title:
          'Knock, sit down, and apologise plainly: "I overreacted. The dog mattered, but not that much. I\'m sorry."',
        body: '',
      },
      {
        key: 'B',
        title:
          'Make him a snack and put it outside his door. Words feel awkward, and food says enough.',
        body: '',
      },
      {
        key: 'C',
        title: "Pretend it didn't happen. By tomorrow he'll have forgotten.",
        body: '',
      },
      {
        key: 'D',
        title:
          'Apologise, but also explain: "I shouldn\'t have shouted, but you also need to remember the dog isn\'t going to feed himself."',
        body: '',
      },
    ],
    feedback: {
      A: {
        title: 'Option A, Repair done well',
        body: "This is exactly what repair looks like. You're naming what happened, taking ownership without excuses, and not asking him to make you feel better about it. ADHD teens are often surprisingly forgiving when an adult repairs cleanly, because so few adults in their lives ever do. What he learns is that adults make mistakes, that mistakes can be acknowledged, and that the relationship survives them.",
      },
      B: {
        title: 'Option B, Kind, but incomplete',
        body: "The gesture is lovely. ADHD brains often respond well to small acts of care after conflict, and a snack outside the door is a quiet way of saying \"we're okay.\" But without any words, he has to guess what the gesture means. Was it a peace offering? An apology? Just dinner? In ADHD relationships, the words matter more than people realise — because his brain often won't supply the meaning if you don't. Use both: the snack and a sentence.",
      },
      C: {
        title: 'Option C, The most damaging option here',
        body: "Pretending it didn't happen is what many adults do, and it's the option that does the most long-term damage. Your son hasn't forgotten, and he won't. ADHD brains often replay difficult moments more, not less. Without repair, the moment becomes part of his quiet picture of you — that you can hurt him and not name it. Over time, this is what erodes trust. The mistake itself is far less damaging than the silence around it.",
      },
      D: {
        title: 'Option D, An apology with a hidden cost',
        body: 'The trap most parents fall into. The first sentence is genuine, but the "but" undoes the whole repair. By the time the second clause arrives, it sounds like the apology was a setup for the lecture. ADHD brains pick up that shift instantly. The clean apology has to stand alone. The conversation about feeding the dog can happen tomorrow.',
      },
    },
    point:
      'You\'ll still have moments where you don\'t catch the rise. What matters almost as much as the technique is what you do afterwards. Clean repair, no "but", no asking him to comfort you about it.',
    bestOption: 'A',
  },
  {
    title: 'Scenario 4, The Public Moment',
    situation:
      'You\'re at a family event. A relative has just made a comment to your son about "sitting still for once." He\'s already had a long day. His face changes, eyes drop, shoulders tighten, jaw set. You can feel your own heat rising on his behalf. Other family members are nearby and watching.',
    question: "What's the most useful thing to do?",
    options: [
      {
        key: 'A',
        title:
          'Confront the relative directly: "That wasn\'t a helpful thing to say."',
        body: '',
      },
      {
        key: 'B',
        title:
          'Do nothing in the moment, but pull your son aside afterwards to check on him.',
        body: '',
      },
      {
        key: 'C',
        title:
          'Lightly redirect: "Come help me with something in the kitchen for a minute." Then check on him in private, away from the room.',
        body: '',
      },
      {
        key: 'D',
        title:
          "Tell your son in front of everyone: \"Don't worry about it, you don't have to sit still — you're great as you are.\"",
        body: '',
      },
    ],
    feedback: {
      A: {
        title: 'Option A, Right values, wrong moment',
        body: "Your instinct to protect is correct, and the relative's comment was unhelpful. But confronting them publicly almost always escalates the room and pulls your son into the centre of an adult conflict. He'll feel the awkwardness more than the protection. There's a place for that conversation, later, in private. In the moment, your son needs an exit, not an advocate.",
      },
      B: {
        title: 'Option B, Caring, but late',
        body: 'Checking on him afterwards is good. But "in the moment" matters for ADHD teens. He\'s currently sitting in a public space with shame visibly rising. If you wait, he\'ll spend another half-hour in that state, masking, holding it together. The ideal version is to do something small in the moment AND check in afterwards.',
      },
      C: {
        title: 'Option C - Quietly excellent',
        body: "This is the move skilled parents of ADHD teens learn over time. You've given him a low-key exit without making the moment about him. You haven't confronted the relative or made him the subject of a scene. You haven't left him sitting in shame. And you've created a private space where you can check in properly. He gets protection, dignity, and follow-up.",
      },
      D: {
        title: 'Option D - Well-meaning, but exposing',
        body: "Public defence is well-intentioned but often makes the moment worse for him. He didn't want a spotlight; he wanted the spotlight to go away. Defending him publicly, even warmly, keeps him in the centre of the room and turns the moment into a Big Thing rather than something he can quietly let slide.",
      },
    },
    point:
      "Catching the rise isn't only about your own escalation. It's also about catching his early and quietly intervening before he has to manage the situation alone.",
    bestOption: 'C',
  },
];

export default function MindSyncModulePage() {
  const { moduleId } = useParams();

  if (moduleId === '2') {
    return <MindSyncTeacherTrainingModule01Page />;
  }

  if (moduleId && moduleId !== '1') {
    return <Navigate to="/dashboard/my-learning/mind-sync" replace />;
  }

  const [active, setActive] = useState<TabKey>('introduction');
  const [isScriptOpen, setIsScriptOpen] = useState(false);
  const [isVideoHelpOpen, setIsVideoHelpOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isOutcomesOpen, setIsOutcomesOpen] = useState(false);
  const [isLearnHighlightOpen, setIsLearnHighlightOpen] = useState(false);
  const [isTechniqueIntroOpen, setIsTechniqueIntroOpen] = useState(false);
  const [isPracticeIntroOpen, setIsPracticeIntroOpen] = useState(false);
  const [isSituationOpen, setIsSituationOpen] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [selectedPracticeOption, setSelectedPracticeOption] =
    useState<PracticeOptionKey | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [learnSubPage, setLearnSubPage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (active !== 'learn') {
      setLearnSubPage(0);
      setIsLearnHighlightOpen(false);
      setIsTechniqueIntroOpen(false);
      return;
    }

    setLearnSubPage(0);
    setIsLearnHighlightOpen(false);
    setIsTechniqueIntroOpen(false);
  }, [active]);

  const activeItem = useMemo(() => {
    return TOC.find((t) => t.key === active) ?? TOC[0];
  }, [active]);

  const activeIndex = useMemo(() => {
    return Math.max(
      0,
      TOC.findIndex((t) => t.key === active)
    );
  }, [active]);

  const heroCopy = useMemo(() => {
    const map: Record<
      Exclude<TabKey, 'introduction'>,
      { title: string; body: string }
    > = {
      video: {
        title: ' Watch',
        body: '',
      },
      learn: {
        title: 'Learn',
        body: ' ',
      },
      practice: {
        title: 'Practice',
        body: '',
      },
      takeaway: {
        title: 'Take away',
        body: ' ',
      },
      reflection: {
        title: 'Optional Reflection',
        body: ' ',
      },
    };

    return active === 'introduction' ? null : map[active];
  }, [active]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F7F9FC] text-slate-900">
      <header className="relative shrink-0 min-h-[200px] md:min-h-[240px] flex flex-col justify-end p-6 md:p-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt="Mind Sync"
            className="w-full h-full object-cover object-[center_7%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="absolute inset-0 hero-gradient opacity-50" />
        </div>
        <div className="absolute top-3 left-4 md:left-6 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            Mind Sync - Training Module 01
          </span>
          <Link
            to="/dashboard/my-learning/mind-sync"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="text-sm font-medium uppercase tracking-widest">
              Back to Mind Sync
            </span>
          </Link>
        </div>

        <div className="absolute top-3 right-4 md:right-6 text-right">
          <span className="text-xs text-white/70 font-medium">
            {activeItem.label}
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mt-6">
          <>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-1 leading-tight tracking-tight">
              {MIND_SYNC_MODULE_01.title}
            </h1>
            <h2 className="text-sm md:text-base text-white/90 font-semibold mb-2">
              {MIND_SYNC_MODULE_01.subtitle}
            </h2>
            {active === 'introduction' ? (
              <p className="text-sm md:text-base text-white/80 max-w-2xl font-light leading-relaxed whitespace-pre-line">
                {MIND_SYNC_MODULE_01.summary}
              </p>
            ) : (
              heroCopy && (
                <p className="text-sm md:text-base text-white/80 max-w-3xl font-normal leading-relaxed whitespace-pre-line">
                  {heroCopy.body}
                </p>
              )
            )}
          </>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-white/10 rounded-full blur-[120px]" />
        </div>
      </header>

      <main className="flex w-full h-[calc(100vh-200px)] md:h-[calc(100vh-240px)] overflow-hidden">
        <div
          className={`w-3/4 flex flex-col min-h-0 overflow-hidden ${
            active === 'video' ? 'p-2' : 'p-6'
          }`}
        >
          <div
            key={active}
            className="step-transition flex flex-col flex-1 min-h-0 overflow-hidden"
          >
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
              {active === 'introduction' && (
                <section className="space-y-6">
                  <div
                    className="border-b border-white/10 overflow-hidden cursor-pointer"
                    onClick={() => {
                      setIsAboutOpen((v) => !v);
                    }}
                  >
                    <div className="group">
                      <button
                        type="button"
                        className="group w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAboutOpen((v) => !v);
                        }}
                      >
                        <span className="flex items-center gap-4 min-w-0">
                          <span
                            className="material-symbols-outlined shrink-0"
                            style={{ color: '#60A5FA', fontSize: '32px' }}
                            aria-hidden
                          >
                            info
                          </span>
                          <h3 className="text-white font-semibold text-xl md:text-2xl min-w-0 truncate">
                            About this module
                          </h3>
                        </span>
                        <span
                          className={`material-symbols-outlined transition-all ${
                            isAboutOpen
                              ? 'text-[#60A5FA] rotate-180'
                              : 'text-white/70 group-hover:text-white'
                          }`}
                        >
                          expand_more
                        </span>
                      </button>

                      {isAboutOpen && (
                        <div className="pb-6 md:pb-8 pl-12 md:pl-16">
                          <div className="text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                            {MIND_SYNC_MODULE_01.about.map((p) => (
                              <p key={p}>{p}</p>
                            ))}
                          </div>

                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="w-full h-44 rounded-2xl bg-cover overflow-hidden shadow-2xl relative">
                              <img
                                alt="Mind Sync"
                                src={aboutimage1}
                                className="w-full h-full object-cover opacity-100"
                              />
                              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/10" />
                            </div>
                            <div className="w-full h-44 rounded-2xl bg-cover overflow-hidden shadow-2xl relative">
                              <img
                                alt="Mind Sync"
                                src={aboutImage}
                                className="w-full h-full object-cover opacity-100"
                              />
                              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/10" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="border-b border-white/10 overflow-hidden cursor-pointer"
                    onClick={() => {
                      setIsOutcomesOpen((v) => !v);
                    }}
                  >
                    <div className="group">
                      <button
                        type="button"
                        className="group w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOutcomesOpen((v) => !v);
                        }}
                      >
                        <span className="flex items-center gap-4 min-w-0">
                          <span
                            className="material-symbols-outlined shrink-0"
                            style={{ color: '#60A5FA', fontSize: '32px' }}
                            aria-hidden
                          >
                            school
                          </span>
                          <h3 className="text-white font-semibold text-xl md:text-2xl min-w-0 truncate">
                            Learning Outcomes
                          </h3>
                        </span>
                        <span
                          className={`material-symbols-outlined transition-all ${
                            isOutcomesOpen
                              ? 'text-[#60A5FA] rotate-180'
                              : 'text-white/70 group-hover:text-white'
                          }`}
                        >
                          expand_more
                        </span>
                      </button>

                      {isOutcomesOpen && (
                        <div className="pb-6 md:pb-8 pl-12 md:pl-16">
                          <ul className="space-y-3">
                            {MIND_SYNC_MODULE_01.learningOutcomes.map(
                              (item, i) => (
                                <li
                                  key={i}
                                  className="flex gap-3 text-slate-300"
                                >
                                  <span className="text-primary shrink-0 mt-1">
                                    •
                                  </span>
                                  <span>{item}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-white mb-3 text-center">
                      How this module is structured
                    </h3>
                    <div
                      className="h-1 w-24 md:w-32 rounded-full mx-auto mb-6"
                      style={{
                        background:
                          'linear-gradient(to right, #60A5FA, #9333EA)',
                      }}
                    ></div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          part: 'Part 01',
                          title: 'Watch',
                          desc: 'A two-minute video set in a real family scene.',
                          bg: structureWatchImage,
                        },
                        {
                          part: 'Part 02',
                          title: 'Learn',
                          desc: 'The brain science and the technique.',
                          bg: structureLearnImage,
                        },
                        {
                          part: 'Part 03',
                          title: 'Practice',
                          desc: 'Four scenarios with feedback.',
                          bg: structurePracticeImage,
                        },
                        {
                          part: 'Part 04',
                          title: 'Take away',
                          desc: 'A one-page card for your phone.',
                          bg: structureTakeawayImage,
                        },
                      ].map((s) => (
                        <div
                          key={s.part}
                          className="glass-panel rounded-2xl border border-white/10 p-4 min-h-[132px] md:min-h-[230px] flex flex-col relative overflow-hidden"
                        >
                          <div className="absolute inset-0 opacity-[0.35]">
                            <img
                              alt=""
                              src={s.bg}
                              className="w-full h-full object-cover blur-[0.5px] brightness-[1.05] contrast-[1.05] saturate-[1.05]"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/10" />
                          <div className="relative z-10 text-xs text-white/85 mb-1 uppercase tracking-widest">
                            {s.part}
                          </div>
                          <div className="relative z-10 text-white font-semibold text-base md:text-lg">
                            {s.title}
                          </div>
                          <div className="relative z-10 text-base text-white/80 mt-2 leading-6">
                            {s.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {active === 'video' && (
                <section className="space-y-5 text-lg">
                  <div className="space-y-4 px-auto px-10 pt-2 ">
                    <p className="text-base text-white/80">
                      A short video. You will recognise the moment. Look out for
                      the second when the dad notices his own response rising,
                      and chooses what to do with it.
                    </p>

                    <div
                      className="border-b border-white/10 overflow-hidden cursor-pointer"
                      onClick={() => setIsVideoHelpOpen((v) => !v)}
                    >
                      <div className="group">
                        <button
                          type="button"
                          className="group w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsVideoHelpOpen((v) => !v);
                          }}
                        >
                          <span className="flex items-center gap-4 min-w-0">
                            <span
                              className="material-symbols-outlined shrink-0"
                              style={{ color: '#60A5FA', fontSize: '32px' }}
                              aria-hidden
                            >
                              play_circle
                            </span>
                            <h3 className="text-white font-semibold text-xl md:text-2xl min-w-0 truncate">
                              This video will help you
                            </h3>
                          </span>
                          <span
                            className={`material-symbols-outlined transition-all ${
                              isVideoHelpOpen
                                ? 'text-[#60A5FA] rotate-180'
                                : 'text-white/70 group-hover:text-white'
                            }`}
                          >
                            expand_more
                          </span>
                        </button>

                        {isVideoHelpOpen && (
                          <div className="pb-6 md:pb-8 pl-12 md:pl-16">
                            <ul className="space-y-3">
                              <li className="flex gap-3 text-white/80">
                                <span className="text-primary shrink-0 mt-1">
                                  •
                                </span>
                                <span>
                                  Recognise the bidirectional ADHD escalation
                                  pattern in real time.
                                </span>
                              </li>
                              <li className="flex gap-3 text-white/80">
                                <span className="text-primary shrink-0 mt-1">
                                  •
                                </span>
                                <span>
                                  See that your own nervous system response is
                                  part of the cycle, not a personal failing.
                                </span>
                              </li>
                              <li className="flex gap-3 text-white/80">
                                <span className="text-primary shrink-0 mt-1">
                                  •
                                </span>
                                <span>
                                  Feel ready and motivated to learn the
                                  technique that follows.
                                </span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    <VideoLessonPlayer
                      title={`Video: ${MIND_SYNC_MODULE_01.title}`}
                      videoUrl="https://drive.google.com/file/d/1IxkgTtoru399RxckLlkXpB7vg1dUMDkD/view?usp=drive_link"
                      className="aspect-auto h-[58vh] md:h-[62vh] "
                    />

                    {isScriptOpen && (
                      <div className="fixed inset-0 z-[80]">
                        <button
                          type="button"
                          className="absolute inset-0 bg-black/50"
                          aria-label="Close transcript"
                          onClick={() => setIsScriptOpen(false)}
                        />
                        <aside className="absolute right-0 top-0 h-full w-full max-w-[520px] bg-[#020617]/95 backdrop-blur-xl border-l border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
                          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-primary">
                                description
                              </span>
                              <div className="text-sm font-bold text-white">
                                Video transcript
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsScriptOpen(false)}
                              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-white/70 hover:text-white"
                              aria-label="Close transcript"
                            >
                              <span className="material-symbols-outlined">
                                close
                              </span>
                            </button>
                          </div>

                          <div className="h-[calc(100vh-65px)] overflow-y-auto px-5 md:px-8 py-5 custom-scrollbar">
                            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                              {MIND_SYNC_MODULE_01.videoScriptScene.fullScript}
                            </div>
                          </div>
                        </aside>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {active === 'learn' && (
                <section className="space-y-8">
                  {learnSubPage === 0 && (
                    <>
                      <section className="space-y-6">
                        <div
                          className="border-b border-white/10 overflow-hidden cursor-pointer"
                          onClick={() => setIsLearnHighlightOpen((v) => !v)}
                        >
                          <div className="group">
                            <button
                              type="button"
                              className="group w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left focus:outline-none"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsLearnHighlightOpen((v) => !v);
                              }}
                            >
                              <span className="flex items-center gap-4 min-w-0">
                                <span
                                  className="material-symbols-outlined shrink-0"
                                  style={{ color: '#60A5FA', fontSize: '32px' }}
                                  aria-hidden
                                >
                                  neurology
                                </span>
                                <h2 className="text-white font-semibold text-xl md:text-2xl min-w-0 truncate">
                                  Why two ADHD brains may clash
                                </h2>
                              </span>
                              <span
                                className={`material-symbols-outlined transition-all ${
                                  isLearnHighlightOpen
                                    ? 'text-[#60A5FA] rotate-180'
                                    : 'text-white/70 group-hover:text-white'
                                }`}
                              >
                                expand_more
                              </span>
                            </button>

                            {isLearnHighlightOpen && (
                              <div className="pb-6 md:pb-8 pl-12 md:pl-16 space-y-6">
                                <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                  {MIND_SYNC_MODULE_01.learn.body}
                                </p>

                                <div className="relative w-full h-[120px] md:h-[120px] rounded-2xl bg-neutral-900/50 border border-white/5 p-8 flex items-center justify-center overflow-hidden">
                                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-emerald-400/5 pointer-events-none" />

                                  <div className="w-full flex items-center justify-between gap-6">
                                    <div className="flex flex-col items-center gap-2 shrink-0">
                                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">
                                          neurology
                                        </span>
                                      </div>
                                      <span className="text-xs text-neutral-500">
                                        Brain A
                                      </span>
                                    </div>

                                    <div className="flex-grow h-px bg-gradient-to-r from-primary via-red-400/80 to-emerald-300 relative">
                                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-center">
                                        <span className="text-red-300 italic text-sm">
                                          Escalation Zone
                                        </span>
                                      </div>
                                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(248,113,113,0.6)]" />
                                    </div>

                                    <div className="flex flex-col items-center gap-2 shrink-0">
                                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-dashed border-emerald-300/40 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-emerald-300">
                                          neurology
                                        </span>
                                      </div>
                                      <span className="text-xs text-neutral-500">
                                        Brain B
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </section>

                      <div>
                        <div className="mb-12">
                          <div
                            className="border-b border-white/10 overflow-hidden cursor-pointer"
                            onClick={() => setIsTechniqueIntroOpen((v) => !v)}
                          >
                            <div className="group">
                              <button
                                type="button"
                                className="group w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left focus:outline-none"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsTechniqueIntroOpen((v) => !v);
                                }}
                              >
                                <span className="flex items-center gap-4 min-w-0">
                                  <span
                                    className="material-symbols-outlined shrink-0"
                                    style={{
                                      color: '#60A5FA',
                                      fontSize: '32px',
                                    }}
                                    aria-hidden
                                  >
                                    bolt
                                  </span>
                                  <h2 className="text-white font-semibold text-xl md:text-2xl min-w-0 truncate">
                                    Catch the Rise Technique
                                  </h2>
                                </span>
                                <span
                                  className={`material-symbols-outlined transition-all ${
                                    isTechniqueIntroOpen
                                      ? 'text-[#60A5FA] rotate-180'
                                      : 'text-white/70 group-hover:text-white'
                                  }`}
                                >
                                  expand_more
                                </span>
                              </button>

                              {isTechniqueIntroOpen && (
                                <div className="pb-6 md:pb-8 pl-12 md:pl-16 space-y-10">
                                  <p className="text-slate-300 leading-relaxed max-w-3xl">
                                    This module's core skill is called Catch the
                                    Rise. It's not about reacting. It's about
                                    noticing your reaction earlier than you used
                                    to. Just three seconds earlier is usually
                                    enough to change the entire outcome.
                                    <br />
                                  </p>
                                  <h1 className="text-white font-semibold text-xl md:text-2xl">
                                    It works in three short steps.
                                  </h1>
                                  <section className="grid grid-cols-1 gap-16 md:gap-24">
                                    {MIND_SYNC_MODULE_01.learn.steps.map(
                                      (step, idx) => {
                                        const icon =
                                          idx === 0
                                            ? 'air'
                                            : idx === 1
                                              ? 'waves'
                                              : 'anchor';
                                        const numberColor =
                                          idx === 0
                                            ? 'text-primary/10 group-hover:text-primary/20'
                                            : idx === 1
                                              ? 'text-indigo-300/10 group-hover:text-indigo-300/20'
                                              : 'text-violet-300/10 group-hover:text-violet-300/20';
                                        const iconColor =
                                          idx === 0
                                            ? 'text-primary'
                                            : idx === 1
                                              ? 'text-indigo-300'
                                              : 'text-violet-300';
                                        const titleColor = iconColor;

                                        return (
                                          <div
                                            key={step.title}
                                            className={`flex flex-col items-center gap-12 group ${
                                              idx === 1
                                                ? 'md:flex-row-reverse'
                                                : 'md:flex-row'
                                            }`}
                                          >
                                            <div className="relative">
                                              <span
                                                className={`text-[9rem] md:text-[12rem] font-semibold leading-none ${numberColor} select-none transition-colors`}
                                              >
                                                {idx + 1}
                                              </span>
                                              <div className="absolute inset-0 flex items-center justify-center">
                                                <span
                                                  className={`material-symbols-outlined text-5xl md:text-6xl ${iconColor}`}
                                                >
                                                  {icon}
                                                </span>
                                              </div>
                                            </div>

                                            <div
                                              className={`flex-1 text-center ${
                                                idx === 1
                                                  ? 'md:text-right'
                                                  : 'md:text-left'
                                              }`}
                                            >
                                              <h3
                                                className={`text-2xl md:text-3xl font-semibold ${titleColor} mb-4`}
                                              >
                                                {step.title}
                                              </h3>
                                              <p className="text-slate-300 leading-relaxed">
                                                {step.body}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </section>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        
                        <div
                          className="h-1 w-20 md:w-28 rounded-full mb-5"
                          style={{
                            background:
                              'linear-gradient(to right, #60A5FA, #9333EA)',
                          }}
                        ></div>
                        <div className="text-white/80 leading-relaxed whitespace-pre-line">
                          {MIND_SYNC_MODULE_01.learn.honestPart}
                        </div>
                      </div>
                    </>
                  )}

                  {learnSubPage === 1 && (
                    <div>
                      <div className="text-center  space-y-4 mb-10">
                        <div className="max-w-6xl mx-auto">
                          <div className=" rounded-2xl  p-6 md:p-8 transition-all    text-left">
                            <div className="group">
                              <div className="text-2xl font-bold text-white text-center">
                                The co-regulation script
                              </div>
                              <div
                                className="h-1 w-24 md:w-32 rounded-full mx-auto mt-3"
                                style={{
                                  background:
                                    'linear-gradient(to right, #60A5FA, #9333EA)',
                                }}
                              ></div>

                              <div className="pt-4">
                                <p className="text-slate-300 leading-relaxed">
                                  Sometimes you'll need to say something out
                                  loud. The script below has a structure, not
                                  magic words. Each part does a specific thing
                                  in your child's brain.
                                </p>

                                <div className="relative py-10">
                                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#60A5FA] to-[#9333EA] shadow-[0_0_15px_rgba(96,165,250,0.22)]" />

                                  <div className="space-y-10 relative z-10">
                                    {MIND_SYNC_MODULE_01.learn.coRegulationScript.rows.map(
                                      (row, idx) => {
                                        const isLeft = idx % 2 === 0;
                                        const stepImage =
                                          idx % 2 === 0 ? aboutImage : image;
                                        const stepNumber = String(
                                          idx + 1
                                        ).padStart(2, '0');

                                        return (
                                          <div
                                            key={row.step}
                                            className="relative z-10 flex flex-col md:flex-row items-center justify-center"
                                          >
                                            <div className="md:w-1/2 md:pr-12 flex justify-end">
                                              {isLeft ? (
                                                <div className="glass-panel p-6 rounded-2xl max-w-xl border border-white/10 hover:border-[#60A5FA]/30 transition-colors">
                                                  <span className="text-[#60A5FA] text-[11px] uppercase tracking-widest font-semibold mb-2 block">
                                                    Step {stepNumber}
                                                  </span>
                                                  <h4 className="text-2xl font-bold text-white mb-4">
                                                    {row.step}
                                                  </h4>
                                                  <div className="text-[11px] uppercase tracking-widest text-white/60 mb-2">
                                                    What to say
                                                  </div>
                                                  <div className="text-slate-200 italic whitespace-pre-line mb-4">
                                                    {row.whatToSay}
                                                  </div>
                                                  <div className="text-[11px] uppercase tracking-widest text-white/60 mb-2">
                                                    Why this part matters
                                                  </div>
                                                  <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                                                    {row.whyItMatters}
                                                  </div>
                                                </div>
                                              ) : (
                                                <img
                                                  alt={row.step}
                                                  src={stepImage}
                                                  className="hidden md:block w-48 h-32 object-cover rounded-2xl border border-white/10"
                                                />
                                              )}
                                            </div>

                                            <div className="my-4 md:my-0 flex items-center justify-center">
                                              <div className="w-4 h-4 rounded-full bg-[#60A5FA] shadow-[0_0_20px_rgba(96,165,250,0.35)] border-2 border-white/20" />
                                            </div>

                                            <div className="md:w-1/2 md:pl-12 flex justify-start">
                                              {!isLeft ? (
                                                <div className="glass-panel p-6 rounded-2xl max-w-xl border border-white/10 hover:border-[#60A5FA]/30 transition-colors">
                                                  <span className="text-[#60A5FA] text-[11px] uppercase tracking-widest font-semibold mb-2 block">
                                                    Step {stepNumber}
                                                  </span>
                                                  <h4 className="text-2xl font-bold text-white mb-4">
                                                    {row.step}
                                                  </h4>
                                                  <div className="text-[11px] uppercase tracking-widest text-white/60 mb-2">
                                                    What to say
                                                  </div>
                                                  <div className="text-slate-200 italic whitespace-pre-line mb-4">
                                                    {row.whatToSay}
                                                  </div>
                                                  <div className="text-[11px] uppercase tracking-widest text-white/60 mb-2">
                                                    Why this part matters
                                                  </div>
                                                  <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                                                    {row.whyItMatters}
                                                  </div>
                                                </div>
                                              ) : (
                                                <img
                                                  alt={row.step}
                                                  src={stepImage}
                                                  className="hidden md:block w-48 h-32 object-cover rounded-2xl border border-white/10"
                                                />
                                              )}
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {learnSubPage === 2 && (
                    <div className="flex flex-col min-h-0 flex-1">
                      <div className="text-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          What not to do
                        </h3>
                        <div
                          className="h-1 w-24 md:w-32 rounded-full mx-auto mt-3"
                          style={{
                            background:
                              'linear-gradient(to right, #60A5FA, #9333EA)',
                          }}
                        ></div>
                        <p className="mt-4 text-sm md:text-base text-white/70">
                          Four moves that look reasonable under pressure but
                          tend to escalate.
                        </p>
                      </div>

                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 md:auto-rows-fr gap-6 flex-1 min-h-0">
                        {MIND_SYNC_MODULE_01.learn.whatNotToDo.map((item) => {
                          const splitIndex = item.indexOf('.');
                          const lead =
                            splitIndex === -1
                              ? item
                              : item.slice(0, splitIndex + 1);
                          const rest =
                            splitIndex === -1 ? '' : item.slice(splitIndex + 1);

                          return (
                            <div
                              key={item}
                              className="h-full rounded-2xl border border-[#E79AAE]/25 bg-[#140B10] px-5 py-5 text-left"
                            >
                              <div className="flex gap-4">
                                <div className="w-1.5 rounded-full bg-[#E79AAE] shrink-0" />
                                <p className="text-sm md:text-base leading-relaxed text-white/80">
                                  <span className="font-semibold text-[#E79AAE]">
                                    {lead}{' '}
                                  </span>
                                  <span>{rest}</span>
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {active === 'practice' && (
                <section className="space-y-10">
                  <div className="max-w-6xl">
                    <div
                      className="border-b border-white/10 overflow-hidden cursor-pointer"
                      onClick={() => setIsPracticeIntroOpen((v) => !v)}
                    >
                      <div className="group">
                        <button
                          type="button"
                          className="group w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPracticeIntroOpen((v) => !v);
                          }}
                        >
                          <span className="flex items-center gap-4 min-w-0">
                            <span
                              className="material-symbols-outlined shrink-0"
                              style={{ color: '#60A5FA', fontSize: '32px' }}
                              aria-hidden
                            >
                              checklist
                            </span>
                            <span className="text-white font-semibold text-xl md:text-2xl min-w-0 truncate">
                              Interactive Practice Scenarios
                            </span>
                          </span>
                          <span
                            className={`material-symbols-outlined transition-all ${
                              isPracticeIntroOpen
                                ? 'text-[#60A5FA] rotate-180'
                                : 'text-white/70 group-hover:text-white'
                            }`}
                          >
                            expand_more
                          </span>
                        </button>

                        {isPracticeIntroOpen && (
                          <div className="pb-6 md:pb-8 pl-12 md:pl-16">
                            <p className="text-slate-300 leading-relaxed whitespace-pre-line max-w-4xl">
                              Below are four interactive scenarios. Each one
                              drops you into a moment that ADHD parents face
                              regularly. Read the situation, choose what you'd
                              do next, and compare your answer to the feedback.
                              There are no "trick" questions here. Some of the
                              answers feel reasonable but quietly make things
                              worse; others feel uncomfortable but actually
                              help. The feedback explains exactly why. \n These
                              scenarios are best done after the video and the
                              Learn section. Take them slowly. The goal isn't to
                              score highly it's to notice what your instinct is,
                              and where it might benefit from a small shift.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {(() => {
                      const scenario = PRACTICE_SCENARIOS[practiceIndex];
                      const selected = selectedPracticeOption;

                      return (
                        <>
                          <div className="w-full mb-6 text-center">
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#60A5FA]/90 block mb-3">
                              Scenario {practiceIndex + 1} of{' '}
                              {PRACTICE_SCENARIOS.length}
                            </span>
                            <h4 className="text-3xl md:text-4xl font-black text-white mb-3">
                              {scenario.title}
                            </h4>
                            <div className="h-1 w-24 bg-gradient-to-r from-[#60A5FA] to-[#9333EA] mx-auto rounded-full" />
                          </div>

                          <section className="w-full">
                            <div className="glass-panel p-8 md:p-10 rounded-2xl card-glow relative overflow-hidden border border-white/10">
                              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shadow-2xl">
                                  <img
                                    src={aboutImage}
                                    alt="Scenario visual"
                                    className="w-full h-full object-cover  opacity-80  transition-all duration-700"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold mb-3">
                                    The situation
                                  </div>
                                  <button
                                    type="button"
                                    className="w-full flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10"
                                    onClick={() =>
                                      setIsSituationOpen((v) => !v)
                                    }
                                  >
                                    <span className="text-sm text-amber-200/90 italic">
                                      {isSituationOpen
                                        ? 'Hide the situation'
                                        : 'Click to view the full situation'}
                                    </span>
                                    <span
                                      className={`material-symbols-outlined transition-transform text-white/60 ${
                                        isSituationOpen ? 'rotate-180' : ''
                                      }`}
                                    >
                                      expand_more
                                    </span>
                                  </button>
                                  {isSituationOpen && (
                                    <p className="text-lg text-slate-300 mt-4 mb-8 leading-relaxed whitespace-pre-line">
                                      {scenario.situation}
                                    </p>
                                  )}
                                  <div className="mt-6 pt-6 border-t border-white/10">
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold mb-3">
                                      The question
                                    </div>
                                    <p className="text-white/85 text-base md:text-lg leading-relaxed">
                                      {scenario.question}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>

                          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                            {scenario.options.map((opt) => {
                              const isSelected =
                                selectedPracticeOption === opt.key;
                              return (
                                <button
                                  key={opt.key}
                                  type="button"
                                  onClick={() => {
                                    setSelectedPracticeOption(opt.key);
                                    setPracticeSubmitted(false);
                                  }}
                                  className={`group relative glass-panel p-6 rounded-xl text-left border transition-all duration-300 ${
                                    isSelected
                                      ? 'border-[#60A5FA]/60 bg-[#60A5FA]/10 shadow-[0_0_20px_rgba(96,165,250,0.18)]'
                                      : 'border-white/10 hover:border-[#60A5FA]/40 hover:bg-white/10 hover:-translate-y-1'
                                  }`}
                                >
                                  <div className="flex items-start gap-4">
                                    <div
                                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold border transition-colors ${
                                        isSelected
                                          ? 'bg-[#60A5FA] text-neutral-950 border-[#60A5FA]'
                                          : 'bg-white/5 text-[#60A5FA] border-white/10 group-hover:bg-[#60A5FA]/20'
                                      }`}
                                    >
                                      {opt.key}
                                    </div>
                                    <div className="min-w-0">
                                      <h5
                                        className={`font-semibold mb-2 ${
                                          isSelected
                                            ? 'text-[#60A5FA]'
                                            : 'text-white'
                                        }`}
                                      >
                                        {opt.title}
                                      </h5>
                                      {opt.body ? (
                                        <p className="text-sm text-white/60 leading-snug">
                                          {opt.body}
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>

                                  {isSelected ? (
                                    <div className="absolute top-4 right-4">
                                      <span className="material-symbols-outlined text-[#60A5FA]">
                                        check_circle
                                      </span>
                                    </div>
                                  ) : null}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex flex-col items-center gap-4">
                            <button
                              type="button"
                              disabled={!selectedPracticeOption}
                              onClick={() => setPracticeSubmitted(true)}
                              className={`px-10 py-4 rounded-full font-semibold shadow-2xl transition-all flex items-center gap-3 ${
                                selectedPracticeOption
                                  ? 'bg-gradient-to-r from-[#60A5FA] to-[#9333EA] text-white hover:scale-105 active:scale-95'
                                  : 'bg-white/10 text-white/40 cursor-not-allowed'
                              }`}
                            >
                              <span className="tracking-wider">
                                View feedback
                              </span>
                              <span className="material-symbols-outlined">
                                arrow_forward
                              </span>
                            </button>
                          </div>

                          {practiceSubmitted && selected ? (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                              <button
                                type="button"
                                aria-label="Close feedback"
                                onClick={() => setPracticeSubmitted(false)}
                                className="absolute inset-0 bg-black/60"
                              />

                              <div className="relative w-full max-w-2xl glass-panel rounded-2xl border border-white/10 bg-[#020617]/90 backdrop-blur p-5 md:p-6 shadow-[0_30px_120px_rgba(0,0,0,0.7)] animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="min-w-0">
                                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold mb-2">
                                      Feedback
                                    </div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                      <div className="text-sm font-bold text-white">
                                        {scenario.feedback[selected].title}
                                      </div>
                                      <div
                                        className={`shrink-0 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border ${
                                          selected === scenario.bestOption
                                            ? 'bg-[#60A5FA]/10 border-[#60A5FA]/30 text-[#60A5FA]'
                                            : 'bg-[#9333EA]/10 border-[#9333EA]/30 text-[#C4B5FD]'
                                        }`}
                                      >
                                        {selected === scenario.bestOption
                                          ? 'Best option'
                                          : 'Not best option'}
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => setPracticeSubmitted(false)}
                                    className="p-2 rounded-full text-white/60 hover:text-white transition-colors"
                                    aria-label="Close feedback"
                                  >
                                    <span className="material-symbols-outlined">
                                      close
                                    </span>
                                  </button>
                                </div>

                                <div className="mt-4 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                                  {scenario.feedback[selected].body}
                                </div>
                              </div>
                            </div>
                          ) : null}

                          <div className="flex items-center justify-between pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                const next = Math.max(0, practiceIndex - 1);
                                setPracticeIndex(next);
                                setSelectedPracticeOption(null);
                                setPracticeSubmitted(false);
                              }}
                              disabled={practiceIndex === 0}
                              className={`flex items-center gap-2 text-sm transition-colors ${
                                practiceIndex === 0
                                  ? 'text-white/30 cursor-not-allowed'
                                  : 'text-white/60 hover:text-indigo-200'
                              }`}
                            >
                              <span className="material-symbols-outlined">
                                arrow_back
                              </span>
                              <span>Previous</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const isLast =
                                  practiceIndex ===
                                  PRACTICE_SCENARIOS.length - 1;
                                if (isLast) {
                                  setActive('takeaway');
                                  return;
                                }

                                const next = Math.min(
                                  PRACTICE_SCENARIOS.length - 1,
                                  practiceIndex + 1
                                );
                                setPracticeIndex(next);
                                setSelectedPracticeOption(null);
                                setPracticeSubmitted(false);
                                setIsSituationOpen(false);
                              }}
                              className="px-6 py-3 rounded-xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-100 hover:bg-indigo-500/20 hover:border-indigo-300/40 transition-all flex items-center gap-3 text-sm md:text-base"
                            >
                              <span>
                                {practiceIndex === PRACTICE_SCENARIOS.length - 1
                                  ? 'Finish Module'
                                  : `Click here for Scenario ${practiceIndex + 2}`}
                              </span>
                              <span className="material-symbols-outlined">
                                arrow_forward
                              </span>
                            </button>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </section>
              )}

              {active === 'takeaway' && (
                <section className="space-y-8">
                  <header className="space-y-3">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      {MIND_SYNC_MODULE_01.takeaway.heading}
                    </h3>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow">
                      <div className="text-left">
                        <div className="text-[10px] text-[#60A5FA] px-2 py-1 bg-white/5 rounded-full inline-block mb-3 uppercase tracking-widest font-semibold">
                          Mind Sync Pocket
                        </div>
                        <h4 className="text-2xl font-bold text-white">
                          Catch the Rise
                        </h4>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 mt-2">
                          The pocket version
                        </div>
                      </div>

                      <div className="mt-6 text-sm text-slate-200 leading-relaxed">
                        <ol className="space-y-5 list-none">
                          <li>
                            <div className="text-lg font-semibold text-white">
                              1. Notice your body before your mouth.
                            </div>
                            <div className="mt-1 whitespace-pre-line">
                              Jaw, shoulders, breath, hands. Any one is enough.
                            </div>
                          </li>
                          <li>
                            <div className="text-lg font-semibold text-white">
                              2. Buy three seconds.
                            </div>
                            <div className="mt-1 whitespace-pre-line">
                              One slow breath. Place an object down. Step back
                              half a pace.
                            </div>
                          </li>
                          <li>
                            <div className="text-lg font-semibold text-white">
                              3. Speak from the calmer body.
                            </div>
                            <div className="mt-1 whitespace-pre-line">
                              Shorter. Lower. Slower. "I need a moment" is
                              enough.
                            </div>
                          </li>
                        </ol>

                        <div className="mt-6">
                          <div className="text-[#60A5FA] font-semibold">
                            If words help:
                          </div>
                          <div className="mt-2 whitespace-pre-line">
                            "I can see this is hard. I'm a bit wound up too. I'm
                            going to step out for a minute. I'll come back when
                            we've both got our heads back."
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow flex flex-col justify-between min-h-[220px]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold">
                            Your take-away card
                          </div>
                          <div className="text-xl font-bold text-white mt-2">
                            Download PDF
                          </div>
                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#60A5FA]/20 to-[#9333EA]/20 border border-white/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#60A5FA]">
                            picture_as_pdf
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-[#60A5FA] to-[#9333EA] text-white rounded-xl font-semibold shadow-xl hover:shadow-indigo-500/20 transition-all"
                      >
                        <span className="material-symbols-outlined">
                          download
                        </span>
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10 space-y-4">
                  <h4 className="text-2xl font-bold text-white">
                    Before you close this module
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Two things worth knowing before you go.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    The first is that this skill takes time. You'll catch the
                    rise in week one. You'll forget it in week two. You'll catch
                    it again in week three. That's normal. ADHD brains learn
                    through repetition, not insight, so the technique only
                    really lands once you've practised it across many real
                    moments. Be patient with yourself.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    The second is that the goal isn't to never escalate again.
                    It's to escalate less often, recover faster, and repair more
                    cleanly. A house with no shouting is not a realistic target.
                    A house with quicker repair after the shouting that's the
                    actual goal, and it's well within reach.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    In the next module, we'll build on what you've learned here
                    and apply it to one of the most common flashpoints in ADHD
                    households: ending screen time. See you there.
                  </p>
                </div> */}
                </section>
              )}

              {active === 'reflection' && (
                <section className="space-y-10">
                  <div className="text-center space-y-4">
                    <h3 className="text-3xl md:text-5xl font-black text-white">
                      Optional Reflection
                    </h3>
                  </div>

                  <div className="space-y-8">
                    <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow transition-all">
                      <label className="block text-2xl md:text-3xl font-bold text-white mb-4">
                        What does "the rise" feel like in your body? Where do
                        you notice it first?
                      </label>
                      <textarea
                        className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-lg text-slate-200 placeholder:text-white/25 resize-none outline-none focus:border-purple-400/40 transition-all h-32"
                        placeholder="Close your eyes for a moment and notice the physical sensations..."
                      />
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow transition-all">
                      <label className="block text-2xl md:text-3xl font-bold text-white mb-4">
                        Think of a recent moment that escalated. Looking back,
                        where was the earliest point you could have caught it?
                      </label>
                      <textarea
                        className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-lg text-slate-200 placeholder:text-white/25 resize-none outline-none focus:border-purple-400/40 transition-all h-32"
                        placeholder="Trace the thread back to the first subtle spark of tension..."
                      />
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow transition-all">
                      <label className="block text-2xl md:text-3xl font-bold text-white mb-4">
                        Which of the four scenarios felt most like your real
                        life? What does that tell you about where to focus
                        first?
                      </label>
                      <textarea
                        className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-lg text-slate-200 placeholder:text-white/25 resize-none outline-none focus:border-purple-400/40 transition-all h-32"
                        placeholder="Honesty is the first step toward clarity. Which scenario resonated?"
                      />
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow transition-all">
                      <label className="block text-2xl md:text-3xl font-bold text-whiteg  indigo-300 mb-4">
                        What's one small commitment you can make for the next
                        seven days? (Not a big change — just one small thing
                        you'll try.)
                      </label>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <button
                          type="button"
                          className="px-4 py-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 text-xs font-semibold tracking-wider text-indigo-200 hover:bg-indigo-400/20 transition-all"
                        >
                          Pause &amp; Breathe
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 text-xs font-semibold tracking-wider text-indigo-200 hover:bg-indigo-400/20 transition-all"
                        >
                          Daily Check-in
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 text-xs font-semibold tracking-wider text-indigo-200 hover:bg-indigo-400/20 transition-all"
                        >
                          Evening Journal
                        </button>
                      </div>
                      <textarea
                        className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-lg text-slate-200 placeholder:text-white/25 resize-none outline-none focus:border-purple-400/40 transition-all h-24"
                        placeholder="Choose a simple, sustainable anchor..."
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 pt-6">
                    <button
                      type="button"
                      className="px-12 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-semibold text-lg shadow-[0_0_20px_rgba(116,136,251,0.22)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
                    >
                      Complete Reflection
                    </button>
                    <button
                      type="button"
                      className="text-xs text-white/40 uppercase tracking-[0.2em] hover:text-white/70 transition-colors"
                    >
                      Skip for now
                    </button>
                  </div>
                </section>
              )}
            </div>

            <div className="sticky bottom-0 mt-auto pt-4 pb-2 border-t border-white/10 bg-[#020617]/85 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => {
                    if (active === 'learn' && learnSubPage > 0) {
                      setLearnSubPage((p) =>
                        p === 0 ? 0 : ((p - 1) as 0 | 1 | 2)
                      );
                      return;
                    }

                    const prev = TOC[Math.max(0, activeIndex - 1)]?.key;
                    if (prev) setActive(prev);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border transition-colors ${
                    activeIndex === 0
                      ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
                  }`}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  <span>Previous</span>
                </button>

                {active === 'takeaway' ? (
                  <button
                    type="button"
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-transparent bg-gradient-to-r from-[#60A5FA] to-[#9333EA] text-white hover:shadow-indigo-500/20 transition-colors"
                  >
                    <span>Finish Module</span>
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                ) : activeIndex === TOC.length - 1 ? (
                  <div />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (active === 'learn' && learnSubPage < 2) {
                        setLearnSubPage((p) =>
                          p === 2 ? 2 : ((p + 1) as 0 | 1 | 2)
                        );
                        return;
                      }

                      const next =
                        TOC[Math.min(TOC.length - 1, activeIndex + 1)]?.key;
                      if (next) setActive(next);
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-transparent bg-gradient-to-r from-[#60A5FA] to-[#9333EA] text-white hover:shadow-indigo-500/20 transition-colors"
                  >
                    <span>Next</span>
                    <span className="material-symbols-outlined">
                      arrow_forward
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <aside className="w-1/4 border-l border-white/5 glass-panel flex flex-col shrink-0 sticky top-0 self-start">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">
              Module Contents
            </h2>
            <p className="text-xs text-slate-400">{TOC.length} sections</p>
          </div>
          <div className="flex-1 custom-scrollbar">
            {TOC.map((item) => {
              const isCurrent = active === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActive(item.key)}
                  className={`w-full text-left p-4 border-b flex items-start gap-3 transition-colors cursor-pointer ${
                    isCurrent
                      ? 'border-white/10 active-lesson-glow bg-[#60A5FA]/10'
                      : 'border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {isCurrent ? (
                      <div className="w-6 h-6 rounded-full border border-[#60A5FA] flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#60A5FA] rounded-full animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                        <span className="text-[10px] text-slate-500 font-bold">
                          {TOC.findIndex((t) => t.key === item.key) + 1}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs truncate ${isCurrent ? 'font-bold text-white' : 'font-medium text-slate-300'}`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={`text-[10px] ${isCurrent ? 'text-[#60A5FA] font-semibold uppercase' : 'text-slate-500'}`}
                    >
                      {isCurrent ? 'Active' : 'Click to view'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {active === 'video' && (
            <div className="p-6 border-t border-white/5">
              <button
                type="button"
                onClick={() => setIsScriptOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.06] hover:border-white/20 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">
                  description
                </span>
                Video transcript
              </button>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
