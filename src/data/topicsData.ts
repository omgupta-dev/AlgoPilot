import { TopicSkill, DSATopic } from '../types';

export const mockTopicSkills: TopicSkill[] = [
  {
    topic: 'Arrays',
    proficiencyScore: 84,
    confidenceScore: 92,
    problemsSolved: 34,
    totalAvailable: 45,
    accuracyRate: 82.5,
    status: 'Mastered',
    commonErrorPattern: 'Occasional index out of bounds on nested matrix traversals'
  },
  {
    topic: 'Strings',
    proficiencyScore: 78,
    confidenceScore: 88,
    problemsSolved: 26,
    totalAvailable: 35,
    accuracyRate: 76.0,
    status: 'Proficient',
    commonErrorPattern: 'Corner cases with empty strings or palindrome odd/even centers'
  },
  {
    topic: 'Binary Search',
    proficiencyScore: 62,
    confidenceScore: 74,
    problemsSolved: 15,
    totalAvailable: 28,
    accuracyRate: 61.2,
    status: 'Needs Attention',
    commonErrorPattern: 'Off-by-one errors in while(low <= high) and mid calculation overflow'
  },
  {
    topic: 'Dynamic Programming',
    proficiencyScore: 48,
    confidenceScore: 68,
    problemsSolved: 12,
    totalAvailable: 40,
    accuracyRate: 46.5,
    status: 'Needs Attention',
    commonErrorPattern: 'Struggling to identify optimal substructure vs greedy choice; base-case initialization flaws'
  },
  {
    topic: 'Trees',
    proficiencyScore: 75,
    confidenceScore: 85,
    problemsSolved: 21,
    totalAvailable: 32,
    accuracyRate: 74.8,
    status: 'Proficient',
    commonErrorPattern: 'Base case handling for null root nodes in recursive tree traversals'
  },
  {
    topic: 'Graphs',
    proficiencyScore: 64,
    confidenceScore: 72,
    problemsSolved: 14,
    totalAvailable: 30,
    accuracyRate: 63.0,
    status: 'Needs Attention',
    commonErrorPattern: 'Cycle detection logic missed in unvisited vs visiting states'
  },
  {
    topic: 'Stacks',
    proficiencyScore: 82,
    confidenceScore: 90,
    problemsSolved: 18,
    totalAvailable: 22,
    accuracyRate: 85.0,
    status: 'Mastered',
    commonErrorPattern: 'Not checking if stack is empty before popping'
  },
  {
    topic: 'Queues',
    proficiencyScore: 56,
    confidenceScore: 65,
    problemsSolved: 9,
    totalAvailable: 20,
    accuracyRate: 54.0,
    status: 'Needs Attention',
    commonErrorPattern: 'Monotonic deque boundary condition logic and pruning'
  },
  {
    topic: 'Hashing',
    proficiencyScore: 88,
    confidenceScore: 95,
    problemsSolved: 28,
    totalAvailable: 30,
    accuracyRate: 89.2,
    status: 'Mastered',
    commonErrorPattern: 'Collision handling nuance and custom hash object hashing'
  },
  {
    topic: 'Linked Lists',
    proficiencyScore: 72,
    confidenceScore: 80,
    problemsSolved: 16,
    totalAvailable: 25,
    accuracyRate: 71.4,
    status: 'Proficient',
    commonErrorPattern: 'Lost references when swapping nodes without temporary pointers'
  },
  {
    topic: 'Greedy Algorithms',
    proficiencyScore: 68,
    confidenceScore: 76,
    problemsSolved: 13,
    totalAvailable: 24,
    accuracyRate: 67.5,
    status: 'Proficient',
    commonErrorPattern: 'Failing to rigorously prove the greedy choice property before implementation'
  },
  {
    topic: 'Backtracking',
    proficiencyScore: 52,
    confidenceScore: 60,
    problemsSolved: 8,
    totalAvailable: 22,
    accuracyRate: 51.0,
    status: 'Needs Attention',
    commonErrorPattern: 'Missing state restoration (undo step) causing state leaks across branches'
  }
];

export const errorCategoriesMock = [
  { name: 'Boundary Conditions', count: 32, percentage: 34, description: 'Loop bounds, single element arrays, empty inputs', color: '#f43f5e' },
  { name: 'Time Complexity (TLE)', count: 24, percentage: 26, description: 'Brute-force O(N^2) or O(2^N) when linear/logarithmic expected', color: '#fb923c' },
  { name: 'Off-by-One Indexing', count: 18, percentage: 19, description: 'Array index slicing and binary search boundary offsets', color: '#eab308' },
  { name: 'Null Pointer / State Leak', count: 12, percentage: 13, description: 'Dereferencing null nodes or unreset recursion variables', color: '#a855f7' },
  { name: 'Logic Inversion', count: 8, percentage: 8, description: 'Reversed conditional comparator or inverted boolean check', color: '#38bdf8' }
];

export const difficultyBreakdownMock = [
  { name: 'Easy', count: 68, total: 100, color: '#10b981', percentage: 68 },
  { name: 'Medium', count: 56, total: 150, color: '#f59e0b', percentage: 37 },
  { name: 'Hard', count: 18, total: 80, color: '#ef4444', percentage: 22 }
];
