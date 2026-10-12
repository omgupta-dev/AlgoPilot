import React, { useState } from 'react';
import {
  User,
  Settings,
  Bell,
  Code,
  ShieldCheck,
  RotateCcw,
  Check,
  ExternalLink,
  Laptop,
  Moon,
  Sun,
  AlertTriangle,
  Sparkles,
  FlaskConical
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import { SupportedLanguage, RecommendationStrategy } from '../types';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const SettingsPage: React.FC = () => {
  const { user, updatePreferences, updateProfile, resetDemoData } = useAuth();
  const { theme, setTheme } = useTheme();

  // Profile Form state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [headline, setHeadline] = useState(user.headline);
  const [collegeOrCompany, setCollegeOrCompany] = useState(user.collegeOrCompany);
  const [profileSaved, setProfileSaved] = useState(false);

  // Preference state
  const [language, setLanguage] = useState<SupportedLanguage>(user.preferences.preferredLanguage);
  const [dsaLevel, setDsaLevel] = useState(user.preferences.currentDsaLevel);
  const [targetArea, setTargetArea] = useState(user.preferences.targetPreparationArea);
  const [dailyGoal, setDailyGoal] = useState(user.preferences.dailyPracticeGoal);
  const [strategy, setStrategy] = useState<RecommendationStrategy>(user.preferences.practiceStrategy);
  const [emailReminders, setEmailReminders] = useState(user.preferences.emailReminders);
  const [soundEffects, setSoundEffects] = useState(user.preferences.soundEffects);
  const [prefsSaved, setPrefsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      headline,
      collegeOrCompany
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleSavePreferences = () => {
    updatePreferences({
      preferredLanguage: language,
      currentDsaLevel: dsaLevel,
      targetPreparationArea: targetArea,
      dailyPracticeGoal: dailyGoal,
      practiceStrategy: strategy,
      emailReminders,
      soundEffects
    });
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Settings & Learning Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your personal profile, coding workspace defaults, and experimental recommendation strategies.
        </p>
      </div>

      {/* Profile Details Card */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Profile Details</h2>
          </div>
          {profileSaved && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold animate-in fade-in">
              <Check className="w-4 h-4" /> Profile Updated
            </span>
          )}
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Headline / Title</label>
              <input
                type="text"
                value={headline}
                onChange={e => setHeadline(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Institution / University</label>
              <input
                type="text"
                value={collegeOrCompany}
                onChange={e => setCollegeOrCompany(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-2 text-right">
            <Button type="submit" variant="primary" size="sm">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Learning & Workspace Preferences */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-400" />
            <h2 className="text-base font-bold text-white">Coding & Algorithm Preferences</h2>
          </div>
          {prefsSaved && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold animate-in fade-in">
              <Check className="w-4 h-4" /> Preferences Saved
            </span>
          )}
        </div>

        <div className="space-y-4 text-xs">
          {/* Primary Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Default Coding Language</label>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as SupportedLanguage)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="python">Python 3</option>
                <option value="cpp">C++ (STL)</option>
                <option value="java">Java 17</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Proficiency Baseline</label>
              <select
                value={dsaLevel}
                onChange={e => setDsaLevel(e.target.value as any)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Beginner">Beginner (Foundations & loops)</option>
                <option value="Intermediate">Intermediate (Trees, two pointers, binary search)</option>
                <option value="Advanced">Advanced (Graph flow, DP, hard problems)</option>
              </select>
            </div>
          </div>

          {/* Target Prep Area & Daily Goal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Target Interview Arena</label>
              <select
                value={targetArea}
                onChange={e => setTargetArea(e.target.value as any)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="FAANG & Big Tech">FAANG & Big Tech</option>
                <option value="High-Growth Startups">High-Growth Startups</option>
                <option value="Enterprise / Service">Enterprise / Service</option>
                <option value="College Placements">College Placements</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Daily Problem Goal</label>
              <select
                value={dailyGoal}
                onChange={e => setDailyGoal(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value={1}>1 Problem per day (~25 mins)</option>
                <option value={2}>2 Problems per day (~50 mins)</option>
                <option value={3}>3 Problems per day (~80 mins)</option>
              </select>
            </div>
          </div>

          {/* Research Strategy Option */}
          <div className="space-y-1.5 pt-2">
            <label className="text-slate-300 font-medium flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-indigo-400" />
              <span>Experimental Recommendation Engine Mode</span>
            </label>
            <select
              value={strategy}
              onChange={e => setStrategy(e.target.value as RecommendationStrategy)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="adaptive_ai">Strategy C: Performance-Aware Adaptive AI (Targets measured weaknesses)</option>
              <option value="topic_based">Strategy B: Static Topic Syllabus (Sequential topic progression)</option>
              <option value="random">Strategy A: Random Baseline (Control group sampling)</option>
            </select>
          </div>

          {/* Theme selection */}
          <div className="space-y-2 pt-2">
            <label className="text-slate-300 font-medium">Interface Theme</label>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-colors ${
                  theme === 'dark'
                    ? 'bg-indigo-950/60 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold">Dark Theme</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-colors ${
                  theme === 'light'
                    ? 'bg-indigo-950/60 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Light Theme</span>
              </button>
            </div>
          </div>

          <div className="pt-2 text-right">
            <Button onClick={handleSavePreferences} variant="primary" size="sm">
              Save Preferences
            </Button>
          </div>
        </div>
      </Card>

      {/* External Platform Import Placeholders */}
      <Card className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base font-bold text-white">Data Import & Platform Integrations</h2>
            <p className="text-xs text-slate-400">Sync history from existing coding platforms</p>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-400 border border-slate-700">
            Phase 2 Integration Placeholder
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {[
            { platform: 'LeetCode Sync', desc: 'Import solved problem history and submission timestamps' },
            { platform: 'Codeforces Profile', desc: 'Sync competitive programming ratings and contest metrics' },
            { platform: 'GitHub Repository', desc: 'Push accepted solution commits automatically to your portfolio' }
          ].map(p => (
            <div key={p.platform} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 opacity-75">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-200">{p.platform}</span>
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">Upcoming</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
              <button disabled className="text-xs text-slate-500 flex items-center gap-1 cursor-not-allowed pt-1">
                <span>Connect in Phase 2</span> <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Demo Reset Card */}
      <Card className="p-6 border-rose-500/20 bg-rose-950/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="text-sm font-bold">Reset Demo Workspace State</h3>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (window.confirm('Reset local demo data back to clean initial state?')) {
                resetDemoData();
                window.location.reload();
              }
            }}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset All Demo Data
          </Button>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Clears local bookmarks, simulated submission attempts, and custom drafts, restoring the baseline demonstration profile.
        </p>
      </Card>
    </div>
  );
};
