import React, { useState, useEffect } from 'react';
import { Timer, Pause, Play, AlertCircle } from 'lucide-react';

interface InterviewTimerProps {
  initialSeconds: number;
  onTimeExpired: () => void;
}

export const InterviewTimer: React.FC<InterviewTimerProps> = ({
  initialSeconds,
  onTimeExpired
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, onTimeExpired]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = secondsLeft < 300; // < 5 mins

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-sm font-semibold transition-colors ${
          isLowTime
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
            : 'bg-slate-900 text-slate-200 border-slate-800'
        }`}
      >
        <Timer className="w-4 h-4 text-indigo-400" />
        <span>{formatted}</span>
      </div>

      <button
        onClick={() => setIsRunning(!isRunning)}
        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
        title={isRunning ? 'Pause Timer' : 'Resume Timer'}
      >
        {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};
