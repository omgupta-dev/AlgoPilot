import { Problem, SupportedLanguage, Submission, SubmissionStatus } from '../types';

export interface RunResult {
  isSuccess: boolean;
  status: 'All Tests Passed' | 'Sample Tests Passed' | 'Wrong Answer' | 'Syntax Error';
  outputDetails: {
    testCaseId: string;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    passed: boolean;
  }[];
  executionTimeMs: number;
  memoryMb: number;
  stdout: string;
  isSimulatedDemo: true;
}

export const mockJudgeService = {
  /**
   * Simulates running code against sample testcases.
   * Clearly marked as frontend demonstration.
   */
  async runSampleTests(problem: Problem, language: SupportedLanguage, userCode: string): Promise<RunResult> {
    // Artificial slight delay to mimic compilation/execution
    await new Promise(res => setTimeout(res, 850));

    const trimmed = userCode.trim();
    const hasSyntaxIssue = trimmed.length < 25 || trimmed.includes('syntax_error_test');

    if (hasSyntaxIssue) {
      return {
        isSuccess: false,
        status: 'Syntax Error',
        outputDetails: [],
        executionTimeMs: 12,
        memoryMb: 8.4,
        stdout: `Traceback (most recent call last):\n  File "solution.${language}", line 3, in solve\n  IndentationError: unexpected indent or incomplete statement.`,
        isSimulatedDemo: true
      };
    }

    // Generate simulated test case outputs based on problem
    const details = problem.sampleTestCases.map((tc, index) => {
      // If code seems minimal or default, make the tests pass
      const passed = true;
      return {
        testCaseId: tc.id,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: tc.expectedOutput,
        passed
      };
    });

    return {
      isSuccess: true,
      status: 'Sample Tests Passed',
      outputDetails: details,
      executionTimeMs: Math.floor(Math.random() * 45) + 35,
      memoryMb: +(Math.random() * 5 + 14).toFixed(1),
      stdout: `[AlgoPilot Demo Sandbox] Compiled in ${language.toUpperCase()} successfully.\nExecuted 3/3 sample test cases without uncaught exceptions.`,
      isSimulatedDemo: true
    };
  },

  /**
   * Simulates a full submission against hidden test suite.
   * Clearly labeled as simulated evaluation.
   */
  async submitCode(problem: Problem, language: SupportedLanguage, userCode: string): Promise<Submission> {
    await new Promise(res => setTimeout(res, 1200));

    const totalTests = problem.sampleTestCases.length + problem.hiddenTestCasesCount;
    const passedTests = totalTests;
    const runtimeMs = Math.floor(Math.random() * 60) + 40;
    const memoryMb = +(Math.random() * 6 + 15).toFixed(1);

    const submission: Submission = {
      id: `sub-${Date.now()}`,
      problemId: problem.id,
      problemTitle: problem.title,
      topic: problem.topic,
      difficulty: problem.difficulty,
      language,
      code: userCode,
      status: 'Accepted' as SubmissionStatus,
      runtimeMs,
      memoryMb,
      passedTests,
      totalTests,
      submittedAt: 'Just now'
    };

    return submission;
  }
};
