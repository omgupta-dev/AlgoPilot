import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  Terminal,
  Bot,
  BarChart3,
  Building2,
  Timer,
  Target,
  Settings,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/problems', label: 'DSA Explorer', icon: Code2 },
  { path: '/workspace', label: 'Coding Workspace', icon: Terminal },
  { path: '/ai-mentor', label: 'AI Mentor', icon: Bot, badge: 'Adaptive' },
  { path: '/analytics', label: 'Skill Analytics', icon: BarChart3 },
  { path: '/company-prep', label: 'Company Prep', icon: Building2 },
  { path: '/mock-interview', label: 'Mock Interview', icon: Timer },
  { path: '/missions', label: 'Coding Missions', icon: Target },
  { path: '/settings', label: 'Settings', icon: Settings }
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-slate-950/95 lg:bg-slate-950/60 backdrop-blur-md border-r border-slate-800/80">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between px-2 py-3 mb-6">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight gradient-brand-text">AlgoPilot</div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Adaptive DSA Platform</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-500/5'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-indigo-400'
                            : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Card: Daily Target & Landing Link */}
      <div className="space-y-3 pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 font-medium">Daily Target</span>
            <span className="text-indigo-400 font-semibold">1 / {user.preferences.dailyPracticeGoal} Solved</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${(1 / user.preferences.dailyPracticeGoal) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Targeting: <span className="text-slate-300 font-medium">{user.preferences.targetPreparationArea}</span>
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
        >
          <span>Landing Page Preview</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop and Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-full z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
