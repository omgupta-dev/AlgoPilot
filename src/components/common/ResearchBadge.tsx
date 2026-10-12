import React, { useState } from 'react';
import { FlaskConical, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RESEARCH_STRATEGIES } from '../../services/researchService';
import { RecommendationStrategy } from '../../types';

export const ResearchBadge: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { user, updatePreferences } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const activeStrategy = user.preferences.practiceStrategy || 'adaptive_ai';
  const info = RESEARCH_STRATEGIES[activeStrategy];

  const handleSelect = (strat: RecommendationStrategy) => {
    updatePreferences({ practiceStrategy: strat });
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${info.badgeColor} hover:brightness-110`}
        title="Research Study Mode: Compare practice recommendation strategies"
      >
        <FlaskConical className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
        <span className="hidden sm:inline font-semibold">Research Mode:</span>
        <span className="truncate max-w-[140px]">{info.name.split(':')[1]?.trim() || info.name}</span>
        <ChevronDown className="w-3 h-3 opacity-70" />
      </button>

      {dropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-40 text-left">
            <div className="pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                <FlaskConical className="w-4 h-4" />
                Adaptive Practice Experiment
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Evaluate comparative learning outcomes across three algorithmic strategies:
              </p>
            </div>

            <div className="space-y-1.5">
              {(Object.keys(RESEARCH_STRATEGIES) as RecommendationStrategy[]).map(key => {
                const s = RESEARCH_STRATEGIES[key];
                const isCurrent = key === activeStrategy;

                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                      isCurrent
                        ? 'bg-indigo-950/60 border border-indigo-700/60 text-white'
                        : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isCurrent ? (
                        <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-200">{s.name}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                        {s.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic">
              Demonstration experiment controls. Phase 2 enables tracking comparative pre/post test velocity.
            </div>
          </div>
        </>
      )}
    </div>
  );
};
