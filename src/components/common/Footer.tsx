import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/60 py-8 px-4 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Research Context */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <Code2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-200">AlgoPilot</span>
          </div>
          <span className="hidden sm:inline text-slate-700">|</span>
          <span className="text-slate-400">
            Adaptive AI for Personalized DSA & Technical Interview Preparation
          </span>
        </div>

        {/* Middle: Links */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <Link to="/dashboard" className="hover:text-slate-200 transition-colors">
            Dashboard
          </Link>
          <Link to="/problems" className="hover:text-slate-200 transition-colors">
            Problems
          </Link>
          <Link to="/ai-mentor" className="hover:text-slate-200 transition-colors">
            AI Mentor
          </Link>
          <Link to="/mock-interview" className="hover:text-slate-200 transition-colors">
            Mock Interview
          </Link>
          <Link to="/analytics" className="hover:text-slate-200 transition-colors">
            Analytics
          </Link>
        </div>

        {/* Right: Academic Mini-Project Note */}
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Academic Mini-Project (Phase 1 Frontend Prototype)</span>
        </div>
      </div>
    </footer>
  );
};
