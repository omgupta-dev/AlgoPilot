import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Terminal } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 text-center space-y-5">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
        <Terminal className="w-6 h-6" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-white">404</h1>
      <h2 className="text-lg font-bold text-slate-200">Page Not Found</h2>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
        The requested algorithmic path does not exist in the AlgoPilot namespace.
      </p>
      <div className="pt-2">
        <Link to="/dashboard">
          <Button variant="gradient" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
