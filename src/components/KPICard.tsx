import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  badge?: string;
  badgeType?: 'danger' | 'warning' | 'success' | 'info' | 'neutral';
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  helpText?: string;
}

export default function KPICard({
  title,
  value,
  subtitle,
  badge,
  badgeType = 'neutral',
  icon: Icon,
  trend,
  trendPositive,
  helpText,
}: KPICardProps) {
  let badgeClasses = 'bg-slate-100 text-slate-700 border-slate-200';
  if (badgeType === 'danger') {
    badgeClasses = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (badgeType === 'warning') {
    badgeClasses = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (badgeType === 'success') {
    badgeClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (badgeType === 'info') {
    badgeClasses = 'bg-blue-50 text-blue-700 border-blue-200';
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:border-slate-300 hover:shadow-sm transition-all">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600">
            <Icon className="w-4 h-4 text-slate-600" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 metric-tabular font-mono">
            {value}
          </span>
          {badge && (
            <span
              className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${badgeClasses}`}
            >
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-slate-600 mt-1 font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
        {trend ? (
          <span
            className={`font-medium flex items-center gap-1 ${
              trendPositive ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {trend}
          </span>
        ) : (
          <span className="text-slate-400 text-[10px]">Deterministic Model</span>
        )}

        {helpText && (
          <span className="text-slate-500 text-[10px] truncate max-w-[140px]" title={helpText}>
            {helpText}
          </span>
        )}
      </div>
    </div>
  );
}
