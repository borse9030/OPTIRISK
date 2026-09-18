import React from 'react';
import { TrendingDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/riskEngine';

interface ROSIComparisonProps {
  currentBudget?: number;
  currentEAL?: number;
  currentRiskScore?: number;
  optimizedBudget?: number;
  projectedEAL?: number;
  optimizedRiskScore?: number;
  riskReductionPct?: number;
  lossAvoided?: number;
  rosiMultiplier?: number;
}

export default function ROSIComparison({
  currentBudget = 1000000,
  currentEAL = 3840000,
  currentRiskScore = 68,
  optimizedBudget = 1000000,
  projectedEAL = 2170000,
  optimizedRiskScore = 41,
  riskReductionPct = 42.8,
  lossAvoided = 1670000,
  rosiMultiplier = 2.6,
}: ROSIComparisonProps) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Investment Impact: Status Quo vs. Optimized
            </h3>
            <p className="text-xs text-slate-500">
              Comparing baseline security spend against our algorithmic Knapsack reallocation
            </p>
          </div>
        </div>

        <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          ROSI: {rosiMultiplier.toFixed(1)}× Return
        </div>
      </div>

      {/* Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Current State Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-slate-700">
              Current Baseline
            </span>
            <span className="text-[11px] text-slate-400">Status Quo</span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-600">Budget Deployed:</span>
              <span className="text-sm font-mono font-semibold text-slate-900">
                {formatINR(currentBudget)}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-600">Expected Annual Loss (EAL):</span>
              <span className="text-lg font-mono font-bold text-rose-700">
                {formatINR(currentEAL)}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-600">Portfolio Cyber Risk:</span>
              <span className="text-lg font-mono font-bold text-rose-700">
                {currentRiskScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200">
            Capital is over-allocated to mature endpoint tools with plateaued marginal return.
          </div>
        </div>

        {/* Optimized State Card */}
        <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200/80 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-blue-900">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Algorithmic Allocation
            </span>
            <span className="text-[11px] font-mono font-bold text-emerald-700">
              +{riskReductionPct}% Risk Reduced
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-600">Target Budget:</span>
              <span className="text-sm font-mono font-semibold text-slate-900">
                {formatINR(optimizedBudget)}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-600">Projected Annual Loss:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-400 line-through">
                  {formatINR(currentEAL)}
                </span>
                <span className="text-lg font-mono font-bold text-emerald-700">
                  {formatINR(projectedEAL)}
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-600">Projected Risk Score:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-400 line-through">
                  {currentRiskScore}
                </span>
                <span className="text-lg font-mono font-bold text-emerald-700">
                  {optimizedRiskScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-blue-800 border-t border-blue-200/60">
            Reallocates +₹2.0L into high-loss exposure vectors (API Security & Identity).
          </div>
        </div>
      </div>

      {/* Summary Delta Banner */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-emerald-900 font-medium">Estimated Annual Loss Avoided</div>
            <div className="text-base sm:text-lg font-mono font-bold text-emerald-900">
              {formatINR(lossAvoided)} <span className="text-xs text-emerald-700 font-sans font-normal">saved per year</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 border-t sm:border-t-0 border-emerald-200/60 pt-2 sm:pt-0">
          <div>
            <div className="text-[11px] text-slate-600">Risk Reduction</div>
            <div className="text-base font-mono font-bold text-slate-900">
              {riskReductionPct}%
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-600">Investment Yield</div>
            <div className="text-base font-mono font-bold text-blue-700">
              {rosiMultiplier.toFixed(1)}× ROSI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
