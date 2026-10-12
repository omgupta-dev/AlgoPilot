import { ChatMessage, Problem } from '../types';

export const initialMentorMessages: Record<string, ChatMessage[]> = {
  default: [
    {
      id: 'mentor-1',
      sender: 'assistant',
      timestamp: 'Just now',
      content: `👋 Hello! I'm your **AlgoPilot AI Mentor**. 

I'm designed to guide your algorithmic intuition using **Socratic hints** rather than just handing you the final code. 

Select a problem context above, or ask me about:
- **Intuition & Approach**
- **Progressive hints** (without spoiling the solution)
- **Time & Space complexity breakdowns**
- **Common edge cases & debugging patterns**

*Note: This is an interactive frontend demonstration of the AlgoPilot mentor interface.*`
    }
  ]
};

export const aiMentorService = {
  getMentorResponse(userPrompt: string, problem?: Problem, hintStep: number = 1): ChatMessage {
    const promptLower = userPrompt.toLowerCase();
    const probTitle = problem ? problem.title : 'this algorithmic challenge';
    const topic = problem ? problem.topic : 'Data Structures & Algorithms';

    // 1. Give me a hint
    if (promptLower.includes('hint')) {
      if (problem && problem.hints.length > 0) {
        const hintIdx = Math.min(hintStep - 1, problem.hints.length - 1);
        const nextHint = problem.hints[hintIdx];
        return {
          id: `resp-${Date.now()}`,
          sender: 'assistant',
          timestamp: 'Just now',
          content: `💡 **Hint #${hintIdx + 1} for ${probTitle}:**\n\n> "${nextHint}"\n\n*Think about:* How does this narrow down your search space or prevent redundant calculations? Try writing pseudocode for this step before checking further.`,
          hintLevel: hintIdx + 1
        };
      }
      return {
        id: `resp-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        content: `💡 **Algorithmic Hint:** Consider whether you can pre-sort the data, use auxiliary hash lookups, or apply a two-pointer technique to reduce your runtime from quadratic to linear.`,
        hintLevel: 1
      };
    }

    // 2. Explain my error
    if (promptLower.includes('error') || promptLower.includes('bug') || promptLower.includes('fail')) {
      return {
        id: `resp-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        content: `🔍 **Common Pitfall Analysis for ${topic}:**\n\nBased on error patterns in ${topic}, here are the 3 most frequent failure modes:\n\n1. **Boundary / Edge Conditions:** Array lengths of 0 or 1, or when target lies outside bounds.\n2. **Loop Invariants:** Ensure strict inequality (\`<\`) vs non-strict (\`<=\`) matches your pointer adjustment step.\n3. **Integer Overflow / State Overwrite:** Modifying values before using them in subsequent branch checks.\n\nWould you like me to walk through a dry-run with a minimal failure testcase?`
      };
    }

    // 3. Explain the approach
    if (promptLower.includes('approach') || promptLower.includes('how to solve') || promptLower.includes('concept')) {
      const optimal = problem?.optimalComplexity || { time: 'O(N)', space: 'O(N)' };
      return {
        id: `resp-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        content: `🧠 **Recommended Approach for ${probTitle}:**\n\n1. **Recognize the Pattern:** This problem maps to **${topic}**. We want to achieve optimal **${optimal.time}** time and **${optimal.space}** auxiliary space.\n2. **Invariant Maintenance:** At each step, keep track of elements processed so far.\n3. **State Transition:** Use state changes to avoid re-evaluating subproblems.\n\n${problem?.editorialSummary ? `*Summary:* ${problem.editorialSummary}` : ''}`
      };
    }

    // 4. Analyze time complexity
    if (promptLower.includes('complexity') || promptLower.includes('time') || promptLower.includes('space') || promptLower.includes('big o')) {
      const comp = problem?.optimalComplexity || { time: 'O(N log N)', space: 'O(1)' };
      return {
        id: `resp-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        content: `⏱️ **Complexity Breakdown for ${probTitle}:**\n\n- **Time Complexity:** \`${comp.time}\`\n  *Why:* Each element or node is processed a constant number of times.\n- **Space Complexity:** \`${comp.space}\`\n  *Why:* Dependent only on either auxiliary storage or call stack depth.\n\n*Pro Tip for Interviews:* Always state the best-case, average-case, and worst-case scenario to demonstrate rigor!`
      };
    }

    // Default conversational reply
    return {
      id: `resp-${Date.now()}`,
      sender: 'assistant',
      timestamp: 'Just now',
      content: `I'm analyzing your question regarding **${probTitle}**.\n\nFor **${topic}**, the key is breaking down the recurrence relation and testing boundary conditions with minimal inputs (e.g. empty inputs or length 1).\n\nFeel free to click one of the suggested action chips below for guided hints or complexity analysis!`
    };
  }
};
