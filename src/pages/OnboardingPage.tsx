import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Code,
  GraduationCap,
  Building2,
  Calendar,
  Check,
  FlaskConical
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { SupportedLanguage, RecommendationStrategy } from '../types';

export const OnboardingPage: React.FC = () => {
  const { user, updatePreferences } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<SupportedLanguage>(user.preferences.preferredLanguage || 'python');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>(user.preferences.currentDsaLevel || 'Intermediate');
  const [targetArea, setTargetArea] = useState<'FAANG & Big Tech' | 'High-Growth Startups' | 'Enterprise / Service' | 'College Placements'>(
    user.preferences.targetPreparationArea || 'FAANG & Big Tech'
  );
  const [dailyGoal, setDailyGoal] = useState<number>(user.preferences.dailyPracticeGoal || 2);
  const [strategy, setStrategy] = useState<RecommendationStrategy>(user.preferences.practiceStrategy || 'adaptive_ai');

  const handleFinishOnboarding = () => {
    updatePreferences({
      preferredLanguage: language,
      currentDsaLevel: level,
      targetPreparationArea: targetArea,
      dailyPracticeGoal: dailyGoal,
      practiceStrategy: strategy
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 antialiased selection:bg-indigo-500">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized Calibration Setup</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Tailor Your AlgoPilot Learning Path
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Tell us about your background so we can configure your initial skill baseline and recommendations.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === s
                    ? 'bg-indigo-600 text-white'
                    : step > s
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {step > s ? '✓' : s}
              </div>
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-indigo-500 transition-all duration-300 ${
                    step >= s ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Wizard Form Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          {/* Step 1: Language & DSA Level */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Code className="w-4 h-4 text-indigo-400" />
                  Primary Programming Language
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'python', label: 'Python 3', sub: 'Concise & expressive' },
                    { id: 'cpp', label: 'C++ (STL)', sub: 'Fast & competitive' },
                    { id: 'java', label: 'Java', sub: 'Strict & enterprise' }
                  ].map(lang => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setLanguage(lang.id as SupportedLanguage)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        language === lang.id
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-sm">{lang.label}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{lang.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  Self-Assessed DSA Proficiency Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Beginner', desc: 'Familiar with loops and basic arrays' },
                    { id: 'Intermediate', desc: 'Knows trees, recursion, and binary search' },
                    { id: 'Advanced', desc: 'Practicing complex DP, graphs, and hard problems' }
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setLevel(lvl.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        level === lvl.id
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-sm">{lvl.id}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Target Area & Daily Practice Goal */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  Primary Interview Focus
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'FAANG & Big Tech', desc: 'Google, Amazon, Meta, Microsoft tracks' },
                    { id: 'High-Growth Startups', desc: 'Practical problem solving, concurrency & speed' },
                    { id: 'Enterprise / Service', desc: 'Core fundamentals, OOP, and reliable coding' },
                    { id: 'College Placements', desc: 'Campus recruitment aptitude & online assessments' }
                  ].map(area => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setTargetArea(area.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        targetArea === area.id
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-sm">{area.id}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{area.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  Daily Practice Commitment
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { count: 1, label: '1 Problem / day', time: '~25 mins' },
                    { count: 2, label: '2 Problems / day', time: '~50 mins (Recommended)' },
                    { count: 3, label: '3 Problems / day', time: '~80 mins (Intensive)' }
                  ].map(g => (
                    <button
                      key={g.count}
                      type="button"
                      onClick={() => setDailyGoal(g.count)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        dailyGoal === g.count
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-sm">{g.label}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{g.time}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experimental Practice Strategy */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-indigo-400" />
                  Select Experimental Recommendation Mode
                </label>
                <div className="space-y-3">
                  {[
                    {
                      id: 'adaptive_ai',
                      name: 'Strategy C: Performance-Aware Adaptive AI (Recommended)',
                      desc: 'Continuously diagnoses your specific error categories (e.g. boundary conditions, TLE) to tailor problem sequences.'
                    },
                    {
                      id: 'topic_based',
                      name: 'Strategy B: Static Topic Syllabus',
                      desc: 'Traditional sequential curriculum progressing rigidly from Arrays to Trees and Dynamic Programming.'
                    },
                    {
                      id: 'random',
                      name: 'Strategy A: Random Baseline',
                      desc: 'Random problem sampling baseline used for comparative academic experiments.'
                    }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setStrategy(s.id as RecommendationStrategy)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        strategy === s.id
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold text-sm flex items-center justify-between">
                        <span>{s.name}</span>
                        {strategy === s.id && <Check className="w-4 h-4 text-indigo-400" />}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Wizard Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {step > 1 ? (
              <Button variant="outline" size="sm" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setStep(step + 1)}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="gradient"
                size="md"
                onClick={handleFinishOnboarding}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Complete Setup & Launch Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
