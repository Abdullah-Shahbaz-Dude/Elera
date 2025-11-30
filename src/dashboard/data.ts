import { Score, Band, TrainingModule, DevelopmentPhase } from './types';

export const managerInfo = {
  name: 'Rachel Smith',
  role: 'Data Analyst Manager',
  sector: 'Construction sector',
  teamSize: 'Managing 30 people',
  workStyle: 'Mainly hybrid team',
  age: 35,
  reportDate: '19 November 2025',
};

export const bands: Band[] = [
  {
    name: 'Strong',
    range: '80–100%',
    description: '"Adjustments are second nature – the team openly shares preferences."',
  },
  {
    name: 'Good',
    range: '70–79%',
    description: '"We\'re supportive, but not everything is routine yet."',
  },
  {
    name: 'Developing',
    range: '60–69%',
    description: '"Good intentions, but day-to-day practice is still inconsistent."',
  },
  {
    name: 'Needs Attention',
    range: '0–59%',
    description: '"We mostly react when issues arise rather than prevent them."',
  },
];

export const scores: Score[] = [
  {
    category: 'Awareness',
    score: 71,
    band: 'Good',
    description: 'You recognise most neurodivergent conditions and know that adjustments can help performance.',
  },
  {
    category: 'Attitude',
    score: 82,
    band: 'Strong',
    description: 'You genuinely value different thinking styles and see them as a strength in analytical work.',
  },
  {
    category: 'Action',
    score: 58,
    band: 'Needs Attention',
    description: 'Adjustments tend to happen reactively rather than as standard practice.',
  },
  {
    category: 'Adaptability',
    score: 63,
    band: 'Developing',
    description: 'You adapt when needed, but building more proactive habits would help further.',
  },
];

export const overallScore = {
  score: 68,
  band: 'Developing',
  description: 'A strong attitude gives you an excellent starting point – small, consistent changes in Action and Adaptability typically deliver the biggest gains.',
};

export const strengths = {
  title: 'Your strongest area is Attitude (82%)',
  description: 'which is one of the most important foundations for leading neurodiverse and mixed-thinking teams. You genuinely value different ways of thinking, respond calmly to variation in communication styles, and are open to learning new approaches. This creates an atmosphere where analysts feel respected and more able to be honest about how they work best.',
};

export const developmentPriorities = [
  {
    title: 'Action (58%)',
    description: 'This suggests that support and adjustments often happen later than they need to, or only once an issue has escalated. Day-to-day routines that protect focus, reduce errors and make expectations clear are not yet fully embedded.',
  },
  {
    title: 'Adaptability (63%)',
    description: 'You can flex your approach, but this becomes harder under pressure. During busy periods or digital change, your communication may become less predictable and expectations less clear, which can increase anxiety in detail-focused analysts.',
  },
];

export const teamImpact = {
  summary: 'Your positive attitude means your team are likely to feel respected and able to think in their own way. However, inconsistent action and adaptability may mean that they are not always sure when support is available, or what exactly is expected during busy or changing periods. Over time this can lead to hesitation, avoidable mistakes and missed opportunities to use their strongest skills.',
  orgImpact: 'If you strengthen your Action and Adaptability scores, your team\'s performance is likely to improve noticeably. You can expect smoother digital rollouts, fewer errors, faster onboarding of new analysts, and stronger retention of neurodivergent team members who often bring rare analytical strengths but are sensitive to unclear expectations and inconsistent support.',
};

export const trainingModules: TrainingModule[] = [
  {
    title: 'Understanding Different Thinkers',
    whyRecommended: 'Explores how people focus, process information and solve problems differently. For you, this will deepen your ability to spot strengths early and understand why analysts respond differently to pressure or change.',
    teamImpact: 'Team benefit: fewer misunderstandings and more balanced collaboration.',
    orgImpact: 'Organisational benefit: better use of existing talent and more resilient project delivery.',
  },
  {
    title: 'Reasonable Adjustments That Unlock Performance',
    whyRecommended: 'Provides practical, evidence-based adjustments for analytical and digital work (for example, written briefs, structured focus blocks, visual tools, flexible communication). For you, this turns good intentions into concrete management habits.',
    teamImpact: 'Team benefit: clearer expectations, reduced stress and fewer preventable mistakes.',
    orgImpact: 'Organisational benefit: improved accuracy, reduced rework and stronger retention.',
  },
  {
    title: 'Matching Tasks to People\'s Natural Strengths',
    whyRecommended: 'Gives you a structured way to align tasks such as data cleaning, modelling, reporting and forecasting with individual strengths.',
    teamImpact: 'Team benefit: people spend more time doing the work they are naturally good at, which increases quality and motivation.',
    orgImpact: 'Organisational benefit: higher productivity and better use of specialist skills already in the team.',
  },
  {
    title: 'Neurodiversity Strengths in Analytical & Digital Work',
    whyRecommended: 'Shows how autistic, ADHD, dyslexic and dyspraxic strengths can directly improve construction analytics, digital reporting and problem-solving.',
    teamImpact: 'Team benefit: greater pride and confidence for neurodivergent analysts, and more respect from colleagues.',
    orgImpact: 'Organisational benefit: stronger innovation and better digital decision-making.',
  },
  {
    title: 'Building Digital Confidence',
    whyRecommended: 'Helps you communicate changes to tools and systems in a calm, structured way and break learning into manageable steps.',
    teamImpact: 'Team benefit: less anxiety about new tools, more willingness to experiment and learn.',
    orgImpact: 'Organisational benefit: faster digital adoption and more effective use of licensed systems.',
  },
  {
    title: 'Communicating Clearly During Change',
    whyRecommended: 'Provides simple frameworks for explaining what is changing, why, and what you expect from your team.',
    teamImpact: 'Team benefit: fewer mixed messages, less confusion and more consistent delivery.',
    orgImpact: 'Organisational benefit: smoother implementation of new processes and better cross-team alignment.',
  },
  {
    title: 'Leading Neurodiverse & Cognitive-Diverse Teams',
    whyRecommended: 'Brings together everything above into a coherent leadership approach. For you, this helps turn your positive mindset into consistent day-to-day practice.',
    teamImpact: 'Team benefit: higher psychological safety, clearer support and stronger loyalty.',
    orgImpact: 'Organisational benefit: a manager who can reliably lead a diverse, digitally focused team through ongoing change.',
  },
];

export const developmentPathway: DevelopmentPhase[] = [
  {
    period: 'First 30 Days – Build Knowledge and Confidence',
    tasks: [
      'Complete Understanding Different Thinkers and Reasonable Adjustments That Unlock Performance.',
      'Begin asking in 1:1s: "What helps you do your best analytical work?"',
      'Start a simple "team preferences" document to capture working styles.',
    ],
  },
  {
    period: 'Days 30–60 – Apply Learning With the Team',
    tasks: [
      'Run the Matching Tasks to People\'s Natural Strengths exercise in a team meeting.',
      'Test 2–3 adjustments agreed with the team and review impact.',
      'Complete Building Digital Confidence to support upcoming changes.',
    ],
  },
  {
    period: 'Days 60–90 – Embed and Lead',
    tasks: [
      'Complete Communicating Clearly During Change and Leading Neurodiverse & Cognitive-Diverse Teams.',
      'Agree "ways of working" guidelines with the team.',
      'Run a short anonymous pulse-check survey to monitor safety, stress and clarity.',
      'Share back improvements in accuracy, speed or wellbeing linked to the new approach.',
    ],
  },
];

export const conclusion = 'Your strong attitude score shows you already value different thinkers. By combining that mindset with focused training in adjustments, communication and task alignment, you can significantly increase your team\'s performance and wellbeing. The modules recommended here are designed to help you make practical, sustainable changes over the next three months and beyond.';


