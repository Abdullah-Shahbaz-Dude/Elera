export interface QuestionOption {
  value: string;
  label: string;
  icon?: string;
}

export interface Question {
  id: number;
  section: number;
  sectionName: string;
  text: string;
  type:
    | 'single-choice'
    | 'multiple-choice'
    | 'text-input'
    | 'dual-multiple-choice';
  options?: QuestionOption[];
  placeholder?: string;
  required?: boolean;
}

export const sections = [
  { id: 1, name: 'About You' },
  { id: 2, name: 'Thinking and Problem Solving Styles' },
  { id: 3, name: 'Skills In and Out of Work' },
  { id: 4, name: 'Work Preferences and Environment' },
  { id: 5, name: 'Final Thoughts' },
];

const frequencyOptions: QuestionOption[] = [
  { value: 'rarely', label: 'Rarely or never', icon: 'no' },
  { value: 'occasionally', label: 'Occasionally', icon: 'hourglass' },
  { value: 'sometimes', label: 'Sometimes / situational', icon: 'waveform' },
  { value: 'often', label: 'Often', icon: 'calendar' },
  { value: 'always', label: 'Always or almost always', icon: 'checkmark' },
];

const yesNoOptions: QuestionOption[] = [
  { value: 'yes', label: 'Yes', icon: 'checkmark' },
  { value: 'sometimes', label: 'Sometimes', icon: 'balance' },
  { value: 'no', label: 'No', icon: 'no-entry' },
  { value: 'not-sure', label: 'Not sure', icon: 'question' },
];

export const questions: Question[] = [
  // Section 2: Thinking and Problem Solving Styles
  {
    id: 1,
    section: 2,
    sectionName: 'Thinking and Problem Solving Styles',
    text: 'Do you identify with any of the following?',
    type: 'multiple-choice',
    options: [
      { value: 'adhd-diagnosed', label: 'ADHD (diagnosed)', icon: 'lightning' },
      { value: 'autism', label: 'Autism', icon: 'snowflake' },
      { value: 'dyslexia', label: 'Dyslexia', icon: 'd' },
      { value: 'dyspraxia', label: 'Dyspraxia', icon: 'spiral' },
      { value: 'tourettes', label: "Tourette's", icon: 'ribbon' },
      { value: 'ocd', label: 'OCD', icon: 'infinity' },
      { value: 'dyscalculia', label: 'Dyscalculia', icon: 'calculator' },
      {
        value: 'anxiety',
        label: 'Anxiety or other mental health condition',
        icon: 'head',
      },
      {
        value: 'think-differently',
        label: 'I think differently but have not been diagnosed',
        icon: 'brain',
      },
      {
        value: 'prefer-not-say',
        label: "Prefer not to say / I don't know",
        icon: 'question',
      },
      { value: 'other', label: 'Other', icon: 'plus' },
    ],
  },
  {
    id: 2,
    section: 2,
    sectionName: 'Thinking and Problem Solving Styles',
    text: 'Do you think the way your brain works gives you special strengths?',
    type: 'single-choice',
    options: yesNoOptions,
  },
  {
    id: 3,
    section: 2,
    sectionName: 'Thinking and Problem Solving Styles',
    text: 'How often do you break tasks into smaller, manageable steps before starting?',
    type: 'single-choice',
    options: frequencyOptions,
  },
  {
    id: 4,
    section: 2,
    sectionName: 'Thinking and Problem Solving Styles',
    text: 'How often do you try out ideas quickly to see what works best?',
    type: 'single-choice',
    options: frequencyOptions,
  },
  {
    id: 5,
    section: 2,
    sectionName: 'Thinking and Problem Solving Styles',
    text: 'How often do you ask others for their input or perspective?',
    type: 'text-input',
    placeholder: 'Enter your answer here....',
  },
  {
    id: 6,
    section: 2,
    sectionName: 'Thinking and Problem Solving Styles',
    text: 'How often do you picture or visualise the task or outcome in your head?',
    type: 'single-choice',
    options: frequencyOptions,
  },
  {
    id: 7,
    section: 2,
    sectionName: 'Thinking and Problem Solving Styles',
    text: 'What do you enjoy doing at work or outside work?',
    type: 'dual-multiple-choice',
    options: [
      {
        value: 'spot-issues',
        label: 'Spot things that are not working well',
        icon: 'warning',
      },
      {
        value: 'new-ideas',
        label: 'Come up with new ideas',
        icon: 'lightbulb',
      },
      {
        value: 'help-tech',
        label: 'Help others understand technology or tasks',
        icon: 'computer',
      },
      { value: 'fix-build', label: 'Fix or build things', icon: 'tools' },
      { value: 'connect', label: 'Connect systems or people', icon: 'network' },
      { value: 'other', label: 'Other', icon: 'plus' },
    ],
  },
  {
    id: 8,
    section: 2,
    sectionName: 'Thinking and Problem Solving Styles',
    text: 'How often do you create a plan or checklist before you begin?',
    type: 'single-choice',
    options: frequencyOptions,
  },
  {
    id: 9,
    section: 2,
    sectionName: 'Thinking and Problem Solving Styles',
    text: 'How often do you work in short, focused bursts when under pressure?',
    type: 'single-choice',
    options: frequencyOptions,
  },
  {
    id: 10,
    section: 2,
    sectionName: 'Thinking and Problem Solving Styles',
    text: 'How do you usually learn something new?',
    type: 'multiple-choice',
    options: [
      { value: 'patterns', label: 'Through patterns or logic', icon: 'brain' },
      { value: 'trial-error', label: 'Trial and error', icon: 'beaker' },
      { value: 'find-hard', label: 'I often find it hard', icon: 'cloud' },
      { value: 'talking', label: 'By talking it through', icon: 'chat' },
      { value: 'visuals', label: 'Visuals or models', icon: 'picture' },
      { value: 'other', label: 'Other', icon: 'plus' },
    ],
  },
];

export const totalQuestions = questions.length;
export const totalSections = sections.length;
