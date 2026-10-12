import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Menu,
  X,
  Code2,
  User,
  Settings,
  LogOut,
  Flame,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { ResearchBadge } from './ResearchBadge';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileSidebar,
  isMobileSidebarOpen
}) => {
  const { user, logoutDemo } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/problems?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Hamburger & Logo for small screens */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <Link to="/dashboard" className="flex items-center gap-2.5 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Code2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight gradient-brand-text">AlgoPilot</span>
        </Link>
      </div>

      {/* Middle: Global Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search problems, patterns, topics (e.g. Binary Search, DP)..."
            className="w-full pl-9 pr-12 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800 rounded border border-slate-700">
            /
          </kbd>
        </form>
      </div>

      {/* Right: Research Mode, Streak, Notifications, Theme, User */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Research Strategy Badge */}
        <ResearchBadge />

        {/* Streak Indicator */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold"
          title={`${user.streakDays}-day practice streak`}
        >
          <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500 animate-pulse" />
          <span>{user.streakDays}d Streak</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors relative"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
          </button>

          {isNotificationsOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsNotificationsOpen(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-40 text-left">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Notifications</h4>
                  <span className="text-[11px] text-indigo-400 cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-200 font-medium">Adaptive Recommendation Ready</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Targeted calibration generated for Binary Search off-by-one errors.
                      </p>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800/40 border border-slate-700/30 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-200 font-medium">Daily Mission Accomplished</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Completed "Dynamic Programming Foundation" (+300 XP).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/40"
            />
            <span className="text-xs font-medium text-slate-200 hidden xl:inline max-w-[100px] truncate">
              {user.name}
            </span>
          </button>

          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-40 text-left">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="text-xs font-semibold text-white">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {user.preferences.currentDsaLevel} · {user.preferences.targetPreparationArea}
                  </span>
                </div>
                <Link
                  to="/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  Settings & Preferences
                </Link>
                <Link
                  to="/analytics"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Skill Profile
                </Link>
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logoutDemo();
                    navigate('/auth');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors mt-1"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  Sign Out (Simulated)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
