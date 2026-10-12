import React from 'react';
import { Difficulty, DSATopic, SubmissionStatus } from '../../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'difficulty' | 'topic' | 'status' | 'strategy' | 'neutral' | 'accent';
  difficulty?: Difficulty;
  status?: SubmissionStatus | 'Solved' | 'Todo' | 'Attempted';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  difficulty,
  status,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  if (difficulty) {
    let diffColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (difficulty === 'Medium') diffColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    if (difficulty === 'Hard') diffColor = 'bg-rose-500/10 text-rose-400 border-rose-500/20';

    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${sizeClasses} ${diffColor} ${className}`}>
        {difficulty}
      </span>
    );
  }

  if (status) {
    let statusColor = 'bg-slate-800 text-slate-300 border-slate-700';
    if (status === 'Accepted' || status === 'Solved') {
      statusColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    } else if (status === 'Wrong Answer') {
      statusColor = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    } else if (status === 'Time Limit Exceeded') {
      statusColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    } else if (status === 'Attempted') {
      statusColor = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }

    return (
      <span className={`inline-flex items-center font-medium rounded-full border ${sizeClasses} ${statusColor} ${className}`}>
        {status}
      </span>
    );
  }

  if (variant === 'accent') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full border bg-indigo-500/10 text-indigo-300 border-indigo-500/20 ${sizeClasses} ${className}`}>
        {children}
      </span>
    );
  }

  if (variant === 'topic') {
    return (
      <span className={`inline-flex items-center font-medium rounded-md border bg-slate-800/80 text-slate-300 border-slate-700/60 ${sizeClasses} ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-md border bg-slate-800/60 text-slate-300 border-slate-700/50 ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};
