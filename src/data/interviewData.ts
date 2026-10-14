import { MockInterviewSession } from '../types';
import { mockProblems } from './problemsData';

export const defaultInterviewSession: MockInterviewSession = {
  id: 'interview-sess-101',
  interviewType: 'Standard Technical',
  topic: 'Mixed',
  difficulty: 'Medium',
  durationMinutes: 45,
  timeRemainingSeconds: 45 * 60,
  status: 'setup',
  problems: [mockProblems[2], mockProblems[1]], // Search in Rotated Sorted Array + Longest Substring
  activeProblemIndex: 0,
  messages: [
    {
      id: 'msg-1',
      sender: 'interviewer',
      timestamp: '00:01',
      text: "Hello! Welcome to your technical mock interview session. Today we'll walk through an algorithmic problem together. Feel free to talk through your thought process before writing code.",
      type: 'question'
    },
    {
      id: 'msg-2',
      sender: 'interviewer',
      timestamp: '00:05',
      text: 'Take a moment to read the problem statement on the left. What initial approaches come to mind?',
      type: 'clarification'
    }
  ]
};

export const sampleFeedbackReportMock = {
  overallScore: 8.4,
  verdict: 'Lean Hire' as const,
  categories: [
    {
      name: 'Problem-Solving Approach',
      score: 8.5,
      maxScore: 10,
      feedback: 'Demonstrated strong intuition by identifying modified binary search instead of reverting to O(N) linear scan. Checked for rotation pivot point effectively.'
    },
    {
      name: 'Correctness & Edge Cases',
      score: 7.8,
      maxScore: 10,
      feedback: 'Initially missed single-element array boundary check when low == high. Recovered promptly when nudged to verify boundary values.'
    },
    {
      name: 'Complexity Analysis',
      score: 9.2,
      maxScore: 10,
      feedback: 'Accurately stated O(log N) time and O(1) space complexity without hesitation, thoroughly explaining why the search space halves at every step.'
    },
    {
      name: 'Communication & Thought Process',
      score: 8.2,
      maxScore: 10,
      feedback: 'Articulated trade-offs clearly before typing code. Communicated variables and pointer movements systematically.'
    }
  ],
  strengths: [
    'Quick identification of the sorted sub-interval invariant.',
    'Clear verbalization of logic prior to typing.',
    'Clean variable naming and disciplined loop structure.'
  ],
  improvements: [
    'Test with single-element and two-element arrays before running code.',
    'State boundary condition guards explicitly in the initial comments.',
    'Ask clarifying questions about duplicate elements earlier in the interview.'
  ],
  technicalSummary: 'Candidate proved capable of solving non-trivial logarithmic search problems under timed constraints with modest interviewer guidance.'
};
