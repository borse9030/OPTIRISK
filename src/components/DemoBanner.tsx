'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Activity } from 'lucide-react';

export default function DemoBanner() {
  const pathname = usePathname();

  // Hide on public marketing landing or login screen
  if (pathname === '/' || pathname === '/login') {
    return null;
  }

  return (
    <div className="bg-slate-100/90 border-b border-slate-200/80 px-3 sm:px-4 py-1 text-xs text-slate-600 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 font-semibold text-[10px] sm:text-[11px] bg-emerald-50 text-emerald-700 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          PRODUCTION CLUSTER
        </span>
        <span className="text-slate-500 text-[11px] hidden md:inline">
          Titan Financial Group • Core Banking Tier-1 Environment
        </span>
        <span className="text-slate-500 text-[10px] md:hidden font-medium">
          Titan Financial Group
        </span>
      </div>
      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-600 font-medium font-mono">
        <span className="hidden sm:inline text-slate-400">FAIR v2.4 Engine</span>
        <span className="flex items-center gap-1 text-emerald-700">
          <Activity className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>99.99% Telemetry SLA</span>
        </span>
      </div>
    </div>
  );
}
