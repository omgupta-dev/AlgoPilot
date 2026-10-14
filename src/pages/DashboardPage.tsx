import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Terminal,
  Timer,
  BarChart2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProficiencyRadar } from '../components/charts/ProficiencyRadar';
import { WeeklyActivityChart } from '../components/charts/WeeklyActivityChart';
import { mockTopicSkills } from '../data/topicsData';
import { researchService } from '../services/researchService';
import { storageService } from '../services/storageService';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const submissions = storageService.getSubmissions();
  const missions = storageService.getMissions();
  const activeMission = missions.find(m => !m.isCompleted) || missions[0];

  // Retrieve recommendations dynamically according to research strategy
  const strategy = user.preferences.practiceStrategy || 'adaptive_ai';
  const recommendations = researchService.getRecommendations(strategy, 3);

  // Filter weak topics needing attention
  const weakTopics = mockTopicSkills.filter(t => t.status === 'Needs Attention').slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Personalized Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user.name.split(' ')[0]} 👋
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {user.preferences.currentDsaLevel} Track
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Targeting <span className="text-slate-200 font-semibold">{user.preferences.targetPreparationArea}</span> in{' '}
            <span className="text-indigo-400 font-semibold font-mono uppercase">{user.preferences.preferredLanguage}</span>.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link to="/workspace">
            <Button variant="primary" size="sm" leftIcon={<Terminal className="w-3.5 h-3.5" />}>
              Open Workspace
            </Button>
          </Link>
          <Link to="/mock-interview">
            <Button variant="secondary" size="sm" leftIcon={<Timer className="w-3.5 h-3.5" />}>
              Start Mock Interview
            </Button>
          </Link>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Problems Solved"
          value={`${user.totalProblemsSolved}`}
          subtitle="Across 12 core DSA topics"
          icon={<CheckCircle2 className="w-5 h-5" />}
          accentColor="indigo"
          trend={{ value: '+4 this week', isPositive: true }}
        />
        <StatCard
          title="Practice Streak"
          value={`${user.streakDays} Days`}
          subtitle="Consistent daily practice"
          icon={<Flame className="w-5 h-5" />}
          accentColor="amber"
          trend={{ value: 'Active 🔥', isPositive: true }}
        />
        <StatCard
          title="Practice Sessions"
          value={`${user.totalPracticeSessions}`}
          subtitle="45 avg minutes per session"
          icon={<BarChart2 className="w-5 h-5" />}
          accentColor="cyan"
          trend={{ value: '+12%', isPositive: true }}
        />
        <StatCard
          title="Accuracy Rate"
          value="74.2%"
          subtitle="First-attempt submission passes"
          icon={<TrendingUp className="w-5 h-5" />}
          accentColor="emerald"
          trend={{ value: '+3.5%', isPositive: true }}
        />
      </div>

      {/* Daily Coding Mission Card */}
      {activeMission && (
        <Card className="p-5 border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-purple-950/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wide">
                  Daily Coding Mission
                </span>
                <span className="text-xs font-semibold text-emerald-400">+{activeMission.xpReward} XP</span>
              </div>
              <h3 className="text-base font-bold text-white">{activeMission.title}</h3>
              <p className="text-xs text-slate-300 max-w-2xl">{activeMission.description}</p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-200">
                  {activeMission.currentCount} / {activeMission.requiredCount} Completed
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Maintain daily habit</div>
              </div>
              <Link to="/missions">
                <Button variant="gradient" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  View Missions
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Middle Grid: Proficiency Overview + Weekly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Proficiency Radar */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Topic-Wise Proficiency Overview</h3>
              <p className="text-xs text-slate-400">Multi-axis algorithmic competency mapping</p>
            </div>
            <Link to="/analytics" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
              Full Analytics →
            </Link>
          </div>
          <ProficiencyRadar height={260} />
          <div className="text-center text-[11px] text-slate-400 italic">
            Illustrative sample radar calculated from test submissions & error frequencies.
          </div>
        </Card>

        {/* Weekly Activity */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Weekly Practice Velocity</h3>
              <p className="text-xs text-slate-400">Daily submissions and practice time</p>
            </div>
            <span className="text-xs text-slate-400 font-medium">Past 7 Days</span>
          </div>
          <WeeklyActivityChart height={260} />
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Peak Day: <strong>Saturday (11 submissions)</strong></span>
            <span>Total: <strong>43 attempts</strong></span>
          </div>
        </Card>
      </div>

      {/* Recommended Calibration Problems (Adaptive AI vs Baseline) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">Recommended Practice Problems</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Mode: {strategy.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personalized based on current weakness diagnostics and target company patterns.
            </p>
          </div>

          <Link to="/problems">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Browse All Problems
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map(({ problem, reason }) => (
            <Card key={problem.id} className="p-5 space-y-3 flex flex-col justify-between" hoverable>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge difficulty={problem.difficulty} />
                  <Badge variant="topic">{problem.topic}</Badge>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {problem.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {problem.description}
                </p>

                {/* Why Recommended Tag */}
                <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-900/30 text-[11px] text-indigo-300">
                  <span className="font-semibold block text-indigo-200">Why recommended:</span>
                  {reason}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  Est: ~{problem.estimatedTimeMin}m
                </span>
                <Link to={`/workspace/${problem.id}`}>
                  <Button variant="primary" size="sm" rightIcon={<Terminal className="w-3 h-3" />}>
                    Solve Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Weak Topics That Require Attention & Recent Submissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weak Topics Diagnostic */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Attention Needed: Identified Weaknesses</h3>
            </div>
            <span className="text-xs text-slate-400">Diagnostic Confidence: High</span>
          </div>

          <div className="space-y-3">
            {weakTopics.map(t => (
              <div key={t.topic} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{t.topic}</span>
                  <span className="text-xs font-mono font-bold text-rose-400">
                    {t.proficiencyScore}% Mastery
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: `${t.proficiencyScore}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400">
                  <strong>Pattern:</strong> {t.commonErrorPattern}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Solved: {t.problemsSolved}/{t.totalAvailable}</span>
                  <Link
                    to={`/problems?topic=${encodeURIComponent(t.topic)}`}
                    className="text-indigo-400 hover:underline font-semibold"
                  >
                    Practice {t.topic} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Submissions */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Recent Problem Submissions</h3>
            <span className="text-xs text-slate-400">Last 5 Attempts</span>
          </div>

          <div className="space-y-2.5">
            {submissions.slice(0, 5).map(sub => (
              <div
                key={sub.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-200">{sub.problemTitle}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>{sub.topic}</span>
                    <span>•</span>
                    <span className="font-mono">{sub.runtimeMs}ms</span>
                    <span>•</span>
                    <span>{sub.submittedAt}</span>
                  </div>
                </div>

                <Badge status={sub.status} size="sm" />
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <Link to="/analytics" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
              View comprehensive error analysis →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
