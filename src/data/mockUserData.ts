import { UserProfile, Submission } from '../types';

export const initialMockUser: UserProfile = {
  id: 'usr-demo-01',
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  headline: 'CS Junior @ Tech Institute · Aspiring Software Engineer',
  collegeOrCompany: 'Institute of Technology',
  streakDays: 14,
  lastActiveDate: 'Today',
  totalProblemsSolved: 142,
  totalSubmissions: 318,
  totalPracticeSessions: 46,
  preferences: {
    preferredLanguage: 'python',
    currentDsaLevel: 'Intermediate',
    targetPreparationArea: 'FAANG & Big Tech',
    dailyPracticeGoal: 2,
    practiceStrategy: 'adaptive_ai',
    theme: 'dark',
    emailReminders: true,
    soundEffects: false
  }
};

export const mockSubmissions: Submission[] = [
  {
    id: 'sub-01',
    problemId: 'prob-1',
    problemTitle: 'Two Sum Target Pair',
    topic: 'Arrays',
    difficulty: 'Easy',
    language: 'python',
    code: `# Accepted submission
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in seen:
                return [seen[diff], i]
            seen[num] = i
        return []`,
    status: 'Accepted',
    runtimeMs: 42,
    memoryMb: 17.8,
    passedTests: 30,
    totalTests: 30,
    submittedAt: 'Today, 14:22'
  },
  {
    id: 'sub-02',
    problemId: 'prob-3',
    problemTitle: 'Search in Rotated Sorted Array',
    topic: 'Binary Search',
    difficulty: 'Medium',
    language: 'python',
    code: `# Failed boundary condition
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low < high: # Bug: should be low <= high
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
        return -1`,
    status: 'Wrong Answer',
    runtimeMs: 58,
    memoryMb: 16.4,
    passedTests: 31,
    totalTests: 50,
    submittedAt: 'Yesterday, 18:40',
    errorDetail: 'Failed on edge case single-element array: [1], target=1. Expected: 0, Output: -1',
    errorType: 'Boundary Condition'
  },
  {
    id: 'sub-03',
    problemId: 'prob-4',
    problemTitle: 'Coin Change Minimum Coins',
    topic: 'Dynamic Programming',
    difficulty: 'Medium',
    language: 'python',
    code: `# Accepted optimal DP
class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if i - c >= 0:
                    dp[i] = min(dp[i], dp[i - c] + 1)
        return dp[amount] if dp[amount] != float('inf') else -1`,
    status: 'Accepted',
    runtimeMs: 760,
    memoryMb: 17.2,
    passedTests: 40,
    totalTests: 40,
    submittedAt: '2 days ago, 21:15'
  },
  {
    id: 'sub-04',
    problemId: 'prob-8',
    problemTitle: 'Sliding Window Maximum',
    topic: 'Queues',
    difficulty: 'Hard',
    language: 'python',
    code: `# Exceeded time limit with brute force O(N*k)
class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        res = []
        for i in range(len(nums) - k + 1):
            res.append(max(nums[i:i+k]))
        return res`,
    status: 'Time Limit Exceeded',
    runtimeMs: 2450,
    memoryMb: 32.1,
    passedTests: 38,
    totalTests: 52,
    submittedAt: '3 days ago, 11:05',
    errorDetail: 'Execution timed out at test case 39 with N=100,000, k=50,000. Algorithm exhibits O(N*K) time complexity.',
    errorType: 'Time Complexity'
  },
  {
    id: 'sub-05',
    problemId: 'prob-5',
    problemTitle: 'Valid Parentheses and Balanced Bracket Match',
    topic: 'Stacks',
    difficulty: 'Easy',
    language: 'python',
    code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        for char in s:
            if char in mapping:
                top = stack.pop() if stack else '#'
                if mapping[char] != top:
                    return False
            else:
                stack.append(char)
        return not stack`,
    status: 'Accepted',
    runtimeMs: 35,
    memoryMb: 16.5,
    passedTests: 65,
    totalTests: 65,
    submittedAt: '4 days ago, 16:30'
  }
];

export const weeklyActivityMock = [
  { day: 'Mon', submissions: 4, problemsSolved: 2, minutesSpent: 45 },
  { day: 'Tue', submissions: 6, problemsSolved: 3, minutesSpent: 65 },
  { day: 'Wed', submissions: 2, problemsSolved: 1, minutesSpent: 30 },
  { day: 'Thu', submissions: 8, problemsSolved: 4, minutesSpent: 90 },
  { day: 'Fri', submissions: 5, problemsSolved: 2, minutesSpent: 55 },
  { day: 'Sat', submissions: 11, problemsSolved: 5, minutesSpent: 120 },
  { day: 'Sun', submissions: 7, problemsSolved: 3, minutesSpent: 75 }
];
