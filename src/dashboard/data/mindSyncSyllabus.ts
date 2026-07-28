export interface MindSyncModule {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  about: string[];
  learningOutcomes: string[];
  structure: string[];
  videoScriptScene: {
    bullets: string[];
    productionApproach: string;
    suggestedStyle: string;
    characters: string[];
    fullScript: string;
  };
  learn: {
    body: string;
    techniqueHeading: string;
    steps: {
      title: string;
      body: string;
    }[];
    honestPart: string;
    coRegulationScript: {
      heading: string;
      rows: {
        step: string;
        whatToSay: string;
        whyItMatters: string;
      }[];
    };
    whatNotToDo: string[];
  };
  practiceScenarios: {
    title: string;
    situation: string;
    prompt: string;
    options: {
      key: 'A' | 'B' | 'C' | 'D';
      text: string;
    }[];
    feedback: {
      optionKey: 'A' | 'B' | 'C' | 'D';
      title: string;
      body: string;
    }[];
    point: string;
  }[];
  takeaway: {
    heading: string;
    body: string;
    optionalReflectionHeading: string;
    optionalReflectionQuestions: string[];
    beforeYouCloseHeading: string;
    beforeYouCloseBody: string[];
  };
}

export const MIND_SYNC_MODULE_01: MindSyncModule = {
  id: '1',
  title: 'MODULE 1 – CATCH THE RISE',
  subtitle: 'Parenting with ADHD when your child has ADHD too',
  summary: '',
  about: [
    "If you have ADHD and you're raising a child with ADHD, this module is for you. It's about the three seconds before you respond. Same child, same behaviour, different read, completely different outcome. When two ADHD nervous systems are in the same room, the cycle can escalate faster than either of you can choose.",
  ],
  learningOutcomes: [
    'Recognise the early signs that your own ADHD nervous system is starting to fire.',
    'Understand why two ADHD brains escalate so quickly under pressure.',
    'Use a simple three-step technique in real time.',
    'Repair after the moments that go wrong, without damaging the relationship.',
  ],
  structure: [
    'Part 1, Watch. A two-minute video set in a real family scene.',
    'Part 2, Learn. The brain science and the technique.',
    'Part 3, Practise. Four scenarios with feedback.',
    'Part 4, Take-away. A one-page card for your phone.',
  ],
  videoScriptScene: {
    bullets: [
      'Recognise the bidirectional ADHD escalation pattern in real time.',
      'Understand that their own nervous system response is part of the cycle, not a personal failing.',
      "Feel they're not alone in this experience.",
      'Be ready and motivated to learn the technique that follows.',
    ],
    productionApproach:
      'The video uses a short narrative structure a real-feeling family scene that escalates, followed by a calm reframe and a preview of the technique. No talking-head expert. The viewer learns by recognising themselves in the story, not by being lectured at.',
    suggestedStyle:
      "Suggested style: warm, naturalistic filming. Real-feeling kitchen and living room. Soft lighting. The camera should feel like it's quietly observing, not analysing.",
    characters: [
      'Dad. ADHD himself. Trying to be a calm parent but visibly tired. Wearing something casual — not styled for camera. Should feel like someone the viewer might know.',
      "Son (around 14). ADHD. Headphones on, mid-game. Doesn't notice his dad come into the room until he's spoken to twice.",
      "Narrator (voice-over only). Speaks to the viewer like a coach who's been in the same situation. Could be male or female — the warmth matters more than the gender.",
    ],
    fullScript:
      "Scene 1 — The setup (0:00 – 0:25)\nVisual: Wide shot of a family living room in early evening. Son is on the sofa, gaming with headphones on. Sound of game audio leaking out. Dad walks in, holds a tea towel in one hand. Mid-task he's been making dinner.\nNarrator (V.O.): If you've got ADHD, and you're raising a child with ADHD, you've probably been in a moment like this one.\nVisual: Dad walks toward son. Speaks but son doesn't respond. Dad waves, tries again. Son finally pulls one headphone off, irritated.\n\nScene 2 — The escalation (0:25 – 0:55)\nVisual: Close on Dad's face till calm but slightly tightening. He says \"five minutes, dinner.\" Son grunts \"yeah\" and puts the headphone back on without breaking eye contact with the screen.\nCut to 8 minutes later (a clock visible on screen). Dad walks back in. Son is still playing. Dad's tone is firmer this time.\n\nDad (slightly louder): I said five minutes. It's been ten.\nSon: Alright (shouts)\nVisual: Dad's expression shifts. The viewer can see the heat rising jaw tight, eyes narrowing. He raises his voice and shouts\n\nDad: Don't talk to me like that. Off, now.\nSon slams the controller down. Storms off. Dad stands in the room alone, rubs his hand over his face. The tea towel still in his other hand.\n\nScene 3 — The reframe (0:55 – 1:35)\nVisual: The action freezes mid-frame, then slowly desaturates. The narrator's voice returns.\n\nNarrator (V.O.): Watch this scene again, but this time, watch what happens in the dad's body before the shouting.\nVisual: Quick rewind effect. We're back now the son said \"alright, Alright (shouting).\" The image freezes on Dad's face. Subtle on-screen graphic highlights physical signs jaw tightening, shoulders rising, breath shortening, eyes narrowing.\n\nNarrator (V.O.): There's a gap. About three seconds. Between his son's tone, and his own response. In that gap, his nervous system is firing. ADHD brains pick up emotional cues fast and react to them faster.\nVisual: A simple animated graphic shows two brain shapes side by side. Both light up. Lines flicker between them, mirroring each other. On-screen text appears: \"Two ADHD brains. Same room. Same charge.\"\n\nNarrator (V.O.): He isn't a bad dad. His son isn't being deliberately rude. They're both just doing what ADHD brains do under pressure - meeting intensity with more intensity. It's not a parenting failure. It's wiring.\n\nScene 4 — The fork in the road (1:35 – 2:10)\nVisual: We're back in real-time, but this time the moment plays out differently. Dad walks in for the second time. Son says \"alright, JEEZ.\"\nDad pauses. We see his face the same heat starts to rise. But this time, instead of speaking, he places the tea towel on the back of the sofa, takes a slow breath, and counts down silently — we see his lips move: three, two, one.\n\nDad (calmer, lower): I get it, you're in the middle of something. I'm going to wait for you in the kitchen. When you're ready, come through.\nDad walks out. Son sits, surprised. The tension in the room visibly drops.\n\nNarrator (V.O.): What changed wasn't the situation. What changed was that the dad noticed his own response rising and gave himself just enough space to do something different.\n\nScene 5 — The takeaway (2:10 – 2:30)\nVisual: Dad in the kitchen, calmer. After about a minute, son walks in slowly. They don't say much. Dad slides a plate toward him. Son sits down. Quiet. Together.\n\nNarrator (V.O.): Managing ADHD-on-ADHD isn't about staying calm all the time. That isn't realistic. It's about catching your own response three seconds earlier than you used to. That's it. That's the whole thing.\nVisual: A single line of on-screen text fades in: \"Catch the rise. Buy yourself three seconds. Everything else gets easier.\"\n\nNarrator (V.O.): In the next part of this module, we'll show you exactly how.\nVisual: Fade to ELARA logo. Soft underscore resolves.\n\nA note for the production team\nThe most important moment in this video is the close-up of the dad's face in Scene 3. The viewer needs to see something they recognise in themselves not a performance of frustration, but the quiet, internal heat that builds before they say something they regret. Cast for honesty over polish.",
  },
  learn: {
    body: 'In a typical parent-child conflict, there is usually a small emotional gap between what the child does and how the\nparent responds. The parent has a moment to think, choose, and reply. In ADHD-on-ADHD households, that gap\ncan collapse.\n\nADHD brains process emotional cues, tone of voice, body language, facial expressions, much faster than they\nprocess the words people say. When your child speaks to you in a way that feels disrespectful, your nervous\nsystem can react before the words have fully landed. You are not choosing to react. You are already reacting.\n\nThis is the part most parenting advice misses. "Stay calm" is not a useful instruction when your nervous system is\nalready three steps ahead of your thinking brain.',
    techniqueHeading: 'The technique: Catch the Rise',
    steps: [
      {
        title: 'Notice the body before the words',
        body: "Your body always knows before your mouth does. The signs are small but specific to you. Common ones: jaw tightens, shoulders lift, breath gets shallow, hands tense, a feeling of heat in the chest. Your job isn't to stop these signs from happening. Your job is to notice them happening even one of them before you speak.",
      },
      {
        title: 'Buy three seconds',
        body: "When you notice the rise, do anything that takes three seconds and puts something between you and the next sentence. The most reliable options: take one slow breath, count silently from three to one, place an object you're holding deliberately on a surface, take a half-step backwards. The point isn't relaxation. The point is interruption.",
      },
      {
        title: 'Speak from the calmer body',
        body: 'After the three-second pause, your nervous system has dropped just enough for your thinking brain to come back online. Speak shorter, lower, slower. You don\'t have to say something brilliant. "I need a moment" is enough. "Let\'s come back to this in five" is enough. Walking out of the room saying nothing is enough.',
      },
    ],
    honestPart:
      "You will not catch the rise every time. The aim isn't 100%. If you catch it once a day in the first week, that's progress. Three times a day by the end of the month, you're well on your way.",
    coRegulationScript: {
      heading: 'The co-regulation script',
      rows: [
        {
          step: '1. Acknowledge',
          whatToSay: '"I can see this is hard right now."',
          whyItMatters:
            "This drops your child's defences. ADHD brains in escalation expect criticism. Acknowledgement disarms the threat response.",
        },
        {
          step: '2. Name your own state',
          whatToSay: '"I\'m feeling a bit wound up too."',
          whyItMatters:
            "Modelling self-awareness teaches him a vocabulary he doesn't have yet. It also stops him from seeing your state as his fault.",
        },
        {
          step: '3. Step out, briefly',
          whatToSay: '"I\'m going to go in the other room for a minute."',
          whyItMatters:
            "This protects the relationship. You're not punishing him with absence; you're showing that taking space is normal and healthy.",
        },
        {
          step: '4. Set the return',
          whatToSay: '"I\'ll come back when we\'ve both got our heads back."',
          whyItMatters:
            'Crucial for ADHD brains, which find open-ended waits unbearable. A clear return makes the pause feel safe instead of threatening.',
        },
      ],
    },
    whatNotToDo: [
      "Don't try to fix the original issue in the moment. Save it for later, after both nervous systems have settled.",
      'Don\'t ask him to calm down. "Calm down" lands as criticism in an ADHD brain in escalation. Naming your own state is far more effective.',
      "Don't disappear without setting a return. Open-ended absence creates anxiety, especially for ADHD teens.",
      "Don't apologise prematurely. Apologising while you're still flooded usually carries the wrong tone. Wait until you genuinely mean it.",
    ],
  },
  practiceScenarios: [],
  takeaway: {
    heading: 'Your Take-Away Card (Download PDF)',
    body: 'CATCH THE RISE\nThe pocket version\n1. Notice your body before your mouth.\nJaw, shoulders, breath, hands. Any one is enough.\n2. Buy three seconds.\nOne slow breath. Place an object down. Step back half a pace.\n3. Speak from the calmer body.\nShorter. Lower. Slower. "I need a moment" is enough.\nIf words help:\n"I can see this is hard. I\'m a bit wound up too. I\'m going to step out for a minute. I\'ll come back when we\'ve both got our heads back."',
    optionalReflectionHeading: 'Optional reflection',
    optionalReflectionQuestions: [
      'What does "the rise" feel like in your body? Where do you notice it first?',
      'Think of a recent moment that escalated. Looking back, where was the earliest point you could have caught it?',
      'Which of the four scenarios felt most like your real life? What does that tell you about where to focus first?',
      "What's one small commitment you can make for the next seven days? (Not a big change — just one small thing you'll try.)",
    ],
    beforeYouCloseHeading: 'Before you close this module',
    beforeYouCloseBody: [
      'Two things worth knowing before you go.',
      "The first is that this skill takes time. You'll catch the rise in week one. You'll forget it in week two. You'll catch it again in week three. That's normal. ADHD brains learn through repetition, not insight, so the technique only really lands once you've practised it across many real moments. Be patient with yourself.",
      "The second is that the goal isn't to never escalate again. It's to escalate less often, recover faster, and repair more cleanly. A house with no shouting is not a realistic target. A house with quicker repair after the shouting that's the actual goal, and it's well within reach.",
      "In the next module, we'll build on what you've learned here and apply it to one of the most common flashpoints in ADHD households: ending screen time. See you there.",
    ],
  },
};

export const MIND_SYNC_TEACHER_TRAINING_MODULE_01: MindSyncModule = {
  id: '2',
  title: 'MODULE 1 – THE THREE SECOND PAUSE',
  subtitle: 'Teacher Training',
  summary:
    'Reading behaviour in the moment. How to tell the difference between distress, defiance and overwhelm, and what to do in the three seconds before you respond.',
  about: [
    'Most teachers have read a pupil’s behaviour as defiance and only later realised it was distress.',
    ' Same pupil, same behaviour, a different read, a completely different outcome.',
  ],
  learningOutcomes: [
    'Spot the three patterns staff most often misread: distress as defiance, overwhelm as rudeness, stimming as off task.',
    'Understand what is happening inside a dysregulated pupil, and why pushing harder makes it worse.',
    'Use the three second pause in real time.',
    'Give consequences in a way that lands rather than escalates.',
  ],
  structure: [
    'Part 1, Watch. A two minute video from a real classroom.',
    'Part 2, Learn. The brain science and the technique.',
    'Part 3, Practise. Three classroom scenarios with feedback.',
    'Part 4, Take away. A one page card for your lanyard or noticeboard.',
  ],
  videoScriptScene: {
    bullets: [
      'Notice the moment where the teacher pauses before responding.',
      'Compare what the teacher assumes with what is actually happening for the pupil.',
      'See how the response changes when the state is read correctly.',
    ],
    productionApproach:
      'A short narrative classroom sequence that shows the same moment from the classroom view and the pupil view, with the three second pause labelled on screen.',
    suggestedStyle:
      'Naturalistic classroom filming. No perfection. The teacher catches herself just in time.',
    characters: [
      'Ms Patel, teacher',
      'Daniel, Year 9 pupil',
      'Narrator (voice over)',
    ],
    fullScript: '',
  },
  learn: {
    body: '',
    techniqueHeading: 'The technique. The Three Second Pause',
    steps: [],
    honestPart: '',
    coRegulationScript: {
      heading: '',
      rows: [],
    },
    whatNotToDo: [],
  },
  practiceScenarios: [],
  takeaway: {
    heading: 'Part 4. Your take away card',
    body: '',
    optionalReflectionHeading: '',
    optionalReflectionQuestions: [],
    beforeYouCloseHeading: '',
    beforeYouCloseBody: [],
  },
};
