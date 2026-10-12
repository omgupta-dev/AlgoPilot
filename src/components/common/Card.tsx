import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  glass = true,
  onClick
}) => {
  const base = 'rounded-xl border transition-all duration-200';
  const glassStyle = glass
    ? 'bg-slate-900/60 backdrop-blur-md border-slate-800/80 shadow-sm'
    : 'bg-slate-900 border-slate-800 shadow-sm';
  const hoverStyle = hoverable
    ? 'hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${base} ${glassStyle} ${hoverStyle} ${className}`}
    >
      {children}
    </div>
  );
};
