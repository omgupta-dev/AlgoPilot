import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Bot,
  User,
  Send,
  Lightbulb,
  AlertTriangle,
  Layers,
  Clock,
  Sparkles,
  Copy,
  Check,
  Terminal,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { mockProblems } from '../data/problemsData';
import { Problem, ChatMessage } from '../types';
import { aiMentorService, initialMentorMessages } from '../services/aiMentorService';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const AiMentorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const problemParam = searchParams.get('problem');

  const [selectedProblemId, setSelectedProblemId] = useState<string>(
    problemParam || mockProblems[0].id
  );
  const selectedProblem: Problem =
    mockProblems.find(p => p.id === selectedProblemId) || mockProblems[0];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMentorMessages.default);
  const [inputText, setInputText] = useState('');
  const [hintStep, setHintStep] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate simulated AI Socratic mentor response
    setTimeout(() => {
      const isHintPrompt = text.toLowerCase().includes('hint');
      const response = aiMentorService.getMentorResponse(text, selectedProblem, hintStep);
      if (isHintPrompt) {
        setHintStep(prev => prev + 1);
      }
      setMessages(prev => [...prev, response]);
    }, 600);
  };

  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col lg:flex-row gap-6 animate-in fade-in duration-200">
      {/* Left Column: Problem Context & Quick Actions Panel (4 cols on lg) */}
      <div className="lg:w-80 flex flex-col gap-4 flex-shrink-0">
        {/* Context Selector Card */}
        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Active Problem Context</span>
          </div>

          <select
            value={selectedProblemId}
            onChange={e => {
              setSelectedProblemId(e.target.value);
              setHintStep(1);
            }}
            className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {mockProblems.map(p => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.difficulty})
              </option>
            ))}
          </select>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">{selectedProblem.title}</span>
              <Badge difficulty={selectedProblem.difficulty} size="sm" />
            </div>
            <p className="text-slate-400 line-clamp-3 leading-relaxed">
              {selectedProblem.description}
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-850">
              <span className="text-[11px] text-slate-400">{selectedProblem.topic}</span>
              <Link
                to={`/workspace/${selectedProblem.id}`}
                className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Open in Editor <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </Card>

        {/* Socratic Mentor Principles */}
        <Card className="p-4 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Socratic Learning Mode</span>
          </div>
          <p className="leading-relaxed">
            The mentor will never dump complete solutions directly. It guides you using progressive clues, edge case nudges, and complexity analysis so you build true problem-solving intuition.
          </p>
        </Card>

        {/* Phase 1 Demonstration Notice */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <span>
            Demonstration AI Mentor Interface — simulating Socratic DSA guidance without requiring external cloud API keys.
          </span>
        </div>
      </div>

      {/* Right Column: Chat Dialogue Area */}
      <Card className="flex-1 flex flex-col overflow-hidden bg-slate-900/90 border-slate-800 shadow-xl">
        {/* Chat Header */}
        <div className="px-6 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">AlgoPilot Socratic Mentor</h2>
              <p className="text-[11px] text-slate-400">
                Discussing: <strong className="text-slate-200">{selectedProblem.title}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400">Adaptive Assistant Ready</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-950/80 text-slate-200 rounded-tl-none border border-slate-800'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  <button
                    onClick={() => handleCopyMessage(msg.id, msg.content)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-white"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggested Prompt Chips */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { label: 'Give me a hint', icon: Lightbulb, query: 'Give me a hint for this problem' },
            { label: 'Explain my error', icon: AlertTriangle, query: 'Explain common error patterns in this problem' },
            { label: 'Explain the approach', icon: Layers, query: 'Explain the optimal approach conceptually' },
            { label: 'Analyze time complexity', icon: Clock, query: 'Analyze the asymptotic time and space complexity' }
          ].map(chip => {
            const Icon = chip.icon;
            return (
              <button
                key={chip.label}
                onClick={() => handleSendMessage(chip.query)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-xs whitespace-nowrap transition-colors"
              >
                <Icon className="w-3 h-3 text-indigo-400" />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Box */}
        <form onSubmit={e => { e.preventDefault(); handleSendMessage(); }} className="p-4 bg-slate-950/90 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={`Ask the mentor about ${selectedProblem.title} (e.g. 'How do I handle the duplicate values edge case?')...`}
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <Button
            type="submit"
            variant="gradient"
            rightIcon={<Send className="w-3.5 h-3.5" />}
          >
            Ask
          </Button>
        </form>
      </Card>
    </div>
  );
};
