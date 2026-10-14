import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { mockProblems } from '../data/problemsData';
import { DSATopic, Difficulty, SupportedLanguage, InterviewMessage } from '../types';
import { defaultInterviewSession } from '../data/interviewData';
import { InterviewTimer } from '../components/interview/InterviewTimer';
import { InterviewerChat } from '../components/interview/InterviewerChat';
import { FeedbackReportModal } from '../components/interview/FeedbackReportModal';
import { CodeEditor } from '../components/workspace/CodeEditor';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const MockInterviewPage: React.FC = () => {
  // Session Stages: 'setup' | 'in_progress' | 'completed'
  const [sessionStage, setSessionStage] = useState<'setup' | 'in_progress' | 'completed'>('setup');

  // Setup configuration state
  const [selectedType, setSelectedType] = useState<'Standard Technical' | 'FAANG Screening' | 'Algorithmic Deep-Dive'>('Standard Technical');
  const [selectedTopic, setSelectedTopic] = useState<DSATopic | 'Mixed'>('Mixed');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Medium');
  const [durationMins, setDurationMins] = useState<number>(45);

  // Active session state
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const interviewProblems = [mockProblems[2], mockProblems[1]]; // Rotated binary search + Longest substring
  const activeProblem = interviewProblems[currentProblemIndex];

  const [language, setLanguage] = useState<SupportedLanguage>('python');
  const [code, setCode] = useState<string>(activeProblem.starterCode.python);
  const [messages, setMessages] = useState<InterviewMessage[]>(defaultInterviewSession.messages);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleStartInterview = () => {
    setSessionStage('in_progress');
    setCurrentProblemIndex(0);
    setCode(activeProblem.starterCode[language]);
  };

  const handleNextProblem = () => {
    if (currentProblemIndex < interviewProblems.length - 1) {
      const nextIndex = currentProblemIndex + 1;
      setCurrentProblemIndex(nextIndex);
      setCode(interviewProblems[nextIndex].starterCode[language]);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'interviewer',
          timestamp: 'Live',
          text: `Great work on the previous problem. Let's move on to problem #${nextIndex + 1}: ${interviewProblems[nextIndex].title}. Take a moment to read the prompt on the left.`
        }
      ]);
    } else {
      handleFinishInterview();
    }
  };

  const handleFinishInterview = () => {
    setSessionStage('completed');
    setShowFeedbackModal(true);
  };

  const handleCandidateMessage = (text: string) => {
    const userMsg: InterviewMessage = {
      id: `msg-cand-${Date.now()}`,
      sender: 'candidate',
      timestamp: 'Live',
      text
    };

    setMessages(prev => [...prev, userMsg]);

    // Simulated interviewer response
    setTimeout(() => {
      let reply = "Good thought process. How would you handle an edge case where the array has only 1 element?";
      if (text.toLowerCase().includes('complexity')) {
        reply = "Spot on. Can we achieve O(log N) runtime without allocating additional auxiliary vectors?";
      } else if (text.toLowerCase().includes('two pointer') || text.toLowerCase().includes('binary search')) {
        reply = "Modified binary search is an excellent choice here. What invariant ensures the target remains in the active interval?";
      }

      setMessages(prev => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: 'interviewer',
          timestamp: 'Live',
          text: reply
        }
      ]);
    }, 800);
  };

  const handleRequestHint = () => {
    handleCandidateMessage("Could you give me a small hint regarding how to check which half of the array is sorted?");
  };

  const handleAskClarification = () => {
    handleCandidateMessage("Are duplicate values possible in the input array, or are all numbers guaranteed to be distinct?");
  };

  const handleRestart = () => {
    setShowFeedbackModal(false);
    setSessionStage('setup');
    setMessages(defaultInterviewSession.messages);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Mock Interview Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Timed technical simulation evaluating problem-solving, code correctness, complexity, and communication.
          </p>
        </div>

        {sessionStage === 'in_progress' && (
          <div className="flex items-center gap-3">
            <InterviewTimer
              initialSeconds={durationMins * 60}
              onTimeExpired={handleFinishInterview}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextProblem}
            >
              {currentProblemIndex < interviewProblems.length - 1 ? 'Next Question' : 'Finish Interview'}
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleFinishInterview}
            >
              End Session
            </Button>
          </div>
        )}
      </div>

      {/* Stage A: Setup Wizard Screen */}
      {sessionStage === 'setup' && (
        <Card className="p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="space-y-2 pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white">Configure Your Interview Session</h2>
            <p className="text-xs text-slate-400">
              Customize the interview format, difficulty distribution, and time allowance.
            </p>
          </div>

          {/* Interview Type */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interview Simulation Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'Standard Technical', desc: '1-2 medium problems with complexity focus' },
                { id: 'FAANG Screening', desc: '45-minute timed coding sprint under pressure' },
                { id: 'Algorithmic Deep-Dive', desc: 'Advanced DP and graph optimization' }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedType(t.id as any)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedType === t.id
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm">{t.id}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Topic & Language Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Primary Algorithmic Topic
              </label>
              <select
                value={selectedTopic}
                onChange={e => setSelectedTopic(e.target.value as DSATopic | 'Mixed')}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Mixed">Mixed (Comprehensive Interview)</option>
                <option value="Binary Search">Binary Search & Divide/Conquer</option>
                <option value="Arrays">Arrays & Two Pointers</option>
                <option value="Trees">Trees & Graph Traversals</option>
                <option value="Dynamic Programming">Dynamic Programming & Memoization</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Programming Language
              </label>
              <select
                value={language}
                onChange={e => {
                  const newLang = e.target.value as SupportedLanguage;
                  setLanguage(newLang);
                  setCode(activeProblem.starterCode[newLang]);
                }}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500 uppercase font-mono"
              >
                <option value="python">Python (Recommended for Speed)</option>
                <option value="cpp">C++ (STL & Speed Optimization)</option>
                <option value="java">Java (Enterprise standard)</option>
              </select>
            </div>
          </div>

          {/* Difficulty & Duration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Difficulty Level
              </label>
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value as Difficulty)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Easy">Easy (Entry level calibration)</option>
                <option value="Medium">Medium (Industry standard screening)</option>
                <option value="Hard">Hard (Competitive & bar raiser)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Duration
              </label>
              <select
                value={durationMins}
                onChange={e => setDurationMins(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value={30}>30 Minutes (Rapid screening)</option>
                <option value={45}>45 Minutes (Standard FAANG)</option>
                <option value={60}>60 Minutes (Deep dive)</option>
              </select>
            </div>
          </div>

          {/* Notice Banner */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-900/30 text-xs text-indigo-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Interactive Simulation:</strong> You will be presented with realistic interview challenges alongside a live dialogue panel. At the end, a comprehensive feedback report will evaluate your approach.
            </div>
          </div>

          <div className="pt-2 text-right">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleStartInterview}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Start Interview Simulation
            </Button>
          </div>
        </Card>
      )}

      {/* Stage B: Active Interview In-Progress Screen */}
      {sessionStage === 'in_progress' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-12rem)]">
          {/* Question Panel (4 cols) */}
          <Card className="lg:col-span-4 p-4 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold">
                  Problem {currentProblemIndex + 1} of {interviewProblems.length}
                </span>
                <h2 className="text-base font-bold text-white">{activeProblem.title}</h2>
              </div>
              <Badge difficulty={activeProblem.difficulty} size="sm" />
            </div>

            <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line space-y-3">
              {activeProblem.description}
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Example Input / Output:
              </span>
              <pre className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] text-indigo-300 border border-slate-800">
                Input: {activeProblem.examples[0].input}
                {'\n'}Output: {activeProblem.examples[0].output}
              </pre>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-slate-300">Constraints:</span>
              <ul className="list-disc list-inside space-y-0.5 font-mono">
                {activeProblem.constraints.slice(0, 2).map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Coding Area (5 cols) */}
          <div className="lg:col-span-5 h-full overflow-hidden">
            <CodeEditor
              language={language}
              code={code}
              onChange={setCode}
              onReset={() => setCode(activeProblem.starterCode[language])}
              isDark={true}
            />
          </div>

          {/* Interviewer Conversation Panel (3 cols) */}
          <div className="lg:col-span-3 h-full overflow-hidden">
            <InterviewerChat
              messages={messages}
              onSendMessage={handleCandidateMessage}
              onRequestHint={handleRequestHint}
              onAskClarification={handleAskClarification}
            />
          </div>
        </div>
      )}

      {/* Stage C: Feedback Report Modal */}
      <FeedbackReportModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onRestart={handleRestart}
      />
    </div>
  );
};
