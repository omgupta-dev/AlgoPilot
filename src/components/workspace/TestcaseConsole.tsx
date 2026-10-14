import React, { useState } from 'react';
import { Play, Send, CheckCircle2, XCircle, Clock, Cpu } from 'lucide-react';
import { Problem, Submission } from '../../types';
import { RunResult } from '../../services/mockJudgeService';
import { Button } from '../common/Button';

interface TestcaseConsoleProps {
  problem: Problem;
  isRunning: boolean;
  isSubmitting: boolean;
  onRunCode: () => void;
  onSubmitCode: () => void;
  runResult: RunResult | null;
  lastSubmission: Submission | null;
}

export const TestcaseConsole: React.FC<TestcaseConsoleProps> = ({
  problem,
  isRunning,
  isSubmitting,
  onRunCode,
  onSubmitCode,
  runResult,
  lastSubmission
}) => {
  const [activeTab, setActiveTab] = useState<'testcases' | 'result'>('testcases');
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Switch to result tab automatically when run completes
  React.useEffect(() => {
    if (runResult || lastSubmission) {
      setActiveTab('result');
    }
  }, [runResult, lastSubmission]);

  const activeTestCase = problem.sampleTestCases[activeCaseIndex];

  return (
    <div className="flex flex-col h-full bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-inner">
      {/* Console Header: Tabs & Action Buttons */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('testcases')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'testcases'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Test Cases
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'result'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Execution Result</span>
            {lastSubmission && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRunCode}
            isLoading={isRunning}
            leftIcon={<Play className="w-3.5 h-3.5 fill-current text-slate-300" />}
          >
            Run Code
          </Button>

          <Button
            variant="gradient"
            size="sm"
            onClick={onSubmitCode}
            isLoading={isSubmitting}
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* Console Content Body */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-3">
        {activeTab === 'testcases' ? (
          <div className="space-y-3 font-sans">
            {/* TestCase Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {problem.sampleTestCases.map((tc, idx) => (
                <button
                  key={tc.id}
                  onClick={() => {
                    setActiveCaseIndex(idx);
                    setIsCustomMode(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    !isCustomMode && activeCaseIndex === idx
                      ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700/50'
                  }`}
                >
                  Case {idx + 1}
                </button>
              ))}

              <button
                onClick={() => setIsCustomMode(true)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  isCustomMode
                    ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border-slate-700/50'
                }`}
              >
                + Custom Test
              </button>
            </div>

            {/* Test Case Details */}
            {!isCustomMode && activeTestCase ? (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Input:
                  </label>
                  <pre className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-indigo-300 border border-slate-800/80 overflow-x-auto whitespace-pre-wrap">
                    {activeTestCase.input}
                  </pre>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Expected Output:
                  </label>
                  <pre className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800/80 overflow-x-auto whitespace-pre-wrap">
                    {activeTestCase.expectedOutput}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="space-y-2 pt-2">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Custom Input Payload:
                </label>
                <textarea
                  value={customInput}
                  onChange={e => setCustomInput(e.target.value)}
                  placeholder="Enter custom input values (e.g. nums = [1, 2, 3], target = 4)..."
                  rows={4}
                  className="w-full p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-200 border border-slate-800 focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}
          </div>
        ) : (
          /* Execution Result View */
          <div className="space-y-3">
            {lastSubmission ? (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-base font-bold text-emerald-300">
                      {lastSubmission.status}
                    </span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                    {lastSubmission.passedTests}/{lastSubmission.totalTests} Tests Passed
                  </span>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <div>
                      <div className="text-[10px] text-slate-400">Runtime (Simulated)</div>
                      <div className="font-mono text-xs font-semibold text-white">{lastSubmission.runtimeMs} ms</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-[10px] text-slate-400">Memory (Simulated)</div>
                      <div className="font-mono text-xs font-semibold text-white">{lastSubmission.memoryMb} MB</div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
                  ⚡ <strong>Note:</strong> Simulated judge feedback for Phase 1 prototype demonstration. No external server execution required.
                </div>
              </div>
            ) : runResult ? (
              <div className="space-y-3 font-sans">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {runResult.isSuccess ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <span className="font-bold text-white">{runResult.status}</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-3">
                    <span>Runtime: {runResult.executionTimeMs} ms</span>
                    <span>Memory: {runResult.memoryMb} MB</span>
                  </div>
                </div>

                {/* Test case comparison list */}
                <div className="space-y-2 pt-2">
                  {runResult.outputDetails.map((od, i) => (
                    <div
                      key={od.testCaseId}
                      className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between text-[11px] font-sans pb-1 mb-1 border-b border-slate-900">
                        <span className="text-slate-400 font-semibold">Test Case #{i + 1}</span>
                        <span className="text-emerald-400 font-semibold">Passed ✓</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Output: </span>
                        <span className="text-emerald-300">{od.actualOutput}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Expected: </span>
                        <span className="text-slate-400">{od.expectedOutput}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <pre className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-400 border border-slate-800/60 overflow-x-auto">
                  {runResult.stdout}
                </pre>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 space-y-2 font-sans">
                <Play className="w-6 h-6 mx-auto text-slate-600" />
                <p>Click "Run Code" to compile against sample test cases,</p>
                <p className="text-xs text-slate-600">or click "Submit" to evaluate all test cases.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
