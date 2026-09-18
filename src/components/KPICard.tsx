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
    <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 sm:p-5 flex flex-col justify-between shadow-xs hover:border-slate-300 hover:shadow-sm transition-all">
      <div>
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 truncate">
            {title}
          </span>
          <div className="p-1 sm:p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 shrink-0">
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
          </div>
        </div>

        <div className="flex items-baseline flex-wrap gap-1.5 mb-1">
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 metric-tabular font-mono">
            {value}
          </span>
          {badge && (
            <span
              className={`text-[9px] sm:text-[10px] font-semibold uppercase px-1.5 sm:px-2 py-0.5 rounded-full border shrink-0 ${badgeClasses}`}
            >
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 font-normal leading-relaxed line-clamp-2">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-2.5 pt-2 sm:mt-3 sm:pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px] sm:text-[11px]">
        {trend ? (
          <span
            className={`font-medium flex items-center gap-1 shrink-0 ${
              trendPositive ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {trend}
          </span>
        ) : (
          <span className="text-slate-400 text-[10px] shrink-0">Deterministic</span>
        )}

        {helpText && (
          <span className="text-slate-500 text-[10px] text-right truncate max-w-[110px] sm:max-w-[150px]" title={helpText}>
            {helpText}
          </span>
        )}
      </div>
    </div>
  );
}
