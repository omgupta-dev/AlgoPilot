import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Brain,
  Target,
  Bot,
  Timer,
  ShieldCheck,
  Compass,
  Zap
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Footer } from '../components/common/Footer';
import { ThemeToggle } from '../components/common/ThemeToggle';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-lg tracking-tight gradient-brand-text">AlgoPilot</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
          <a href="#workflow" className="hover:text-slate-200 transition-colors">
            Adaptive Workflow
          </a>
          <a href="#features" className="hover:text-slate-200 transition-colors">
            Key Features
          </a>
          <a href="#research" className="hover:text-slate-200 transition-colors">
            Research Foundation
          </a>
          <Link to="/problems" className="hover:text-slate-200 transition-colors">
            DSA Explorer
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/onboarding">
            <Button variant="gradient" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-20 pb-16 max-w-6xl mx-auto text-center space-y-8">
        {/* Academic Prototype Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>Research-Oriented DSA Preparation Platform</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Stop solving blindly.{' '}
          <span className="gradient-brand-text block mt-1">Master DSA through targeted calibration.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          AlgoPilot diagnoses your recurring errors—such as boundary condition lapses or time complexity bottlenecks—and prescribes adaptive problem sequences and simulated mock interviews to accelerate your technical interview readiness.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/onboarding">
            <Button variant="gradient" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Start Calibration Quiz
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg">
              Explore Platform Features
            </Button>
          </a>
          <Link to="/dashboard">
            <Button variant="secondary" size="lg">
              Preview Demo Dashboard
            </Button>
          </Link>
        </div>

        {/* Dashboard Preview Graphic */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-2 sm:p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 p-4 sm:p-6 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-500 ml-2">algopilot.internal / dashboard</span>
                </div>
                <span className="text-xs text-indigo-400 font-mono">Strategy C: Adaptive AI</span>
              </div>

              {/* Mock Dashboard Preview Inner Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Proficiency Gap Identified</div>
                  <div className="text-sm font-bold text-white mt-0.5">Dynamic Programming (48%)</div>
                  <div className="text-[10px] text-rose-400 mt-1">Struggles with base case initialization</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Current Practice Streak</div>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">14 Days Active 🔥</div>
                  <div className="text-[10px] text-slate-400 mt-1">2 problems daily goal</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Prescribed Calibration</div>
                  <div className="text-sm font-bold text-indigo-400 mt-0.5">Coin Change Minimum Coins</div>
                  <div className="text-[10px] text-slate-400 mt-1">Bottom-up memoization practice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflow Stepper */}
      <section id="workflow" className="py-20 px-6 lg:px-12 bg-slate-950/90 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Closed-Loop Learning System
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              How AlgoPilot Transforms Your DSA Preparation
            </h3>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Traditional platforms present lists of disconnected questions. AlgoPilot continuously adapts problem sequences to your demonstrated cognitive gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Coding Practice',
                desc: 'Solve realistic problems in an integrated IDE sandbox supporting Python, C++, and Java.'
              },
              {
                step: '02',
                title: 'Error Diagnostic',
                desc: 'Attempts are mapped to failure categories: boundary conditions, off-by-one, or asymptotic TLE.'
              },
              {
                step: '03',
                title: 'Skill Calibration',
                desc: 'Topic proficiency and confidence scores update in real-time on your personal skill radar.'
              },
              {
                step: '04',
                title: 'Adaptive Target',
                desc: 'Instead of random questions, the engine prescribes problems that specifically strengthen your lowest areas.'
              },
              {
                step: '05',
                title: 'Mock Interviews',
                desc: 'Validate holistic retention in timed interview simulations with structured rubrics.'
              }
            ].map(item => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 relative"
              >
                <span className="text-xs font-black text-indigo-500/80 font-mono">{item.step}</span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Engineered for Mastery
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Comprehensive Technical Preparation Toolkit
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3" hoverable>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Skill Proficiency Analytics</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Multi-dimensional proficiency modeling tracks mastery across 12 core DSA topics with confidence intervals and error classifications.
            </p>
          </Card>

          <Card className="p-6 space-y-3" hoverable>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Socratic AI Mentor</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides progressive hints and explains algorithmic complexity without spoiling entire code solutions, training your independent thinking.
            </p>
          </Card>

          <Card className="p-6 space-y-3" hoverable>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Timer className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Mock Interview Simulator</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Timed technical interview simulations with conversational prompts and detailed post-interview evaluation across 4 industry rubrics.
            </p>
          </Card>

          <Card className="p-6 space-y-3" hoverable>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Coding Missions & Habits</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Daily calibration goals and topic-focused sprints designed to cultivate consistent practice streaks without anxiety-driven mechanics.
            </p>
          </Card>

          <Card className="p-6 space-y-3" hoverable>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Company-Oriented Tracks</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated preparation tracks modeled after hiring rounds at Google, Amazon, Microsoft, Meta, and Uber with pattern checklists.
            </p>
          </Card>

          <Card className="p-6 space-y-3" hoverable>
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Experimental Research Rig</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built to support comparative academic evaluation between random selection, static syllabus progression, and performance-aware adaptive AI.
            </p>
          </Card>
        </div>
      </section>

      {/* Research Foundation Section */}
      <section id="research" className="py-16 px-6 lg:px-12 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">College Mini-Project & Research Foundation</h3>
              <p className="text-xs text-slate-400">Academic Context & Comparative Methodology</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            AlgoPilot is designed to evaluate whether performance-aware problem recommendations produce measurably faster technical interview mastery compared to conventional practice paradigms. In Phase 1, you can toggle between three recommendation modes (Random Baseline, Topic Progression, Adaptive Calibration) to observe how the platform re-evaluates problem priorities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <div className="font-semibold text-slate-300">Strategy A: Baseline</div>
              <p className="text-slate-400 text-[11px] mt-1">Random uniform problem distribution control.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <div className="font-semibold text-slate-300">Strategy B: Static Syllabus</div>
              <p className="text-slate-400 text-[11px] mt-1">Traditional sequential chapter progression.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
              <div className="font-semibold text-indigo-300">Strategy C: Adaptive AI</div>
              <p className="text-slate-400 text-[11px] mt-1">Real-time error gap targeting and weakness repair.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-6 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          Ready to experience adaptive interview preparation?
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Start with the onboarding calibration to tailor your language, difficulty, and preparation tracks.
        </p>
        <Link to="/onboarding">
          <Button variant="gradient" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Configure Your Learning Profile
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
};
