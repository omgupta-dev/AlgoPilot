import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldAlert, Check, User, Mail, Lock } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('Alex Chen');
  const [email, setEmail] = useState('alex.chen@university.edu');
  const [password, setPassword] = useState('demopassword123');
  const { loginDemo } = useAuth();
  const navigate = useNavigate();

  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginDemo(name, email);
    if (isSignUp) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  const handleQuickDemoFill = () => {
    setName('Alex Chen');
    setEmail('alex.chen@university.edu');
    setPassword('demopassword123');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 antialiased">
      <div className="w-full max-w-md space-y-6">
        {/* Logo Branding */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight gradient-brand-text">AlgoPilot</span>
          </Link>
          <h2 className="text-xl font-bold text-white">
            {isSignUp ? 'Create your AlgoPilot account' : 'Welcome back to AlgoPilot'}
          </h2>
          <p className="text-xs text-slate-400">
            {isSignUp
              ? 'Start adaptive DSA preparation and track your learning curve'
              : 'Sign in to access your calibration metrics and practice missions'}
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 flex items-start gap-2.5 text-xs text-indigo-300">
          <ShieldAlert className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold block text-indigo-200">Phase 1 Simulated Authentication:</span>
            Credentials are for client-side demonstration only. Passwords are never sent or stored. Real multi-factor auth will arrive in Phase 2.
          </div>
        </div>

        {/* Auth Form Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-lg border border-slate-800/80 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`py-2 rounded-md transition-colors ${
                !isSignUp ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`py-2 rounded-md transition-colors ${
                isSignUp ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSimulatedSubmit} className="space-y-4 text-xs">
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="text-slate-300 font-medium">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">University / Professional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="alex.chen@university.edu"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-medium">Password (Simulated)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              className="w-full py-2.5 mt-2"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {isSignUp ? 'Continue to Onboarding' : 'Sign In to Dashboard'}
            </Button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="pt-3 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
            >
              Autofill Demo Student (Alex Chen)
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500">
          <Link to="/" className="hover:text-slate-300 transition-colors">
            ← Return to AlgoPilot Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
