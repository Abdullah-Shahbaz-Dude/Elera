import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import VideoLessonPlayer from '../components/VideoLessonPlayer';
import image from '../../assets/images/mindsync/2.jpg';
import structureWatchImage from '../../assets/images/mindsync/5.jpg';
import structureLearnImage from '../../assets/images/mindsync/6.jpg';
import structurePracticeImage from '../../assets/images/mindsync/Untitled design.jpg';
import structureTakeawayImage from '../../assets/images/mindsync/7.jpg';
import learnHeroImage from '../../assets/images/mindsync/shutterstock_2757853493 (1).jpg';

type ScreenType =
  | 'cover'
  | 'text'
  | 'bullets'
  | 'divider'
  | 'video'
  | 'accordion'
  | 'key'
  | 'scenario_situation'
  | 'scenario_choose'
  | 'scenario_feedback'
  | 'takeaway'
  | 'closing';

type DropdownItem = {
  header: string;
  body: string;
};

type DropdownProps = DropdownItem & {
  dropdownId: string;
  onOpenChange?: (dropdownId: string, open: boolean) => void;
  containerClassName?: string;
  buttonClassName?: string;
  bodyClassName?: string;
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
};

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

function ScriptDropdown({
  header,
  body,
  dropdownId,
  onOpenChange,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
      <button
        type="button"
        onClick={() => {
          setOpen((v) => {
            const next = !v;
            onOpenChange?.(dropdownId, next);
            return next;
          });
        }}
        className="w-full h-[56px] flex items-center justify-between gap-4 px-4 bg-[#1A1A33]/60 hover:bg-[#1A1A33]/75 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="material-symbols-outlined text-[#818CF8]">
            menu_book
          </span>
          <div className="text-sm font-medium text-white/85 truncate">
            {header}
          </div>
        </div>
        <span
          className={`material-symbols-outlined text-[#818CF8] transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 text-sm text-slate-200 whitespace-pre-line">
          {body}
        </div>
      </div>
    </div>
  );
}

function Dropdown({
  header,
  body,
  dropdownId,
  onOpenChange,
  containerClassName,
  buttonClassName,
  bodyClassName,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border md:w-auto border-white/10 rounded-lg overflow-hidden ${
        containerClassName ?? ''
      }`}
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
        className={`w-full h-[70px] flex items-center justify-between gap-4 px-[25px] bg-[#1A1A33] hover:bg-[#1A1A33]/90 transition-colors text-left ${
          buttonClassName ?? ''
        }`}
      >
        <div className="text-sm font-medium text-[#CBD5E1]">{header}</div>
        <span
          className={`material-symbols-outlined text-[#818CF8] transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        >
          expand_more
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        } ${bodyClassName ?? ''}`}
      >
        <div className="px-[25px] py-4 text-sm text-slate-200 whitespace-pre-line">
          {body}
        </div>
      </div>
    </div>
  );
}

function KeyPoint({ children }: { children: string }) {
  return (
    <div className="rounded-2xl border border-amber-400/25 bg-amber-500/10 px-5 py-4 text-slate-100 whitespace-pre-line">
      {children}
    </div>
  );
}

export default function MindSyncTeacherTrainingModule01Page() {
  const screens: Screen[] = useMemo(
    () => [
      {
        id: 1,
        type: 'cover',
        t1: 'The Three Second Pause',
        t2: 'Reading behaviour in the moment',
        body: 'How to tell the difference between distress, defiance and overwhelm.\nAnd what to do in the three seconds before you respond.',
      },
      {
        id: 2,
        type: 'text',
        t2: 'About this module',
        lead: 'Most teachers have read a pupil’s behaviour as defiance and only later realised it was distress.',
        body: 'This module is about the three seconds before you respond. Same pupil, same behaviour, a different read, a completely different outcome.',
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
        t2: 'By the end of this module you will',
        bullets: [
          'Spot the three patterns staff most often misread: distress as defiance, overwhelm as rudeness, stimming as off task.',
          'Understand what is happening inside a dysregulated pupil, and why pushing harder makes it worse.',
          'Use the three second pause in real time.',
          'Give consequences in a way that lands rather than escalates.',
        ],
      },
      {
        id: 4,
        type: 'bullets',
        t2: 'How this module works',
        body: 'Four short parts:',
        bullets: [
          'Watch. A two minute video from a real classroom.',
          'Learn. The brain science and the technique.',
          'Practise. Three classroom scenarios with feedback.',
          'Take away. A one page card for your lanyard or noticeboard.',
        ],
      },
      {
        id: 5,
        type: 'divider',
        t1: 'Part 1. Watch',
        body: 'A short video. You will recognise the moment. Watch the difference between what the teacher sees and what is actually happening for the pupil.',
        dropdowns: [
          {
            header: 'What to look for',
            body: 'The same behaviour can come from very different brain states, and how to tell which is which.\n\nThe three second pause in action, in a real classroom, with a teacher who is not perfect but catches herself just in time.\n\nThe signs that you are about to respond to defiance that is really distress.',
          },
        ],
      },
      {
        id: 6,
        type: 'video',
        t2: 'The three second pause, in a real classroom',
        videoTitle: 'Module 1 film, around 2 minutes',
        videoUrl: null,
        videoPrompt:
          'Watch Ms Patel and Daniel. Keep your eye on the second where she pauses.',
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
        body: 'A quick reference. Tap each state to see what you might see, what is happening underneath, and what helps in the moment.',
        accordionTitle: 'The three states, side by side',
        accordionItems: [
          {
            header: 'Green, calmly engaged',
            body: 'What you see: on task, following instructions, productive movement, can wait for help.\n\nUnderneath: the thinking brain is in charge. Capacity to learn and choose.\n\nWhat helps: teach, stretch, push gently. High expectations land best here.',
          },
          {
            header: 'Amber, dysregulated',
            body: 'What you see: fidgety, restless, off task, short or muttered replies, slower to follow. May look cheeky or low level disruptive.\n\nUnderneath: the thinking brain is partly offline, the alarm is firing low. Energy is going on staying in the room, less is left for learning.\n\nWhat helps: co regulate first. Lower your voice. Reduce demands briefly. Offer a choice. Buy ninety seconds. Most come back within two minutes if you do not push.',
          },
          {
            header: 'Red, shut down',
            body: 'What you see: frozen, silent, head down. May refuse to move, may walk out, may lash out with words that are not their usual voice.\n\nUnderneath: the thinking brain is offline, the alarm is in charge. Words do not process as you expect.\n\nWhat helps: reduce demands to almost zero. Quiet voice. Side on, not face on. Offer space, not solutions. Do not negotiate. Give the brain time to come back online.',
          },
        ],
      },
      {
        id: 12,
        type: 'text',
        t2: 'The technique. The three second pause',
        body: 'It is not complicated. You make a small gap between the pupil’s behaviour and your response, and into that gap you fit one simple check. It works in three steps.',
      },
      {
        id: 13,
        type: 'text',
        t3: 'Step 1. Notice the rise in yourself',
        body: 'Your jaw tightens. Your chest feels hot. The feeling that you have been undermined, especially with others watching. That rise is information about you, not about the pupil. Notice it. Do not act on it yet.',
        dropdowns: [
          {
            header: 'Why this is the hard step',
            body: 'The rise feels like clarity. It is not. Catching it, and not acting on it, is the actual work of this technique.',
          },
        ],
      },
      {
        id: 14,
        type: 'text',
        t3: 'Step 2. Ask one quiet question',
        body: 'Inside your head: is this pupil in green, amber or red? Two seconds of looking usually tells you. Aloud if you need to: “Quick check in. Are you with me, or somewhere else right now?” It works because it does not accuse or demand. It opens a door.',
      },
      {
        id: 15,
        type: 'key',
        t3: 'Step 3. Match your response to the state, not the behaviour',
        bullets: [
          'Green, and they chose not to comply: the calm, firm, named behaviour conversation.',
          'Amber: lower the demand briefly, slow your voice, offer a small choice. Most return to green within two minutes.',
          'Red: reduce demands to almost zero. Offer space, not solutions. The conversation comes later.',
        ],
        keyPoint:
          'The honest part. You will not manage this every time. The goal is not perfection. It is catching the rise more often than you used to. Within a couple of months, the pupils who used to escalate start to settle.',
      },
      {
        id: 16,
        type: 'accordion',
        t2: 'What not to do, in the moment',
        body: 'Five moves that look reasonable under pressure but tend to escalate a dysregulated pupil. Tap each one.',
        accordionTitle: 'What not to do, in the moment',
        accordionItems: [
          {
            header: 'Do not raise your voice to match theirs',
            body: 'The calmer you sound, the more likely they are to come down.',
          },
          {
            header: 'Do not demand eye contact',
            body: 'For many neurodivergent pupils it costs cognitive load they do not have. Eye contact is not the test of respect.',
          },
          {
            header: 'Do not stack instructions on a dysregulated pupil',
            body: 'Working memory is reduced. One instruction at a time, with a pause after each, lands.',
          },
          {
            header: 'Do not give a public consequence to a dysregulated pupil',
            body: 'It almost always escalates. Deliver it quietly later, when the pupil is back in green. That is when it teaches.',
          },
          {
            header: 'Do not read stimming as off task behaviour',
            body: 'Tapping, rocking, fiddling are usually self regulation. Asking them to stop removes what is keeping them engaged.',
          },
        ],
      },
      {
        id: 17,
        type: 'text',
        body: 'Evidence base. The three state model used here is consistent with research by Mullally and colleagues at Newcastle University on school distress, and with the Neurodivergence Task and Finish Group report, which finds that behaviour, including stimming, is too often read as defiance when it is in fact communication of overwhelm or distress.',
      },
      {
        id: 18,
        type: 'divider',
        t1: 'Part 3. Practise',
        body: 'Three scenarios you will recognise. Read the situation, choose what you would do, then compare with the feedback. No trick questions. Some answers feel reasonable but quietly make things worse.',
        dropdowns: [
          {
            header: 'How to get the most from this',
            body: 'Take them slowly. The goal is not to score highly. It is to notice your own instinct, and where it might benefit from a small shift.',
          },
        ],
      },
      { id: 19, type: 'scenario_situation', scenarioId: 1 },
      { id: 20, type: 'scenario_choose', scenarioId: 1 },
      { id: 21, type: 'scenario_feedback', scenarioId: 1 },
      { id: 22, type: 'scenario_situation', scenarioId: 2 },
      { id: 23, type: 'scenario_choose', scenarioId: 2 },
      { id: 24, type: 'scenario_feedback', scenarioId: 2 },
      { id: 25, type: 'scenario_situation', scenarioId: 3 },
      { id: 26, type: 'scenario_choose', scenarioId: 3 },
      { id: 27, type: 'scenario_feedback', scenarioId: 3 },
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
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [openDropdownIds, setOpenDropdownIds] = useState<Set<string>>(
    () => new Set()
  );
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [scenarioAnswers, setScenarioAnswers] = useState<
    Partial<Record<1 | 2 | 3, ScenarioOptionKey>>
  >({});

  const [openSections, setOpenSections] = useState<
    Record<SidebarSectionKey, boolean>
  >({
    introduction: true,
    watch: true,
    learn: true,
    practise: true,
    takeaway: true,
    closing: true,
  });

  const [isSidebarTranscriptOpen, setIsSidebarTranscriptOpen] = useState(false);

  const toc = useMemo(() => {
    return screens.map((s, i) => {
      const label =
        s.type === 'cover' ? 'Cover' : s.t1 || s.t2 || s.t3 || `Block ${s.id}`;
      return {
        index: i,
        label,
        blockId: s.id,
      };
    });
  }, [screens]);

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
      { key: 'introduction', label: 'Introduction', indices: range(1, 4) },
      { key: 'watch', label: 'Watch', indices: range(5, 6) },
      { key: 'learn', label: 'Learn', indices: range(7, 17) },
      { key: 'practise', label: 'Practise', indices: range(18, 27) },
      { key: 'takeaway', label: 'Take away', indices: range(28, 28) },
      { key: 'closing', label: 'Closing', indices: range(29, 29) },
    ];
  }, [toc]);

  const activeSidebarSectionKey = useMemo((): SidebarSectionKey | null => {
    const section = sidebarSections.find((s) => s.indices.includes(index));
    return section?.key ?? null;
  }, [index, sidebarSections]);

  useEffect(() => {
    if (!activeSidebarSectionKey) return;
    setOpenSections({
      introduction: activeSidebarSectionKey === 'introduction',
      watch: activeSidebarSectionKey === 'watch',
      learn: activeSidebarSectionKey === 'learn',
      practise: activeSidebarSectionKey === 'practise',
      takeaway: activeSidebarSectionKey === 'takeaway',
      closing: activeSidebarSectionKey === 'closing',
    });
  }, [activeSidebarSectionKey]);

  const screen = screens[Math.min(screens.length - 1, Math.max(0, index))];

  useEffect(() => {
    setOpenDropdownIds(new Set());
  }, [index]);

  const handleDropdownOpenChange = (dropdownId: string, open: boolean) => {
    setOpenDropdownIds((prev) => {
      const next = new Set(prev);
      if (open) next.add(dropdownId);
      else next.delete(dropdownId);
      return next;
    });

    if (screen.type === 'accordion') return;

    const el = scrollAreaRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      if (open) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    });
  };

  const isAnyDropdownOpen = openDropdownIds.size > 0;

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
    <div className="flex flex-col min-h-screen bg-[#030713] text-white">
      <header className="relative shrink-0 h-[238px] flex flex-col justify-end px-8 pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt="Mind Sync"
            className="w-full h-full object-cover object-[center_7%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060E20] via-[#060E20]/40 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 hero-gradient opacity-50" />
        </div>

        <div className="absolute top-4 left-8 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            Mind Sync - Teacher Training
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

        <div className="absolute top-4 right-8 text-right">
          <span className="text-xs text-white/70 font-medium">
            Block {screen.id}
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mt-6">
          <h1 className="text-2xl md:text-3xl font-black text-white mb-1 leading-tight tracking-tight">
            MODULE 1 – THE THREE SECOND PAUSE
          </h1>
          <h2 className="text-sm md:text-base text-white/90 font-semibold mb-2">
            Reading behaviour in the moment
          </h2>
          <p className="text-sm md:text-base text-white/80 max-w-2xl font-light leading-relaxed whitespace-pre-line">
            Screen {index + 1} of {screens.length}
          </p>
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
              className={`flex-1 min-h-0 custom-scrollbar pb-24 ${'overflow-y-auto scroll-smooth'}`}
            >
              <section className="space-y-4">
                {screen.type === 'cover' ? (
                  <div className="p-6 md:p-6 card-glow">
                    <div className="mb-6">
                      <Tag> Introduction</Tag>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                      <div className="space-y-6">
                        <div className="text-2xl md:text-3xl leading-snug font-medium text-white/70 whitespace-pre-line max-w-[560px]">
                          {screen.body}
                        </div>
                      </div>

                      <div className="flex justify-center md:justify-end">
                        <div className="w-full max-w-[420px] md:w-[420px] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
                          <img
                            src={image}
                            alt="Module visual"
                            className="w-full h-[280px] md:h-[320px] object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 md:p-6 md:px-14 card-glow flex flex-col min-h-0 ">
                    {screen.id === 2 ? (
                      <div className="flex-1 flex flex-col gap-4 min-h-0">
                        <div className="flex items-center justify-between gap-3">
                          <Tag>Introduction</Tag>
                        </div>

                        <div className="text-center">
                          <h2 className="text-xl md:text-2xl font-black text-white -mt-12 mb-2">
                            {screen.t2}
                          </h2>
                          <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                        </div>

                        {screen.lead ? (
                          <div className="w-full md:w-auto">
                            <div className="text-base md:text-xl leading-relaxed font-medium text-white/80 whitespace-pre-line mb-6">
                              {screen.lead}
                            </div>
                          </div>
                        ) : null}

                        <div className="flex justify-center">
                          <div className="w-full max-w-[461px] md:w-[451px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                            <img
                              src={image}
                              alt="About this module"
                              className="w-full h-[200px] md:h-[260px] object-cover"
                            />
                          </div>
                        </div>

                        {screen.body ? (
                          <div className="w-full md:w-[1000px] ">
                            <div className="text-sm md:text-lg text-slate-200 whitespace-pre-line leading-relaxed">
                              {screen.body}
                            </div>
                          </div>
                        ) : null}

                        {screen.dropdowns && screen.dropdowns.length ? (
                          <div className="space-y-3">
                            {screen.dropdowns.map((d) => (
                              <div key={d.header} className="w-full md:w-auto">
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
                    ) : (
                      <>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 flex-wrap" />
                        </div>

                        {screen.id === 8 ||
                        screen.id === 9 ||
                        screen.id === 10 ||
                        screen.id === 13 ? (
                          <div className="flex-1 flex flex-col gap-6 min-h-0">
                            <div className="text-center">
                              {screen.t3 ? (
                                <h3 className="text-lg md:text-xl font-bold text-white">
                                  {screen.t3}
                                </h3>
                              ) : null}
                              <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                            </div>

                            {screen.body ? (
                              <div className="w-full max-w-[784px] mx-auto">
                                <div className="text-sm md:text-base text-slate-200 whitespace-pre-line leading-relaxed text-center md:text-left">
                                  {screen.body}
                                </div>
                              </div>
                            ) : null}

                            {screen.id !== 10 ? (
                              <div className="flex justify-center">
                                <div className="w-full max-w-[520px] md:w-[520px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                                  <img
                                    src={
                                      screen.id === 13
                                        ? learnHeroImage
                                        : structureLearnImage
                                    }
                                    alt={screen.id === 13 ? 'Step 1' : 'Learn'}
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

                        {screen.id === 3 ? (
                          <div className="space-y-3">
                            <Tag>Introduction</Tag>
                            {screen.t2 ? (
                              <h2 className="text-2xl md:text-[32px] md:leading-[38.4px] font-bold text-[#DADFFB]">
                                {screen.t2}
                              </h2>
                            ) : null}
                          </div>
                        ) : null}

                        {screen.id === 4 ? (
                          <div className="w-full md:w-[784px] md:mx-auto space-y-8">
                            <div className="text-center">
                              {screen.t2 ? (
                                <h2 className="text-2xl md:text-3xl font-black text-white">
                                  {screen.t2}
                                </h2>
                              ) : null}
                              <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                            </div>

                            <div className="text-2xl font-semibold text-white">
                              Four short parts:
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 md:gap-[37px]">
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
                                  className="relative w-full md:w-[300px] h-[205px] rounded-lg border border-white/10 bg-white/[0.09] overflow-hidden flex flex-col items-center justify-center text-center"
                                >
                                  <div className="absolute inset-0 opacity-[0.35]">
                                    <img
                                      alt=""
                                      src={item.bg}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/10" />

                                  <span className="material-symbols-outlined text-[#ADC6FF] text-[28px]">
                                    {item.icon}
                                  </span>
                                  <div className="mt-3 text-sm font-semibold text-white">
                                    {item.title}
                                  </div>
                                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                                    {item.subtitle}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : null}

                        {screen.type === 'divider' && screen.t1 ? (
                          screen.id === 18 ? (
                            <div className="flex flex-col gap-6">
                              <div className="text-center">
                                <h1 className="text-2xl md:text-4xl font-black text-white">
                                  {screen.t1}
                                </h1>
                                <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                              </div>

                              {screen.body ? (
                                <div className="w-full max-w-[784px] mx-auto">
                                  <div className="text-sm md:text-base text-slate-200 whitespace-pre-line leading-relaxed text-center md:text-left">
                                    {screen.body}
                                  </div>
                                </div>
                              ) : null}

                              <div className="flex justify-center">
                                <div className="w-full max-w-[520px] md:w-[520px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
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
                            <div className="text-left">
                              <h1 className="text-2xl md:text-4xl font-black text-white">
                                {screen.t1}
                              </h1>
                              <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                            </div>
                          ) : screen.id === 7 ? (
                            <div className="text-left">
                              <h1 className="text-xl md:text-2xl font-black text-white">
                                {screen.t1}
                              </h1>
                              <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                            </div>
                          ) : (
                            <div className="text-center">
                              <h1 className="text-2xl md:text-4xl font-black text-white">
                                {screen.t1}
                              </h1>
                              <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                            </div>
                          )
                        ) : null}

                        {screen.id === 5 ? (
                          <div className="pt-6 space-y-6">
                            {screen.body ? (
                              <div className="w-full md:w-auto">
                                <div className="text-base md:text-xl leading-relaxed font-medium text-white/80 whitespace-pre-line">
                                  {screen.body}
                                </div>
                              </div>
                            ) : null}

                            <div className="flex justify-center">
                              <div className="w-full max-w-[461px] md:w-[451px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                                <img
                                  src={structureWatchImage}
                                  alt="Watch"
                                  className="w-full h-[200px] md:h-[260px] object-cover"
                                />
                              </div>
                            </div>

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

                        {screen.id === 7 ? (
                          <div className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                              <div className="space-y-6">
                                {screen.lead ? (
                                  <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                                    {screen.lead}
                                  </h2>
                                ) : null}
                                {screen.body ? (
                                  <div className="text-lg md:text-xl text-white/70 whitespace-pre-line leading-relaxed">
                                    {screen.body}
                                  </div>
                                ) : null}
                              </div>

                              <div className="flex justify-center md:justify-end">
                                <div className="w-full max-w-[420px] md:w-[420px] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
                                  <img
                                    src={learnHeroImage}
                                    alt="Learn"
                                    className="w-full h-[280px] md:h-[320px] object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {screen.t1 && screen.type !== 'divider' ? (
                          screen.t2 ? (
                            <div className="text-center">
                              <h1 className="text-2xl md:text-4xl font-black text-white">
                                {screen.t1}
                              </h1>
                              <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                            </div>
                          ) : (
                            <h1 className="text-2xl md:text-4xl font-black text-white">
                              {screen.t1}
                            </h1>
                          )
                        ) : null}

                        {screen.id === 11 && screen.t2 ? (
                          <div className="text-center">
                            <h2 className="text-2xl md:text-3xl font-black text-white">
                              {screen.t2}
                            </h2>
                            <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                          </div>
                        ) : null}

                        {screen.id === 12 ? (
                          <div className="pt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                              <div className="space-y-6">
                                {screen.t2 ? (
                                  <div>
                                    <div className="text-left -mt-40">
                                      <h1 className="text-xl md:text-2xl font-black text-white">
                                        {screen.t2}
                                      </h1>
                                      <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                                    </div>
                                  </div>
                                ) : null}
                                {screen.body ? (
                                  <div className="text-lg md:text-xl text-white/70 whitespace-pre-line leading-relaxed">
                                    {screen.body}
                                  </div>
                                ) : null}
                              </div>

                              <div className="flex justify-center md:justify-end">
                                <div className="w-full max-w-[420px] md:w-[420px] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
                                  <img
                                    src={learnHeroImage}
                                    alt="Learn"
                                    className="w-full h-[280px] md:h-[320px] object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {screen.id === 14 ? (
                          <div className="pt-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                              <div className="space-y-6">
                                <div className="text-left">
                                  {screen.t3 ? (
                                    <h1 className="text-xl md:text-2xl font-black text-white">
                                      {screen.t3}
                                    </h1>
                                  ) : null}
                                  <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                                </div>

                                {screen.body ? (
                                  <div className="text-lg md:text-xl text-white/70 whitespace-pre-line leading-relaxed">
                                    {screen.body}
                                  </div>
                                ) : null}
                              </div>

                              <div className="flex justify-center md:justify-end">
                                <div className="w-full max-w-[420px] md:w-[420px] rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02]">
                                  <img
                                    src={learnHeroImage}
                                    alt="Learn"
                                    className="w-full h-[280px] md:h-[320px] object-cover"
                                  />
                                </div>
                              </div>
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
                          <div className="text-center">
                            <h2 className="text-xl md:text-2xl font-black text-white">
                              {screen.t2}
                            </h2>
                            <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                          </div>
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
                        screen.id !== 13 &&
                        screen.id !== 14 &&
                        screen.id !== 15 ? (
                          <h3 className="text-lg md:text-xl font-bold text-white/85">
                            {screen.t3}
                          </h3>
                        ) : null}

                        {screen.lead && screen.id !== 7 ? (
                          <div className="text-base md:text-lg font-semibold text-white whitespace-pre-line">
                            {screen.lead}
                          </div>
                        ) : null}

                        {screen.id === 17 && screen.body ? (
                          <div className="flex justify-center pt-2">
                            <div className="w-full max-w-[781px] md:w-[781px] h-auto md:h-[315px] rounded-lg border border-white/10 bg-white/[0.12] backdrop-blur-[12px] overflow-hidden">
                              <div className="px-9 pt-8 pb-8 md:px-9 md:pt-[33px] md:pb-8">
                                <div className="text-sm md:text-base text-white whitespace-pre-line leading-relaxed">
                                  {screen.body}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {screen.body &&
                        screen.id !== 4 &&
                        screen.id !== 7 &&
                        screen.id !== 5 &&
                        screen.id !== 8 &&
                        screen.id !== 9 &&
                        screen.id !== 10 &&
                        screen.id !== 13 &&
                        screen.id !== 14 &&
                        screen.id !== 12 &&
                        screen.id !== 18 &&
                        screen.id !== 17 &&
                        screen.type !== 'accordion' ? (
                          <div
                            className={`text-sm md:text-base text-slate-200 whitespace-pre-line leading-relaxed ${
                              screen.type === 'divider' ? 'mt-4' : ''
                            }`}
                          >
                            {screen.body}
                          </div>
                        ) : null}
                      </>
                    )}

                    {screen.id === 15 ? (
                      <div className="space-y-8">
                        <div className="text-center">
                          {screen.t3 ? (
                            <h3 className="text-lg md:text-xl font-bold text-white">
                              {screen.t3}
                            </h3>
                          ) : null}
                          <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                        </div>

                        {screen.bullets && screen.bullets.length ? (
                          <div className="space-y-7">
                            {screen.bullets.map((b, i) => {
                              const isGreen = /^Green\b/i.test(b);
                              const isAmber = /^Amber\b/i.test(b);
                              const icon = isGreen
                                ? 'insert_chart'
                                : isAmber
                                  ? 'chat'
                                  : 'looks_3';
                              return (
                                <div
                                  key={`${i}-${b}`}
                                  className="flex items-start gap-6"
                                >
                                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    {i === 2 && !isGreen && !isAmber ? (
                                      <span className="text-[#A5B4FC] font-bold text-lg leading-none">
                                        3
                                      </span>
                                    ) : (
                                      <span className="material-symbols-outlined text-[#A5B4FC]">
                                        {icon}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm md:text-base text-slate-200 leading-relaxed">
                                    {b}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : null}

                        {screen.keyPoint ? (
                          <div className="mt-8 w-full max-w-[1100px] mx-auto rounded-3xl border border-rose-300/10 bg-gradient-to-br from-[#4A1A2A]/85 via-[#2A1020]/90 to-[#120612]/80 px-10 md:px-12 py-10 md:py-12 text-white/90 whitespace-pre-line">
                            <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                              The honest part.
                            </div>
                            <div className="mt-5 text-base md:text-lg leading-relaxed text-white/80">
                              {screen.keyPoint.replace(
                                /^The honest part\.?\s*/i,
                                ''
                              )}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {screen.bullets && screen.id === 3 ? (
                      <div className="rounded-lg border border-[#818CF8] bg-[#171F33]/70 backdrop-blur-[12px] p-6 md:p-8 md:w-[1103px] md:mt-10">
                        <div className="space-y-4">
                          <div className="space-y-6">
                            {screen.bullets.map((b) => (
                              <div
                                key={b}
                                className="flex items-start gap-6 rounded-md"
                              >
                                <div className="w-12 h-12 rounded-xl bg-[#4D8EFF]/20 border border-[#ADC6FF]/20 flex items-center justify-center shrink-0">
                                  <span className="material-symbols-outlined text-[#ADC6FF]">
                                    check
                                  </span>
                                </div>
                                <div className="text-sm md:text-base text-[#DADFFB] leading-relaxed">
                                  {b}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : screen.bullets &&
                      screen.id !== 4 &&
                      screen.id !== 15 ? (
                      <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-slate-200">
                        {screen.bullets.map((b) => (
                          <li key={b} className="leading-relaxed">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {screen.keyPoint ? (
                      screen.id === 10 ? (
                        <div className="mt-8 w-full max-w-[1100px] mx-auto rounded-3xl border border-rose-300/10 bg-gradient-to-br from-[#4A1A2A]/85 via-[#2A1020]/90 to-[#120612]/80 px-10 md:px-12 py-10 md:py-12 text-white/90 whitespace-pre-line pb-32">
                          <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            The single most important point.
                          </div>
                          <div className="mt-5 text-base md:text-lg leading-relaxed text-white/80">
                            {screen.keyPoint}
                          </div>
                        </div>
                      ) : screen.id === 15 ? null : (
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
                    screen.id !== 13 &&
                    screen.id !== 14 &&
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
                        {screen.t2 ? (
                          <div className="text-center">
                            <h2 className="text-2xl md:text-3xl font-black text-white">
                              {screen.t2}
                            </h2>
                            <div className="mt-3 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-[#60A5FA] to-[#9333EA]" />
                          </div>
                        ) : null}

                        {screen.body ? (
                          <div className="text-sm md:text-base text-slate-200/90 text-center whitespace-pre-line leading-relaxed max-w-[720px] mx-auto">
                            {screen.body}
                          </div>
                        ) : null}

                        <div className="mt-8 space-y-4 max-w-[920px] mx-auto">
                          {screen.accordionItems.map((item) => (
                            <Dropdown
                              key={item.header}
                              dropdownId={`${screen.id}:${item.header}`}
                              header={item.header}
                              body={item.body}
                              onOpenChange={handleDropdownOpenChange}
                              containerClassName="rounded-xl bg-white/[0.03]"
                              buttonClassName="h-[64px] bg-[#1A1A33]/60 hover:bg-[#1A1A33]/75"
                              bodyClassName="bg-[#1A1A33]/35"
                            />
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {screen.type === 'scenario_situation' &&
                    screen.scenarioId ? (
                      <div className="space-y-3">
                        <h3 className="text-lg md:text-xl font-bold text-[#60A5FA]">
                          {SCENARIOS[screen.scenarioId].title}
                        </h3>
                        <div className="text-sm md:text-base text-slate-200 whitespace-pre-line leading-relaxed">
                          {SCENARIOS[screen.scenarioId].situation}
                        </div>
                      </div>
                    ) : null}

                    {screen.type === 'scenario_choose' && screen.scenarioId
                      ? (() => {
                          const scenarioId = screen.scenarioId;
                          const scenario = SCENARIOS[scenarioId];
                          return (
                            <div className="space-y-5">
                              <h3 className="text-lg md:text-xl font-bold text-[#60A5FA]">
                                {scenario.question}
                              </h3>

                              <div className="grid grid-cols-1 gap-4">
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
                                      className={`text-left rounded-2xl border px-5 py-4 transition-colors ${
                                        selected
                                          ? 'border-[#60A5FA]/60 bg-[#60A5FA]/10'
                                          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05]'
                                      }`}
                                    >
                                      <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-[#60A5FA] font-bold">
                                          {k}
                                        </div>
                                        <div className="text-sm md:text-base text-slate-200 leading-relaxed">
                                          {scenario.options[k]}
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()
                      : null}

                    {screen.type === 'scenario_feedback' && screen.scenarioId
                      ? (() => {
                          const scenarioId = screen.scenarioId;
                          const scenario = SCENARIOS[scenarioId];
                          return (
                            <div className="space-y-4">
                              <h2 className="text-xl md:text-2xl font-bold text-[#60A5FA]">
                                Feedback
                              </h2>

                              <div className="space-y-3">
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
                                          : 'border-white/10 bg-white/[0.02]'
                                      }`}
                                    >
                                      <div className="text-sm text-slate-200 leading-relaxed">
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
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                          <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                            Take away card
                          </div>
                          <div className="mt-3 text-xl font-black text-white whitespace-pre-line">
                            {screen.takeawayHeading}
                          </div>
                          <div className="mt-4 text-sm md:text-base text-slate-200 whitespace-pre-line leading-relaxed">
                            {screen.takeawayBody}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#60A5FA] to-[#9333EA] text-white font-semibold"
                        >
                          Save card
                        </button>
                      </div>
                    ) : null}

                    {screen.type === 'closing' ? (
                      <div className="space-y-4">
                        <div className="text-sm md:text-base text-slate-200 whitespace-pre-line leading-relaxed">
                          {screen.closingBody}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </section>
            </div>

            <div className="sticky bottom-0 mt-auto pt-4 pb-2 border-t border-white/10 bg-[#020617]/85 backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => setIndex((v) => Math.max(0, v - 1))}
                  className={`flex items-center gap-2 h-12 px-5 rounded-full text-sm font-semibold border transition-colors ${
                    index === 0
                      ? 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
                  }`}
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  disabled={!canGoNext}
                  onClick={() => {
                    if (screen.id === 29) {
                      window.location.assign(
                        '/dashboard/my-learning/mind-sync'
                      );
                      return;
                    }

                    setIndex((v) => Math.min(screens.length - 1, v + 1));
                  }}
                  className={`flex items-center gap-2 h-12 px-6 rounded-full text-sm font-semibold border border-transparent transition-colors ${
                    canGoNext
                      ? 'bg-gradient-to-r from-[#60A5FA] to-[#9333EA] text-white hover:shadow-indigo-500/20'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
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

        <aside className="relative w-1/4 h-full border-l border-white/5 glass-panel flex flex-col shrink-0 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-1">
              Module Contents
            </h2>
            <p className="text-xs text-slate-400">{toc.length} blocks</p>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
            {sidebarSections.map((section) => {
              const isOpen = openSections[section.key];
              const isActiveSection = section.key === activeSidebarSectionKey;
              return (
                <div key={section.key} className="border-b border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      if (isOpen) {
                        setOpenSections({
                          introduction: false,
                          watch: false,
                          learn: false,
                          practise: false,
                          takeaway: false,
                          closing: false,
                        });
                        return;
                      }

                      setOpenSections({
                        introduction: section.key === 'introduction',
                        watch: section.key === 'watch',
                        learn: section.key === 'learn',
                        practise: section.key === 'practise',
                        takeaway: section.key === 'takeaway',
                        closing: section.key === 'closing',
                      });
                    }}
                    className={`w-full text-left px-4 py-4 flex items-center justify-between gap-3 transition-colors relative ${
                      isActiveSection ? 'bg-white/[0.04]' : 'hover:bg-white/5'
                    }`}
                  >
                    {isActiveSection ? (
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/70 to-transparent" />
                    ) : null}
                    <div className="min-w-0">
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-300 truncate">
                        {section.label}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {section.indices.length} blocks
                      </div>
                    </div>
                    <span
                      className={`material-symbols-outlined text-white/60 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {isOpen ? (
                    <div>
                      {section.indices.map((i) => {
                        const item = toc[i];
                        if (!item) return null;
                        const isCurrent = item.index === index;
                        return (
                          <button
                            key={`${item.blockId}-${item.index}`}
                            type="button"
                            onClick={() => setIndex(item.index)}
                            className={`w-full text-left px-4 py-3 border-t flex items-start gap-3 transition-colors cursor-pointer ${
                              isCurrent
                                ? 'border-white/10'
                                : 'border-white/5 hover:bg-white/5'
                            }`}
                          >
                            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                              {isCurrent ? (
                                <div className="w-6 h-6 rounded-full border border-[#60A5FA] flex items-center justify-center">
                                  <div className="w-2 h-2 bg-[#60A5FA] rounded-full animate-pulse" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full border border-white/20" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-xs truncate ${
                                  isCurrent
                                    ? 'font-bold text-white'
                                    : 'font-medium text-slate-300'
                                }`}
                              >
                                {item.label}
                              </p>
                              <p className="text-[10px] text-slate-500">
                                {`Block ${item.blockId}`}
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
