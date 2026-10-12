import { RecommendationStrategy, Problem } from '../types';
import { mockProblems } from '../data/problemsData';
import { mockTopicSkills } from '../data/topicsData';

export interface StrategyInfo {
  id: RecommendationStrategy;
  name: string;
  tagline: string;
  description: string;
  hypothesis: string;
  badgeColor: string;
}

export const RESEARCH_STRATEGIES: Record<RecommendationStrategy, StrategyInfo> = {
  random: {
    id: 'random',
    name: 'Strategy A: Random Baseline',
    tagline: 'Standard uniform sampling baseline',
    description: 'Selects problems uniformly at random across all topics without considering historical accuracy or user weaknesses.',
    hypothesis: 'Serves as the experimental control group to measure natural learning progression without algorithmic intervention.',
    badgeColor: 'bg-slate-800 text-slate-300 border-slate-700'
  },
  topic_based: {
    id: 'topic_based',
    name: 'Strategy B: Topic-Sequential Practice',
    tagline: 'Standard static syllabus progression',
    description: 'Recommends problems sequentially through a fixed syllabus (Arrays -> Strings -> Linked Lists -> Trees -> DP).',
    hypothesis: 'Represents common traditional curricula. Strong on breadth, but may over-practice mastered topics while neglecting persistent weaknesses.',
    badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-800'
  },
  adaptive_ai: {
    id: 'adaptive_ai',
    name: 'Strategy C: Performance-Aware Adaptive AI',
    tagline: 'Intelligent weakness calibration',
    description: 'Dynamically computes proficiency gaps and failure patterns (e.g. boundary condition bugs, TLE in DP) to recommend targeted calibration problems.',
    hypothesis: 'Hypothesized to produce significantly higher retention, faster mock interview readiness, and lower recurring error frequency in controlled trials.',
    badgeColor: 'bg-indigo-950/80 text-indigo-300 border-indigo-700'
  }
};

export const researchService = {
  getRecommendations(strategy: RecommendationStrategy, count: number = 3): { problem: Problem; reason: string }[] {
    if (strategy === 'random') {
      // Pick random items
      const shuffled = [...mockProblems].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count).map(p => ({
        problem: p,
        reason: 'Random baseline sample'
      }));
    }

    if (strategy === 'topic_based') {
      // Pick based on a fixed sequence: e.g. Arrays, then Strings, then Trees
      return [
        { problem: mockProblems[0], reason: 'Topic syllabus step 1: Arrays foundation' },
        { problem: mockProblems[1], reason: 'Topic syllabus step 2: Strings sliding window' },
        { problem: mockProblems[5], reason: 'Topic syllabus step 3: Binary tree traversal' }
      ].slice(0, count);
    }

    // Adaptive AI: Target topics with lowest proficiency scores (Dynamic Programming, Queues, Binary Search)
    const weakTopics = mockTopicSkills
      .filter(t => t.status === 'Needs Attention')
      .sort((a, b) => a.proficiencyScore - b.proficiencyScore);

    const weakTopicNames = weakTopics.map(w => w.topic);

    const adaptiveRecs = mockProblems
      .filter(p => weakTopicNames.includes(p.topic))
      .slice(0, count);

    const reasons = [
      'Targets 48% proficiency in Dynamic Programming & recurring initialization flaws',
      'Targets 56% proficiency in Queues & monotonic deque boundary errors',
      'Targets 62% proficiency in Binary Search & off-by-one boundary conditions'
    ];

    return adaptiveRecs.map((p, idx) => ({
      problem: p,
      reason: reasons[idx % reasons.length]
    }));
  }
};
