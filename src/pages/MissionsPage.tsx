import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Flame,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Award,
  Zap,
  Terminal
} from 'lucide-react';
import { storageService } from '../services/storageService';
import { streakCalendarMock } from '../data/missionsData';
import { Mission } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';

export const MissionsPage: React.FC = () => {
  const { user } = useAuth();
  const [missions, setMissions] = useState<Mission[]>(() => storageService.getMissions());

  const handleToggleMission = (id: string) => {
    const updated = storageService.toggleMissionCompleted(id);
    setMissions(updated);
  };

  const totalXP = missions.filter(m => m.isCompleted).reduce((acc, m) => acc + m.xpReward, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Coding Missions & Practice Habits
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build sustainable daily coding stamina through structured challenges and non-judgmental habit tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{user.streakDays}-Day Streak</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Award className="w-4 h-4" />
            <span>{totalXP} XP Earned</span>
          </div>
        </div>
      </div>

      {/* Streak Calendar */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Monthly Practice Consistency Calendar</h3>
          </div>
          <span className="text-xs text-slate-400">October 2026</span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-15 gap-2 pt-2">
          {streakCalendarMock.map(day => (
            <div
              key={day.day}
              className={`p-2 rounded-lg text-center border text-xs flex flex-col items-center justify-center transition-all ${
                day.active
                  ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-300'
                  : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}
            >
              <span className="text-[11px] font-bold">D{day.day}</span>
              <div
                className={`w-2 h-2 rounded-full mt-1 ${
                  day.active ? 'bg-indigo-400 animate-pulse' : 'bg-slate-700'
                }`}
              />
              {day.active && (
                <span className="text-[9px] text-slate-400 font-mono mt-0.5">{day.count}p</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 pt-1 leading-relaxed">
          🌿 <strong>Mindful habit design:</strong> Taking rest days is a healthy part of long-term learning. AlgoPilot avoids predatory streak countdowns and guilt-inducing alerts.
        </p>
      </Card>

      {/* Active Missions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Active Missions & Challenges</h2>
            <p className="text-xs text-slate-400">Click a mission checkmark to simulate completion or reopening</p>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {missions.filter(m => m.isCompleted).length} / {missions.length} Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.map(mission => {
            const progressPct = (mission.currentCount / mission.requiredCount) * 100;

            return (
              <Card
                key={mission.id}
                className={`p-5 space-y-4 transition-all ${
                  mission.isCompleted
                    ? 'border-emerald-500/30 bg-emerald-950/10'
                    : 'border-slate-800 bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-slate-800 text-slate-300 border border-slate-700">
                        {mission.category.replace('_', ' ')}
                      </span>
                      {mission.badge && (
                        <span className="text-[11px] text-indigo-400 font-semibold">
                          🏆 {mission.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white">{mission.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {mission.description}
                    </p>
                  </div>

                  {/* Toggle Complete Checkbox */}
                  <button
                    onClick={() => handleToggleMission(mission.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      mission.isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-white'
                    }`}
                    title={mission.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Mission Progress</span>
                    <span className="font-mono font-bold text-slate-200">
                      {mission.currentCount} / {mission.requiredCount} Solved
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        mission.isCompleted
                          ? 'bg-emerald-500'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                      }`}
                      style={{ width: `${Math.min(progressPct, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-400">+{mission.xpReward} XP Reward</span>
                  <Link to="/workspace">
                    <Button variant="outline" size="sm" rightIcon={<Terminal className="w-3 h-3" />}>
                      Solve Target Problems
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
