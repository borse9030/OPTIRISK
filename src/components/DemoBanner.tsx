import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 py-1.5 text-xs text-slate-600 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex items-center font-medium text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200/80">
          SIH26105
        </span>
        <span className="text-slate-500 hidden sm:inline text-[11px]">
          Enterprise Benchmark Environment • Titan Financial Group (Tier-1 Banking)
        </span>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-slate-500">
        <span className="flex items-center gap-1 text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Deterministic Model Active
        </span>
      </div>
    </div>
  );
}
