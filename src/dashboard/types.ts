export interface Score {
  category: string;
  score: number;
  band: string;
  description: string;
}

export interface Band {
  name: string;
  range: string;
  description: string;
}

export interface TrainingModule {
  title: string;
  whyRecommended: string;
  teamImpact: string;
  orgImpact: string;
}

export interface DevelopmentPhase {
  period: string;
  tasks: string[];
}

// Brilliance Report Types
export interface BrillianceUserInfo {
  role: string;
  team: string;
  age: string;
  gender: string;
  neurodivergence: string;
  industry: string;
}

export interface ThinkingStyleScore {
  name: string;
  score: number; // 1-5 scale
  percentage: number; // Converted to percentage (1=20%, 2=40%, etc.)
}

export interface FocusProfile {
  energizers: string[];
  drainers: string[];
  description: string;
}

export interface AIReadinessScore {
  name: string;
  label: string;
  score: number; // 1-5 scale
  percentage: number; // Converted to percentage
}

export interface MotivationScore {
  name: string;
  label: string;
  score: number; // 1-5 scale
  percentage: number; // Converted to percentage
}

export interface NextStep {
  text: string;
}

