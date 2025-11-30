import {
  BrillianceUserInfo,
  ThinkingStyleScore,
  FocusProfile,
  AIReadinessScore,
  MotivationScore,
  NextStep,
} from './types';

// Helper function to convert 1-5 scale to percentage
const scaleToPercentage = (score: number): number => {
  return score * 20; // 1=20%, 2=40%, 3=60%, 4=80%, 5=100%
};

export const userInfo: BrillianceUserInfo = {
  role: '',
  team: '',
  age: '',
  gender: '',
  neurodivergence: 'Anxiety or other mental health condition',
  industry: '',
};

export const overview = `User brings a dynamic and collaborative energy to their work, with a mindset that thrives on connection, creativity, and problem-solving. Their standout traits include a knack for networking, leadership, and spotting inefficiencies, paired with a genuine curiosity for experimenting with new ideas and technologies like AI. User's approach reflects a unique balance of adaptability and interpersonal strength, which positions them as a valuable asset in driving digital innovation. Their ability to stay calm amidst change and their enthusiasm for collaboration highlight neurodivergent-friendly qualities, such as deep engagement when passionate and a talent for building bridges between people and systems.`;

export const thinkingStyleDescription = `User's thinking style is a blend of adaptability and collaboration, with a strong inclination towards seeking input from others and experimenting with ideas. They often use trial and error, demonstrating a hands-on approach to problem-solving, and sometimes rely on gut instinct. Structured planning or breaking tasks into smaller steps isn't their natural go-to. Instead, the user excels in dynamic, interactive settings where they can bounce ideas off colleagues and iterate quickly. This balance of creativity and interpersonal focus allows them to adapt with a flexible mindset, fitting environments that value innovation and teamwork.`;

export const thinkingStyleScores: ThinkingStyleScore[] = [
  { name: 'Breaks Tasks Into Steps', score: 1, percentage: 20 },
  { name: 'Tries Ideas Quickly', score: 4, percentage: 80 },
  { name: 'Asks Others For Input', score: 5, percentage: 100 },
  { name: 'Visualises Problems', score: 1, percentage: 20 },
  { name: 'Trusts Gut Instinct', score: 2, percentage: 40 },
  { name: 'Makes A Plan', score: 3, percentage: 60 },
  { name: 'Works Under Pressure', score: 1, percentage: 20 },
];

export const learningStyleDescription = `User learns most effectively through talking things through and trial and error, embracing a hands-on and social approach. This interactive and experimental style suits dynamic workplace challenges and digital contexts where quick adaptation and feedback loops are key.`;

export const strengthsDescription = `User's strengths include an exceptional ability to connect with others, lead with vision, and manage people with empathy. Their knack for networking, creative idea generation, and spotting inefficiencies leads to meaningful contributions like fostering team cohesion, proposing innovative solutions, or streamlining processes. User's collaborative spirit and strategic perspective make them a catalyst for problem-solving and performance.`;

export const coreStrengths = [
  'Networking',
  'Leadership',
  'People Management',
  'Creative Idea Generation',
  'Spotting Inefficiencies',
];

export const focusProfile: FocusProfile = {
  energizers: [
    'Collaborating with others',
    'Presenting ideas',
    'Leading projects',
  ],
  drainers: [
    'Administrative tasks',
    'Repetitive work',
    'Lack of autonomy',
  ],
  description: `User thrives in environments offering freedom, collaboration, and opportunities for 'in the zone' activities like presenting or leadership. Repetitive tasks (e.g., admin work) drain energy, while autonomy, interaction, clear purpose, flexibility, and variety are crucial for sustaining focus. Rigid structures or excessive routine are identified as potential distractions.`,
};

export const aiReadinessScores: AIReadinessScore[] = [
  {
    name: 'confidence_with_tools',
    label: 'Confidence with digital tools',
    score: 2,
    percentage: scaleToPercentage(2),
  },
  {
    name: 'ai_awareness_curiosity',
    label: 'Awareness and Curiosity',
    score: 4,
    percentage: scaleToPercentage(4),
  },
  {
    name: 'automation_usage',
    label: 'Automation usage or experimentation',
    score: 3,
    percentage: scaleToPercentage(3),
  },
  {
    name: 'openness_to_change',
    label: 'Openness to digital change',
    score: 5,
    percentage: scaleToPercentage(5),
  },
  {
    name: 'supporting_others',
    label: 'Ability to support others through change',
    score: 1,
    percentage: scaleToPercentage(1),
  },
];

export const aiAutomationDescription = `User's promising curiosity towards digital tools and AI, noting their use of platforms like ChatGPT for tasks such as drafting papers. While their confidence with tech is still developing (rating themselves as "slightly confident" in problem-solving with digital tools), their excitement for change and openness to AI's future impact are strong. Their calm and experimental mindset helps them adapt, and their proactive use of AI tools indicates growing digital fluency.`;

export const barriersAndGrowth = `Barriers include developing confidence with digital tools and supporting others in tech, difficulty breaking complex tasks into manageable steps, and energy drain from administrative tasks. Growth opportunities lie in building structured approaches (through tools or mentorship), reframing collaboration as a leadership asset in digital innovation, and creating space for AI tool experimentation to boost tech confidence.`;

export const motivationAndNeeds = `User is intrinsically motivated by autonomy and collaboration. They thrive with freedom to tackle tasks independently and seek input from others. Their passion for presenting, leadership, and meaningful projects energizes them, leading to "in the zone" experiences. Flexible approaches and teamwork opportunities directly support their focus and contribution, leading to increased productivity and engagement when given space to innovate and connect.`;

export const opportunitiesToOrganization = `User's unique strengths in collaboration, leadership, and spotting inefficiencies create significant opportunities for the organization, especially in digital transformation and team dynamics. Early adoption of AI tools like ChatGPT for drafting papers demonstrates potential to streamline content creation, potentially reducing drafting time by 20%. A calm approach to change and curiosity for experimentation can drive innovation in workflows. Networking and people management skills foster a culture of knowledge-sharing. By leveraging AI and their collaborative strengths, User can lead small-scale AI integration projects or enhance team cohesion, directly contributing to productivity and morale.`;

export const motivationScores: MotivationScore[] = [
  {
    name: 'strong_motivators',
    label: 'Strong Motivators',
    score: 5,
    percentage: scaleToPercentage(5),
  },
  {
    name: 'clarity_of_goals',
    label: 'Clarity of Goals',
    score: 3,
    percentage: scaleToPercentage(3),
  },
  {
    name: 'purposeful_improvement',
    label: 'Purposeful Improvement',
    score: 4,
    percentage: scaleToPercentage(4),
  },
  {
    name: 'freedom_to_innovate',
    label: 'Freedom to Innovate',
    score: 5,
    percentage: scaleToPercentage(5),
  },
  {
    name: 'neutral_motivators',
    label: 'Neutral Motivators',
    score: 2,
    percentage: scaleToPercentage(2),
  },
  {
    name: 'recognitors',
    label: 'Recognitors',
    score: 3,
    percentage: scaleToPercentage(3),
  },
];

export const motivationMatrixDescription = `This matrix highlights what drives User's best performance. Their top motivational drivers include autonomy and collaboration, reflecting a deep need for freedom in their approach and connection with others. These factors significantly influence User's engagement, helping them stay focused and energised when working on meaningful, interactive tasks, ultimately boosting their productivity in dynamic settings.`;

export const summary = `User is a collaborative and innovative thinker whose leadership, networking, and creative strengths bring energy to any team. Their curiosity for digital tools and adaptability to change signal untapped potential to drive efficiency and connection. With the right support, User's impact can grow even further, making them a key player in shaping a dynamic, forward-thinking workplace.`;

export const nextSteps: NextStep[] = [
  {
    text: "User could take ownership of a small project to leverage their need for autonomy, allowing them to shape outcomes in their own way.",
  },
  {
    text: "Experimenting with AI tools like ChatGPT for brainstorming or drafting could build User's digital confidence through hands-on learning.",
  },
  {
    text: "Pairing with a colleague for regular check-ins on complex tasks can provide the collaborative input User thrives on while adding structure.",
  },
  {
    text: "Delegating or automating admin tasks, where possible, could help User preserve energy for leadership and creative roles they enjoy.",
  },
  {
    text: "Joining a team initiative focused on innovation or digital change can channel User's curiosity and openness into visible impact.",
  },
];

