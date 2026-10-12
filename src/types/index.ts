// AlgoPilot TypeScript Types

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type DSATopic =
  | 'Arrays'
  | 'Strings'
  | 'Linked Lists'
  | 'Stacks'
  | 'Queues'
  | 'Hashing'
  | 'Binary Search'
  | 'Trees'
  | 'Graphs'
  | 'Dynamic Programming'
  | 'Greedy Algorithms'
  | 'Backtracking';

export type SupportedLanguage = 'cpp' | 'python' | 'java';

export type SubmissionStatus =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Time Limit Exceeded'
  | 'Runtime Error'
  | 'Memory Limit Exceeded'
  | 'Pending';

export type RecommendationStrategy =
  | 'random'
  | 'topic_based'
  | 'adaptive_ai';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isSample: boolean;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topic: DSATopic;
  tags: string[];
  acceptanceRate: number; // e.g. 68.4%
  estimatedTimeMin: number;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    cpp: string;
    python: string;
    java: string;
  };
  sampleTestCases: TestCase[];
  hiddenTestCasesCount: number;
  hints: string[];
  optimalComplexity: {
    time: string;
    space: string;
  };
  editorialSummary?: string;
  companyTags?: string[];
}

export interface Submission {
  id: string;
  problemId: string;
  problemTitle: string;
  topic: DSATopic;
  difficulty: Difficulty;
  language: SupportedLanguage;
  code: string;
  status: SubmissionStatus;
  runtimeMs: number;
  memoryMb: number;
  passedTests: number;
  totalTests: number;
  submittedAt: string;
  errorDetail?: string;
  errorType?: 'Boundary Condition' | 'Time Complexity' | 'Off-by-One' | 'Null Pointer' | 'Logic Inversion';
}

export interface UserPreferences {
  preferredLanguage: SupportedLanguage;
  currentDsaLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  targetPreparationArea: 'FAANG & Big Tech' | 'High-Growth Startups' | 'Enterprise / Service' | 'College Placements';
  dailyPracticeGoal: number; // problems per day
  practiceStrategy: RecommendationStrategy; // research experiment baseline vs adaptive
  theme: 'dark' | 'light' | 'system';
  emailReminders: boolean;
  soundEffects: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  headline: string;
  collegeOrCompany: string;
  streakDays: number;
  lastActiveDate: string;
  totalProblemsSolved: number;
  totalSubmissions: number;
  totalPracticeSessions: number;
  preferences: UserPreferences;
}

export interface TopicSkill {
  topic: DSATopic;
  proficiencyScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100
  problemsSolved: number;
  totalAvailable: number;
  accuracyRate: number; // %
  status: 'Mastered' | 'Proficient' | 'Needs Attention' | 'Unexplored';
  commonErrorPattern?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'sprint' | 'topic_mastery';
  problemIds: string[];
  requiredCount: number;
  currentCount: number;
  xpReward: number;
  isCompleted: boolean;
  expiresAt?: string;
  badge?: string;
}

export interface CompanyTrack {
  id: string;
  companyName: string;
  logo: string;
  tagline: string;
  color: string;
  difficultyFocus: string;
  roundBreakdown: {
    roundName: string;
    description: string;
    focusAreas: string[];
  }[];
  featuredProblemIds: string[];
  recommendedPatterns: string[];
  completionPercentage: number;
}

export interface InterviewMessage {
  id: string;
  sender: 'interviewer' | 'candidate';
  timestamp: string;
  text: string;
  type?: 'question' | 'hint' | 'clarification' | 'feedback';
}

export interface MockInterviewSession {
  id: string;
  interviewType: 'Standard Technical' | 'FAANG Screening' | 'Algorithmic Deep-Dive';
  topic: DSATopic | 'Mixed';
  difficulty: Difficulty;
  durationMinutes: number;
  timeRemainingSeconds: number;
  status: 'setup' | 'in_progress' | 'completed';
  problems: Problem[];
  activeProblemIndex: number;
  messages: InterviewMessage[];
  feedbackReport?: {
    overallScore: number; // 0-10
    verdict: 'Strong Hire' | 'Lean Hire' | 'Needs Practice' | 'Not Ready';
    categories: {
      name: string;
      score: number;
      maxScore: number;
      feedback: string;
    }[];
    strengths: string[];
    improvements: string[];
    technicalSummary: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  hintLevel?: number;
}
