import React, { useState } from 'react';
import { Bookmark, ChevronDown, ChevronUp, Lightbulb, Clock, CheckCircle2, Building, Sparkles } from 'lucide-react';
import { Problem } from '../../types';
import { Badge } from '../common/Badge';

interface ProblemDetailsProps {
  problem: Problem;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  isSolved?: boolean;
}

export const ProblemDetails: React.FC<ProblemDetailsProps> = ({
  problem,
  isBookmarked,
  onToggleBookmark,
  isSolved = false
}) => {
  const [expandedHints, setExpandedHints] = useState<number[]>([]);
  const [showEditorial, setShowEditorial] = useState(false);

  const toggleHint = (index: number) => {
    setExpandedHints(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="h-full overflow-y-auto pr-2 space-y-6 text-sm text-slate-300">
      {/* Header Info */}
      <div className="space-y-3 pb-4 border-b border-slate-800">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-white tracking-tight">{problem.title}</h1>
              {isSolved && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5 flex-wrap text-xs">
              <Badge difficulty={problem.difficulty} />
              <Badge variant="topic">{problem.topic}</Badge>
              <span className="text-slate-400">
                Acceptance: <span className="text-slate-200 font-semibold">{problem.acceptanceRate}%</span>
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>~{problem.estimatedTimeMin} mins</span>
              </span>
            </div>
          </div>

          <button
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Problem'}
            className={`p-2 rounded-lg border transition-all ${
              isBookmarked
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Company Tags */}
        {problem.companyTags && problem.companyTags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Building className="w-3 h-3 text-slate-400" />
              <span>Tested at:</span>
            </span>
            {problem.companyTags.map(company => (
              <span
                key={company}
                className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-800 text-slate-300 border border-slate-700/60"
              >
                {company}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-3 leading-relaxed whitespace-pre-line text-slate-200">
        {problem.description}
      </div>

      {/* Examples */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Examples</h3>
        {problem.examples.map((ex, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-300">Example {idx + 1}:</div>
            <div className="font-mono text-xs space-y-1 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
              <div>
                <span className="text-slate-400 select-none">Input: </span>
                <span className="text-indigo-300">{ex.input}</span>
              </div>
              <div>
                <span className="text-slate-400 select-none">Output: </span>
                <span className="text-emerald-300">{ex.output}</span>
              </div>
              {ex.explanation && (
                <div className="pt-1 text-slate-400 font-sans text-xs border-t border-slate-800/60 mt-1">
                  <span className="text-slate-400 font-medium">Explanation: </span>
                  {ex.explanation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Constraints */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Constraints</h3>
        <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-mono">
          {problem.constraints.map((c, i) => (
            <li key={i} className="pl-1">
              <span className="text-slate-200">{c}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Optimal Asymptotic Complexity Target */}
      <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/30 flex items-center justify-between text-xs">
        <div>
          <span className="font-semibold text-indigo-300 block">Target Complexity Benchmark</span>
          <span className="text-slate-400 text-[11px]">Optimal interview performance threshold</span>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 font-mono">
            Time: {problem.optimalComplexity.time}
          </span>
          <span className="px-2 py-1 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 font-mono">
            Space: {problem.optimalComplexity.space}
          </span>
        </div>
      </div>

      {/* Hints Accordion */}
      {problem.hints.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Progressive Hints</span>
          </div>

          <div className="space-y-1.5">
            {problem.hints.map((hint, idx) => {
              const isExpanded = expandedHints.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden"
                >
                  <button
                    onClick={() => toggleHint(idx)}
                    className="w-full px-3 py-2 text-xs flex items-center justify-between text-left font-medium text-slate-300 hover:text-white"
                  >
                    <span>Hint {idx + 1}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  {isExpanded && (
                    <div className="px-3 pb-2.5 pt-1 text-xs text-slate-400 border-t border-slate-800/60 bg-slate-950/40">
                      {hint}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Algorithmic Editorial / Approach Breakdown */}
      {problem.editorialSummary && (
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Optimal Approach Summary</span>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden">
            <button
              onClick={() => setShowEditorial(!showEditorial)}
              className="w-full px-3 py-2 text-xs flex items-center justify-between text-left font-medium text-indigo-300 hover:text-indigo-200"
            >
              <span>{showEditorial ? 'Hide Approach Breakdown' : 'View Approach Breakdown'}</span>
              {showEditorial ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {showEditorial && (
              <div className="px-3 pb-3 pt-2 text-xs text-slate-300 border-t border-slate-800/60 bg-slate-950/40 leading-relaxed whitespace-pre-line">
                {problem.editorialSummary}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
