import { Mission } from '../types';

export const initialMissions: Mission[] = [
  {
    id: 'mis-1',
    title: 'Daily Calibration: 2 Medium Problems',
    description: 'Solve two medium-difficulty questions today to maintain streak calibration.',
    category: 'daily',
    problemIds: ['prob-2', 'prob-3'],
    requiredCount: 2,
    currentCount: 1,
    xpReward: 120,
    isCompleted: false,
    badge: 'Daily Master'
  },
  {
    id: 'mis-2',
    title: 'Binary Search Mastery Sprint',
    description: 'Overcome off-by-one errors with targeted boundary search problems.',
    category: 'topic_mastery',
    problemIds: ['prob-3'],
    requiredCount: 3,
    currentCount: 2,
    xpReward: 250,
    isCompleted: false,
    badge: 'Binary Search Ace'
  },
  {
    id: 'mis-3',
    title: 'Dynamic Programming Foundation',
    description: 'Solve classic bottom-up knapsack and unbounded coin change problems.',
    category: 'sprint',
    problemIds: ['prob-4'],
    requiredCount: 2,
    currentCount: 2,
    xpReward: 300,
    isCompleted: true,
    badge: 'DP Conqueror'
  },
  {
    id: 'mis-4',
    title: 'Graph Traversal & Cycle Detection',
    description: 'Complete topological sorting and directed graph cycle detection challenges.',
    category: 'topic_mastery',
    problemIds: ['prob-7'],
    requiredCount: 2,
    currentCount: 1,
    xpReward: 200,
    isCompleted: false,
    badge: 'Graph Pioneer'
  },
  {
    id: 'mis-5',
    title: 'Sliding Window & Monotonic Deques',
    description: 'Tackle advanced sub-array maximums and continuous substring constraints.',
    category: 'sprint',
    problemIds: ['prob-8', 'prob-2'],
    requiredCount: 2,
    currentCount: 1,
    xpReward: 350,
    isCompleted: false,
    badge: 'Window Wizard'
  }
];

export const streakCalendarMock = [
  { day: 1, active: true, count: 3 },
  { day: 2, active: true, count: 2 },
  { day: 3, active: true, count: 4 },
  { day: 4, active: true, count: 1 },
  { day: 5, active: true, count: 5 },
  { day: 6, active: false, count: 0 },
  { day: 7, active: true, count: 2 },
  { day: 8, active: true, count: 3 },
  { day: 9, active: true, count: 2 },
  { day: 10, active: true, count: 4 },
  { day: 11, active: true, count: 1 },
  { day: 12, active: true, count: 6 },
  { day: 13, active: true, count: 3 },
  { day: 14, active: true, count: 2 }, // Today
  { day: 15, active: false, count: 0 },
  { day: 16, active: false, count: 0 },
  { day: 17, active: false, count: 0 },
  { day: 18, active: false, count: 0 },
  { day: 19, active: false, count: 0 },
  { day: 20, active: false, count: 0 },
  { day: 21, active: false, count: 0 },
  { day: 22, active: false, count: 0 },
  { day: 23, active: false, count: 0 },
  { day: 24, active: false, count: 0 },
  { day: 25, active: false, count: 0 },
  { day: 26, active: false, count: 0 },
  { day: 27, active: false, count: 0 },
  { day: 28, active: false, count: 0 },
  { day: 29, active: false, count: 0 },
  { day: 30, active: false, count: 0 }
];
