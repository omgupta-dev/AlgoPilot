import { CompanyTrack } from '../types';

export const mockCompanyTracks: CompanyTrack[] = [
  {
    id: 'comp-google',
    companyName: 'Google',
    logo: 'G',
    tagline: 'High emphasis on algorithmic creativity, graph theory, trees, and optimal asymptotic complexity.',
    color: 'from-amber-500/20 to-red-500/20 border-amber-500/30 text-amber-400',
    difficultyFocus: 'Medium to Hard',
    completionPercentage: 45,
    roundBreakdown: [
      {
        roundName: 'Round 1: Online Assessment / Screening',
        description: '45-minute technical screen focusing on array manipulations or string parsing.',
        focusAreas: ['Arrays & Hash Maps', 'Sliding Window', 'String Transformations']
      },
      {
        roundName: 'Round 2: Algorithmic Deep Dive',
        description: 'Focus on recursion, tree hierarchies, and lowest common ancestor logic.',
        focusAreas: ['Binary Trees', 'LCA', 'Divide & Conquer']
      },
      {
        roundName: 'Round 3: Advanced Graphs & DP',
        description: 'Complex topological ordering, dynamic programming state spaces, or shortest path.',
        focusAreas: ['Topological Sort', 'Cycle Detection', 'Multidimensional DP']
      },
      {
        roundName: 'Round 4: Googleyness & Leadership',
        description: 'Behavioral scenarios, handling ambiguous technical constraints, teamwork.',
        focusAreas: ['Ambiguity Navigation', 'System Collaboration', 'Edge-case Resilience']
      }
    ],
    featuredProblemIds: ['prob-7', 'prob-6', 'prob-3', 'prob-4'],
    recommendedPatterns: [
      'Topological Sort with Kahn’s Algorithm',
      'Monotonic Deque Optimization',
      'Bottom-up Memoization',
      'Tree Subtree Aggregation'
    ]
  },
  {
    id: 'comp-amazon',
    companyName: 'Amazon',
    logo: 'A',
    tagline: 'Strong focus on Leadership Principles coupled with tree/graph modeling, sliding windows, and greedy scheduling.',
    color: 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400',
    difficultyFocus: 'Medium',
    completionPercentage: 62,
    roundBreakdown: [
      {
        roundName: 'Round 1: OA (Coding + Work Styles)',
        description: 'Two coding problems on arrays/hashing followed by LP situational judgment questions.',
        focusAreas: ['Hash Maps', 'Two Pointers', 'Array Prefix Sums']
      },
      {
        roundName: 'Round 2: Tree & Graph Traversals',
        description: 'BFS/DFS matrix navigation, connected components, or binary tree paths.',
        focusAreas: ['Breadth-First Search', 'Island Grid Problems', 'Lowest Common Ancestor']
      },
      {
        roundName: 'Round 3: Optimization & Greedy',
        description: 'Task scheduling, priority queues, and customer order matching simulations.',
        focusAreas: ['Greedy Scheduling', 'Heaps / Priority Queues', 'LRU Cache Design']
      },
      {
        roundName: 'Round 4: Bar Raiser',
        description: 'Independent interviewer assessing candidate technical bar and deep LP alignment.',
        focusAreas: ['Customer Obsession', 'Ownership', 'Clean Code & Robust Testing']
      }
    ],
    featuredProblemIds: ['prob-1', 'prob-2', 'prob-10', 'prob-12'],
    recommendedPatterns: [
      'Sliding Window with Frequency Map',
      'Greedy Interval Merging',
      'Priority Queue Top-K Element Tracking',
      'In-place Pointer Swapping'
    ]
  },
  {
    id: 'comp-microsoft',
    companyName: 'Microsoft',
    logo: 'MS',
    tagline: 'Values clean modular code, linked list manipulation, binary search variations, and clear communication.',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    difficultyFocus: 'Easy to Medium',
    completionPercentage: 58,
    roundBreakdown: [
      {
        roundName: 'Round 1: Screening Call',
        description: '30-45 mins on linked list operations, string palindromes, and clean data structure design.',
        focusAreas: ['Linked Lists', 'String Parsing', 'Two Pointers']
      },
      {
        roundName: 'Round 2: Binary Search & Matrices',
        description: 'Rotated sorted arrays, grid searches, and matrix backtracking.',
        focusAreas: ['Binary Search on Answer', 'Matrix DFS', 'Subsets Generation']
      },
      {
        roundName: 'Round 3: Trees & Dynamic Programming',
        description: 'Tree serialization, dynamic programming memoization, and stack parsers.',
        focusAreas: ['Binary Search Trees', 'Stack Validation', '1D DP Sequences']
      },
      {
        roundName: 'Round 4: Engineering Culture & AA',
        description: 'As-Appropriate interview assessing long-term engineering rigor and scalability mindset.',
        focusAreas: ['Code Readability', 'Unit Test Generation', 'Growth Mindset']
      }
    ],
    featuredProblemIds: ['prob-11', 'prob-3', 'prob-5', 'prob-9'],
    recommendedPatterns: [
      'Rotated Binary Search Partitioning',
      'Dummy Head Pointer in Linked Lists',
      'Balanced Parenthesis Matching with Stacks',
      'Grid Backtracking with In-place Masking'
    ]
  },
  {
    id: 'comp-meta',
    companyName: 'Meta',
    logo: 'M',
    tagline: 'High-speed problem solving requiring bug-free implementation of two medium problems in 45 minutes.',
    color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400',
    difficultyFocus: 'Speed & Medium Focus',
    completionPercentage: 38,
    roundBreakdown: [
      {
        roundName: 'Round 1: Tech Screen (2 Problems)',
        description: 'Fast-paced live coding covering string parsing and binary tree traversals in 45 minutes.',
        focusAreas: ['Two Pointers', 'Binary Tree Paths', 'Hash Sets']
      },
      {
        roundName: 'Round 2: Algorithmic Coding A',
        description: 'Graph search, shortest transformation paths, or sliding window queries.',
        focusAreas: ['BFS Shortest Path', 'Monotonic Stack', 'Sliding Window']
      },
      {
        roundName: 'Round 3: Algorithmic Coding B',
        description: 'Interval merging, custom heap operations, and recursive backtracking.',
        focusAreas: ['Intervals', 'Backtracking', 'Top-K Elements']
      },
      {
        roundName: 'Round 4: Behavioral & Culture',
        description: 'Resolution of conflicts, velocity of execution, and navigating ambiguous roadmaps.',
        focusAreas: ['Bias for Action', 'Direct Feedback', 'Cross-team Alignment']
      }
    ],
    featuredProblemIds: ['prob-5', 'prob-6', 'prob-10', 'prob-1'],
    recommendedPatterns: [
      'Fast Two-Pointer Traversal',
      'LCA Recursive Bubble-up',
      'Greedy Interval Clustering',
      'Hash Map Complement Checking'
    ]
  },
  {
    id: 'comp-uber',
    companyName: 'Uber',
    logo: 'U',
    tagline: 'Strong focus on graph algorithms, geometric computations, concurrent data structures, and heap priority queues.',
    color: 'from-slate-500/20 to-zinc-500/20 border-slate-500/30 text-slate-300',
    difficultyFocus: 'Medium to Hard',
    completionPercentage: 25,
    roundBreakdown: [
      {
        roundName: 'Round 1: OA / Online Challenge',
        description: 'Automated problem solving on arrays, prefix trees, and sliding window metrics.',
        focusAreas: ['Trie Data Structures', 'Sliding Window', 'Prefix Sums']
      },
      {
        roundName: 'Round 2: Graph Theory & Routing',
        description: 'Dijkstra shortest paths, course schedule dependencies, and bipartite matching.',
        focusAreas: ['Kahn Algorithm', 'Topological Sort', 'Dijkstra']
      },
      {
        roundName: 'Round 3: Advanced Data Structures',
        description: 'Design problems like Ride Dispatcher, Monotonic Deque windowing, and LRU Cache.',
        focusAreas: ['Monotonic Deque', 'Circular Queues', 'Segment Trees']
      }
    ],
    featuredProblemIds: ['prob-7', 'prob-8', 'prob-2', 'prob-12'],
    recommendedPatterns: [
      'Directed Acyclic Graph Scheduling',
      'Sliding Window Monotonic Maximum',
      'Group Anagram Signature Maps',
      'Sliding Substring Window Shifting'
    ]
  }
];
