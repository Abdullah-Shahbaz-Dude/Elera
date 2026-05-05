import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MIND_SYNC_MODULE_01 } from '../data/mindSyncSyllabus';
import VideoLessonPlayer from '../components/VideoLessonPlayer';
import image from '../../assets/images/mindsync/2.jpg';
import aboutImage from '../../assets/images/mindsync/mindsync-2.jpg';
import structureWatchImage from '../../assets/images/mindsync/1.jpg';
import structureLearnImage from '../../assets/images/mindsync/3.jpg';
import structurePracticeImage from '../../assets/images/mindsync/4.jpg';
import structureTakeawayImage from '../../assets/images/mindsync/5.jpg';

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
  { key: 'video', label: 'Video' },
  { key: 'learn', label: 'Learn' },
  { key: 'practice', label: 'Practice' },
  { key: 'takeaway', label: 'Take away' },
  { key: 'reflection', label: 'Optional reflection' },
];

const PRACTICE_SCENARIOS: PracticeScenario[] = [
  {
    title: 'Scenario 1 - The Breakfast Storm',
    situation:
      "It's 7:48 on a school morning. Your son needs to leave at 8:00. He's still in his pyjamas. You've reminded him three times. The fourth time, you say it slightly louder. He snaps back: \"I HEARD YOU, GOD!\" and slams his cereal bowl down hard enough that milk splashes onto the table.\nYou feel the heat rise immediately. You have about three seconds before whatever happens next, happens.",
    question: 'What would you do?',
    options: [
      {
        key: 'A',
        title:
          "Tell him firmly that's not how we speak to each other in this house, and add a consequence maybe no phone tonight.",
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
        title: 'Option A - Looks reasonable, but quietly backfires',
        body: "This response is firm and consistent both good things in principle. But two things are working against it. First, you're delivering a consequence while your own nervous system is firing, which usually carries more frustration than you intend. Second, the lesson he'll absorb in this state is the emotion, not the rule. He'll remember you were angry, not why. And in the heat of a school morning, you'll often end up not following through on the phone consequence anyway, which quietly teaches him the rule was negotiable.",
      },
      B: {
        title: 'Option B - Almost guaranteed to escalate',
        body: "This is the most natural ADHD-on-ADHD response. His tone fired your nervous system, and yours fires back at the same volume. He doesn't have the brain space right now to receive the message; he only has space to react to your tone. Within 30 seconds, you're both shouting, and the morning is gone. This isn't a bad parenting choice it's just the cycle the module is teaching you to interrupt.",
      },
      C: {
        title: 'Option C - This is the technique in action',
        body: 'You caught the rise (the breath, the deliberate placing of an object). You acknowledged him without rewarding the tone ("I get it"). You set a clear next step that doesn\'t require him to apologise on the spot ("we\'ll talk in the car"). And you removed yourself from the heat without disappearing. Most importantly: you didn\'t try to address the rudeness in the moment  you left that for the car, when both nervous systems will have dropped. This is exactly what Catch the Rise looks like under pressure.',
      },
      D: {
        title: 'Option D - Better than B, but missing something',
        body: 'Walking out is better than escalating, and shows you have some awareness of needing to step away. But silence without acknowledgement can land as withdrawal of love, especially for an ADHD teen. He\'s already in a flood state, and your silent exit can leave him feeling abandoned, which often causes the meltdown to grow rather than fade. The small phrase before leaving ("I get it. I\'ll meet you in the car") makes the difference between a useful pause and a cold shutdown.',
      },
    },
    point:
      "Notice how the difference between the worst and best options isn't whether you're firm or lenient. It's whether you spoke from a regulated state or a flooded one. Same words, said from a different nervous system, land completely differently to him.",
    bestOption: 'C',
  },
  {
    title: 'Scenario 2 — The Saturday Build-Up',
    situation:
      "It's a slow Saturday. Your son has been gaming for about two hours. You've been doing housework. He's asked you the same question three times in 20 minutes: \"Can my friend come over?\" Each time you've said \"maybe later, I need to think.\" The third time, your voice has a slight edge to it.\nYou haven't snapped yet, but you can feel something building. Your shoulders are up. Your jaw is tight. You're aware you're getting close to your limit.",
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
          'Snap at him: "I said LATER, can you stop asking?"  at least it\'ll get him to stop.',
        body: '',
      },
      {
        key: 'C',
        title:
          "Pause what you're doing, find him, and say: \"I noticed I'm getting a bit short. Let's both have a 20-minute break I need to reset. Then I'll give you a real answer.\"",
        body: '',
      },
      {
        key: 'D',
        title:
          'Avoid him for a while  go into a different part of the house and hope the urge passes.',
        body: '',
      },
    ],
    feedback: {
      A: {
        title: 'Option A — The most common mistake',
        body: "Pushing through is what most parents do, and it's how the snap eventually happens. Your nervous system has been signalling for the last 20 minutes that it needs a reset, but you've been ignoring those signals because the requests felt small. ADHD nervous systems don't need a big trigger to flood they need a long enough build-up. This option doesn't cause a meltdown right now, but it makes one much more likely in the next hour.",
      },
      B: {
        title: 'Option B — Predictable but costly',
        body: "Yes, it'll get him to stop asking. It'll also damage trust in a way that takes days to repair. He didn't do anything wrong here  he asked a reasonable question three times because his ADHD brain forgets the answer when it's not given clearly. Snapping in this moment teaches him that asking you things is risky, which makes him less likely to bring real concerns to you later. The short-term win costs you the longer-term relationship.",
      },
      C: {
        title: 'Option C — Catching the rise before it crests',
        body: "This is the highest-skill version of the technique. You've noticed your own state before it tipped over. You've named it without making it his fault (\"I noticed I'm getting a bit short\"). You've taken a clear, defined break with a return time. And crucially you've signalled that you're going to give him a real answer, so the question doesn't keep coming back. This kind of pre-emptive reset prevents 80% of the snaps that would otherwise happen later in the day.",
      },
      D: {
        title: 'Option D — Half right, half a missed opportunity',
        body: 'Stepping away from a building wave is genuinely useful. But disappearing without naming it leaves him confused  and his ADHD brain will likely interpret it as something he did wrong, which can quietly increase his anxiety. The fix is small: just one sentence before you step away. "I\'m going to take a quick reset, back in 20 minutes." That sentence transforms avoidance into intentional self-care, and teaches him that adults take breaks too.',
      },
    },
    point:
      "Catching the rise isn't only about big moments. The hardest version is catching it during a slow, low-grade build-up because the body's signals are quieter and easier to ignore. Most snap moments aren't sudden. They're 20 minutes in the making.",
    bestOption: 'C',
  },
  {
    title: 'Scenario 3 — The After-the-Fact Apology',
    situation:
      "You shouted at him 20 minutes ago over something minor  he forgot to feed the dog. You both know your reaction was bigger than the moment deserved. He's now in his room, headphones on, ignoring you. Your nervous system has settled. You feel guilty.",
    question: "What's the best thing to do now?",
    options: [
      {
        key: 'A',
        title:
          'Knock on his door, sit down, and apologise plainly: "I overreacted. The dog mattered, but not that much. I\'m sorry."',
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
        title:
          "Pretend it didn't happen. By tomorrow he'll have forgotten, and bringing it up will just remind him.",
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
        title: 'Option A - Repair done well',
        body: "This is exactly what repair looks like. You're naming what happened, taking ownership without excuses, and not asking him to make you feel better about it. ADHD teens are often surprisingly forgiving when an adult repairs cleanly  because so few adults in their lives ever do. What he learns from this is that adults make mistakes, that mistakes can be acknowledged, and that the relationship survives them. That's one of the most important lessons you can model.",
      },
      B: {
        title: 'Option B - Kind, but incomplete',
        body: "The gesture is lovely. ADHD brains often respond well to small acts of care after conflict, and a snack outside the door is a quiet way of saying \"we're okay.\" But without any words, he has to guess what the gesture means. Was it a peace offering? An apology? Just dinner? In ADHD relationships, the words matter more than people realise — because his brain often won't supply the meaning if you don't. Use both: the snack and a sentence.",
      },
      C: {
        title: 'Option C - The most damaging option here',
        body: "Pretending it didn't happen is what many adults do, and it's the option that does the most long-term damage. Your son hasn't forgotten, and he won't. ADHD brains often replay difficult moments more, not less. Without repair, the moment becomes part of his quiet picture of you — that you can hurt him and not name it. Over time, this is what erodes trust. The mistake itself is far less damaging than the silence around it.",
      },
      D: {
        title: 'Option D - An apology with a hidden cost',
        body: 'This is the trap most parents fall into. The first sentence is genuine, but the "but" undoes the whole repair. By the time the second clause arrives, it sounds like the apology was a setup for the lecture. ADHD brains pick up that shift instantly. The clean apology has to stand alone. The conversation about feeding the dog can happen tomorrow, when it isn\'t sitting on top of repair.',
      },
    },
    point:
      "Catching the rise isn't a guarantee. You'll still have moments where you don't catch it. What matters almost as much as the technique is what you do afterwards. Clean repair, no 'but,' no excuses, no asking him to comfort you about it - that's what builds the kind of trust an ADHD teen needs.",
    bestOption: 'A',
  },
  {
    title: 'Scenario 4 - The Public Moment',
    situation:
      "You're at a family event. A relative has just made a comment to your son about \"sitting still for once.\" He's already had a long day. You watch his face change eyes drop, shoulders tighten, jaw set. You can feel your own heat rising on his behalf. You're aware that other family members are nearby and watching.",
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
        title: 'Option A - Right values, wrong moment',
        body: "Your instinct to protect him is correct, and the relative's comment was unhelpful. But confronting them publicly almost always escalates the room and pulls your son into the centre of an adult conflict. He'll feel the awkwardness more than the protection. There's a place for that conversation, but it's later, in private, with the relative not at the table. In the moment, your son needs an exit, not an advocate.",
      },
      B: {
        title: 'Option B - Caring, but late',
        body: 'Checking on him afterwards is good. But "in the moment" matters for ADHD teens. He\'s currently sitting in a public space with shame visibly rising. If you wait, he\'ll have spent another half-hour in that state, masking, holding it together. By the time you check in, he may already be too far gone to talk. The ideal version of this option is to do something small in the moment AND check in afterwards  not one or the other.',
      },
      C: {
        title: 'Option C - Quietly excellent',
        body: "This is the move skilled parents of ADHD teens learn over time. You've given him a low-key exit without making the moment about him. You haven't confronted the relative or made him the subject of a scene. You haven't left him sitting in shame. And you've created a private space where you can check in properly \"that comment was rubbish, are you okay?\" without any of the adults watching. He gets protection, dignity, and follow-up. That's the full package.",
      },
      D: {
        title: 'Option D - Well-meaning, but exposing',
        body: "Loud public defence is well-intentioned but often makes the moment worse for him. He didn't want a spotlight; he wanted the spotlight to go away. Defending him publicly  even warmly  keeps him in the centre of the room and turns the moment into a Big Thing rather than something he can quietly let slide. ADHD teens are often acutely aware of how much attention they're getting. Public reassurance, however well-meant, is rarely what they need.",
      },
    },
    point:
      "Catching the rise isn't only about your own escalation. It's also about catching his early  and quietly intervening before he has to manage the situation alone. Being the parent who can lift a child out of a shameful moment without anyone else noticing is one of the most underrated skills in parenting an ADHD child.",
    bestOption: 'C',
  },
];

export default function MindSyncModulePage() {
  const [active, setActive] = useState<TabKey>('introduction');
  const [isScriptOpen, setIsScriptOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isOutcomesOpen, setIsOutcomesOpen] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [selectedPracticeOption, setSelectedPracticeOption] =
    useState<PracticeOptionKey | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);

  const activeItem = useMemo(() => {
    return TOC.find((t) => t.key === active) ?? TOC[0];
  }, [active]);

  const activeIndex = useMemo(() => {
    return Math.max(
      0,
      TOC.findIndex((t) => t.key === active)
    );
  }, [active]);

  return (
    <div className="flex flex-col min-h-full bg-[#020617] text-white">
      <header className="relative shrink-0 min-h-[260px] flex flex-col justify-end p-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt="Mind Sync"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="absolute inset-0 hero-gradient opacity-50" />
        </div>
        <div className="absolute top-6 left-10 flex flex-col gap-2">
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

        <div className="absolute top-6 right-10 text-right">
          <span className="text-xs text-white/70 font-medium">
            {activeItem.label}
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mt-10">
          <h1 className="text-4xl font-black text-white mb-2 leading-tight tracking-tight">
            Module 1
          </h1>
          <h2 className="text-lg text-white/90 font-semibold mb-4">
            Managing your own ADHD, whilst parenting a child with ADHD
          </h2>
          <p className="text-lg text-white/80 max-w-2xl font-light leading-relaxed whitespace-pre-line">
            {MIND_SYNC_MODULE_01.summary}
          </p>
        </div>
        <div className="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-white/10 rounded-full blur-[120px]" />
        </div>
      </header>

      <main className="flex w-full">
        <div className="w-3/4 flex flex-col p-8 space-y-10">
          {active === 'introduction' && (
            <section className="space-y-6">
              <div
                className="glass-panel rounded-2xl border border-white/10 p-8 md:p-10 transition-all hover:bg-white/[0.04] hover:border-white/20 hover:ring-1 hover:ring-white/10 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] cursor-pointer"
                onClick={() => {
                  setIsAboutOpen((v) => !v);
                }}
              >
                <div className="group">
                  <button
                    type="button"
                    className="w-full text-left flex items-center justify-between gap-4 select-none rounded-xl -mx-2 px-2 py-2 transition-colors focus:outline-none focus-visible:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAboutOpen((v) => !v);
                    }}
                  >
                    <h3 className="text-2xl font-bold text-white">
                      About this module
                    </h3>
                    <span
                      className={`material-symbols-outlined transition-all ${
                        isAboutOpen
                          ? 'text-primary rotate-180'
                          : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isAboutOpen && (
                    <div className="pt-4">
                      <div className="text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                        {MIND_SYNC_MODULE_01.about.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                      </div>

                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="w-full h-52 rounded-2xl bg-cover overflow-hidden shadow-2xl relative">
                          <img
                            alt="Mind Sync"
                            src={image}
                            className="w-full h-full object-cover opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/10" />
                        </div>
                        <div className="w-full h-52 rounded-2xl bg-cover overflow-hidden shadow-2xl relative">
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
                className="glass-panel rounded-2xl border border-white/10 p-8 md:p-10 transition-all hover:bg-white/[0.04] hover:border-white/20 hover:ring-1 hover:ring-white/10 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] cursor-pointer"
                onClick={() => {
                  setIsOutcomesOpen((v) => !v);
                }}
              >
                <div className="group">
                  <button
                    type="button"
                    className="w-full text-left flex items-center justify-between gap-4 select-none rounded-xl -mx-2 px-2 py-2 transition-colors focus:outline-none focus-visible:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOutcomesOpen((v) => !v);
                    }}
                  >
                    <h3 className="text-2xl font-bold text-white">
                      Learning Outcomes
                    </h3>
                    <span
                      className={`material-symbols-outlined transition-all ${
                        isOutcomesOpen
                          ? 'text-primary rotate-180'
                          : 'text-white/70 group-hover:text-white'
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isOutcomesOpen && (
                    <div className="pt-4">
                      <ul className="space-y-3">
                        {MIND_SYNC_MODULE_01.learningOutcomes.map((item, i) => (
                          <li key={i} className="flex gap-3 text-slate-300">
                            <span className="text-primary shrink-0 mt-1">
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-xl font-semibold text-white mb-6 text-center">
                  How this module is structured
                </h3>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      part: 'Part 01',
                      title: 'Watch',
                      desc: "A short video introducing the core idea, with a real family scenario you'll likely recognise.",
                      bg: structureWatchImage,
                    },
                    {
                      part: 'Part 02',
                      title: 'Learn',
                      desc: 'The science and the technique, broken down clearly. No jargon. Real scripts you can use today.',
                      bg: structureLearnImage,
                    },
                    {
                      part: 'Part 03',
                      title: 'Practice',
                      desc: "Four interactive scenarios where you'll be tested on what you've learned. Each scenario gives feedback on every option you choose, so you understand why some responses work better than others.",
                      bg: structurePracticeImage,
                    },
                    {
                      part: 'Part 04',
                      title: 'Take away',
                      desc: 'A one-page summary, plus optional reflection questions to deepen the learning.',
                      bg: structureTakeawayImage,
                    },
                  ].map((s) => (
                    <div
                      key={s.part}
                      className="glass-panel rounded-2xl border border-white/10 p-6 relative overflow-hidden  "
                    >
                      <div className="absolute inset-0 opacity-[0.24]">
                        <img
                          alt=""
                          src={s.bg}
                          className="w-full h-full object-cover blur-[0.5px] brightness-[1.05] contrast-[1.05] saturate-[1.05]"
                        />
                      </div>
                      <div className="absolute inset-0 " />
                      <div className="text-[12px] text-white mb-2 uppercase tracking-widest">
                        {s.part}
                      </div>
                      <div className="text-white font-semibold">{s.title}</div>
                      <div className="text-xs text-white mt-2">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {active === 'video' && (
            <section className="space-y-8">
              <div className="space-y-6">
                <p className="text-slate-300 leading-relaxed">
                  Watch the video Dad and Son to set the scene for the module
                  learning. There are many different scenarios where this type
                  of clash may happen in the household
                </p>

                <VideoLessonPlayer
                  title={`Video: ${MIND_SYNC_MODULE_01.title}`}
                  videoUrl="https://drive.google.com/file/d/1IxkgTtoru399RxckLlkXpB7vg1dUMDkD/view?usp=drive_link"
                />

                <section className="glass-panel rounded-2xl overflow-hidden border border-white/10">
                  <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">
                        description
                      </span>
                      <h4 className="text-lg font-bold text-white">
                        Video Script
                      </h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                        Full video script
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsScriptOpen((o) => !o)}
                        className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-white/60 hover:text-white"
                        aria-label={
                          isScriptOpen ? 'Collapse script' : 'Expand script'
                        }
                      >
                        <span className="material-symbols-outlined">
                          {isScriptOpen ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div
                    className={`transition-[max-height,opacity] duration-300 ease-out ${
                      isScriptOpen
                        ? 'max-h-[520px] opacity-100'
                        : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="max-h-[520px] overflow-y-auto px-6 md:px-10 py-8 space-y-6 custom-scrollbar">
                      <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {MIND_SYNC_MODULE_01.videoScriptScene.fullScript}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          )}

          {active === 'learn' && (
            <section className="space-y-8">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 glass-panel">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
                <div className="relative px-6 md:px-12 py-14 md:py-20 text-center">
                  <p className="mt-6 text-base md:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
                    Now that you've watched the video, let's go a little deeper.
                    This part of the module gives you the underlying technique
                    you'll be practising in the scenarios that follow.
                  </p>
                </div>
              </div>

              <section className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
                    Why two ADHD brains may clash
                  </h2>
                  <div className="text-slate-300 leading-relaxed max-w-6xl space-y-4">
                    <p>
                      In a typical parent-child conflict, there's usually a
                      small emotional gap between what the child does and how
                      the parent responds. The parent has a moment to think,
                      choose, and reply. In ADHD-on-ADHD situations it is even
                      harder to imagine
                    </p>
                  </div>
                </div>

                <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold ">
                        ADHD brains process emotional cues tone of voice, body
                        language, facial expressions, much faster than they
                        process the words people say. When your child speaks to
                        you in way you feel is disrespectful or rude, your
                        nervous system can react before the words have fully
                        landed. You're not choosing to react. You're already
                        reacting.
                      </h3>

                      <p className="text-slate-300 leading-relaxed">
                        This is the part most parenting advice misses. "Stay
                        calm" isn't a useful instruction when your nervous
                        system is already three steps ahead of your thinking
                        brain.
                      </p>
                    </div>

                    <div className="relative w-full aspect-square rounded-2xl bg-neutral-900/50 border border-white/5 p-8 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-emerald-400/5 pointer-events-none" />

                      <div className="flex items-center justify-around w-full">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">
                              neurology
                            </span>
                          </div>
                          <span className="text-xs text-neutral-500">
                            Brain A
                          </span>
                        </div>

                        <div className="flex-grow h-px bg-gradient-to-r from-primary via-red-400/80 to-emerald-300 relative mx-4">
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-center">
                            <span className="text-red-300 italic text-sm">
                              Escalation Zone
                            </span>
                          </div>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(248,113,113,0.6)]" />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-300/40 flex items-center justify-center">
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
                </div>
              </section>

              <div>
                <div className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
                    The technique: Catch the Rise
                  </h2>
                  <p className="text-slate-300 leading-relaxed max-w-3xl">
                    This module's core skill is called Catch the Rise. It's not
                    about reacting. It's about noticing your reaction earlier
                    than you used to. Just three seconds earlier is usually
                    enough to change the entire outcome.
                    <br />
                    It works in three short steps.
                  </p>
                </div>

                <section className="grid grid-cols-1 gap-16 md:gap-24">
                  <div className="flex flex-col md:flex-row items-center gap-12 group">
                    <div className="relative">
                      <span className="text-[9rem] md:text-[12rem] font-semibold leading-none text-primary/10 select-none group-hover:text-primary/20 transition-colors">
                        1
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl md:text-6xl text-primary">
                          air
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                        Notice the body before the words
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        Your body always knows before your mouth does. The signs
                        are small but specific to you. Common ones: jaw
                        tightens, shoulders lift, breath gets shallow, hands
                        tense, a feeling of heat in the chest. Your job isn't to
                        stop these signs from happening. Your job is to notice
                        them happening even one of them before you speak.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row-reverse items-center gap-12 group">
                    <div className="relative">
                      <span className="text-[9rem] md:text-[12rem] font-semibold leading-none text-indigo-300/10 select-none group-hover:text-indigo-300/20 transition-colors">
                        2
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl md:text-6xl text-indigo-300">
                          waves
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-right">
                      <h3 className="text-2xl md:text-3xl font-semibold text-indigo-300 mb-4">
                        Buy three seconds
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        When you notice the rise, do anything that takes three
                        seconds and puts something between you and the next
                        sentence. The most reliable options: take one slow
                        breath, count silently from three to one, place an
                        object you're holding deliberately on a surface, take a
                        half-step backwards. The point isn't relaxation. The
                        point is interruption.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-12 group">
                    <div className="relative">
                      <span className="text-[9rem] md:text-[12rem] font-semibold leading-none text-violet-300/10 select-none group-hover:text-violet-300/20 transition-colors">
                        3
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-5xl md:text-6xl text-violet-300">
                          anchor
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-semibold text-violet-300 mb-4">
                        Speak from the calmer body
                      </h3>
                      <p className="text-slate-300 leading-relaxed">
                        After the three-second pause, your nervous system has
                        dropped just enough for your thinking brain to come back
                        online. Speak shorter, lower, slower. You don't have to
                        say something brilliant. "I need a moment" is enough.
                        "Let's come back to this in five" is enough. Walking out
                        of the room saying nothing is enough.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  The honest part
                </h3>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                  {MIND_SYNC_MODULE_01.learn.honestPart}
                </div>
              </div>

              <div>
                <div className="text-center  space-y-4 mb-10">
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {MIND_SYNC_MODULE_01.learn.coRegulationScript.heading}
                  </h3>
                  <p className="text-slate-300 leading-relaxed max-w-6xl mx-auto">
                    Sometimes, even after catching the rise, you'll need to say
                    something out loud to your child or to yourself. The script
                    below has been tested in real ADHD households. It's not
                    magic words; it's a structure. The structure works because
                    each part does a specific thing in your child's brain.
                  </p>
                </div>

                <div className="relative py-10">
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 to-emerald-400 shadow-[0_0_15px_rgba(94,114,228,0.3)]" />

                  <div className="space-y-10 relative z-10">
                    {MIND_SYNC_MODULE_01.learn.coRegulationScript.rows.map(
                      (row, idx) => {
                        const isLeft = idx % 2 === 0;
                        const stepImage = idx % 2 === 0 ? aboutImage : image;
                        const stepNumber = String(idx + 1).padStart(2, '0');

                        return (
                          <div
                            key={row.step}
                            className="relative z-10 flex flex-col md:flex-row items-center justify-center"
                          >
                            <div className="md:w-1/2 md:pr-12 flex justify-end">
                              {isLeft ? (
                                <div className="glass-panel p-6 rounded-2xl max-w-xl border border-white/10 hover:border-indigo-400/30 transition-colors">
                                  <span className="text-emerald-300 text-[11px] uppercase tracking-widest font-semibold mb-2 block">
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
                                  className="hidden md:block w-48 h-32 object-cover rounded-2xl opacity-60 grayscale hover:grayscale-0 transition-all duration-700 border border-white/10"
                                />
                              )}
                            </div>

                            <div className="my-4 md:my-0 flex items-center justify-center">
                              <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(45,212,191,0.5)] border-2 border-white/20" />
                            </div>

                            <div className="md:w-1/2 md:pl-12 flex justify-start">
                              {!isLeft ? (
                                <div className="glass-panel p-6 rounded-2xl max-w-xl border border-white/10 hover:border-indigo-400/30 transition-colors">
                                  <span className="text-emerald-300 text-[11px] uppercase tracking-widest font-semibold mb-2 block">
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
                                  className="hidden md:block w-48 h-32 object-cover rounded-2xl opacity-60 grayscale hover:grayscale-0 transition-all duration-700 border border-white/10"
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

              <div>
                <h3 className="text-xl font-bold text-white mb-3">
                  What not to do
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MIND_SYNC_MODULE_01.learn.whatNotToDo.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-4 p-6 rounded-2xl border border-red-500/20 bg-red-500/20"
                    >
                      <span className="material-symbols-outlined text-red-300 shrink-0">
                        cancel
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {active === 'practice' && (
            <section className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Part 3 – Interactive Practice Scenarios
                </h3>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line space-y-4 max-w-4xl">
                  <p>
                    Below are four interactive scenarios. Each one drops you
                    into a moment that ADHD parents face regularly. Read the
                    situation, choose what you'd do next, and compare your
                    answer to the feedback. There are no "trick" questions here.
                    Some of the answers feel reasonable but quietly make things
                    worse; others feel uncomfortable but actually help. The
                    feedback explains exactly why.
                  </p>
                  <p>
                    These scenarios are best done after the video and the Learn
                    section. Take them slowly. The goal isn't to score highly
                    it's to notice what your instinct is, and where it might
                    benefit from a small shift.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {PRACTICE_SCENARIOS.map((s, idx) => {
                  const isActive = idx === practiceIndex;
                  return (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => {
                        setPracticeIndex(idx);
                        setSelectedPracticeOption(null);
                        setPracticeSubmitted(false);
                      }}
                      className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest border transition-colors ${
                        isActive
                          ? 'bg-indigo-500/15 border-indigo-400/40 text-indigo-200'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-8">
                {(() => {
                  const scenario = PRACTICE_SCENARIOS[practiceIndex];
                  const selected = selectedPracticeOption;

                  return (
                    <>
                      <div className="w-full mb-6 text-center">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300/80 block mb-3">
                          Scenario {practiceIndex + 1} of{' '}
                          {PRACTICE_SCENARIOS.length}
                        </span>
                        <h4 className="text-3xl md:text-4xl font-black text-white mb-3">
                          {scenario.title}
                        </h4>
                        <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-emerald-400 mx-auto rounded-full" />
                      </div>

                      <section className="w-full">
                        <div className="glass-panel p-8 md:p-10 rounded-2xl card-glow relative overflow-hidden border border-white/10">
                          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
                          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shadow-2xl">
                              <img
                                src={aboutImage}
                                alt="Scenario visual"
                                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold mb-3">
                                The situation
                              </div>
                              <p className="text-lg text-slate-300 mb-8 leading-relaxed whitespace-pre-line">
                                {scenario.situation}
                              </p>
                              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                                <span className="material-symbols-outlined text-amber-300">
                                  lightbulb
                                </span>
                                <p className="text-sm text-amber-200/90 italic">
                                  {scenario.question}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        {scenario.options.map((opt) => {
                          const isSelected = selectedPracticeOption === opt.key;
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
                                  ? 'border-indigo-400/60 bg-indigo-500/10 shadow-[0_0_20px_rgba(94,114,228,0.15)]'
                                  : 'border-white/10 hover:border-indigo-400/40 hover:bg-white/10 hover:-translate-y-1'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold border transition-colors ${
                                    isSelected
                                      ? 'bg-indigo-400 text-neutral-950 border-indigo-300'
                                      : 'bg-white/5 text-indigo-300 border-white/10 group-hover:bg-indigo-500/20'
                                  }`}
                                >
                                  {opt.key}
                                </div>
                                <div className="min-w-0">
                                  <h5
                                    className={`font-semibold mb-2 ${
                                      isSelected
                                        ? 'text-indigo-200'
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
                                  <span className="material-symbols-outlined text-indigo-400">
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
                              ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 text-white hover:scale-105 active:scale-95'
                              : 'bg-white/10 text-white/40 cursor-not-allowed'
                          }`}
                        >
                          <span className="tracking-wider">View feedback</span>
                          <span className="material-symbols-outlined">
                            arrow_forward
                          </span>
                        </button>

                        {practiceSubmitted && selected ? (
                          <div className="w-full glass-panel rounded-2xl border border-white/10 p-8 space-y-8">
                            <div className="flex items-start justify-between gap-6">
                              <div>
                                <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold mb-2">
                                  Feedback for {scenario.title}
                                </div>
                                <h5 className="text-xl font-bold text-white">
                                  Feedback
                                </h5>
                              </div>
                              <div
                                className={`shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-widest border ${
                                  selected === scenario.bestOption
                                    ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-200'
                                    : 'bg-red-500/10 border-red-400/30 text-red-200'
                                }`}
                              >
                                {selected === scenario.bestOption
                                  ? 'You chose best option'
                                  : 'You chose a different option'}
                              </div>
                            </div>

                            <div className="space-y-4">
                              {(
                                Object.keys(
                                  scenario.feedback
                                ) as PracticeOptionKey[]
                              ).map((key) => {
                                const item = scenario.feedback[key];
                                const isPicked = selected === key;
                                const isBest = scenario.bestOption === key;

                                return (
                                  <div
                                    key={key}
                                    className={`rounded-2xl border p-6 space-y-3 ${
                                      isPicked
                                        ? 'border-indigo-400/40 bg-indigo-500/10'
                                        : 'border-white/10 bg-white/5'
                                    }`}
                                  >
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex items-start gap-4">
                                        <div
                                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold border shrink-0 ${
                                            isPicked
                                              ? 'bg-indigo-400 text-neutral-950 border-indigo-300'
                                              : 'bg-white/5 text-indigo-300 border-white/10'
                                          }`}
                                        >
                                          {key}
                                        </div>
                                        <div>
                                          <div className="text-lg font-bold text-white">
                                            {item.title}
                                          </div>
                                        </div>
                                      </div>

                                      {isBest ? (
                                        <div className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border bg-emerald-500/10 border-emerald-400/30 text-emerald-200 shrink-0">
                                          Best
                                        </div>
                                      ) : null}
                                    </div>

                                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                      {item.body}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="pt-6 border-t border-white/10">
                              <h6 className="text-sm font-bold uppercase tracking-[0.2em] text-white/70 mb-3">
                                The point of this scenario
                              </h6>
                              <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                {scenario.point}
                              </p>
                            </div>
                          </div>
                        ) : null}
                      </div>

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
                            const next = Math.min(
                              PRACTICE_SCENARIOS.length - 1,
                              practiceIndex + 1
                            );
                            setPracticeIndex(next);
                            setSelectedPracticeOption(null);
                            setPracticeSubmitted(false);
                          }}
                          disabled={
                            practiceIndex === PRACTICE_SCENARIOS.length - 1
                          }
                          className={`flex items-center gap-2 text-sm transition-colors ${
                            practiceIndex === PRACTICE_SCENARIOS.length - 1
                              ? 'text-white/30 cursor-not-allowed'
                              : 'text-white/60 hover:text-indigo-200'
                          }`}
                        >
                          <span>Next</span>
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
                <p className="text-slate-300 leading-relaxed max-w-3xl">
                  Below is a one-page summary of everything in this module. It's
                  designed to be saved as a screenshot on your phone and
                  referred to in the moments when you need it most. Don't try to
                  remember everything in the module. Just keep this card close.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow flex flex-col items-center text-center">
                  <div className="w-full aspect-[3/4] bg-gradient-to-br from-indigo-900/40 to-emerald-500/10 rounded-xl mb-6 flex flex-col p-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                      <img
                        src={aboutImage}
                        alt="Mind Sync Pocket"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="text-left">
                        <span className="text-[10px] text-emerald-300 px-2 py-1 bg-white/5 rounded-full inline-block mb-2 uppercase tracking-widest font-semibold">
                          Mind Sync Pocket
                        </span>
                        <h4 className="text-2xl font-bold text-white">
                          Catch the Rise
                        </h4>
                        <div className="text-[11px] uppercase tracking-[0.2em] text-white/50 mt-2">
                          The pocket version
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                          {MIND_SYNC_MODULE_01.takeaway.body}
                        </div>
                      </div>

                      <div className="text-[10px] tracking-widest text-white/40 uppercase">
                        Module 01 Complete
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mb-6 px-2">
                    Your digital anchor. Keep this visual guide handy for quick
                    recalibration.
                  </p>

                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-xl font-semibold shadow-xl hover:shadow-indigo-500/20 transition-all"
                  >
                    <span className="material-symbols-outlined">download</span>
                    <span>Download PDF</span>
                  </button>
                </div>

                <div />
              </div>

              <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10 space-y-4">
                <h4 className="text-2xl font-bold text-white">
                  Before you close this module
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Two things worth knowing before you go.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  The first is that this skill takes time. You'll catch the rise
                  in week one. You'll forget it in week two. You'll catch it
                  again in week three. That's normal. ADHD brains learn through
                  repetition, not insight, so the technique only really lands
                  once you've practised it across many real moments. Be patient
                  with yourself.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  The second is that the goal isn't to never escalate again.
                  It's to escalate less often, recover faster, and repair more
                  cleanly. A house with no shouting is not a realistic target. A
                  house with quicker repair after the shouting that's the actual
                  goal, and it's well within reach.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  In the next module, we'll build on what you've learned here
                  and apply it to one of the most common flashpoints in ADHD
                  households: ending screen time. See you there.
                </p>
              </div>
            </section>
          )}

          {active === 'reflection' && (
            <section className="space-y-10">
              <div className="text-center space-y-4">
                <h3 className="text-3xl md:text-5xl font-black text-white">
                  Optional Reflection
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto">
                  These questions are entirely optional. Some parents find it
                  useful to write things down at the end of a module others
                  would rather just absorb the content. Either is fine. If you'd
                  like to reflect, here are a few questions to take with you.
                </p>
              </div>

              <div className="space-y-8">
                <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow transition-all">
                  <label className="block text-2xl md:text-3xl font-bold text-white mb-4">
                    What does "the rise" feel like in your body? Where do you
                    notice it first?
                  </label>
                  <textarea
                    className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-lg text-slate-200 placeholder:text-white/25 resize-none outline-none focus:border-purple-400/40 transition-all h-32"
                    placeholder="Close your eyes for a moment and notice the physical sensations..."
                  />
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow transition-all">
                  <label className="block text-2xl md:text-3xl font-bold text-white mb-4">
                    Think of a recent moment that escalated. Looking back, where
                    was the earliest point you could have caught it?
                  </label>
                  <textarea
                    className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-lg text-slate-200 placeholder:text-white/25 resize-none outline-none focus:border-purple-400/40 transition-all h-32"
                    placeholder="Trace the thread back to the first subtle spark of tension..."
                  />
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow transition-all">
                  <label className="block text-2xl md:text-3xl font-bold text-white mb-4">
                    Which of the four scenarios felt most like your real life?
                    What does that tell you about where to focus first?
                  </label>
                  <textarea
                    className="w-full bg-transparent border-b border-white/10 py-4 px-0 text-lg text-slate-200 placeholder:text-white/25 resize-none outline-none focus:border-purple-400/40 transition-all h-32"
                    placeholder="Honesty is the first step toward clarity. Which scenario resonated?"
                  />
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-white/10 card-glow transition-all">
                  <label className="block text-2xl md:text-3xl font-bold text-whiteg  indigo-300 mb-4">
                    What's one small commitment you can make for the next seven
                    days? (Not a big change — just one small thing you'll try.)
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

          <div className="pt-6 mt-2 border-t border-white/10">
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() => {
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

              {activeIndex === TOC.length - 1 ? (
                <button
                  type="button"
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-transparent bg-gradient-to-r from-indigo-500 to-emerald-500 text-white hover:shadow-indigo-500/20 transition-colors"
                >
                  <span>Finish Module</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const next =
                      TOC[Math.min(TOC.length - 1, activeIndex + 1)]?.key;
                    if (next) setActive(next);
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-transparent bg-gradient-to-r from-indigo-500 to-emerald-500 text-white hover:shadow-indigo-500/20 transition-colors"
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
                      ? 'border-white/10 active-lesson-glow bg-indigo-500/10'
                      : 'border-white/5 hover:bg-white/5'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {isCurrent ? (
                      <div className="w-6 h-6 rounded-full border border-indigo-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
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
                      className={`text-[10px] ${isCurrent ? 'text-indigo-400 font-semibold uppercase' : 'text-slate-500'}`}
                    >
                      {isCurrent ? 'Active' : 'Click to view'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </main>
    </div>
  );
}
