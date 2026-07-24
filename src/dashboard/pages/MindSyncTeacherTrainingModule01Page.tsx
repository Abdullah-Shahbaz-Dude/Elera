import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VideoLessonPlayer from '../components/VideoLessonPlayer';
import image from '../../assets/images/mindsync/2.jpg';
import structureWatchImage from '../../assets/images/mindsync/5.jpg';
import structureLearnImage from '../../assets/images/mindsync/6.jpg';
import structurePracticeImage from '../../assets/images/mindsync/Untitled design.jpg';
import structureTakeawayImage from '../../assets/images/mindsync/7.jpg';
import learnHeroImage from '../../assets/images/mindsync/shutterstock_2757853493 (1).jpg';
import scenario1Image from '../../assets/images/mindsync/3.jpg';
import scenario2Image from '../../assets/images/mindsync/4.jpg';
import scenario3Image from '../../assets/images/mindsync/1.jpg';
import logoFav from '../../assets/images/logo/logo-fav-removebg-preview.png';

type ScreenType =
  | 'cover'
  | 'text'
  | 'bullets'
  | 'divider'
  | 'video'
  | 'accordion'
  | 'key'
  | 'technique'
  | 'technique_intro'
  | 'technique_honest'
  | 'timeline'
  | 'scenario_situation'
  | 'scenario_choose'
  | 'scenario_feedback'
  | 'takeaway'
  | 'closing';

type TechniqueStateCard = {
  state: 'green' | 'amber' | 'red';
  label: string;
  description: string;
};

type TechniqueStep = {
  number: number;
  title: string;
  body: string;
  bodyExtra?: string;
  expand?: DropdownItem;
  showTrafficLight?: boolean;
  stateCards?: TechniqueStateCard[];
};

type DropdownItem = {
  header: string;
  body: string;
};

type TimelineStep = {
  shortLabel: string;
  icon: string;
  header: string;
  body: string;
  keyInsight: string;
  image: string;
};

const SCENARIO_IMAGES: Record<1 | 2 | 3, string> = {
  1: scenario1Image,
  2: scenario2Image,
  3: scenario3Image,
};

type DropdownProps = DropdownItem & {
  dropdownId: string;
  onOpenChange?: (dropdownId: string, open: boolean) => void;
  containerClassName?: string;
  buttonClassName?: string;
  bodyClassName?: string;
  variant?: 'default' | 'cover';
};

type ScenarioOptionKey = 'A' | 'B' | 'C' | 'D';

type Scenario = {
  id: 1 | 2 | 3;
  title: string;
  situation: string;
  question: string;
  options: Record<ScenarioOptionKey, string>;
  feedback: Record<ScenarioOptionKey, string>;
  point: string;
};

type Screen = {
  id: number;
  type: ScreenType;
  t1?: string;
  t2?: string;
  t3?: string;
  lead?: string;
  body?: string;
  bullets?: string[];
  dropdowns?: DropdownItem[];
  accordionTitle?: string;
  accordionItems?: DropdownItem[];
  keyPoint?: string;
  videoTitle?: string;
  videoUrl?: string | null;
  videoPrompt?: string;
  transcriptDropdown?: DropdownItem;
  scenarioId?: 1 | 2 | 3;
  takeawayHeading?: string;
  takeawayBody?: string;
  closingBody?: string;
  techniqueSteps?: TechniqueStep[];
  timelineSteps?: TimelineStep[];
};

type SidebarSectionKey =
  | 'introduction'
  | 'watch'
  | 'learn'
  | 'practise'
  | 'takeaway'
  | 'closing';

type SidebarSection = {
  key: SidebarSectionKey;
  label: string;
  indices: number[];
  landingBlockId?: number;
};

const TAKEAWAY_HIGHLIGHT_TEXT =
  '“Yesterday I misread what was going on for you. I should have checked in rather than snapped. I am sorry. You did not deserve that.” No “but.” No explanation. No asking them to apologise back. Then let them go.';

const HIDDEN_NAV_BLOCK_IDS = new Set<number>([8, 9, 10]);

const SCENARIOS: Record<1 | 2 | 3, Scenario> = {
  1: {
    id: 1,
    title: 'Scenario 1. The pupil who will not start',
    situation:
      'It is period three on a Wednesday. You have set your Year 8 class a written task. The room is quiet, most pupils are working. One pupil, clear in your view, is staring at the page. Pen down. No writing. Two minutes have passed since you gave the instruction. You walked past once and gave a gentle prompt. Nothing changed. The pupils on either side of her have started. You have about ten seconds before you decide what to do.',
    question: 'What would you do?',
    options: {
      A: 'Walk over and say firmly, in a voice the class can hear, “I asked you to start. I will not ask again.” Stand by her desk until she picks up the pen.',
      B: 'Walk over and stand silently next to her desk for ten seconds, looking down at her work, waiting for her to start.',
      C: 'Crouch to her eye level, side on rather than face on. Lower your voice. Say quietly, “Quick check in. Is the task the problem, or is something else going on?” Wait for her answer.',
      D: 'Ignore it for a few more minutes. She will start eventually if you do not make a thing of it.',
    },
    feedback: {
      A: 'Option A. Looks reasonable, almost always backfires.\n\nLoud, in front of the class, to a pupil whose state you have not checked. If she is in amber or red you have raised the demand and made her the centre of attention. High chance she now refuses, walks out, or shuts down. Even genuine defiance, much rarer than it feels, rarely lands well with a public consequence.',
      B: 'Option B. Better, but only partly.\n\nSilent presence works for some pupils. For others, especially autistic and anxious pupils, it reads as pressure and increases dysregulation. You cannot know which without checking, and if she starts you do not know whether she was fine or forced from a dysregulated state.',
      C: 'Option C. This is the technique in action.\n\nYou have put the rise through the pause. Eye level not towering, side on not face on, voice lowered, one open question. “Is the task the problem, or is something else going on?” gives her two doors, and either is fine. Fifteen seconds spent, the rest of the lesson kept.',
      D: 'Option D. Avoidant, with a hidden cost.\n\nIgnoring sometimes works but quietly signals that you have given up. Other pupils notice. If the message is that some pupils are held to the standard and some are not, your authority slowly weakens.',
    },
    point:
      'The point. The difference between the best response and the worst is not whether you set a limit. It is whether you read the pupil’s state before you set it.',
  },
  2: {
    id: 2,
    title: 'Scenario 2. The pupil who walks out',
    situation:
      'You are teaching a Year 10 class. One pupil, tense throughout and not engaging with two earlier prompts, suddenly stands, picks up his bag, and walks toward the door. He does not speak. He does not look at you. He is about four seconds from the corridor. Other pupils are watching. You have to decide right now.',
    question: 'What would you do?',
    options: {
      A: 'Step in front of the door to block him. Tell him firmly he is not leaving until he sits back down.',
      B: 'Let him walk out. Do not chase. Do not raise your voice. Note to follow up with pastoral and with him personally, separately, when he is calm.',
      C: 'Shout after him as he leaves: “If you walk out of my lesson, that is an automatic detention.”',
      D: 'Send another pupil after him to bring him back.',
    },
    feedback: {
      A: 'Option A. Almost guaranteed to escalate.\n\nBlocking the door of a pupil already in red is the fastest way to a serious incident. He is leaving because his brain has tipped past tolerance. Standing in his way pushes fight or flight into fight. Pupils who would never normally be physical have hurt staff in this exact moment.',
      B: 'Option B. Counter intuitive, but right.\n\nLetting him walk feels like losing control. It is not. Pupils in red need to discharge the alarm response, and walking is one of the safest ways the body does that. The follow up matters as much: flag to pastoral, speak when he is back in green. Pupils who were not chased or shouted at return more easily.',
      C: 'Option C. Understandable, costs you.\n\nShouting after him serves the audience in the room more than him. He is not coming back because you raised your voice. You have added a public threat to a public exit, making re entry harder. Every other pupil just saw you answer distress with a threat.',
      D: 'Option D. Well meant, occasionally disastrous.\n\nThe peer is now responsible for something that is not their job. A dysregulated pupil approached in the corridor by a peer can escalate fast. Adults handle it.',
    },
    point:
      'The point. A pupil walking out is not the disaster it can feel like. The disaster is what happens if you turn that walk out into a confrontation. Your job in those four seconds is to keep it safe, not tidy.',
  },
  3: {
    id: 3,
    title: 'Scenario 3. The repair',
    situation:
      'Yesterday, in a busy double lesson, you snapped at a pupil who was not following an instruction. You said something like “I have asked you three times. If you cannot follow simple instructions, you can sit outside.” She went quiet, did the work, did not look at you again. Afterwards her form tutor told you she had been crying at break and her grandmother had been admitted to hospital that morning. You feel sick about it. She is in your class again in twenty minutes.',
    question: 'What is the best thing to do now?',
    options: {
      A: 'Do not bring it up. Just be especially kind to her in the lesson and hope she notices.',
      B: 'At the start of the lesson, in front of the class, apologise publicly so the whole class sees you model accountability.',
      C: 'Catch her quietly before or as the lesson settles: “Yesterday, when I asked you to follow the instruction, I did not know what was going on for you. I should have checked in rather than snapped. I am sorry. You did not deserve that.” Then leave her with it.',
      D: 'Add a kind comment to her book when you mark tonight, but do not say anything in person.',
    },
    feedback: {
      A: 'Option A. The most damaging of the options.\n\nPretending it did not happen costs trust the most. She has not forgotten. Without repair, the moment becomes part of her quiet picture of you. Pupils who never receive repair stop believing repair is possible.',
      B: 'Option B. Right values, wrong stage.\n\nA public apology for a one to one moment makes her the centre of unwanted attention. The real repair gets diluted. Keep private repair private.',
      C: 'Option C. Repair done well.\n\nYou named what happened, owned the misreading, did not ask her to apologise, did not defend yourself, and then let her go. “Leave her with it” is the part most people miss. She may say nothing, or “it is fine.” That is enough. You have given her an adult naming a mistake without making her manage it. That is rare, and it sticks.',
      D: 'Option D. Kind, but incomplete.\n\nA note has too much work to do on its own. She does not know if it means sorry, or well done. Use it as well if you like, but spoken repair comes first.',
    },
    point:
      'The point. You will misread distress as defiance sometimes. What matters almost as much as the technique is what you do afterwards. Clean repair, no “but,” no asking the pupil to apologise back. Then let them go.',
  },
};

function Tag({ children }: { children: string }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-full">
      {children}
    </span>
  );
}

// function ScriptDropdown({
//   header,
//   body,
//   dropdownId,
//   onOpenChange,
// }: DropdownProps) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
//       <button
//         type="button"
//         onClick={() => {
//           setOpen((v) => {
//             const next = !v;
//             onOpenChange?.(dropdownId, next);
//             return next;
//           });
//         }}
//         className="w-full h-[56px] flex items-center justify-between gap-4 px-4 bg-[#1A1A33]/60 hover:bg-[#1A1A33]/75 transition-colors text-left"
//       >
//         <div className="flex items-center gap-3 min-w-0">
//           <span className="material-symbols-outlined text-[#818CF8]">
//             menu_book
//           </span>
//           <div className="text-sm font-medium text-white/85 truncate">
//             {header}
//           </div>
//         </div>
//         <span
//           className={`material-symbols-outlined text-[#818CF8] transition-transform ${
//             open ? 'rotate-180' : ''
//           }`}
//         >
//           expand_more
//         </span>
//       </button>
//       <div
//         className={`overflow-hidden transition-all duration-300 ease-out ${
//           open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
//         }`}
//       >
//         <div className="px-4 py-4 text-sm text-slate-200 whitespace-pre-line">
//           {body}
//         </div>
//       </div>
//     </div>
//   );
// }

function Dropdown({
  header,
  body,
  dropdownId,
  onOpenChange,
  containerClassName,
  buttonClassName,
  bodyClassName,
  variant = 'default',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const isCover = variant === 'cover';
  return (
    <div
      className={`md:w-auto overflow-hidden bg-white ${
        isCover
          ? 'rounded-xl border border-slate-200 shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]'
          : 'border rounded-lg'
      } ${containerClassName ?? ''}`}
      style={isCover ? undefined : { borderColor: '#E5E9F0' }}
    >
      <button
        type="button"
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            onOpenChange?.(dropdownId, next);
            return next;
          });
        }}
        className={`w-full flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors text-left ${
          isCover
            ? 'py-4 px-5 md:px-6 min-h-[70px]'
            : 'h-[70px] px-[25px]'
        } ${buttonClassName ?? ''}`}
      >
        <div
          className={`${
            isCover
              ? 'text-[16px] md:text-[18px] font-medium leading-relaxed'
              : 'text-sm font-arial text-slate-900'
          }`}
          style={isCover ? { color: '#1F3864' } : undefined}
        >
          {header}
        </div>
        <span
          className={`material-symbols-outlined transition-transform shrink-0 ${
            open ? 'rotate-180' : ''
          }`}
          style={{ color: '#1F7A7A' }}
        >
          expand_more
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        } ${bodyClassName ?? ''}`}
      >
        <div
          className={`whitespace-pre-line ${
            isCover
              ? 'px-5 md:px-6 pb-4 text-[15px] md:text-[16px] leading-relaxed text-slate-600'
              : 'px-[25px] py-4 text-slate-700'
          }`}
          style={
            isCover
              ? undefined
              : {
                  background: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 400,
                }
          }
        >
          {body}
        </div>
      </div>
    </div>
  );
}

function LearnAccordionItem({
  dropdownId,
  header,
  body,
  open,
  onToggle,
  compact = false,
}: {
  dropdownId: string;
  header: string;
  body: string;
  open: boolean;
  onToggle: (dropdownId: string, open: boolean) => void;
  compact?: boolean;
}) {
  const meta = (() => {
    const lower = header.toLowerCase();
    if (lower.startsWith('green')) {
      return {
        iconBg: 'bg-emerald-100',
        dotBg: 'bg-emerald-500',
        accentBorder: 'border-emerald-100',
        caption: 'The thinking brain is in charge',
      };
    }
    if (lower.startsWith('amber')) {
      return {
        iconBg: 'bg-amber-100',
        dotBg: 'bg-amber-500',
        accentBorder: 'border-amber-100',
        caption: 'Energy going on staying in the room',
      };
    }
    if (lower.startsWith('red')) {
      return {
        iconBg: 'bg-red-100',
        dotBg: 'bg-red-500',
        accentBorder: 'border-red-100',
        caption: 'The alarm system is in charge',
      };
    }
    if (lower.includes('bit more on the brain')) {
      return {
        iconBg: 'bg-slate-100',
        dotBg: 'bg-slate-400',
        accentBorder: 'border-slate-200',
        caption: 'Optional extra detail',
      };
    }
    return {
      iconBg: 'bg-slate-100',
      dotBg: 'bg-slate-400',
      accentBorder: 'border-slate-200',
      caption: '',
    };
  })();

  return (
    <div
      className={`rounded-xl overflow-hidden cursor-pointer border border-slate-200 bg-white shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] transition-shadow ${
        open ? 'shadow-[0_24px_48px_-12px_rgba(47,99,120,0.12)]' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle(dropdownId, !open)}
        className={`w-full flex items-center justify-between gap-4 text-left ${
          compact ? 'p-4' : 'p-6'
        }`}
      >
        <div
          className={`flex items-center min-w-0 ${compact ? 'gap-4' : 'gap-6'}`}
        >
          <div
            className={`rounded-full flex items-center justify-center shrink-0 ${meta.iconBg} ${
              compact ? 'w-10 h-10' : 'w-12 h-12'
            }`}
          >
            <span className={`rounded-full ${meta.dotBg} ${compact ? 'w-3 h-3' : 'w-4 h-4'}`} />
          </div>
          <div className="min-w-0">
            <div
              className={`font-semibold text-slate-900 ${
                compact
                  ? 'text-[16px] leading-snug'
                  : 'text-[18px] truncate'
              }`}
            >
              {header}
            </div>
            {meta.caption ? (
              <div
                className={`text-[12px] text-slate-500 ${compact ? '' : 'truncate'}`}
              >
                {meta.caption}
              </div>
            ) : null}
          </div>
        </div>

        <span
          className={`material-symbols-outlined text-slate-500 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: open ? 700 : 0 }}
      >
        <div
          className={`flex flex-col gap-6 ${
            compact ? 'px-4 pb-6 pt-2 ml-10' : 'px-6 pb-8 pt-2 ml-12 lg:ml-20'
          }`}
        >
          <div
            className={`bg-[#F7F9FB] p-4 rounded-lg border ${meta.accentBorder}`}
          >
            <div className="text-[15px] text-slate-700 whitespace-pre-line leading-relaxed">
              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TECHNIQUE_STATE_STYLES: Record<
  'green' | 'amber' | 'red',
  {
    cardBg: string;
    border: string;
    icon: string;
    iconColor: string;
    labelColor: string;
  }
> = {
  green: {
    cardBg: 'bg-emerald-50/40',
    border: 'border-emerald-500',
    icon: 'check_circle',
    iconColor: 'text-emerald-600',
    labelColor: 'text-emerald-700',
  },
  amber: {
    cardBg: 'bg-[#fff8e1]',
    border: 'border-[#ffb300]',
    icon: 'warning',
    iconColor: 'text-[#ffb300]',
    labelColor: 'text-[#b28900]',
  },
  red: {
    cardBg: 'bg-rose-50/40',
    border: 'border-rose-500',
    icon: 'emergency',
    iconColor: 'text-rose-600',
    labelColor: 'text-rose-700',
  },
};

function TechniqueIntroSection({ screen }: { screen: Screen }) {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col justify-center min-h-[calc(100vh-320px)]">
      <header>
        <h1 className="text-[32px] leading-tight font-bold text-[#1F3864] mb-6">
          {screen.t2}
        </h1>
        {screen.lead ? (
          <div className="max-w-3xl bg-[#F7F9FB] p-8 rounded-xl border-l-4 border-[#1F7A7A]">
            <p className="text-[18px] leading-relaxed text-[#333333]">
              {screen.lead}
            </p>
          </div>
        ) : null}
      </header>
    </div>
  );
}

function TechniqueStepsSection({
  screen,
  openDropdownIds,
  onDropdownToggle,
}: {
  screen: Screen;
  openDropdownIds: Set<string>;
  onDropdownToggle: (dropdownId: string, open: boolean) => void;
}) {
  const steps = screen.techniqueSteps ?? [];

  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-[32px] leading-tight font-bold text-[#1F3864] mb-8">
        {screen.t2}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white p-8 rounded-xl flex flex-col h-full border border-slate-200 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)]"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E6F4F4] text-[#1F7A7A] text-sm font-semibold shrink-0">
                {step.number}
              </span>
              <h2 className="text-[18px] font-semibold text-slate-900">
                {step.title}
              </h2>
            </div>

            <p className="text-[15px] text-slate-700 mb-6 leading-relaxed">
              {step.number === 2 ? (
                <>
                  During the pause, ask yourself:{' '}
                  <span className="italic">
                    &ldquo;Where is this pupil right now?&rdquo;
                  </span>
                </>
              ) : (
                step.body
              )}
            </p>

            {step.bodyExtra ? (
              <p className="text-[15px] text-slate-700 mb-6 leading-relaxed">
                {step.number === 2 ? (
                  <>
                    Quickly check their internal traffic light. Are they in
                    Green (calm), Amber (frustrated/anxious), or Red
                    (fight/flight)? This shift in focus from the{' '}
                    <span className="font-semibold">behavior</span> to the{' '}
                    <span className="font-semibold">internal state</span>{' '}
                    changes everything.
                  </>
                ) : (
                  step.bodyExtra
                )}
              </p>
            ) : null}

            {step.expand ? (
              <div className="mt-auto -mx-2 -mb-2">
                <LearnAccordionItem
                  dropdownId={`${screen.id}:${step.expand.header}`}
                  header={step.expand.header}
                  body={step.expand.body}
                  open={openDropdownIds.has(
                    `${screen.id}:${step.expand.header}`
                  )}
                  onToggle={onDropdownToggle}
                />
              </div>
            ) : null}

            {step.showTrafficLight ? (
              <div className="mt-auto flex gap-2">
                <div className="w-full h-1.5 rounded-full bg-[#1F7A7A]/20 overflow-hidden">
                  <div className="h-full bg-[#1F7A7A] w-1/3" />
                </div>
              </div>
            ) : null}

            {step.stateCards && step.stateCards.length ? (
              <div className="space-y-4">
                {step.stateCards.map((card) => {
                  const styles = TECHNIQUE_STATE_STYLES[card.state];
                  return (
                    <div
                      key={card.state}
                      className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${styles.cardBg} ${styles.border}`}
                    >
                      <span
                        className={`material-symbols-outlined mt-0.5 ${styles.iconColor}`}
                      >
                        {styles.icon}
                      </span>
                      <div>
                        <p
                          className={`text-sm font-semibold ${styles.labelColor}`}
                        >
                          {card.label}
                        </p>
                        <p className="text-xs text-slate-600">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutModuleTextContent({
  screen,
  onDropdownOpenChange,
}: {
  screen: Screen;
  onDropdownOpenChange: (dropdownId: string, open: boolean) => void;
}) {
  return (
    <>
      {screen.lead ? (
        <p
          className="text-[20px] md:text-[24px] font-semibold leading-snug whitespace-pre-line"
          style={{ color: '#1F3864' }}
        >
          {screen.lead}
        </p>
      ) : null}

      {screen.body ? (
        <p
          className="text-[16px] md:text-[18px] font-medium leading-relaxed whitespace-pre-line"
          style={{ color: '#1F3864' }}
        >
          {screen.body}
        </p>
      ) : null}

      {screen.dropdowns && screen.dropdowns.length ? (
        <div className="space-y-3">
          {screen.dropdowns.map((d) => (
            <Dropdown
              key={d.header}
              dropdownId={`${screen.id}:${d.header}`}
              header={d.header}
              body={d.body}
              onOpenChange={onDropdownOpenChange}
              variant="cover"
            />
          ))}
        </div>
      ) : null}
    </>
  );
}

function AboutModuleDiagram() {
  return (
    <div className="relative flex justify-center items-center py-4 md:py-6 min-h-[300px] md:min-h-[340px] overflow-visible">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/felt.png")',
          opacity: 0.03,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible">
        {[
          { delay: '0s', color: 'bg-[#2E7CF6]/25' },
          { delay: '1s', color: 'bg-[#2E7CF6]/20' },
          { delay: '2s', color: 'bg-[#6BA3F8]/18' },
        ].map(({ delay, color }) => (
          <div
            key={delay}
            className={`absolute w-56 h-56 md:w-72 md:h-72 rounded-full ${color} ms-animate-soft-pulse`}
            style={{ animationDelay: delay }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center px-2">
        <div className="flex justify-between w-full relative">
          <div className="absolute top-1/3 left-0 w-full h-px bg-[#1F3864]/25 -translate-y-1/2 -z-10" />

          <div className="flex flex-col items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded-full bg-rose-600 ms-animate-diagram-dot"
              style={
                {
                  animationDelay: '0s, 0s',
                  '--ms-ring-color': 'rgba(254, 205, 211, 0.65)',
                  '--ms-glow-color': 'rgba(225, 29, 72, 0.35)',
                } as React.CSSProperties
              }
            />
            <div
              className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ms-animate-diagram-label"
              style={{ animationDelay: '0s' }}
            >
              Trigger
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-sm font-semibold text-[#2E7CF6] ms-animate-diagram-pause"
              style={{ animationDelay: '1s' }}
            >
              3s
            </div>
            <div
              className="text-[10px] font-bold text-[#2E7CF6] ms-animate-diagram-label"
              style={{ animationDelay: '1s' }}
            >
              The Pause
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded-full bg-sky-700 ms-animate-diagram-dot"
              style={
                {
                  animationDelay: '2s, 2s',
                  '--ms-ring-color': 'rgba(186, 230, 253, 0.65)',
                  '--ms-glow-color': 'rgba(3, 105, 161, 0.35)',
                } as React.CSSProperties
              }
            />
            <div
              className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ms-animate-diagram-label"
              style={{ animationDelay: '2s' }}
            >
              Response
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutModuleInsightBar() {
  return (
    <div className="flex items-center gap-4 py-4 px-5 md:px-6 rounded-xl bg-white border border-[#E5E9F0] shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: '#EEF3FA' }}
      >
        <span
          className="material-symbols-outlined text-[26px]"
          style={{ color: '#2E7CF6' }}
        >
          psychology
        </span>
      </div>
      <p
        className="text-[16px] md:text-[18px] leading-relaxed font-medium"
        style={{ color: '#1F3864' }}
      >
        This module is about the three seconds before you respond.
      </p>
    </div>
  );
}

function AboutModuleSection({
  screen,
  onDropdownOpenChange,
}: {
  screen: Screen;
  onDropdownOpenChange: (dropdownId: string, open: boolean) => void;
}) {
  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 lg:gap-8">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="flex flex-col gap-5 border-l-4 border-l-[#2E7CF6] pl-5 md:pl-6 py-1">
          <AboutModuleTextContent
            screen={screen}
            onDropdownOpenChange={onDropdownOpenChange}
          />
        </div>
        <AboutModuleDiagram />
      </div>
      <AboutModuleInsightBar />
    </div>
  );
}

function CoverSection({ screen }: { screen: Screen }) {
  const topics = [
    { label: 'Distress', image: scenario1Image },
    { label: 'Defiance', image: scenario2Image },
    { label: 'Overwhelm', image: scenario3Image },
  ] as const;

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col flex-1 min-h-0 h-full gap-4 md:gap-5">
      <p
        className="shrink-0 text-[20px] md:text-[24px] font-semibold leading-snug max-w-3xl"
        style={{ color: '#1F3864' }}
      >
        {screen.body?.trim()}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1 min-h-0">
        {topics.map((item) => (
          <div key={item.label} className="flex flex-col min-h-0 gap-2">
            <div className="flex-1 min-h-[120px] max-h-[200px] sm:max-h-none relative overflow-hidden rounded-2xl shadow-md">
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.label}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3864]/40 to-transparent" />
            </div>
            <p
              className="shrink-0 text-center text-[14px] font-semibold"
              style={{ color: '#1F7A7A' }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="shrink-0 flex items-center gap-4 py-4 px-5 md:px-6 rounded-xl bg-white border border-slate-200 shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08)]">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: '#E6F4F4' }}
        >
          <span
            className="material-symbols-outlined text-[26px]"
            style={{ color: '#1F7A7A' }}
          >
            timer
          </span>
        </div>
        <p
          className="text-[16px] md:text-[18px] leading-relaxed font-medium"
          style={{ color: '#1F3864' }}
        >
          And what to do in the three seconds before you respond.
        </p>
      </div>
    </div>
  );
}

function TechniqueHonestSection({
  screen,
  onNavigateToBlock,
}: {
  screen: Screen;
  onNavigateToBlock: (blockId: number) => void;
}) {
  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-[32px] leading-tight font-bold text-[#1F3864] mb-8">
        {screen.t2}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-8">
          {screen.keyPoint ? (
            <div className="p-8 bg-[#1F7A7A] rounded-xl text-white shadow-[0_20px_40px_-15px_rgba(47,99,120,0.18)]">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-white">
                  lightbulb
                </span>
              </div>
              <h3 className="text-[20px] font-semibold mb-4">
                The honest part
              </h3>
              <p className="text-[15px] opacity-90 leading-relaxed italic">
                &ldquo;{screen.keyPoint}&rdquo;
              </p>
            </div>
          ) : null}

         
        </div>

        <div className="h-[400px] relative overflow-hidden rounded-3xl shadow-lg">
          <img
            className="w-full h-full object-cover"
            src={learnHeroImage}
            alt="A teacher sitting quietly in a light-filled classroom after school hours"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F3864]/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function WhatNotToDoStepperSection({ screen }: { screen: Screen }) {
  const steps = screen.timelineSteps ?? [];
  const [activeStep, setActiveStep] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const active = steps[activeStep];

  const switchStep = (index: number) => {
    if (index === activeStep || !steps[index]) return;
    setContentVisible(false);
    setTimeout(() => {
      setActiveStep(index);
      setContentVisible(true);
    }, 300);
  };

  const progressWidth =
    steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto relative flex flex-col flex-1 min-h-0 h-full overflow-hidden">
      <div className="shrink-0">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#1F7A7A] bg-[#E6F4F4] px-3 py-1 rounded-full mb-2">
          In the moment
        </span>
        <h1 className="text-[24px] md:text-[28px] leading-tight font-bold text-[#1F3864] mb-2">
          {screen.t2}
        </h1>
        {screen.body ? (
          <p className="text-[14px] text-slate-600 leading-snug mb-4 max-w-3xl">
            {screen.body}
          </p>
        ) : null}
      </div>

      <div className="relative flex items-start justify-between mb-6 px-2 md:px-6 shrink-0">
        <div className="absolute h-1 w-full bg-slate-200 top-5 left-0 z-0 rounded-full" />
        <div
          className="absolute h-1 bg-[#1F7A7A] top-5 left-0 z-0 rounded-full transition-all duration-500"
          style={{ width: `${progressWidth}%` }}
        />
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const isCompleted = index <= activeStep;
          return (
            <button
              key={step.header}
              type="button"
              onClick={() => switchStep(index)}
              className="relative z-10 flex flex-col items-center group flex-1 min-w-0"
            >
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 active:scale-95 shrink-0 ${
                  isActive
                    ? 'border-[#1F7A7A] bg-[#E6F4F4] text-[#1F7A7A] ring-4 ring-[#E6F4F4]'
                    : isCompleted
                      ? 'border-[#1F7A7A] bg-[#E6F4F4] text-[#1F7A7A]'
                      : 'border-slate-300 bg-white text-slate-500 group-hover:border-[#1F7A7A]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {step.icon}
                </span>
              </div>
              <span
                className={`mt-2 text-[11px] font-medium text-center leading-tight px-0.5 hidden sm:block ${
                  isActive
                    ? 'text-[#1F7A7A] font-bold'
                    : 'text-slate-500 opacity-60'
                }`}
              >
                {index + 1}. {step.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          className={`grid grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden transition-all duration-300 ${
            contentVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="col-span-12 lg:col-span-7 bg-white p-4 md:p-5 rounded-xl border border-slate-200 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] flex flex-col min-h-0 overflow-hidden">
            <div className="flex items-center gap-3 mb-3 shrink-0">
              <div className="p-3 rounded-lg bg-[#F7F9FB] text-[#1F7A7A] shrink-0">
                <span className="material-symbols-outlined text-3xl">
                  {active.icon}
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="text-lg md:text-xl font-semibold text-[#1F3864] leading-snug">
                  {active.header}
                </h2>
                <p className="text-xs font-medium text-[#1F7A7A] mt-0.5">
                  {activeStep + 1} of {steps.length}
                </p>
              </div>
            </div>
            <p className="text-[14px] md:text-[15px] text-slate-700 leading-snug">
              {active.body}
            </p>
          </div>

          <div className="hidden lg:block col-span-5 min-h-0 h-full">
            <div className="relative h-full min-h-[120px] rounded-xl overflow-hidden border border-slate-200">
              <img
                className="w-full h-full object-cover"
                src={active.image}
                alt=""
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const EVIDENCE_TAB_META = [
  { shortLabel: 'Three State Model', icon: 'psychology_alt' },
  { shortLabel: 'The Pause', icon: 'pause_circle' },
  { shortLabel: 'Why 3 Seconds', icon: 'timer_3' },
] as const;

function EvidenceTabsSection({ screen }: { screen: Screen }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = screen.dropdowns ?? [];
  const active = tabs[activeTab];
  const meta = EVIDENCE_TAB_META[activeTab] ?? EVIDENCE_TAB_META[0];

  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-[32px] leading-tight font-bold text-[#1F3864] mb-3">
        {screen.t2}
      </h1>
      {screen.body ? (
        <p className="text-[15px] text-slate-600 leading-relaxed mb-8 max-w-3xl">
          {screen.body}
        </p>
      ) : null}

      <div className="max-w-4xl mx-auto">
        <div className="flex gap-1 p-1 rounded-xl bg-[#F7F9FB] mb-8">
          {tabs.map((tab, index) => {
            const tabMeta = EVIDENCE_TAB_META[index];
            const isActive = activeTab === index;
            return (
              <button
                key={tab.header}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`flex-1 px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-sm font-semibold ${
                  isActive
                    ? 'bg-[#1F7A7A] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                {tabMeta ? (
                  <span
                    className={`material-symbols-outlined text-lg ${
                      isActive ? 'text-white' : 'text-[#1F7A7A]'
                    }`}
                  >
                    {tabMeta.icon}
                  </span>
                ) : null}
                <span className="hidden sm:inline">{tabMeta?.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {active ? (
          <div
            key={activeTab}
            className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] p-8 md:p-10"
            style={{ animation: 'step-enter 0.3s ease-out' }}
          >
            <div className="flex items-start gap-8">
              <div className="hidden md:flex flex-none w-16 h-16 bg-[#E6F4F4] rounded-full items-center justify-center">
                <span className="material-symbols-outlined text-[#1F7A7A] text-3xl">
                  {meta.icon}
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#1F3864] mb-6">
                  {active.header}
                </h2>
                <p className="text-[15px] md:text-[18px] text-slate-700 leading-relaxed whitespace-pre-line max-w-3xl">
                  {active.body}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CardAccordionSection({
  screenId,
  title,
  intro,
  introStyle = 'compact',
  compact = false,
  items,
  openDropdownIds,
  onToggle,
}: {
  screenId: number;
  title?: string;
  intro?: string;
  introStyle?: 'compact' | 'panel';
  compact?: boolean;
  items: DropdownItem[];
  openDropdownIds: Set<string>;
  onToggle: (dropdownId: string, open: boolean) => void;
}) {
  return (
    <div className="max-w-[1200px] mx-auto">
      {title ? (
        <>
          <h1 className="text-[32px] leading-tight font-bold text-[#1F3864] mb-3">
            {title}
          </h1>
          {intro ? (
            <p className="text-[15px] text-slate-600 leading-relaxed mb-6 max-w-3xl">
              {intro}
            </p>
          ) : null}
        </>
      ) : intro ? (
        introStyle === 'panel' ? (
          <div className="max-w-3xl bg-[#F7F9FB] p-8 rounded-xl border-l-4 border-[#1F7A7A] mb-8">
            <p className="text-[18px] leading-relaxed text-[#333333]">
              {intro}
            </p>
          </div>
        ) : (
          <p className="text-[15px] text-slate-700 leading-relaxed mb-4 max-w-3xl">
            {intro}
          </p>
        )
      ) : null}
      <div className={`flex flex-col ${compact ? 'gap-3' : 'gap-4'}`}>
        {items.map((item) => {
          const dropdownId = `${screenId}:${item.header}`;
          return (
            <LearnAccordionItem
              key={item.header}
              dropdownId={dropdownId}
              header={item.header}
              body={item.body}
              open={openDropdownIds.has(dropdownId)}
              onToggle={onToggle}
              compact={compact}
            />
          );
        })}
      </div>
    </div>
  );
}

function parseLearnStateSections(body: string): {
  whatYouSee?: string;
  underneath?: string;
  whatHelps?: string;
} {
  const parts = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const res: {
    whatYouSee?: string;
    underneath?: string;
    whatHelps?: string;
  } = {};

  for (const p of parts) {
    const lower = p.toLowerCase();
    if (lower.startsWith('what you see:')) {
      res.whatYouSee = p.replace(/^what you see:\s*/i, '');
      continue;
    }
    if (lower.startsWith('underneath:')) {
      res.underneath = p.replace(/^underneath:\s*/i, '');
      continue;
    }
    if (lower.startsWith('what helps:')) {
      res.whatHelps = p.replace(/^what helps:\s*/i, '');
      continue;
    }
  }

  return res;
}

function LearnStateModal({
  open,
  title,
  accentColor,
  body,
  onClose,
}: {
  open: boolean;
  title: string;
  accentColor: string;
  body: string;
  onClose: () => void;
}) {
  if (!open) return null;
  const sections = parseLearnStateSections(body);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white max-w-2xl w-full rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start gap-6 mb-6">
            <h2
              className="text-2xl md:text-3xl font-black"
              style={{ color: accentColor }}
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-6">
            {sections.whatYouSee ? (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  What you see
                </div>
                <div className="text-sm md:text-base text-slate-800 leading-relaxed">
                  {sections.whatYouSee}
                </div>
              </div>
            ) : null}

            {sections.underneath ? (
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: `${accentColor}14` }}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Underneath
                </div>
                <div className="text-sm md:text-base text-slate-800 leading-relaxed">
                  {sections.underneath}
                </div>
              </div>
            ) : null}

            {sections.whatHelps ? (
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  What helps
                </div>
                <div className="text-sm md:text-base text-slate-800 leading-relaxed">
                  {sections.whatHelps}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyPoint({ children }: { children: string }) {
  return (
    <div className="rounded-2xl border border-amber-300/60 bg-amber-50 px-5 py-4 text-slate-900 whitespace-pre-line">
      {children}
    </div>
  );
}

export default function MindSyncTeacherTrainingModule01Page() {
  const navigate = useNavigate();
  const screens: Screen[] = useMemo(
    () =>
      (
        [
          {
            id: 1,
            type: 'cover',
            t1: 'The Three Second Pause',
            t2: 'Reading behaviour in the moment',
            body: 'How to tell the difference between distress, defiance and overwhelm. ',
          },
          {
            id: 2,
            type: 'text',
            t2: 'About this module',
            lead: 'Sometimes a pupil’s behaviour can look like defiance when what is really going on is distress.',
            body: 'Same pupil, same behaviour, a different read, a completely different outcome.',
            dropdowns: [
              {
                header: 'Does this only apply to pupils with a diagnosis?',
                body: 'No. The brain patterns here show up across autism, ADHD, dyslexia and dyspraxia, in pupils with no diagnosis at all, and in any pupil on a bad day.',
              },
            ],
          },
          {
            id: 3,
            type: 'bullets',
            t2: 'By the end you will be able to',
            bullets: [
              'Spot the three patterns staff most often misread: distress as defiance, overwhelm as rudeness, stimming as off task.',
              'Understand what is happening inside a dysregulated pupil, and why pushing harder makes it worse.',
              'Use the three second pause in real time.',
              'Give consequences in a way that lands rather than escalates.',
            ],
          },
          {
            id: 5,
            type: 'divider',

            body: 'The same moment, twice. In the first version the teacher responds in about a second, the way any of us might. In the second she waits three. Watch what changes.',
            videoTitle: 'Module 1 film, around 2 minutes',
            videoUrl: null,
            dropdowns: [
              {
                header: 'Read the full script ',
                body: 'OPEN. Clean Elara logo, then a soft dissolve into the classroom.\n\nSCENE 1, a pupil who has checked out. A Year 9 English lesson in full flow. Daniel is near the back.\nHis book is closed and he is turning a pen over and over in his hands, bending it, clicking it, eyes\nsomewhere else. The pupils either side of him are writing.\n\nNarrator: Year 9 English, period four on a Wednesday. Watch the boy at the back. His book is shut,\nand he is turning a pen over and over in his hands. He is not being difficult and he is not being loud. He\nhas just stopped being able to join in.\n\nSCENE 2, the ask, and two realities. Ms Patel asks him calmly to get his book out. He does not open it.\nA small tense shake of the head, and a low mutter. From the front it looks like a knock back. Then a\nshort view from Daniel’s side: the room tilts, the light hums, a pencil tap is too loud.\n\nNarrator: A fair, ordinary instruction. From the front of the room, that looks like a refusal. But from\ninside his head, it is not refusal at all. He heard the tone, not the words. Same moment. Two\ncompletely different realities.\n\nSCENE 3, what often happens. She responds in about a second, on reflex. She asks again, harder,\nand names a consequence. It stops being about a book and starts being about winning.\n\nSCENE 4, what could happen instead. The same moment again. Narrator: In a classroom, most of us\nwait about one second before we respond. Researchers have actually measured it. And when a\nteacher holds that pause for just a few seconds longer, what happens next in the room can change\ncompletely. She feels herself about to react, and instead she waits. Three seconds. Then she comes\ndown to his level, off to the side, and asks one quiet question.\n\nSCENE 5, the outcome. He takes two minutes, comes back, and does the work. Narrator: Two\nversions of the same lesson, and the only real difference between them was about two seconds. Not a\nbetter teacher. Not a different pupil. Two seconds.\n\nCLOSE. Clean Elara logo.',
              },
            ],
          },
          {
            id: 6,
            type: 'video',
            t2: 'The three second pause, in a real classroom',
            videoTitle: 'Module 1 film, around 2 minutes',
            videoUrl: null,
            transcriptDropdown: {
              header: 'Read the full script',
              body: 'OPEN. Clean Elara logo on a plain background. Hold 2 to 3 seconds.\nSoft fade into the classroom.\n\nSCENE 1, the lesson and Daniel (0:00 to 0:30). Wide shot of a Year 9 English lesson already in full flow. The class is working, Ms Patel is teaching in her stride. We move to Daniel near the back: his book is not out, his desk is bare while the pupils beside him work, his pen is on the floor, and he is turned towards the window, not the board. Calm and still, not disturbing anyone.\n\nCaptions, one at a time: “Daniel, Year 9. He has ADHD.” “He is not disrupting anyone.” “His brain cannot hold focus right now.”\n\nMs Patel glances over, sees him, takes it in, and chooses to give him a minute.\n\nNarrator: This is an ordinary Year 9 English lesson, and it is going well. Now look at the back of the room. This is Daniel. He has ADHD. He is not messing about and he is not distracting anyone. His book is not even out, and his pen is on the floor. However hard he tries, his brain cannot hold on to the lesson right now. His teacher has noticed. She has not acted yet. That is the most important second in the lesson, and most observers would not even see it.\n\nSCENE 2, the first ask (0:30 to 1:00). Ms Patel comes alongside Daniel. Calm, low voice. “Daniel, book out please. We are on page forty two.”\n\nDaniel does not respond. He does not get his book out, does not turn to the page, does not look at her. A small mutter under his breath. Ms Patel’s face tightens for a second. Two pupils nearby are watching.\n\nCut to Daniel’s view for two seconds. The room feels louder. The light hums. A pencil tapping is too loud. His face is blank, his jaw tight. He heard the tone, not the words. The tone felt like pressure.\n\nNarrator: We have just seen two versions of the same moment. From the front of the class, it looks as if Daniel has refused a reasonable instruction. From inside Daniel’s head, he could not process it, and he is already starting to shut down. Same behaviour, completely different reality.\n\nSCENE 3, the pause (1:00 to 1:35). Ms Patel is about to repeat herself, more firmly. We see her start to react, then stop herself. She holds it. Three seconds. Caption, low on screen: “The three second pause.” She is choosing.\n\nShe crouches to Daniel’s eye level, side on, not face on. Lower, slower voice. “Daniel. Quick check in. Are you with me, or are you somewhere else right now?” After a few seconds, a tiny shake of the head. Almost nothing, but it is an answer. “OK. Take two minutes. Get a drink. Come back when you are ready. I will catch you up on the page.”\n\nDaniel gets up slowly and goes out. Ms Patel turns back to the class as if nothing unusual has happened.\n\nNarrator: That was the three second pause. It cost her about a minute of lesson time. Without it, this could have gone a very different way. It might have tipped into a behaviour incident, with Daniel walking out and the rest of the lesson lost. Because she paused, it did not have to. He took a short break, came back, and got on with his work.\n\nSCENE 4, the takeaway (1:35 to 2:05). End of lesson. The bell goes. Daniel hands his book to Ms Patel as he leaves. She glances at it. He has done the work. A small nod between them. Ms Patel sits, lets out a breath. Something nearly went wrong, and did not. Not because she was a better teacher than yesterday, but because she paused for three seconds.\n\nNarrator: The pause is not soft. It is not letting him off. It is the difference between responding to what is actually happening and responding to what you assumed was happening. In this module, we will show you exactly how to do it, and when it matters most.\n\nCLOSE. Fade to the clean Elara logo on a plain background. Hold about 3 seconds. Soft music resolves.',
            },
          },
          {
            id: 7,
            type: 'divider',
            t1: 'Part 2. Learn',
            lead: 'What you just watched, in plain language.',
            body: 'There are three states a pupil’s brain can be in during a lesson. They look different, they need different responses, and the costliest mistake is treating one as if it were another.',
          },
          {
            id: 8,
            type: 'text',
            t3: 'State 1. Calmly engaged (green)',
            body: 'The thinking brain is online. The pupil can follow instructions, manage impulses and learn. Most of your lesson assumes pupils are here. Most are, most of the time.',
            dropdowns: [
              {
                header: 'A bit more on the brain',
                body: 'The thinking brain is the prefrontal cortex, just behind the forehead. In green it is in charge, so the pupil has the capacity to learn, remember and make choices.',
              },
            ],
          },
          {
            id: 9,
            type: 'text',
            t3: 'State 2. Dysregulated (amber)',
            body: 'Something has knocked the pupil out of green: a loud room, a fall out at break, work that feels too hard, being tired or hungry. The thinking brain is only partly online and the alarm system has switched on. They look fidgety, restless, distracted. They did not choose this.',
          },
          {
            id: 10,
            type: 'key',
            t3: 'State 3. Shut down (red)',
            body: 'The alarm system is in charge and the thinking brain has gone offline. The pupil cannot process language the way you expect. They may freeze, refuse to move, go silent, or lash out. None of this is choice in the everyday sense. The brain has to come back down first.',
            keyPoint:
              'The single most important point. A pupil in amber or red cannot learn from a consequence in the moment. Their thinking brain is not online to take it in. Give the consequence later, when they are back in green. That is when it teaches.',
          },
          {
            id: 11,
            type: 'accordion',
            t2: 'The three states, side by side',
            // body: 'A quick reference. Tap each state to see what you might see, what is happening underneath, and what helps in the moment.',
            accordionTitle: 'The three states, side by side',
            accordionItems: [
              {
                header: 'Green. Calmly engaged',
                body: 'What you see: on task, following instructions, productive movement, able to wait for help.\n\nUnderneath: the thinking brain is in charge. There is capacity to learn and to choose.\n\nWhat helps: teach, stretch, push gently. High expectations work best here.',
              },
              {
                header: 'Amber. Dysregulated',
                body: 'What you see: fidgety, restless, off task, short or muttered replies, slower to follow. Can look cheeky or low level disruptive.\n\nUnderneath: something has knocked them out of green. A loud room, a fall out at break, work that feels too hard, being tired or hungry. The thinking brain is only partly online. Their energy is going on staying in the room, so less is left for learning. They did not choose this.\n\nWhat helps: co regulate first. Lower your voice. Reduce the demand briefly. Offer a small choice. Buy ninety seconds. Most pupils come back within two minutes if you do not push.',
              },
              {
                header: 'Red. Shut down',
                body: 'What you see: frozen, silent, head down. May refuse to move, may walk out, may say something that is not their usual voice.\n\nUnderneath: the alarm system is in charge and the thinking brain has gone offline. Language does not process the way you expect. The brain has to come back down first.\n\nWhat helps: reduce demands to almost zero. Quiet voice. Side on, not face on. Offer space, not solutions. Do not negotiate. Give the brain time to come back.',
              },
              {
                header: 'A bit more on the brain',
                body: 'The thinking brain is the prefrontal cortex, just behind the forehead. In green it is in charge, so a pupil has the capacity to learn, remember and make choices. When the alarm system fires, that part goes quiet first.',
              },
            ],
            keyPoint:
              'A pupil in amber or red cannot take in a conversation about their behaviour while it is happening. The thinking brain is not online to process it. Have that conversation later, once they are back in green. That is when it teaches them something.',
          },
          {
            id: 12,
            type: 'text',
            t2: 'Three states, and why the difference matters.',
            body: 'During a lesson, a pupil’s brain can be in one of three states. From the front of the room they can look similar. They need very different things from you, and the costly mistake is treating one as if it were another. Tap each state.',
          },
          {
            id: 13,
            type: 'technique_intro',
            t2: 'The technique. The three second pause',
            lead: 'It is not complicated. You make a small gap between what the pupil does and what you do next, and into that gap you fit one quiet check.',
          },
          {
            id: 14,
            type: 'technique',
            t2: 'The three steps',
            techniqueSteps: [
              {
                number: 1,
                title: 'Notice the rise in yourself',
                body: 'Before you act, feel your own physiological reaction. It might be a tightening in your jaw, a sudden flush of heat in your neck, or your breath catching. This is your body\'s alarm system.',
                expand: {
                  header: 'Why this is the hard step',
                  body: 'Our biological wiring is designed for instant reaction. In a classroom, that survival instinct often misinterprets a student\'s behavior as a direct threat, bypassing your rational thought process. Observing the reaction without acting on it requires immense cognitive effort.',
                },
              },
              {
                number: 2,
                title: 'Ask one quiet question',
                body: 'During the pause, ask yourself: "Where is this pupil right now?"',
                bodyExtra:
                  'Quickly check their internal traffic light. Are they in Green (calm), Amber (frustrated/anxious), or Red (fight/flight)? This shift in focus from the behavior to the internal state changes everything.',
                showTrafficLight: true,
              },
              {
                number: 3,
                title: 'Match response to state',
                body: 'Your goal is to match your intervention to the student\'s emotional capacity, not to the disruption itself.',
                stateCards: [
                  {
                    state: 'green',
                    label: 'Green State',
                    description:
                      'Low-level correction, humor, or direct instruction works.',
                  },
                  {
                    state: 'amber',
                    label: 'Amber State',
                    description:
                      'Validation, distraction, and offering choices to lower anxiety.',
                  },
                  {
                    state: 'red',
                    label: 'Red State',
                    description:
                      'Safety first. Reduce words, increase space, co-regulate.',
                  },
                ],
              },
            ],
          },
          {
            id: 15,
            type: 'technique_honest',
            t2: 'The honest part',
            keyPoint:
              'This is not about being a perfect, zen-like presence every single day. There will be days where you react before you can think. The goal isn\'t perfection; the goal is consistent progress. Every time you successfully find that three-second gap, you are building a stronger bridge to a pupil who needs your stability more than your discipline.',
          },
          {
            id: 16,
            type: 'timeline',
            t2: 'Five things that tend to make it harder',
            body: 'Five responses that look perfectly reasonable under pressure, and tend to escalate a pupil who is already dysregulated. Worth a look. Tap each one.',
            timelineSteps: [
              {
                shortLabel: 'Voice',
                icon: 'record_voice_over',
                header: 'Raising your voice to match theirs',
                body: 'The calmer you sound, the more likely they are to come down with you.',
                keyInsight:
                  'The calmer you sound, the more likely they are to come down with you.',
                image: learnHeroImage,
              },
              {
                shortLabel: 'Eye contact',
                icon: 'visibility_off',
                header: 'Asking for eye contact',
                body: 'For many neurodivergent pupils it costs thinking capacity they do not have right now. Eye contact is not the test of whether a pupil respects you.',
                keyInsight:
                  'For many neurodivergent pupils it costs thinking capacity they do not have right now. Eye contact is not the test of whether a pupil respects you.',
                image: scenario1Image,
              },
              {
                shortLabel: 'Instructions',
                icon: 'checklist',
                header: 'Stacking up instructions',
                body: 'Working memory shrinks when a pupil is dysregulated. One instruction at a time, with a pause after each, is far more likely to work.',
                keyInsight:
                  'Working memory shrinks when a pupil is dysregulated. One instruction at a time, with a pause after each, is far more likely to work.',
                image: scenario2Image,
              },
              {
                shortLabel: 'In public',
                icon: 'groups',
                header:
                  'Telling a pupil what will happen to them in front of the class',
                body: 'It almost always escalates, and a pupil in amber or red cannot take it in anyway. Anything that needs saying is better said quietly, later, once they are back in green.',
                keyInsight:
                  'It almost always escalates, and a pupil in amber or red cannot take it in anyway. Anything that needs saying is better said quietly, later, once they are back in green.',
                image: scenario3Image,
              },
              {
                shortLabel: 'Stimming',
                icon: 'touch_app',
                header: 'Reading stimming as being off task',
                body: 'Tapping, rocking and fiddling are usually self regulation. Asking a pupil to stop often removes the very thing keeping them in the lesson.',
                keyInsight:
                  'Tapping, rocking and fiddling are usually self regulation. Asking a pupil to stop often removes the very thing keeping them in the lesson.',
                image: structureLearnImage,
              },
            ],
          },
          {
            id: 17,
            type: 'text',
            t2: 'Where this comes from',
            body: 'The film keeps things simple. The evidence sits here.',
            dropdowns: [
              {
                header: 'The three state model',
                body: 'Consistent with research by Mullally and colleagues at Newcastle University on school distress, and with the Neurodivergence Task and Finish Group report, which finds that behaviour, including stimming, is too often understood as defiance when it is in fact communication of overwhelm or distress.',
              },
              {
                header: 'Why a pause changes what happens next',
                body: 'When we respond on reflex, the emotional part of the brain acts before the thinking part has caught up. A short, deliberate pause is what lets the thinking brain come back online, so you can recognise distress rather than defiance and choose your response. This is the basis of co regulation and de escalation practice in schools.',
              },
              {
                header: 'Why three seconds',
                body: 'The one second and three second figures are anchored in wait time research from the 1970s (Rowe, M. B. 1974, Wait time and rewards as instructional variables, Journal of Research in Science Teaching), which found that teachers naturally pause for about one second, and that stretching that pause to three seconds or more measurably improves what happens in the classroom.\n\nThat research looked at the pause after a teacher asks a question, rather than the pause before responding to distress. So we use it here as a principle and a memorable anchor, not as a study of behaviour. Three seconds is long enough to interrupt the reflex, and short enough that it is realistic in a live classroom.',
              },
            ],
          },
          {
            id: 18,
            type: 'divider',
            t1: 'Part 3. Practise',
            body: 'Three situations you will recognise. Read it, choose what you would do, then compare. There are no trick questions, and the aim is not to score well. It is to notice your own instinct, and where a small shift might help. Some options feel reasonable and quietly make things harder.',
            // dropdowns: [
            //   {
            //     header: 'How to get the most from this',
            //     body: 'Take them slowly. The goal is not to score highly. It is to notice your own instinct, and where it might benefit from a small shift.',
            //   },
            // ],
          },
          { id: 19, type: 'scenario_situation', scenarioId: 1 },
          { id: 20, type: 'scenario_choose', scenarioId: 1 },
          { id: 22, type: 'scenario_situation', scenarioId: 2 },
          { id: 23, type: 'scenario_choose', scenarioId: 2 },
          { id: 25, type: 'scenario_situation', scenarioId: 3 },
          { id: 26, type: 'scenario_choose', scenarioId: 3 },
          {
            id: 28,
            type: 'takeaway',
            t1: 'Part 4. Your take away card',
            body: 'A one page summary of the whole module, made to fit a phone screen, a lanyard insert, or a noticeboard. Do not try to remember the module. Just keep this card close.',
            takeawayHeading: 'THE THREE SECOND PAUSE\nThe pocket version',
            takeawayBody:
              '1. Notice the rise in yourself. The tight chest, the urge to snap, the feeling of being undermined. Notice it. Do not reply yet.\n\n2. Ask one quiet question. Inside: is this pupil green, amber or red? If you need to, aloud: “Quick check in. Are you with me, or somewhere else?”\n\n3. Match your response to the state, not the behaviour. Green: teach. Amber: lower the demand, offer a choice, buy ninety seconds. Red: reduce demands to almost zero, offer space, save the conversation for later.\n\nAnd when you get it wrong:\n\n“Yesterday I misread what was going on for you. I should have checked in rather than snapped. I am sorry. You did not deserve that.” No “but.” No explanation. No asking them to apologise back. Then let them go.',
          },
          {
            id: 29,
            type: 'closing',
            t2: 'That is Module 1',
            closingBody:
              'Next in the pathway: Module 2, Don’t Break What’s Working. How to tell when a quietly off task pupil is actually coping, and the cost of taking their coping away.\n\nMind Sync · Evidence based insight, in plain language. Designed by educational psychologists. Aligned to the Ofsted Education Inspection Framework, November 2025.',
          },
        ] as Screen[]
      ).filter((s) => s.id !== 6 && s.id !== 12),
    []
  );

  const [index, setIndex] = useState(0);
  const [learnStateModalKey, setLearnStateModalKey] = useState<
    'green' | 'amber' | 'red' | null
  >(null);
  const [openDropdownIds, setOpenDropdownIds] = useState<Set<string>>(
    () => new Set()
  );
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const scrollRestoreTopRef = useRef<number | null>(null);
  const sidebarScrollRef = useRef<HTMLDivElement | null>(null);
  const suppressAutoOpenRef = useRef(false);
  const lastAutoOpenIndexRef = useRef<number | null>(null);
  const [isScenarioFeedbackOpen, setIsScenarioFeedbackOpen] = useState(false);
  const [scenarioAnswers, setScenarioAnswers] = useState<
    Partial<Record<1 | 2 | 3, ScenarioOptionKey>>
  >({});

  const [openSections, setOpenSections] = useState<
    Record<SidebarSectionKey, boolean>
  >({
    introduction: false,
    watch: false,
    learn: false,
    practise: false,
    takeaway: false,
    closing: false,
  });

  const toggleSection = (key: SidebarSectionKey) => {
    setOpenSections((prev) => {
      if (prev[key]) {
        return {
          introduction: false,
          watch: false,
          learn: false,
          practise: false,
          takeaway: false,
          closing: false,
        };
      }
      return {
        introduction: key === 'introduction',
        watch: key === 'watch',
        learn: key === 'learn',
        practise: key === 'practise',
        takeaway: key === 'takeaway',
        closing: key === 'closing',
      };
    });
  };

  const [isSidebarTranscriptOpen, setIsSidebarTranscriptOpen] = useState(false);

  const toc = useMemo(() => {
    return screens.map((s, i) => {
      const label =
        s.type === 'cover'
          ? 'Cover'
          : s.type === 'scenario_situation' && s.scenarioId
            ? SCENARIOS[s.scenarioId].title
            : s.t1 || s.t2 || s.t3 || `Block ${s.id}`;
      return {
        index: i,
        label,
        blockId: s.id,
      };
    });
  }, [screens]);

  const navigateToBlockId = (blockId: number) => {
    const targetIndex = toc.find((t) => t.blockId === blockId)?.index;
    if (typeof targetIndex === 'number') {
      suppressAutoOpenRef.current = true;
      setIndex(targetIndex);
    }
  };

  const sidebarSections = useMemo((): SidebarSection[] => {
    const indicesByBlockId = new Map<number, number>();
    toc.forEach((t) => indicesByBlockId.set(t.blockId, t.index));

    const range = (start: number, end: number) => {
      const out: number[] = [];
      for (let b = start; b <= end; b += 1) {
        const idx = indicesByBlockId.get(b);
        if (typeof idx === 'number') out.push(idx);
      }
      return out;
    };

    return [
      {
        key: 'introduction',
        label: 'Introduction',
        indices: range(1, 4),
        landingBlockId: 1,
      },
      { key: 'watch', label: 'Part 1. Watch', indices: range(5, 5) },
      {
        key: 'learn',
        label: 'Part 2. Learn',
        indices: range(7, 17),
        landingBlockId: 7,
      },
      {
        key: 'practise',
        label: 'Part 3. Practise',
        indices: range(18, 27),
        landingBlockId: 18,
      },
      { key: 'takeaway', label: 'Part 4. Take away', indices: range(28, 28) },
      { key: 'closing', label: 'Closing', indices: range(29, 29) },
    ];
  }, [toc]);

  const activeSidebarSectionKey = useMemo((): SidebarSectionKey | null => {
    const section = sidebarSections.find((s) => s.indices.includes(index));
    return section?.key ?? null;
  }, [index, sidebarSections]);

  useEffect(() => {
    if (!activeSidebarSectionKey) return;
    if (lastAutoOpenIndexRef.current === null) {
      lastAutoOpenIndexRef.current = index;
      return;
    }
    if (lastAutoOpenIndexRef.current === index) return;
    lastAutoOpenIndexRef.current = index;
    if (suppressAutoOpenRef.current) {
      suppressAutoOpenRef.current = false;
      return;
    }
    setOpenSections((prev) => {
      if (prev[activeSidebarSectionKey]) return prev;
      return {
        ...prev,
        [activeSidebarSectionKey]: true,
      };
    });
  }, [activeSidebarSectionKey, index]);

  useEffect(() => {
    const container = sidebarScrollRef.current;
    if (!container) return;

    const raf = window.requestAnimationFrame(() => {
      const activeEl = container.querySelector(
        `[data-sidebar-item="true"][data-toc-index="${index}"]`
      ) as HTMLElement | null;

      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
        return;
      }

      if (!activeSidebarSectionKey) return;
      const sectionEl = container.querySelector(
        `[data-sidebar-section-header="true"][data-section-key="${activeSidebarSectionKey}"]`
      ) as HTMLElement | null;
      if (!sectionEl) return;
      sectionEl.scrollIntoView({ block: 'nearest' });
    });

    return () => window.cancelAnimationFrame(raf);
  }, [index, activeSidebarSectionKey, openSections]);

  const screen = screens[Math.min(screens.length - 1, Math.max(0, index))];

  useEffect(() => {
    setOpenDropdownIds(new Set());
    setIsScenarioFeedbackOpen(false);
  }, [index]);

  useEffect(() => {
    if (screen.type !== 'scenario_choose') return;

    const scenarioId = screen.scenarioId;
    if (scenarioId !== 1 && scenarioId !== 2 && scenarioId !== 3) return;

    setScenarioAnswers((prev) => {
      if (!prev[scenarioId]) return prev;
      const next = { ...prev };
      delete next[scenarioId];
      return next;
    });
  }, [index, screen.type, screen.scenarioId]);

  const handleDropdownOpenChange = (dropdownId: string, open: boolean) => {
    const el = scrollAreaRef.current;

    setOpenDropdownIds((prev) => {
      const next = new Set(prev);
      const wasAnyOpen = prev.size > 0;

      if (open) next.add(dropdownId);
      else next.delete(dropdownId);

      const willAnyOpen = next.size > 0;

      if (el) {
        if (open && !wasAnyOpen) {
          scrollRestoreTopRef.current = el.scrollTop;
        }

        requestAnimationFrame(() => {
          if (!el) return;

          if (open) {
            if (screen.type !== 'accordion') {
              el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
            }
            return;
          }

          if (!willAnyOpen && scrollRestoreTopRef.current !== null) {
            el.scrollTo({
              top: scrollRestoreTopRef.current,
              behavior: 'smooth',
            });
            scrollRestoreTopRef.current = null;
          }
        });
      }

      return next;
    });
  };

  const isAnyDropdownOpen = openDropdownIds.size > 0;

  const learnStatesScreen = useMemo(
    () => screens.find((s) => s.id === 11) ?? null,
    [screens]
  );

  const learnStateItems = useMemo(() => {
    const items = learnStatesScreen?.accordionItems ?? [];
    const find = (prefix: string) =>
      items.find((i) => i.header.toLowerCase().startsWith(prefix)) ?? null;
    return {
      green: find('green'),
      amber: find('amber'),
      red: find('red'),
      brain: find('a bit more'),
      keyPoint: learnStatesScreen?.keyPoint ?? '',
    };
  }, [learnStatesScreen]);

  const getPrevVisibleIndex = (fromIndex: number) => {
    for (let i = fromIndex - 1; i >= 0; i -= 1) {
      if (!HIDDEN_NAV_BLOCK_IDS.has(screens[i].id)) return i;
    }
    return null;
  };

  const getNextVisibleIndex = (fromIndex: number) => {
    for (let i = fromIndex + 1; i < screens.length; i += 1) {
      if (!HIDDEN_NAV_BLOCK_IDS.has(screens[i].id)) return i;
    }
    return null;
  };

  const prevVisibleIndex = getPrevVisibleIndex(index);
  const nextVisibleIndex = getNextVisibleIndex(index);

  const canGoNext = useMemo(() => {
    if (screen.type === 'scenario_choose' && screen.scenarioId) {
      return Boolean(scenarioAnswers[screen.scenarioId]);
    }
    return true;
  }, [screen.type, screen.scenarioId, scenarioAnswers]);

  const nextLabel = useMemo(() => {
    if (screen.id === 29) return 'Back to pathway';
    if (screen.id === 28) return 'Finish';
    return 'Next';
  }, [screen.id]);

  return (
    <div
      className="flex flex-col min-h-screen bg-[#F7F9FC] text-slate-900"
      style={{ fontFamily: 'Arial' }}
    >
      <header className="relative shrink-0 h-[238px] flex flex-col justify-end px-8 pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt="Mind Sync"
            className="w-full h-full object-cover object-[center_7%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/55 to-transparent" />
          <div className="absolute inset-0 bg-white/10" />
        </div>

        <div className="absolute top-4 left-8 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700">
            Mind Sync - Teacher Training
          </span>
          <Link
            to="/dashboard/my-learning/mind-sync"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors group"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="text-sm font-medium uppercase tracking-widest">
              Back to Mind Sync
            </span>
          </Link>
        </div>

        <div className="absolute top-4 right-8 text-right">
          <span className="text-xs text-slate-700 font-medium">
            Block {screen.id}
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mt-6">
          <h1
            className="text-[32px] leading-tight font-bold mb-1 tracking-tight"
            style={{ color: '#1F3864' }}
          >
            {screen.type === 'cover'
              ? screen.t1
              : screen.id === 5
                ? (screen.t1 ?? 'Part 1. Watch')
                : activeSidebarSectionKey === 'learn'
                  ? 'Part 2. Learn'
                  : 'MODULE 1 – THE THREE SECOND PAUSE'}
          </h1>
          <h2
            className="text-[24px] leading-snug font-bold mb-2"
            style={{ color: '#1F7A7A' }}
          >
            {screen.type === 'cover'
              ? screen.t2
              : screen.id === 5
                ? (screen.t2 ?? 'The three second pause, in a real classroom')
                : activeSidebarSectionKey === 'learn'
                  ? screen.type === 'technique_intro' ||
                    screen.type === 'technique' ||
                    screen.type === 'technique_honest'
                    ? (screen.t2 ?? 'Part 2. Learn')
                    : (screen.lead ?? screen.t2 ?? screen.t3 ?? 'Part 2. Learn')
                  : (screen.t2 ?? 'Reading behaviour in the moment')}
          </h2>
          {/* <p
            className="text-[15px] leading-relaxed max-w-2xl whitespace-pre-line"
            style={{ color: '#6B6B6B' }}
          >
            Screen {index + 1} of {screens.length}
          </p> */}
        </div>

        <div className="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-white/10 rounded-full blur-[120px]" />
        </div>
      </header>

      <main className="flex w-full h-[calc(100vh-238px)] overflow-hidden">
        <div className="w-3/4 flex flex-col min-h-0 overflow-hidden p-4">
          <div
            key={index}
            className="step-transition flex flex-col flex-1 min-h-0 overflow-hidden"
          >
            <div
              ref={scrollAreaRef}
              className={`flex-1 min-h-0 custom-scrollbar scroll-smooth ${
                screen.id === 16 ||
                screen.type === 'cover' ||
                screen.id === 2 ||
                screen.id === 3
                  ? 'pb-4 flex flex-col'
                  : 'pb-24'
              } ${
                isAnyDropdownOpen ||
                screen.type === 'scenario_feedback' ||
                screen.id === 17 ||
                screen.id === 2 ||
                screen.id === 3
                  ? 'overflow-y-auto'
                  : 'overflow-hidden'
              }`}
            >
              <section
                className={
                  screen.id === 16 ||
                  screen.type === 'cover' ||
                  screen.id === 2 ||
                  screen.id === 3
                    ? 'flex flex-col flex-1 min-h-full h-full'
                    : 'space-y-4'
                }
              >
                {screen.type === 'cover' ? (
                  <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full">
                    <CoverSection screen={screen} />
                  </div>
                ) : screen.type === 'technique_intro' ? (
                  <div className="p-5 md:p-6 md:px-14">
                    <TechniqueIntroSection screen={screen} />
                  </div>
                ) : screen.type === 'technique' ? (
                  <div className="p-5 md:p-6 md:px-14">
                    <TechniqueStepsSection
                      screen={screen}
                      openDropdownIds={openDropdownIds}
                      onDropdownToggle={handleDropdownOpenChange}
                    />
                  </div>
                ) : screen.type === 'technique_honest' ? (
                  <div className="p-5 md:p-6 md:px-14">
                    <TechniqueHonestSection
                      screen={screen}
                      onNavigateToBlock={navigateToBlockId}
                    />
                  </div>
                ) : screen.id === 16 ? (
                  <div className="p-5 md:p-6 md:px-14 flex flex-col flex-1 min-h-0 h-full overflow-hidden">
                    <WhatNotToDoStepperSection screen={screen} />
                  </div>
                ) : screen.id === 17 ? (
                  <div className="p-5 md:p-6 md:px-14">
                    <EvidenceTabsSection screen={screen} />
                  </div>
                ) : screen.id === 2 ? (
                  <div className="p-5 md:p-6 md:px-14 flex flex-1 flex-col min-h-0 h-full justify-center py-6">
                    <AboutModuleSection
                      screen={screen}
                      onDropdownOpenChange={handleDropdownOpenChange}
                    />
                  </div>
                ) : screen.id === 3 && screen.bullets ? (
                  <div className="p-5 md:p-6 md:px-14 flex flex-1 flex-col min-h-full h-full">
                    <div className="flex flex-1 w-full items-center justify-center min-h-full py-6">
                      <div className="w-full max-w-5xl mx-auto space-y-8">
                        <div className="rounded-2xl border border-[#E5E9F0] bg-white shadow-[0_4px_24px_-4px_rgba(10,31,68,0.08),0_2px_6px_-2px_rgba(10,31,68,0.04)] p-6 md:p-8 border-l-4 border-l-[#2E7CF6]">
                          <div className="space-y-5">
                            {screen.bullets.map((b) => (
                              <div key={b} className="flex items-start gap-4">
                                <img
                                  alt=""
                                  src={logoFav}
                                  className="w-7 h-7 object-contain shrink-0 mt-0.5"
                                />
                                <div
                                  className="text-[15px] md:text-[16px] leading-relaxed"
                                  style={{ color: '#1F3864' }}
                                >
                                  {b}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {[
                          {
                            title: 'Watch',
                            subtitle: 'VIDEO INSIGHT',
                            icon: 'play_circle',
                            bg: structureWatchImage,
                          },
                          {
                            title: 'Learn',
                            subtitle: 'CORE THEORY',
                            icon: 'menu_book',
                            bg: structureLearnImage,
                          },
                          {
                            title: 'Practise',
                            subtitle: 'INTERACTIVE TASK',
                            icon: 'task_alt',
                            bg: structurePracticeImage,
                          },
                          {
                            title: 'Take away',
                            subtitle: 'PDF RESOURCES',
                            icon: 'description',
                            bg: structureTakeawayImage,
                          },
                          ].map((item) => (
                            <div
                              key={item.title}
                              className="group relative aspect-square rounded-2xl overflow-hidden shadow-md"
                            >
                              <img
                                alt=""
                                src={item.bg}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3864]/80 via-[#1F3864]/25 to-transparent" />

                              <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-center gap-1.5 text-center">
                                <span
                                  className="material-symbols-outlined text-[22px]"
                                  style={{ color: '#2E7CF6' }}
                                >
                                  {item.icon}
                                </span>
                                <div className="text-sm font-semibold text-white">
                                  {item.title}
                                </div>
                                <div
                                  className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                                  style={{ color: '#1F7A7A' }}
                                >
                                  {item.subtitle}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 md:p-6 md:px-14 flex flex-col min-h-0">
                      <>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 flex-wrap" />
                        </div>

                        {screen.id === 8 ||
                        screen.id === 9 ||
                        screen.id === 10 ? (
                          <div className="flex-1 flex flex-col gap-6 min-h-0">
                            {activeSidebarSectionKey !== 'learn' ? (
                              <div className="text-center">
                                {screen.t3 ? (
                                  <h3 className="text-lg md:text-xl font-bold text-slate-900">
                                    {screen.t3}
                                  </h3>
                                ) : null}
                                <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                              </div>
                            ) : null}

                            {screen.body ? (
                              <div
                                className={`w-full mx-auto ${
                                  screen.id === 10
                                    ? 'max-w-[1100px]'
                                    : 'max-w-[784px]'
                                }`}
                              >
                                <div
                                  className={`whitespace-pre-line text-center md:text-left ${
                                    screen.id === 10
                                      ? 'text-base md:text-lg leading-relaxed text-slate-100/90'
                                      : 'text-sm md:text-base text-slate-700 leading-relaxed'
                                  }`}
                                >
                                  {screen.body}
                                </div>
                              </div>
                            ) : null}

                            {screen.id !== 10 ? (
                              <div className="flex justify-center">
                                <div className="w-full max-w-[520px] md:w-[520px] rounded-2xl overflow-hidden border border-slate-200 bg-white">
                                  <img
                                    src={structureLearnImage}
                                    alt="Learn"
                                    className="w-full h-[220px] md:h-[280px] object-cover"
                                  />
                                </div>
                              </div>
                            ) : null}

                            {screen.dropdowns && screen.dropdowns.length ? (
                              <div className="space-y-3 w-full max-w-[920px] mx-auto">
                                {screen.dropdowns.map((d) => (
                                  <div key={d.header} className="w-full">
                                    <div className="[&>div>button]:py-4 [&>div>button]:px-5">
                                      <Dropdown
                                        dropdownId={`${screen.id}:${d.header}`}
                                        header={d.header}
                                        body={d.body}
                                        onOpenChange={handleDropdownOpenChange}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        {screen.type === 'divider' && screen.t1 ? (
                          screen.id === 18 ? (
                            <div className="flex flex-col gap-6">
                              <div className="text-center">
                                <h1 className="text-2xl md:text-4xl font-black text-slate-900">
                                  {screen.t1}
                                </h1>
                                <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                              </div>

                              {screen.body ? (
                                <div className="w-full max-w-[784px] mx-auto">
                                  <div className="text-sm md:text-base text-slate-700 whitespace-pre-line leading-relaxed text-center md:text-left">
                                    {screen.body}
                                  </div>
                                </div>
                              ) : null}

                              <div className="flex justify-center">
                                <div className="w-full max-w-[520px] md:w-[520px] rounded-2xl overflow-hidden border border-slate-200 bg-white">
                                  <img
                                    src={structurePracticeImage}
                                    alt="Practise"
                                    className="w-full h-[220px] md:h-[280px] object-cover"
                                  />
                                </div>
                              </div>

                              {screen.dropdowns && screen.dropdowns.length ? (
                                <div className="space-y-3 w-full max-w-[920px] mx-auto">
                                  {screen.dropdowns.map((d) => (
                                    <div key={d.header} className="w-full">
                                      <div className="[&>div>button]:py-4 [&>div>button]:px-5">
                                        <Dropdown
                                          dropdownId={`${screen.id}:${d.header}`}
                                          header={d.header}
                                          body={d.body}
                                          onOpenChange={
                                            handleDropdownOpenChange
                                          }
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          ) : screen.id === 5 ? (
                            <div className="text-center">
                              <h1 className="text-2xl md:text-4xl font-black text-slate-900">
                                {screen.t1}
                              </h1>
                              <div className="mt-4 h-1 w-20 bg-[#0857e1]/30 mx-auto rounded-full" />
                            </div>
                          ) : screen.id === 7 ? null : (
                            <div className="text-center">
                              <h1 className="text-2xl md:text-4xl font-black text-slate-900">
                                {screen.t1}
                              </h1>
                              <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                            </div>
                          )
                        ) : null}

                        {screen.id === 5 ? (
                          <div className="pt-6 space-y-8">
                            <div className="flex justify-center">
                              <div className="w-full max-w-2xl">
                                <div className="aspect-video bg-[#F7F9FB] rounded-[2.5rem] border border-[#C9D6E5] shadow-[0_20px_40px_rgba(15,23,42,0.05)] overflow-hidden">
                                  <VideoLessonPlayer
                                    title={
                                      screen.videoTitle ??
                                      'Module 1 film, around 2 minutes'
                                    }
                                    videoUrl={screen.videoUrl ?? null}
                                    className="rounded-none"
                                  />
                                </div>
                              </div>
                            </div>

                            {screen.videoPrompt ? (
                              <div className="text-sm text-slate-600 text-center">
                                {screen.videoPrompt}
                              </div>
                            ) : null}

                            {screen.dropdowns && screen.dropdowns.length ? (
                              <div className="space-y-3">
                                {screen.dropdowns.map((d) => (
                                  <div
                                    key={d.header}
                                    className="w-full md:w-auto"
                                  >
                                    <div className="[&>div>button]:py-4 [&>div>button]:px-5">
                                      <Dropdown
                                        dropdownId={`${screen.id}:${d.header}`}
                                        header={d.header}
                                        body={d.body}
                                        onOpenChange={handleDropdownOpenChange}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ) : null}

                        {screen.id === 7 ? null : null}

                        {screen.t1 &&
                        screen.type !== 'divider' &&
                        activeSidebarSectionKey !== 'learn' ? (
                          screen.t2 ? (
                            <div className="text-center">
                              <h1 className="text-2xl md:text-4xl font-black text-slate-900">
                                {screen.t1}
                              </h1>
                              <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                            </div>
                          ) : (
                            <h1 className="text-2xl md:text-4xl font-black text-slate-900">
                              {screen.t1}
                            </h1>
                          )
                        ) : null}

                        {screen.id === 7 ? (
                          <div className="pt-2">
                            <div className="max-w-[1200px] mx-auto">
                              <header className="mb-10">
                                <h2
                                  className="text-[32px] leading-tight font-bold"
                                  style={{ color: '#1F3864' }}
                                >
                                  Three states, and why the difference matters.
                                </h2>
                                <div
                                  className="mt-6 max-w-3xl bg-[#F7F9FB] p-8 rounded-xl border-l-4"
                                  style={{ borderLeftColor: '#1F7A7A' }}
                                >
                                  <p
                                    className="text-[18px] leading-relaxed"
                                    style={{ color: '#333333' }}
                                  >
                                    {screen.body}
                                  </p>
                                </div>
                              </header>

                              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
                                <div>
                                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {(
                                      [
                                        {
                                          key: 'green' as const,
                                          title: 'State One',
                                          subtitle: 'Ready for learning',
                                          accentText: 'text-emerald-800',
                                          iconBg: 'bg-emerald-100',
                                          iconText: 'text-emerald-700',
                                          barBg: 'bg-emerald-100',
                                          icon: 'psychology',
                                        },
                                        {
                                          key: 'amber' as const,
                                          title: 'State Two',
                                          subtitle: 'Escalation imminent',
                                          accentText: 'text-amber-700',
                                          iconBg: 'bg-amber-100',
                                          iconText: 'text-amber-700',
                                          barBg: 'bg-amber-100',
                                          icon: 'warning',
                                        },
                                        {
                                          key: 'red' as const,
                                          title: 'State Three',
                                          subtitle: 'Full survival mode',
                                          accentText: 'text-rose-700',
                                          iconBg: 'bg-rose-100',
                                          iconText: 'text-rose-700',
                                          barBg: 'bg-rose-100',
                                          icon: 'emergency_home',
                                        },
                                      ] as const
                                    ).map((card) => {
                                      return (
                                        <div
                                          key={card.key}
                                          className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-[0_20px_40px_-15px_rgba(47,99,120,0.06)] transition-shadow"
                                        >
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setLearnStateModalKey(card.key)
                                            }
                                            className="w-full h-[180px] p-10 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
                                          >
                                            <div
                                              className={`w-20 h-20 rounded-full ${card.iconBg} flex items-center justify-center mb-8`}
                                            >
                                              <span
                                                className={`material-symbols-outlined text-[40px] ${card.iconText}`}
                                                style={{
                                                  fontVariationSettings:
                                                    '"FILL" 1',
                                                }}
                                              >
                                                {card.icon}
                                              </span>
                                            </div>
                                            <div
                                              className={`text-[20px] font-semibold mb-4 ${card.accentText}`}
                                            >
                                              {card.title}
                                            </div>
                                            <div
                                              className={`h-1.5 w-16 rounded-full mb-6 ${card.barBg}`}
                                            />

                                            <div className="mt-auto pt-8">
                                              <span className="material-symbols-outlined text-slate-400">
                                                expand_more
                                              </span>
                                            </div>
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {learnStateItems.brain?.body ? (
                                    <div className="mt-6">
                                      <LearnAccordionItem
                                        dropdownId={`${screen.id}:A bit more on the brain`}
                                        header="A bit more on the brain"
                                        body={learnStateItems.brain.body}
                                        open={openDropdownIds.has(
                                          `${screen.id}:A bit more on the brain`
                                        )}
                                        onToggle={handleDropdownOpenChange}
                                      />
                                    </div>
                                  ) : null}
                                </div>

                                <div
                                  className="rounded-xl overflow-hidden shadow-sm border border-[#0E606A]/10"
                                  style={{ backgroundColor: '#0E606A' }}
                                >
                                  <div className="p-8">
                                    <div className="flex items-start gap-4">
                                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-white">
                                          lightbulb
                                        </span>
                                      </div>
                                      <div>
                                        <div className="text-[18px] font-semibold text-white">
                                          Key Teaching Insight
                                        </div>
                                        <div className="mt-4 text-[14px] leading-relaxed text-white/90">
                                          {learnStateItems.keyPoint}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <LearnStateModal
                                open={learnStateModalKey === 'green'}
                                title={
                                  learnStateItems.green?.header ??
                                  'State One: Green. Calmly engaged'
                                }
                                accentColor="#37675e"
                                body={learnStateItems.green?.body ?? ''}
                                onClose={() => setLearnStateModalKey(null)}
                              />
                              <LearnStateModal
                                open={learnStateModalKey === 'amber'}
                                title={
                                  learnStateItems.amber?.header ??
                                  'State Two: Amber. Dysregulated'
                                }
                                accentColor="#ba7a1a"
                                body={learnStateItems.amber?.body ?? ''}
                                onClose={() => setLearnStateModalKey(null)}
                              />
                              <LearnStateModal
                                open={learnStateModalKey === 'red'}
                                title={
                                  learnStateItems.red?.header ??
                                  'State Three: Red. Shut down'
                                }
                                accentColor="#ba1a1a"
                                body={learnStateItems.red?.body ?? ''}
                                onClose={() => setLearnStateModalKey(null)}
                              />
                            </div>
                          </div>
                        ) : null}

                        {screen.t2 &&
                        !screen.t1 &&
                        screen.id !== 3 &&
                        screen.id !== 4 &&
                        screen.id !== 11 &&
                        screen.id !== 12 &&
                        screen.type !== 'accordion' &&
                        screen.type !== 'video' ? (
                          activeSidebarSectionKey !== 'learn' ? (
                            <div className="text-center">
                              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                                {screen.t2}
                              </h2>
                              <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                            </div>
                          ) : null
                        ) : null}

                        {screen.t3 &&
                        (typeof screen.t1 !== 'string' ||
                          screen.t1.trim().toLowerCase() !==
                            screen.t3.trim().toLowerCase()) &&
                        (typeof screen.t2 !== 'string' ||
                          screen.t2.trim().toLowerCase() !==
                            screen.t3.trim().toLowerCase()) &&
                        screen.id !== 8 &&
                        screen.id !== 9 &&
                        screen.id !== 10 &&
                        activeSidebarSectionKey !== 'learn' ? (
                          <h3 className="text-lg md:text-xl font-bold text-slate-900">
                            {screen.t3}
                          </h3>
                        ) : null}

                        {screen.lead && screen.id !== 7 ? (
                          <div className="text-base md:text-lg font-semibold text-slate-900 whitespace-pre-line">
                            {screen.lead}
                          </div>
                        ) : null}

                        {screen.body &&
                        screen.id !== 7 &&
                        screen.id !== 5 &&
                        screen.id !== 8 &&
                        screen.id !== 9 &&
                        screen.id !== 10 &&
                        screen.id !== 12 &&
                        screen.id !== 18 &&
                        screen.type !== 'accordion' ? (
                          <div
                            className={`text-sm md:text-base text-slate-700 whitespace-pre-line leading-relaxed ${
                              screen.type === 'divider' ? 'mt-4' : ''
                            }`}
                          >
                            {screen.body}
                          </div>
                        ) : null}
                      </>

                    {screen.bullets && screen.id !== 3 ? (
                      <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-slate-200 ">
                        {screen.bullets.map((b) => (
                          <li key={b} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {screen.keyPoint ? (
                      screen.id === 10 ? (
                        <div className="mt-8 w-full max-w-[784px] mx-auto">
                          <Dropdown
                            dropdownId={`${screen.id}:key-point`}
                            header="The single most important point."
                            body={screen.keyPoint}
                            onOpenChange={handleDropdownOpenChange}
                            containerClassName="rounded-xl"
                            buttonClassName="h-[64px]"
                          />
                        </div>
                      ) : screen.id === 11 ? null : (
                        <KeyPoint>{screen.keyPoint}</KeyPoint>
                      )
                    ) : null}

                    {screen.type === 'video' ? (
                      <div className="space-y-3">
                        {screen.t2 ? (
                          <div className="text-center">
                            <h2 className="text-xl  md:text-2xl font-black text-white">
                              {screen.t2}
                            </h2>
                            <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                          </div>
                        ) : null}

                        <div className="flex justify-center">
                          <div className="w-full max-w-[784px] space-y-3">
                            <VideoLessonPlayer
                              title={screen.videoTitle ?? 'Video'}
                              videoUrl={screen.videoUrl}
                              className="rounded-[18px]"
                            />
                          </div>
                        </div>

                        {screen.videoPrompt ? (
                          <div className="text-sm text-slate-200 text-center">
                            {screen.videoPrompt}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {screen.dropdowns &&
                    screen.id !== 2 &&
                    screen.id !== 5 &&
                    screen.id !== 8 &&
                    screen.id !== 9 &&
                    screen.id !== 10 &&
                    screen.id !== 18 ? (
                      <div className="space-y-3">
                        {screen.dropdowns.map((d) => (
                          <div key={d.header} className="w-full md:w-[715px]">
                            <div className="[&>div>button]:py-6 [&>div>button]:px-6">
                              <Dropdown
                                dropdownId={`${screen.id}:${d.header}`}
                                header={d.header}
                                body={d.body}
                                onOpenChange={handleDropdownOpenChange}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {screen.type === 'accordion' && screen.accordionItems ? (
                      <div className="pt-2">
                        {screen.t2 &&
                        screen.id !== 11 &&
                        screen.id !== 16 &&
                        activeSidebarSectionKey !== 'learn' ? (
                          <div className="text-center">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                              {screen.t2}
                            </h2>
                            <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                          </div>
                        ) : null}

                        {screen.body && screen.id !== 16 ? (
                          <div className="text-sm md:text-base text-slate-600 text-center whitespace-pre-line leading-relaxed max-w-[720px] mx-auto">
                            {screen.body}
                          </div>
                        ) : null}

                        {screen.id === 11 ? (
                          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            <div className="lg:col-span-8 flex flex-col gap-4">
                              {screen.accordionItems.map((item) => {
                                const dropdownId = `${screen.id}:${item.header}`;
                                return (
                                  <LearnAccordionItem
                                    key={item.header}
                                    dropdownId={dropdownId}
                                    header={item.header}
                                    body={item.body}
                                    open={openDropdownIds.has(dropdownId)}
                                    onToggle={handleDropdownOpenChange}
                                  />
                                );
                              })}
                            </div>

                            <aside className="lg:col-span-4">
                              <div className="lg:sticky lg:top-6 p-8 bg-[#1F7A7A] rounded-xl text-white shadow-[0_20px_40px_-15px_rgba(47,99,120,0.18)] flex flex-col gap-6">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                  <span className="material-symbols-outlined text-white">
                                    lightbulb
                                  </span>
                                </div>
                                <h4 className="text-[20px] font-semibold">
                                  Key Teaching Insight
                                </h4>
                                {screen.keyPoint ? (
                                  <div className="text-[15px] opacity-90 leading-relaxed whitespace-pre-line">
                                    {screen.keyPoint}
                                  </div>
                                ) : null}
                              </div>
                            </aside>
                          </div>
                        ) : (
                          <div className="mt-8 space-y-4 max-w-[920px] mx-auto">
                            {screen.accordionItems.map((item) => (
                              <Dropdown
                                key={item.header}
                                dropdownId={`${screen.id}:${item.header}`}
                                header={item.header}
                                body={item.body}
                                onOpenChange={handleDropdownOpenChange}
                                containerClassName="rounded-xl"
                                buttonClassName="h-[64px]"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : null}

                    {screen.type === 'scenario_situation' &&
                    screen.scenarioId ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                            {SCENARIOS[screen.scenarioId].title}
                          </h2>
                          <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                        </div>

                        <div className="flex justify-center">
                          <div className="w-full max-w-[784px] rounded-2xl overflow-hidden border border-slate-200 bg-white">
                            <img
                              src={SCENARIO_IMAGES[screen.scenarioId]}
                              alt="Scenario"
                              className="w-full h-[240px] md:h-[320px] object-cover"
                            />
                          </div>
                        </div>

                        <div className="w-full max-w-[784px] mx-auto">
                          <div className="text-sm md:text-base text-slate-700 whitespace-pre-line leading-relaxed">
                            {SCENARIOS[screen.scenarioId].situation}
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {screen.type === 'scenario_choose' && screen.scenarioId
                      ? (() => {
                          const scenarioId = screen.scenarioId;
                          const scenario = SCENARIOS[scenarioId];
                          const selected = scenarioAnswers[scenarioId] ?? null;
                          return (
                            <div className="space-y-6">
                              <div className="w-full max-w-[784px] mb-6 md:mb-8">
                                <h3 className="text-2xl md:text-[32px] md:leading-[38.4px] font-bold text-slate-900">
                                  {scenario.question}
                                </h3>
                              </div>

                              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[986px] mx-auto">
                                {(
                                  Object.keys(
                                    scenario.options
                                  ) as ScenarioOptionKey[]
                                ).map((k) => {
                                  const selected =
                                    scenarioAnswers[scenarioId] === k;
                                  return (
                                    <button
                                      key={k}
                                      type="button"
                                      onClick={() =>
                                        setScenarioAnswers((prev) => ({
                                          ...prev,
                                          [scenarioId]: k,
                                        }))
                                      }
                                      className={`text-left rounded-lg border px-[18px] py-[18px] md:px-[22px] md:py-[22px] transition-colors ${
                                        selected
                                          ? 'bg-slate-50 border-[#4F46E5] shadow-[0_0_0_1px_rgba(79,70,229,0.25)]'
                                          : 'bg-white border-slate-200 hover:bg-slate-50'
                                      }`}
                                    >
                                      <div className="flex items-start gap-5">
                                        <div className="w-10 h-10 rounded-[12px] border-2 border-slate-300 flex items-center justify-center text-slate-700 font-bold shrink-0 bg-white">
                                          {k}
                                        </div>
                                        <div className="text-sm md:text-base text-slate-700 leading-relaxed">
                                          {scenario.options[k]}
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>

                              <div className="flex flex-col items-center gap-4 pt-2">
                                <button
                                  type="button"
                                  disabled={!selected}
                                  onClick={() =>
                                    setIsScenarioFeedbackOpen(true)
                                  }
                                  className={`px-10 py-4 rounded-full font-semibold shadow-2xl transition-all flex items-center gap-3 ${
                                    selected
                                      ? 'bg-gradient-to-r from-[#60A5FA] to-[#9333EA] text-white hover:scale-105 active:scale-95'
                                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
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

                              {isScenarioFeedbackOpen && selected ? (
                                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                                  <button
                                    type="button"
                                    aria-label="Close feedback"
                                    onClick={() =>
                                      setIsScenarioFeedbackOpen(false)
                                    }
                                    className="absolute inset-0 bg-black/30"
                                  />

                                  <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-[0_30px_120px_rgba(15,23,42,0.18)] animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="min-w-0">
                                        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-semibold mb-2">
                                          Feedback
                                        </div>
                                        <div className="text-sm font-bold text-slate-900">
                                          Option {selected}
                                        </div>
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          setIsScenarioFeedbackOpen(false)
                                        }
                                        className="p-2 rounded-full text-slate-500 hover:text-slate-900 transition-colors"
                                        aria-label="Close feedback"
                                      >
                                        <span className="material-symbols-outlined">
                                          close
                                        </span>
                                      </button>
                                    </div>

                                    <div className="mt-4 max-h-[60vh] overflow-y-auto custom-scrollbar text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                                      {scenario.feedback[selected]}
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        })()
                      : null}

                    {screen.type === 'scenario_feedback' && screen.scenarioId
                      ? (() => {
                          const scenarioId = screen.scenarioId;
                          const scenario = SCENARIOS[scenarioId];
                          return (
                            <div className="space-y-6">
                              <div className="w-full max-w-[920px] mx-auto">
                                <h3 className="text-2xl md:text-[32px] md:leading-[38.4px] font-bold text-slate-900">
                                  Feedback
                                </h3>
                              </div>

                              <div className="space-y-3 w-full max-w-[920px] mx-auto">
                                {(
                                  Object.keys(
                                    scenario.feedback
                                  ) as ScenarioOptionKey[]
                                ).map((k) => {
                                  const selected =
                                    scenarioAnswers[scenarioId] === k;
                                  return (
                                    <div
                                      key={k}
                                      className={`rounded-2xl border p-5 whitespace-pre-line ${
                                        selected
                                          ? 'border-emerald-400/30 bg-emerald-500/10'
                                          : 'border-slate-200 bg-white'
                                      }`}
                                    >
                                      <div className="text-sm text-slate-700 leading-relaxed">
                                        {scenario.feedback[k]}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>

                              <KeyPoint>{scenario.point}</KeyPoint>
                            </div>
                          );
                        })()
                      : null}

                    {screen.type === 'takeaway' ? (
                      <div className="space-y-4">
                        <div className="relative rounded-2xl mt-8 overflow-hidden border border-white/10">
                          <div className="absolute inset-0">
                            <img
                              src={structureTakeawayImage}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/85 to-[#020617]/60" />
                          </div>

                          <div className="relative z-10 p-4 md:p-5">
                            <div className="glass-panel p-5 rounded-2xl border border-white/10   max-w-[920px]">
                              <div className="text-left">
                                <div className="text-[10px] text-[#60A5FA] px-2 py-1 bg-white/5 rounded-full inline-block mb-3 uppercase tracking-widest font-semibold">
                                  Mind Sync Pocket
                                </div>
                                <h4 className="text-xl md:text-2xl font-bold text-white whitespace-pre-line">
                                  {screen.takeawayHeading}
                                </h4>
                              </div>

                              <div className="mt-4 text-xs md:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap md:columns-2 md:gap-8">
                                {(() => {
                                  if (!screen.takeawayBody) return null;
                                  if (
                                    !screen.takeawayBody.includes(
                                      TAKEAWAY_HIGHLIGHT_TEXT
                                    )
                                  ) {
                                    return screen.takeawayBody;
                                  }

                                  const parts = screen.takeawayBody.split(
                                    TAKEAWAY_HIGHLIGHT_TEXT
                                  );

                                  return (
                                    <>
                                      {parts[0]}
                                      <span className="inline-block bg-white/10 border border-white/10 rounded-xl px-3 py-2">
                                        {TAKEAWAY_HIGHLIGHT_TEXT}
                                      </span>
                                      {parts[1] ?? null}
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {screen.type === 'closing' ? (
                      <div className="pt-4">
                        <div className="w-full max-w-[1100px] mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-[#24104A]/85 via-[#140A2A]/90 to-[#05020D]/90 px-7 md:px-10 py-8 md:py-10 text-white/90 overflow-hidden relative">
                          <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-fuchsia-500/10 blur-[120px] rounded-full" />
                          <div className="absolute -bottom-32 -right-32 w-[520px] h-[520px] bg-indigo-500/10 blur-[120px] rounded-full" />

                          <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                              Great job. You've finished
                              <br />
                              Module 1.
                            </h2>

                            <div className="mt-5 max-w-[820px] text-sm md:text-base text-white/70 leading-relaxed whitespace-pre-line">
                              {screen.closingBody}
                            </div>

                            <div className="mt-8">
                              <Link
                                to="/dashboard/my-learning/mind-sync/module-2"
                                className="inline-flex items-center justify-center gap-3 rounded-xl px-8 py-3.5 text-sm md:text-base font-semibold text-[#0B1020] bg-[#B9C7FF] hover:bg-[#C7D2FE] transition-colors"
                              >
                                <span>Start Module 2</span>
                                <span className="material-symbols-outlined">
                                  arrow_forward
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </section>
            </div>

            

            <div className="sticky bottom-0 mt-auto pt-4 pb-2 border-t border-slate-200 bg-white/90 backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  disabled={prevVisibleIndex === null}
                  onClick={() => {
                    if (prevVisibleIndex === null) return;
                    setIndex(prevVisibleIndex);
                  }}
                  className={`flex items-center gap-2 h-12 px-5 rounded-full text-sm font-semibold border transition-colors ${
                    prevVisibleIndex === null
                      ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  disabled={!canGoNext || nextVisibleIndex === null}
                  onClick={() => {
                    if (screen.id === 29) {
                      navigate('/dashboard/my-learning/mind-sync');
                      return;
                    }

                    if (nextVisibleIndex === null) return;
                    setIndex(nextVisibleIndex);
                  }}
                  className={`flex items-center gap-2 h-12 px-6 rounded-full text-sm font-semibold border border-transparent transition-colors ${
                    canGoNext && nextVisibleIndex !== null
                      ? 'bg-gradient-to-r from-[#60A5FA] to-[#9333EA] text-white hover:shadow-indigo-500/20'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{nextLabel}</span>
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="relative w-1/4 h-full border-l border-slate-200 bg-white flex flex-col shrink-0 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">
              Module Contents
            </h2>
            <p className="text-xs text-slate-400">{toc.length} blocks</p>
          </div>
          <div
            ref={sidebarScrollRef}
            className="flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-white"
          >
            {sidebarSections.map((section) => {
              const isOpen = openSections[section.key];
              const isActiveSection = section.key === activeSidebarSectionKey;
              const isCollapsible =
                section.key !== 'closing' && section.key !== 'watch';
              const visibleIndices = section.indices.filter((i) => {
                const item = toc[i];
                if (!item) return false;
                if (
                  item.blockId === 8 ||
                  item.blockId === 9 ||
                  item.blockId === 10 ||
                  item.blockId === 20 ||
                  item.blockId === 23 ||
                  item.blockId === 26
                )
                  return false;
                return true;
              });

              const isQuestionBlock = [20, 23, 26].includes(screen.id);
              const isSectionActive =
                isActiveSection ||
                (section.key === 'practise' && isQuestionBlock);

              const canCollapse = isCollapsible && visibleIndices.length > 1;
              const shouldShowItems = canCollapse && isOpen;
              return (
                <div key={section.key} className="border-b border-slate-200">
                  {canCollapse ? (
                    <button
                      type="button"
                      onClick={() => toggleSection(section.key)}
                      data-sidebar-section-header="true"
                      data-section-key={section.key}
                      aria-expanded={isOpen}
                      className={`w-full text-left px-4 py-4 flex items-center justify-between gap-3 transition-colors relative ${
                        isSectionActive
                          ? 'bg-[#bdd2f8]'
                          : isOpen
                            ? 'bg-[#EEF4FF]'
                            : 'hover:bg-slate-50'
                      }`}
                    >
                      {isSectionActive ? (
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2E7CF6]/60 to-transparent" />
                      ) : null}
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-xs font-bold uppercase tracking-widest truncate ${
                            isActiveSection || isOpen
                              ? 'text-[#1F3864]'
                              : 'text-slate-700'
                          }`}
                        >
                          {section.label}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {visibleIndices.length} blocks
                        </div>
                      </div>
                      <span
                        className={`material-symbols-outlined text-slate-500 transition-transform shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        expand_more
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const targetIndex = section.indices[0];
                        if (typeof targetIndex !== 'number') return;
                        if (targetIndex !== index)
                          suppressAutoOpenRef.current = true;
                        setIndex(targetIndex);
                      }}
                      data-sidebar-section-header="true"
                      data-section-key={section.key}
                      className={`w-full text-left px-4 py-4 flex items-center justify-between gap-3 transition-colors relative ${
                        isSectionActive
                          ? 'bg-[#bdd2f8]'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      {isSectionActive ? (
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2E7CF6]/60 to-transparent" />
                      ) : null}
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-xs font-bold uppercase tracking-widest truncate ${
                            isActiveSection
                              ? 'text-[#1F3864]'
                              : 'text-slate-700'
                          }`}
                        >
                          {section.label}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {visibleIndices.length} blocks
                        </div>
                      </div>
                    </button>
                  )}

                  {shouldShowItems ? (
                    <div>
                      {visibleIndices.map((i) => {
                        const item = toc[i];
                        if (!item) return null;
                        const questionToScenarioMap: Record<number, number> = {
                          20: 19,
                          23: 22,
                          26: 25,
                        };
                        const isCurrent =
                          item.index === index ||
                          questionToScenarioMap[screen.id] === item.blockId;
                        const isLanding =
                          section.landingBlockId === item.blockId;
                        return (
                          <button
                            key={`${item.blockId}-${item.index}`}
                            type="button"
                            onClick={() => setIndex(item.index)}
                            data-sidebar-item="true"
                            data-toc-index={item.index}
                            className={`w-full text-left px-4 py-3 border-t flex items-start gap-3 transition-colors cursor-pointer ${
                              isCurrent
                                ? 'border-slate-200 bg-slate-50'
                                : 'border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              {isCurrent ? (
                                <div className="w-6 h-6 rounded-full border border-[#2E7CF6] flex items-center justify-center">
                                  <div className="w-2 h-2 bg-[#2E7CF6] rounded-full animate-pulse" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full border border-slate-300" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-xs truncate ${
                                  isCurrent
                                    ? 'font-bold text-slate-900'
                                    : 'font-medium text-slate-700'
                                }`}
                              >
                                {item.label}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {isLanding
                                  ? 'Section overview'
                                  : `Block ${item.blockId}`}
                              </p>
                            </div>
                          </button>
                        );
                      })}

                      {section.key === 'watch' &&
                      screen.type === 'video' &&
                      screen.transcriptDropdown ? (
                        <div className="p-4 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => setIsSidebarTranscriptOpen(true)}
                            className="w-full h-[56px] rounded-xl border border-white/10 bg-[#1A1A33]/60 hover:bg-[#1A1A33]/75 transition-colors flex items-center gap-3 px-4 text-left"
                          >
                            <span className="material-symbols-outlined text-[#818CF8]">
                              menu_book
                            </span>
                            <span className="text-sm font-medium text-white/85 truncate">
                              {screen.transcriptDropdown.header}
                            </span>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {isSidebarTranscriptOpen &&
          screen.type === 'video' &&
          screen.transcriptDropdown ? (
            <div className="absolute inset-0 z-20">
              <button
                type="button"
                aria-label="Close transcript"
                onClick={() => setIsSidebarTranscriptOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <div className="absolute inset-3 glass-panel rounded-2xl border border-white/10 bg-[#020617]/90 backdrop-blur p-4 shadow-[0_30px_120px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                      Transcript
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white truncate">
                      {screen.transcriptDropdown.header}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSidebarTranscriptOpen(false)}
                    className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors flex items-center justify-center shrink-0"
                  >
                    <span className="material-symbols-outlined text-white/80">
                      close
                    </span>
                  </button>
                </div>

                <div className="mt-4 flex-1 min-h-0 overflow-y-auto custom-scrollbar text-sm text-slate-200 whitespace-pre-line leading-relaxed pr-1">
                  {screen.transcriptDropdown.body}
                </div>
              </div>
            </div>
          ) : null}
        </aside>
      </main>
    </div>
  );
}
