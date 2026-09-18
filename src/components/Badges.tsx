import React from 'react';
import { Severity } from '@/lib/types';

interface BadgeProps {
  severity: Severity | string;
  size?: 'sm' | 'md';
}

export function SeverityBadge({ severity, size = 'sm' }: BadgeProps) {
  const norm = severity.toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-500';

  if (norm === 'critical') {
    styles = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
  } else if (norm === 'high') {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (norm === 'medium') {
    styles = 'bg-blue-50 text-blue-700 border-blue-200';
    dotColor = 'bg-blue-500';
  } else if (norm === 'low') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  }

  const padding = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-medium tracking-wide rounded-full border ${padding} ${styles}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor}`} />
      {severity}
    </span>
  );
}

export function ScoreBadge({ score }: { score: number }) {
  let color = 'text-emerald-700 border-emerald-200 bg-emerald-50';
  if (score >= 70) {
    color = 'text-rose-700 border-rose-200 bg-rose-50';
  } else if (score >= 50) {
    color = 'text-amber-700 border-amber-200 bg-amber-50';
  } else if (score >= 30) {
    color = 'text-blue-700 border-blue-200 bg-blue-50';
  }

  return (
    <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded-full border ${color}`}>
      {score}/100
    </span>
  );
}
