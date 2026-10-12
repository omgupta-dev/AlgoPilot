import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Brain,
  ShieldAlert,
  ArrowRight,
  Flame,
  Award,
  Zap
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProficiencyRadar } from '../components/charts/ProficiencyRadar';
import { WeeklyActivityChart } from '../components/charts/WeeklyActivityChart';
import { DifficultyDistributionChart } from '../components/charts/DifficultyDistributionChart';
import { ErrorDistributionChart } from '../components/charts/ErrorDistributionChart';
import { mockTopicSkills, errorCategoriesMock } from '../data/topicsData';
import { useAuth } from '../context/AuthContext';

export const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Skill Analytics & Cognitive Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time diagnostic analysis across algorithmic domains, recurring errors, and practice velocity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Confidence Index: 88.4%
          </span>
        </div>
      </div>

      {/* Demonstration Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Demonstration Analytics Data:</strong> These metrics illustrate the target cognitive profiling capabilities of AlgoPilot. In Phase 1, proficiency and confidence scores represent simulated telemetry to demonstrate the UI and research metrics.
        </div>
      </div>

      {/* Primary Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topic Mastery Radar (7 cols on lg) */}
        <Card className="lg:col-span-7 p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Algorithmic Domain Radar</h3>
              <p className="text-xs text-slate-400">Mastery ratings across primary algorithmic families</p>
            </div>
            <span className="text-xs font-mono text-indigo-400">100-Point Index</span>
          </div>
          <ProficiencyRadar height={300} />
        </Card>

        {/* Difficulty Distribution Doughnut (5 cols on lg) */}
        <Card className="lg:col-span-5 p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Difficulty Distribution</h3>
              <p className="text-xs text-slate-400">Problems solved categorized by tier</p>
            </div>
            <span className="text-xs text-slate-400">Total: 142 Solved</span>
          </div>
          <DifficultyDistributionChart height={280} />
        </Card>
      </div>

      {/* Secondary Row: Error Categories & Practice Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Error Pattern Diagnostics (6 cols on lg) */}
        <Card className="lg:col-span-6 p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Recurring Error Categorization</h3>
                <p className="text-xs text-slate-400">Root causes behind submission failures</p>
              </div>
            </div>
            <span className="text-xs text-rose-400 font-semibold">Diagnostic Focus</span>
          </div>
          <ErrorDistributionChart height={220} />
          <div className="space-y-2 pt-2">
            {errorCategoriesMock.slice(0, 3).map(err => (
              <div key={err.name} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-200">{err.name}</span>
                  <p className="text-[11px] text-slate-400">{err.description}</p>
                </div>
                <span className="font-mono font-bold text-slate-300">{err.percentage}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Practice Heat / Velocity (6 cols on lg) */}
        <Card className="lg:col-span-6 p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <div>
                <h3 className="text-sm font-bold text-white">Weekly Practice Volume</h3>
                <p className="text-xs text-slate-400">Daily submissions and time spent practicing</p>
              </div>
            </div>
            <span className="text-xs text-amber-400 font-semibold">{user.streakDays}-Day Streak</span>
          </div>
          <WeeklyActivityChart height={240} />
          <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-xs text-slate-300">
            💡 <strong>Observation:</strong> Your velocity peaks on weekends with higher time investment in Medium and Hard problems. Recommending shorter, consistent weekday sprints to maintain cognitive retention.
          </div>
        </Card>
      </div>

      {/* Comprehensive Personal Skill Profile Table */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Comprehensive Skill Profile</h3>
            <p className="text-xs text-slate-400">
              Granular breakdown across all 12 evaluated Data Structure and Algorithm topics
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Updated today based on recent submissions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Topic</th>
                <th className="py-3 px-4">Proficiency Score</th>
                <th className="py-3 px-4">Confidence Indicator</th>
                <th className="py-3 px-4">Solved / Total</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Primary Error Pattern</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {mockTopicSkills.map(skill => (
                <tr key={skill.topic} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <span>{skill.topic}</span>
                    {skill.status === 'Needs Attention' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    )}
                  </td>

                  {/* Proficiency Score & Progress Bar */}
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between font-mono font-bold">
                        <span className={skill.proficiencyScore >= 75 ? 'text-emerald-400' : skill.proficiencyScore >= 60 ? 'text-amber-400' : 'text-rose-400'}>
                          {skill.proficiencyScore}%
                        </span>
                        <span className="text-[10px] text-slate-500 font-sans">{skill.status}</span>
                      </div>
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            skill.proficiencyScore >= 75 ? 'bg-emerald-500' : skill.proficiencyScore >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${skill.proficiencyScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Confidence Indicator */}
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      {skill.confidenceScore}% (High)
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-300">
                    {skill.problemsSolved} / {skill.totalAvailable}
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-300">
                    {skill.accuracyRate}%
                  </td>

                  <td className="py-3 px-4 text-slate-400 max-w-xs truncate" title={skill.commonErrorPattern}>
                    {skill.commonErrorPattern || 'None detected'}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <Link to={`/problems?topic=${encodeURIComponent(skill.topic)}`}>
                      <Button variant="outline" size="sm">
                        Practice
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
