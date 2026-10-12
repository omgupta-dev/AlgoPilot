import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Bot,
  BarChart2,
  Bookmark,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { mockProblems } from '../data/problemsData';
import { Problem, SupportedLanguage, Submission } from '../types';
import { storageService } from '../services/storageService';
import { mockJudgeService, RunResult } from '../services/mockJudgeService';
import { CodeEditor } from '../components/workspace/CodeEditor';
import { ProblemDetails } from '../components/workspace/ProblemDetails';
import { TestcaseConsole } from '../components/workspace/TestcaseConsole';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export const WorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Selected problem fallback
  const activeProblem: Problem =
    mockProblems.find(p => p.id === id || p.slug === id) || mockProblems[0];

  const [language, setLanguage] = useState<SupportedLanguage>(user.preferences.preferredLanguage || 'python');
  const [code, setCode] = useState<string>(() => {
    const saved = storageService.getCodeDraft(activeProblem.id, language);
    return saved || activeProblem.starterCode[language] || activeProblem.starterCode.python;
  });

  const [isBookmarked, setIsBookmarked] = useState<boolean>(() => storageService.isBookmarked(activeProblem.id));
  const [isSolved, setIsSolved] = useState<boolean>(() => storageService.getSolvedProblemIds().includes(activeProblem.id));

  // Simulation execution state
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [lastSubmission, setLastSubmission] = useState<Submission | null>(null);

  // Sync draft code whenever language changes
  useEffect(() => {
    const draft = storageService.getCodeDraft(activeProblem.id, language);
    setCode(draft || activeProblem.starterCode[language]);
  }, [language, activeProblem.id]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    storageService.saveCodeDraft(activeProblem.id, language, newCode);
  };

  const handleResetCode = () => {
    const initial = activeProblem.starterCode[language];
    setCode(initial);
    storageService.saveCodeDraft(activeProblem.id, language, initial);
  };

  const handleToggleBookmark = () => {
    const updated = storageService.toggleBookmark(activeProblem.id);
    setIsBookmarked(updated.includes(activeProblem.id));
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setLastSubmission(null);
    try {
      const result = await mockJudgeService.runSampleTests(activeProblem, language, code);
      setRunResult(result);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setRunResult(null);
    try {
      const sub = await mockJudgeService.submitCode(activeProblem, language, code);
      setLastSubmission(sub);
      storageService.addSubmission(sub);
      storageService.markProblemSolved(activeProblem.id);
      setIsSolved(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] -m-4 sm:-m-6 lg:-m-8 p-3 sm:p-4 bg-slate-950 overflow-hidden">
      {/* Workspace Top Toolbar */}
      <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800 gap-3 flex-wrap flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/problems"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Explorer</span>
          </Link>

          <span className="text-slate-700">|</span>

          {/* Quick Problem Switcher */}
          <select
            value={activeProblem.id}
            onChange={e => navigate(`/workspace/${e.target.value}`)}
            className="bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
          >
            {mockProblems.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>
        </div>

        {/* Right Toolbar: Language Switcher, AI Mentor shortcut, Analytics shortcut */}
        <div className="flex items-center gap-2.5">
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <span className="text-[11px] text-slate-400 pl-1.5 font-medium">Lang:</span>
            {(['python', 'cpp', 'java'] as SupportedLanguage[]).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 rounded text-xs font-mono font-medium transition-colors ${
                  language === lang
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Link to AI Mentor for this problem */}
          <Link to={`/ai-mentor?problem=${activeProblem.id}`}>
            <Button variant="secondary" size="sm" leftIcon={<Bot className="w-3.5 h-3.5 text-indigo-400" />}>
              <span className="hidden md:inline">Ask AI Mentor</span>
            </Button>
          </Link>

          {/* Link to Analytics */}
          <Link to="/analytics">
            <Button variant="ghost" size="sm" leftIcon={<BarChart2 className="w-3.5 h-3.5" />}>
              <span className="hidden md:inline">Analytics</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Workspace Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 pt-3 min-h-0 overflow-hidden">
        {/* Left Column: Problem Details Panel (5 cols on lg) */}
        <div className="lg:col-span-5 h-full overflow-hidden bg-slate-900/60 rounded-xl border border-slate-800 p-4">
          <ProblemDetails
            problem={activeProblem}
            isBookmarked={isBookmarked}
            onToggleBookmark={handleToggleBookmark}
            isSolved={isSolved}
          />
        </div>

        {/* Right Column: Code Editor + Testcase Console (7 cols on lg) */}
        <div className="lg:col-span-7 h-full flex flex-col gap-3 min-h-0 overflow-hidden">
          {/* Top Half: Code Editor */}
          <div className="flex-1 min-h-[320px] overflow-hidden">
            <CodeEditor
              language={language}
              code={code}
              onChange={handleCodeChange}
              onReset={handleResetCode}
              isDark={true}
            />
          </div>

          {/* Bottom Half: Testcase Console & Simulated Judge */}
          <div className="h-64 flex-shrink-0 overflow-hidden">
            <TestcaseConsole
              problem={activeProblem}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
              onRunCode={handleRunCode}
              onSubmitCode={handleSubmitCode}
              runResult={runResult}
              lastSubmission={lastSubmission}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
