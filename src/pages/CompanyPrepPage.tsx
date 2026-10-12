import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  Layers,
  Terminal,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { mockCompanyTracks } from '../data/companyPrepData';
import { mockProblems } from '../data/problemsData';
import { CompanyTrack } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const CompanyPrepPage: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<CompanyTrack>(mockCompanyTracks[0]);

  // Featured problems mapped for this track
  const featuredProblems = mockProblems.filter(p =>
    selectedTrack.featuredProblemIds.includes(p.id)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Company-Oriented Technical Preparation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Interview stage breakdowns, high-frequency patterns, and curated practice paths.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          5 Company Tracks Available
        </span>
      </div>

      {/* Notice Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Demonstration Company Paths:</strong> These tracks represent common interview patterns and stages for demonstration purposes. They are not official representations of company hiring processes.
        </div>
      </div>

      {/* Company Selector Cards Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {mockCompanyTracks.map(track => {
          const isSelected = track.id === selectedTrack.id;
          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'bg-slate-950/80 border-slate-800/80 hover:bg-slate-900/60 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-sm text-white">
                  {track.logo}
                </div>
                <span className="text-[11px] font-mono font-semibold text-indigo-400">
                  {track.completionPercentage}%
                </span>
              </div>
              <h3 className="font-bold text-sm text-white">{track.companyName}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{track.difficultyFocus}</p>
            </button>
          );
        })}
      </div>

      {/* Active Company Detail Hero */}
      <Card className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-extrabold text-white">
                {selectedTrack.logo}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{selectedTrack.companyName} Preparation Track</h2>
                <span className="text-xs text-indigo-400 font-medium">Difficulty Emphasis: {selectedTrack.difficultyFocus}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-3xl pt-1 leading-relaxed">
              {selectedTrack.tagline}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-slate-300">Track Progress</span>
            <div className="w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                style={{ width: `${selectedTrack.completionPercentage}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 font-mono">{selectedTrack.completionPercentage}% Completed</span>
          </div>
        </div>

        {/* Interview Round Breakdown Stepper */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Interview Round Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedTrack.roundBreakdown.map((round, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="text-[10px] font-mono text-indigo-400 uppercase font-semibold">
                  Round {idx + 1}
                </div>
                <h4 className="text-xs font-bold text-white">{round.roundName}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{round.description}</p>
                <div className="pt-2 flex flex-wrap gap-1 border-t border-slate-850">
                  {round.focusAreas.map(fa => (
                    <span
                      key={fa}
                      className="px-1.5 py-0.5 text-[10px] rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {fa}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Frequency Patterns to Revise */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            High-Frequency Algorithmic Patterns
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedTrack.recommendedPatterns.map((pat, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 flex items-center gap-2.5 text-xs text-indigo-300 font-medium"
              >
                <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{pat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Track Problems */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Curated Track Problems
            </h3>
            <span className="text-xs text-slate-400">{featuredProblems.length} Essential Problems</span>
          </div>

          <div className="space-y-2">
            {featuredProblems.map(prob => (
              <div
                key={prob.id}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between gap-4 text-xs hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{prob.title}</span>
                    <Badge difficulty={prob.difficulty} size="sm" />
                    <Badge variant="topic" size="sm">{prob.topic}</Badge>
                  </div>
                  <p className="text-slate-400 line-clamp-1">{prob.description}</p>
                </div>

                <Link to={`/workspace/${prob.id}`}>
                  <Button variant="primary" size="sm" leftIcon={<Terminal className="w-3.5 h-3.5" />}>
                    Solve in Workspace
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
