import { Problem } from '../types';

export const mockProblems: Problem[] = [
  {
    id: 'prob-1',
    title: 'Two Sum Target Pair',
    slug: 'two-sum-target-pair',
    difficulty: 'Easy',
    topic: 'Arrays',
    tags: ['Array', 'Hash Map', 'Two Pointers'],
    acceptanceRate: 72.4,
    estimatedTimeMin: 15,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your adaptive solution here
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
`,
      cpp: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        // Write your solution here
        std::unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] {seen.get(complement), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-1', input: '[2, 7, 11, 15]\n9', expectedOutput: '[0, 1]', isSample: true, explanation: 'Basic test case' },
      { id: 'tc-2', input: '[3, 2, 4]\n6', expectedOutput: '[1, 2]', isSample: true, explanation: 'Non-adjacent indices' },
      { id: 'tc-3', input: '[3, 3]\n6', expectedOutput: '[0, 1]', isSample: true, explanation: 'Duplicate values' }
    ],
    hiddenTestCasesCount: 28,
    hints: [
      'A brute force O(N^2) checks every pair. Can we do better using auxiliary space?',
      'Think about what you are searching for: if current number is x, you need target - x.',
      'A hash map enables O(1) lookups of previously visited numbers and their indices.'
    ],
    optimalComplexity: {
      time: 'O(N)',
      space: 'O(N)'
    },
    editorialSummary: 'Using a single-pass hash map gives linear time complexity while keeping space bounded to N elements.',
    companyTags: ['Amazon', 'Google', 'Microsoft', 'Meta']
  },
  {
    id: 'prob-2',
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating',
    difficulty: 'Medium',
    topic: 'Strings',
    tags: ['String', 'Sliding Window', 'Hash Table'],
    acceptanceRate: 54.1,
    estimatedTimeMin: 25,
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.

A substring is a contiguous non-empty sequence of characters within a string.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    starterCode: {
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Implement sliding window approach
        char_index = {}
        max_len = 0
        left = 0
        for right, char in enumerate(s):
            if char in char_index and char_index[char] >= left:
                left = char_index[char] + 1
            char_index[char] = right
            max_len = max(max_len, right - left + 1)
        return max_len
`,
      cpp: `#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::unordered_map<char, int> last_seen;
        int max_len = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            if (last_seen.count(s[right]) && last_seen[s[right]] >= left) {
                left = last_seen[s[right]] + 1;
            }
            last_seen[s[right]] = right;
            max_len = std::max(max_len, right - left + 1);
        }
        return max_len;
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (lastSeen.containsKey(c) && lastSeen.get(c) >= left) {
                left = lastSeen.get(c) + 1;
            }
            lastSeen.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-2a', input: '"abcabcbb"', expectedOutput: '3', isSample: true },
      { id: 'tc-2b', input: '"bbbbb"', expectedOutput: '1', isSample: true },
      { id: 'tc-2c', input: '"pwwkew"', expectedOutput: '3', isSample: true }
    ],
    hiddenTestCasesCount: 45,
    hints: [
      'Maintain a sliding window [left, right] that contains only distinct characters.',
      'When you see a duplicate character, move the left pointer past the previous occurrence.',
      'Instead of incrementing left one-by-one, store the last index of each character.'
    ],
    optimalComplexity: {
      time: 'O(N)',
      space: 'O(min(N, M)) where M is character set size'
    },
    editorialSummary: 'Sliding window with hash map storing latest character coordinates ensures single pass traversal.',
    companyTags: ['Amazon', 'Microsoft', 'Google', 'Uber']
  },
  {
    id: 'prob-3',
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
    difficulty: 'Medium',
    topic: 'Binary Search',
    tags: ['Binary Search', 'Arrays', 'Dividing'],
    acceptanceRate: 41.8,
    estimatedTimeMin: 25,
    description: `There is an integer array \`nums\` sorted in ascending order with distinct values.

Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index \`k\` (1 <= k < nums.length) such that the resulting array is \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\`.

Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0',
        output: '4',
        explanation: 'Target 0 is found at index 4.'
      },
      {
        input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 3',
        output: '-1',
        explanation: 'Target 3 does not exist in nums.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i] <= 10^4',
      'All values of nums are unique.',
      'nums is guaranteed to be rotated at some pivot.'
    ],
    starterCode: {
      python: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            # Determine which half is sorted
            if nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1
        return -1
`,
      cpp: `#include <vector>

class Solution {
public:
    int search(std::vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid])
                    high = mid - 1;
                else
                    low = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[high])
                    low = mid + 1;
                else
                    high = mid - 1;
            }
        }
        return -1;
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-3a', input: '[4, 5, 6, 7, 0, 1, 2]\n0', expectedOutput: '4', isSample: true },
      { id: 'tc-3b', input: '[4, 5, 6, 7, 0, 1, 2]\n3', expectedOutput: '-1', isSample: true },
      { id: 'tc-3c', input: '[1]\n0', expectedOutput: '-1', isSample: true }
    ],
    hiddenTestCasesCount: 50,
    hints: [
      'In a rotated sorted array, one half is always normally sorted.',
      'Check if nums[low] <= nums[mid] to verify if left side is sorted.',
      'If left is sorted, verify if target lies between nums[low] and nums[mid]. Otherwise search the other side.'
    ],
    optimalComplexity: {
      time: 'O(log N)',
      space: 'O(1)'
    },
    editorialSummary: 'Modified binary search identifies the sorted half at every step and determines whether the target falls within that bounded interval.',
    companyTags: ['Microsoft', 'Amazon', 'Google', 'Meta']
  },
  {
    id: 'prob-4',
    title: 'Coin Change Minimum Coins',
    slug: 'coin-change-minimum-coins',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    tags: ['Dynamic Programming', 'Breadth-First Search', 'Memoization'],
    acceptanceRate: 43.6,
    estimatedTimeMin: 30,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      {
        input: 'coins = [1, 2, 5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins total)'
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1',
        explanation: 'The amount of 3 cannot be made with coins of denomination 2.'
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0',
        explanation: '0 amount requires 0 coins.'
      }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    starterCode: {
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for c in coins:
                if i - c >= 0:
                    dp[i] = min(dp[i], dp[i - c] + 1)
        return dp[amount] if dp[amount] != float('inf') else -1
`,
      cpp: `#include <vector>
#include <algorithm>

class Solution {
public:
    int coinChange(std::vector<int>& coins, int amount) {
        std::vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i - c >= 0) {
                    dp[i] = std::min(dp[i], dp[i - c] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
      java: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int c : coins) {
                if (i - c >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - c] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-4a', input: '[1, 2, 5]\n11', expectedOutput: '3', isSample: true },
      { id: 'tc-4b', input: '[2]\n3', expectedOutput: '-1', isSample: true },
      { id: 'tc-4c', input: '[1]\n0', expectedOutput: '0', isSample: true }
    ],
    hiddenTestCasesCount: 40,
    hints: [
      'Define dp[i] as the minimum coins needed to form amount i.',
      'The recurrence relation is dp[i] = min(dp[i - coin] + 1) for all coins where coin <= i.',
      'Initialize base state dp[0] = 0 and all other states with infinity.'
    ],
    optimalComplexity: {
      time: 'O(amount * coins.length)',
      space: 'O(amount)'
    },
    editorialSummary: 'Classic bottom-up unbounded knapsack DP variation where each sub-problem solves minimum coin count for smaller amounts.',
    companyTags: ['Amazon', 'Google', 'Bloomberg', 'Microsoft']
  },
  {
    id: 'prob-5',
    title: 'Valid Parentheses and Balanced Bracket Match',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    topic: 'Stacks',
    tags: ['Stack', 'String', 'Parsing'],
    acceptanceRate: 81.3,
    estimatedTimeMin: 15,
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only: ()[]{}'
    ],
    starterCode: {
      python: `class Solution:
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
        return not stack
`,
      cpp: `#include <string>
#include <stack>
#include <unordered_map>

class Solution {
public:
    bool isValid(std::string s) {
        std::stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top(); st.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return st.empty();
    }
};`,
      java: `import java.util.Stack;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-5a', input: '"()"', expectedOutput: 'true', isSample: true },
      { id: 'tc-5b', input: '"()[]{}"', expectedOutput: 'true', isSample: true },
      { id: 'tc-5c', input: '"(]"', expectedOutput: 'false', isSample: true }
    ],
    hiddenTestCasesCount: 65,
    hints: [
      'A stack provides LIFO (last-in, first-out) ordering which matches the nested closing behavior.',
      'Check for early exit when the string length is odd.',
      'Make sure the stack is completely empty at the end.'
    ],
    optimalComplexity: {
      time: 'O(N)',
      space: 'O(N)'
    },
    editorialSummary: 'Push opening brackets; pop and compare upon encountering closing brackets. If empty or mismatched, return false.',
    companyTags: ['Meta', 'Amazon', 'Microsoft', 'Apple']
  },
  {
    id: 'prob-6',
    title: 'Lowest Common Ancestor of Binary Tree',
    slug: 'lowest-common-ancestor-binary-tree',
    difficulty: 'Medium',
    topic: 'Trees',
    tags: ['Tree', 'Binary Tree', 'DFS', 'Recursion'],
    acceptanceRate: 59.8,
    estimatedTimeMin: 25,
    description: `Given a binary tree, find the lowest common ancestor (LCA) of two given nodes \`p\` and \`q\`.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow a node to be a descendant of itself).”`,
    examples: [
      {
        input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1',
        output: '3',
        explanation: 'The LCA of nodes 5 and 1 is 3.'
      },
      {
        input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4',
        output: '5',
        explanation: 'The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself.'
      }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      '-10^9 <= Node.val <= 10^9',
      'All Node.val are unique.',
      'p != q',
      'p and q will exist in the tree.'
    ],
    starterCode: {
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root or root == p or root == q:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right:
            return root
        return left if left else right
`,
      cpp: `// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};`,
      java: `public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-6a', input: 'root=[3,5,1,6,2,0,8], p=5, q=1', expectedOutput: '3', isSample: true },
      { id: 'tc-6b', input: 'root=[3,5,1,6,2,0,8], p=5, q=4', expectedOutput: '5', isSample: true }
    ],
    hiddenTestCasesCount: 42,
    hints: [
      'Post-order traversal allows bottom-up evaluation of whether p and q exist in left or right subtrees.',
      'If both left and right return non-null, root is the LCA.',
      'If only one returns non-null, pass that result upwards.'
    ],
    optimalComplexity: {
      time: 'O(N)',
      space: 'O(H) recursion stack where H is tree height'
    },
    editorialSummary: 'Depth first search bubbles up matching target nodes. The first intersection where both branches are populated is the LCA.',
    companyTags: ['Meta', 'Amazon', 'Google', 'Microsoft']
  },
  {
    id: 'prob-7',
    title: 'Course Schedule Dependency Resolution',
    slug: 'course-schedule-topological-sort',
    difficulty: 'Medium',
    topic: 'Graphs',
    tags: ['Graph', 'Topological Sort', 'BFS', 'Cycle Detection'],
    acceptanceRate: 46.2,
    estimatedTimeMin: 30,
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`.

For example, the pair \`[0, 1]\`, indicates that to take course \`0\` you have to first take course \`1\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\` (i.e. if there is a cycle).`,
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1, 0]]',
        output: 'true',
        explanation: 'There are 2 courses to take. To take course 1 you should have finished course 0. So it is possible.'
      },
      {
        input: 'numCourses = 2, prerequisites = [[1, 0], [0, 1]]',
        output: 'false',
        explanation: 'There are 2 courses to take. To take course 1 you should have finished course 0, and vice versa. Impossible cycle.'
      }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= a_i, b_i < numCourses',
      'All the pairs prerequisites[i] are unique.'
    ],
    starterCode: {
      python: `from collections import deque, defaultdict

class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        adj = defaultdict(list)
        indegree = [0] * numCourses
        for dest, src in prerequisites:
            adj[src].append(dest)
            indegree[dest] += 1
            
        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        processed = 0
        while queue:
            node = queue.popleft()
            processed += 1
            for neighbor in adj[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)
        return processed == numCourses
`,
      cpp: `#include <vector>
#include <queue>

class Solution {
public:
    bool canFinish(int numCourses, std::vector<std::vector<int>>& prerequisites) {
        std::vector<std::vector<int>> adj(numCourses);
        std::vector<int> indegree(numCourses, 0);
        for (const auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }
        std::queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.push(i);
        }
        int count = 0;
        while (!q.empty()) {
            int curr = q.front(); q.pop();
            count++;
            for (int next : adj[curr]) {
                if (--indegree[next] == 0) q.push(next);
            }
        }
        return count == numCourses;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[numCourses];
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            indegree[p[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.offer(i);
        }
        int count = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            count++;
            for (int next : adj.get(curr)) {
                if (--indegree[next] == 0) q.offer(next);
            }
        }
        return count == numCourses;
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-7a', input: '2\n[[1, 0]]', expectedOutput: 'true', isSample: true },
      { id: 'tc-7b', input: '2\n[[1, 0], [0, 1]]', expectedOutput: 'false', isSample: true }
    ],
    hiddenTestCasesCount: 45,
    hints: [
      'This problem is equivalent to detecting a cycle in a directed graph.',
      'Kahn’s algorithm (BFS with in-degree array) easily detects if a topological ordering includes all vertices.',
      'If total popped nodes equals numCourses, no cycle exists.'
    ],
    optimalComplexity: {
      time: 'O(V + E)',
      space: 'O(V + E)'
    },
    editorialSummary: 'Topological sort via Kahn’s algorithm keeps track of in-degrees. Decrementing neighbors simulates taking courses without dependencies.',
    companyTags: ['Google', 'Uber', 'Amazon', 'Microsoft']
  },
  {
    id: 'prob-8',
    title: 'Sliding Window Maximum',
    slug: 'sliding-window-maximum',
    difficulty: 'Hard',
    topic: 'Queues',
    tags: ['Queue', 'Monotonic Deque', 'Sliding Window'],
    acceptanceRate: 46.5,
    estimatedTimeMin: 35,
    description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.`,
    examples: [
      {
        input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
        output: '[3,3,5,5,6,7]',
        explanation: 'Window position: [1 3 -1] -> 3, [3 -1 -3] -> 3, [-1 -3 5] -> 5, [-3 5 3] -> 5, [5 3 6] -> 6, [3 6 7] -> 7.'
      },
      {
        input: 'nums = [1], k = 1',
        output: '[1]'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      '1 <= k <= nums.length'
    ],
    starterCode: {
      python: `from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        deq = deque()
        res = []
        for i, n in enumerate(nums):
            # Remove indices that fall outside window
            if deq and deq[0] < i - k + 1:
                deq.popleft()
            # Maintain decreasing monotonic queue
            while deq and nums[deq[-1]] < n:
                deq.pop()
            deq.append(i)
            if i >= k - 1:
                res.append(nums[deq[0]])
        return res
`,
      cpp: `#include <vector>
#include <deque>

class Solution {
public:
    std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
        std::deque<int> dq;
        std::vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            if (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
            while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) res.push_back(nums[dq.front()]);
        }
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        Deque<Integer> dq = new ArrayDeque<>();
        int[] res = new int[nums.length - k + 1];
        int idx = 0;
        for (int i = 0; i < nums.length; i++) {
            if (!dq.isEmpty() && dq.peekFirst() < i - k + 1) dq.pollFirst();
            while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast();
            dq.offerLast(i);
            if (i >= k - 1) res[idx++] = nums[dq.peekFirst()];
        }
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-8a', input: '[1,3,-1,-3,5,3,6,7]\n3', expectedOutput: '[3, 3, 5, 5, 6, 7]', isSample: true },
      { id: 'tc-8b', input: '[1]\n1', expectedOutput: '[1]', isSample: true }
    ],
    hiddenTestCasesCount: 52,
    hints: [
      'A max-heap gives O(N log k). Can you do O(N) using a Monotonic Queue?',
      'Store indices instead of values so you can easily prune elements falling out of the window [i - k + 1, i].',
      'The head of the deque always holds the index of the maximum element for the current window.'
    ],
    optimalComplexity: {
      time: 'O(N)',
      space: 'O(k)'
    },
    editorialSummary: 'Monotonic decreasing double-ended queue maintains the maximum candidate at the front, popping lesser elements from the rear in amortized O(1).',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft']
  },
  {
    id: 'prob-9',
    title: 'Word Search Matrix Backtracking',
    slug: 'word-search-matrix-backtracking',
    difficulty: 'Medium',
    topic: 'Backtracking',
    tags: ['Backtracking', 'Matrix', 'DFS', 'Recursion'],
    acceptanceRate: 41.2,
    estimatedTimeMin: 30,
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    examples: [
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
        output: 'true'
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
        output: 'true'
      },
      {
        input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
        output: 'false'
      }
    ],
    constraints: [
      'm == board.length',
      'n = board[i].length',
      '1 <= m, n <= 6',
      '1 <= word.length <= 15',
      'board and word consist of only lowercase and uppercase English letters.'
    ],
    starterCode: {
      python: `class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])
        
        def backtrack(r, c, idx):
            if idx == len(word):
                return True
            if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[idx]:
                return False
            temp = board[r][c]
            board[r][c] = '#'
            found = (backtrack(r+1, c, idx+1) or
                     backtrack(r-1, c, idx+1) or
                     backtrack(r, c+1, idx+1) or
                     backtrack(r, c-1, idx+1))
            board[r][c] = temp
            return found

        for r in range(rows):
            for c in range(cols):
                if backtrack(r, c, 0):
                    return True
        return False
`,
      cpp: `#include <vector>
#include <string>

class Solution {
public:
    bool exist(std::vector<std::vector<char>>& board, std::string word) {
        int m = board.size(), n = board[0].size();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }
private:
    bool dfs(std::vector<std::vector<char>>& b, const std::string& w, int r, int c, int k) {
        if (k == w.size()) return true;
        if (r < 0 || r >= b.size() || c < 0 || c >= b[0].size() || b[r][c] != w[k]) return false;
        char tmp = b[r][c];
        b[r][c] = '#';
        bool res = dfs(b, w, r+1, c, k+1) || dfs(b, w, r-1, c, k+1) ||
                   dfs(b, w, r, c+1, k+1) || dfs(b, w, r, c-1, k+1);
        b[r][c] = tmp;
        return res;
    }
};`,
      java: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }
    private boolean dfs(char[][] b, String w, int r, int c, int k) {
        if (k == w.length()) return true;
        if (r < 0 || r >= b.length() || c < 0 || c >= b[0].length || b[r][c] != w.charAt(k)) return false;
        char tmp = b[r][c];
        b[r][c] = '#';
        boolean res = dfs(b, w, r + 1, c, k + 1) || dfs(b, w, r - 1, c, k + 1) ||
                      dfs(b, w, r, c + 1, k + 1) || dfs(b, w, r, c - 1, k + 1);
        b[r][c] = tmp;
        return res;
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-9a', input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"', expectedOutput: 'true', isSample: true },
      { id: 'tc-9b', input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"SEE"', expectedOutput: 'true', isSample: true },
      { id: 'tc-9c', input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCB"', expectedOutput: 'false', isSample: true }
    ],
    hiddenTestCasesCount: 48,
    hints: [
      'Iterate through every cell in the grid and initiate a DFS search whenever the first letter matches.',
      'Mark the current cell temporarily (e.g. board[r][c] = "#") to avoid visiting the same cell twice in the current branch.',
      'Restore the cell before returning (backtracking step).'
    ],
    optimalComplexity: {
      time: 'O(N * 4^L) where L is word length and N is grid size',
      space: 'O(L) recursion stack'
    },
    editorialSummary: 'Depth first search with in-place character masking avoids visited set allocations and backtracks cleanly on path dead-ends.',
    companyTags: ['Microsoft', 'Amazon', 'Bloomberg', 'Apple']
  },
  {
    id: 'prob-10',
    title: 'Task Scheduler with Cooldown Intervals',
    slug: 'task-scheduler-greedy',
    difficulty: 'Medium',
    topic: 'Greedy Algorithms',
    tags: ['Greedy', 'Priority Queue', 'Counting', 'Sorting'],
    acceptanceRate: 58.7,
    estimatedTimeMin: 25,
    description: `Given a characters array \`tasks\`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer \`n\` that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least \`n\` units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.`,
    examples: [
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 2',
        output: '8',
        explanation: 'A -> B -> idle -> A -> B -> idle -> A -> B. Total time is 8.'
      },
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 0',
        output: '6',
        explanation: 'With n = 0, no idle time required. Total time is 6.'
      }
    ],
    constraints: [
      '1 <= tasks.length <= 10^4',
      'tasks[i] is uppercase English letter.',
      '0 <= n <= 100'
    ],
    starterCode: {
      python: `from collections import Counter

class Solution:
    def leastInterval(self, tasks: list[str], n: int) -> int:
        counts = Counter(tasks)
        max_freq = max(counts.values())
        max_count = sum(1 for val in counts.values() if val == max_freq)
        
        part_count = max_freq - 1
        part_length = n - (max_count - 1)
        empty_slots = part_count * part_length
        available_tasks = len(tasks) - (max_freq * max_count)
        idles = max(0, empty_slots - available_tasks)
        
        return len(tasks) + idles
`,
      cpp: `#include <vector>
#include <algorithm>
#include <unordered_map>

class Solution {
public:
    int leastInterval(std::vector<char>& tasks, int n) {
        std::unordered_map<char, int> freq;
        int max_freq = 0;
        for (char c : tasks) {
            freq[c]++;
            max_freq = std::max(max_freq, freq[c]);
        }
        int max_count = 0;
        for (auto& p : freq) {
            if (p.second == max_freq) max_count++;
        }
        int parts = max_freq - 1;
        int empty_slots = parts * (n - (max_count - 1));
        int available_tasks = tasks.size() - (max_freq * max_count);
        int idles = std::max(0, empty_slots - available_tasks);
        return tasks.size() + idles;
    }
};`,
      java: `import java.util.*;

class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        int maxFreq = 0;
        for (char c : tasks) {
            freq[c - 'A']++;
            maxFreq = Math.max(maxFreq, freq[c - 'A']);
        }
        int maxCount = 0;
        for (int f : freq) {
            if (f == maxFreq) maxCount++;
        }
        int parts = maxFreq - 1;
        int emptySlots = parts * (n - (maxCount - 1));
        int availableTasks = tasks.length - (maxFreq * maxCount);
        int idles = Math.max(0, emptySlots - availableTasks);
        return tasks.length + idles;
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-10a', input: '["A","A","A","B","B","B"]\n2', expectedOutput: '8', isSample: true },
      { id: 'tc-10b', input: '["A","A","A","B","B","B"]\n0', expectedOutput: '6', isSample: true }
    ],
    hiddenTestCasesCount: 38,
    hints: [
      'The most frequent task dictates the minimum frame size.',
      'Arrange the most frequent tasks first, then fill empty slots with remaining tasks or idle cycles.',
      'Formula: total_time = tasks.length + max(0, idles).'
    ],
    optimalComplexity: {
      time: 'O(N)',
      space: 'O(1) alphabet size 26'
    },
    editorialSummary: 'Greedy frame placement analyzes the bottleneck created by the highest frequency task and fills slots mathematically.',
    companyTags: ['Meta', 'Amazon', 'Google']
  },
  {
    id: 'prob-11',
    title: 'Reverse Linked List Subsegments',
    slug: 'reverse-linked-list-ii',
    difficulty: 'Medium',
    topic: 'Linked Lists',
    tags: ['Linked List', 'Pointers', 'In-place'],
    acceptanceRate: 47.9,
    estimatedTimeMin: 20,
    description: `Given the \`head\` of a singly linked list and two integers \`left\` and \`right\` where \`left <= right\`, reverse the nodes of the list from position \`left\` to position \`right\`, and return the reversed list.

Positions are 1-indexed.`,
    examples: [
      {
        input: 'head = [1, 2, 3, 4, 5], left = 2, right = 4',
        output: '[1, 4, 3, 2, 5]'
      },
      {
        input: 'head = [5], left = 1, right = 1',
        output: '[5]'
      }
    ],
    constraints: [
      'The number of nodes in the list is n.',
      '1 <= n <= 500',
      '-500 <= Node.val <= 500',
      '1 <= left <= right <= n'
    ],
    starterCode: {
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def reverseBetween(self, head: 'ListNode', left: int, right: int) -> 'ListNode':
        if not head or left == right:
            return head
        dummy = ListNode(0, head)
        prev = dummy
        for _ in range(left - 1):
            prev = prev.next
        
        curr = prev.next
        for _ in range(right - left):
            temp = curr.next
            curr.next = temp.next
            temp.next = prev.next
            prev.next = temp
            
        return dummy.next
`,
      cpp: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x, ListNode *n = nullptr) : val(x), next(n) {}
};

class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        if (!head || left == right) return head;
        ListNode dummy(0, head);
        ListNode* prev = &dummy;
        for (int i = 0; i < left - 1; i++) prev = prev->next;
        ListNode* curr = prev->next;
        for (int i = 0; i < right - left; i++) {
            ListNode* temp = curr->next;
            curr->next = temp->next;
            temp->next = prev->next;
            prev->next = temp;
        }
        return dummy.next;
    }
};`,
      java: `public class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode reverseBetween(ListNode head, int left, int right) {
        if (head == null || left == right) return head;
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        for (int i = 0; i < left - 1; i++) prev = prev.next;
        ListNode curr = prev.next;
        for (int i = 0; i < right - left; i++) {
            ListNode temp = curr.next;
            curr.next = temp.next;
            temp.next = prev.next;
            prev.next = temp;
        }
        return dummy.next;
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-11a', input: '[1, 2, 3, 4, 5]\n2\n4', expectedOutput: '[1, 4, 3, 2, 5]', isSample: true },
      { id: 'tc-11b', input: '[5]\n1\n1', expectedOutput: '[5]', isSample: true }
    ],
    hiddenTestCasesCount: 35,
    hints: [
      'Use a dummy head node to simplify corner cases when left == 1.',
      'Advance a pointer to the node immediately before the reversal sublist.',
      'Repeatedly pull the next node to the front of the reversed partition.'
    ],
    optimalComplexity: {
      time: 'O(N)',
      space: 'O(1)'
    },
    editorialSummary: 'Single pass reversal using a dummy node and four-pointer rearrangement avoids allocating auxiliary arrays.',
    companyTags: ['Microsoft', 'Amazon', 'Apple']
  },
  {
    id: 'prob-12',
    title: 'Group Anagrams by Character Signature',
    slug: 'group-anagrams-by-signature',
    difficulty: 'Medium',
    topic: 'Hashing',
    tags: ['Hash Map', 'String', 'Sorting'],
    acceptanceRate: 67.8,
    estimatedTimeMin: 20,
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      },
      {
        input: 'strs = [""]',
        output: '[[""]]'
      },
      {
        input: 'strs = ["a"]',
        output: '[["a"]]'
      }
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    starterCode: {
      python: `from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        groups = defaultdict(list)
        for s in strs:
            key = ''.join(sorted(s))
            groups[key].append(s)
        return list(groups.values())
`,
      cpp: `#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {
        std::unordered_map<std::string, std::vector<std::string>> map;
        for (const auto& s : strs) {
            std::string key = s;
            std::sort(key.begin(), key.end());
            map[key].push_back(s);
        }
        std::vector<std::vector<std::string>> res;
        for (auto& p : map) res.push_back(p.second);
        return res;
    }
};`,
      java: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`
    },
    sampleTestCases: [
      { id: 'tc-12a', input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]', isSample: true },
      { id: 'tc-12b', input: '[""]', expectedOutput: '[[""]]', isSample: true }
    ],
    hiddenTestCasesCount: 40,
    hints: [
      'Words that are anagrams have identical sorted representations.',
      'Alternatively, a frequency count tuple of 26 characters can act as the map key in O(K) instead of O(K log K).',
      'Group into a hash map where key is the signature and value is the list of matching strings.'
    ],
    optimalComplexity: {
      time: 'O(N * K log K) or O(N * K)',
      space: 'O(N * K)'
    },
    editorialSummary: 'Mapping canonized word representations (either sorted characters or letter frequency tuples) collects anagram clusters linearly.',
    companyTags: ['Amazon', 'Uber', 'Microsoft', 'Google']
  }
];
