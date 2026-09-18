'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

export default function DemoBanner() {
  const pathname = usePathname();

  // Hide on public marketing landing or login screen
  if (pathname === '/' || pathname === '/login') {
    return null;
  }

  return (
    <div className="bg-slate-100/90 border-b border-slate-200/80 px-3 sm:px-4 py-1 text-xs text-slate-600 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center font-semibold text-[10px] sm:text-[11px] bg-blue-50 text-blue-700 px-1.5 sm:px-2 py-0.5 rounded border border-blue-200/80">
          SIH26105
        </span>
        <span className="text-slate-500 text-[11px] hidden md:inline">
          Enterprise Benchmark • Titan Financial Group (Tier-1 Banking)
        </span>
        <span className="text-slate-500 text-[10px] md:hidden font-medium">
          Titan Financial Group
        </span>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-emerald-700 font-medium">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="hidden sm:inline">Deterministic Model Active</span>
        <span className="sm:hidden">Deterministic</span>
      </div>
    </div>
  );
}
