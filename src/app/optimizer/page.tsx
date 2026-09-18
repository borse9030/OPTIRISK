'use client';

import React, { useState } from 'react';
import {
  TrendingDown,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { formatINR } from '@/lib/riskEngine';
import ROSIComparison from '@/components/ROSIComparison';
import DiminishingReturnsCurve from '@/components/DiminishingReturnsCurve';

const BUDGET_PRESETS = [
  { label: '₹5 Lakhs', value: 500000 },
  { label: '₹10 Lakhs (Benchmark)', value: 1000000 },
  { label: '₹25 Lakhs', value: 2500000 },
  { label: '₹50 Lakhs', value: 5000000 },
  { label: '₹1 Crore', value: 10000000 },
];

export default function InvestmentOptimizerPage() {
  const {
    budget,
    setBudget,
    allocations,
    updateAllocation,
    triggerOptimization,
    optimizationResult,
    isOptimizing,
    controls,
    liveMetrics,
    resetToDefaults,
  } = useData();

  const [budgetExceededWarning, setBudgetExceededWarning] = useState<string | null>(null);
  const [selectedControlForCurve, setSelectedControlForCurve] = useState<string>('ctrl_api_sec');

  const handleSliderChange = (controlId: string, val: number) => {
    const success = updateAllocation(controlId, val);
    if (!success) {
      setBudgetExceededWarning(
        `Cannot allocate ${formatINR(val)}: Exceeds total available budget ceiling of ${formatINR(budget)}.`
      );
      setTimeout(() => setBudgetExceededWarning(null), 3500);
    } else {
      setBudgetExceededWarning(null);
    }
  };

  const handleRunOptimizer = () => {
    triggerOptimization();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Step-by-Step Communicator */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Decision Support Engine
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">Marginal-Yield Knapsack Model</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Cybersecurity Budget Optimizer
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
              Answers the primary CISO question: <em>&ldquo;Where should we allocate our limited budget to produce the highest measurable reduction in financial cyber risk?&rdquo;</em>
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              onClick={resetToDefaults}
              className="p-2.5 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors"
              title="Reset to status quo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleRunOptimizer}
              disabled={isOptimizing}
              className="soft-btn-primary px-5 py-2.5 text-xs font-semibold flex items-center gap-2 transition-all shadow-xs active:scale-95"
            >
              <TrendingDown className="w-4 h-4" />
              <span>{isOptimizing ? 'Computing Optimal Mix...' : 'Run Optimization Engine'}</span>
            </button>
          </div>
        </div>

        {/* 3-Step Guided Roadmap */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[10px] text-blue-700 shrink-0">
              1
            </span>
            <span className="text-slate-700 font-medium">Set total annual budget ceiling</span>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[10px] text-blue-700 shrink-0">
              2
            </span>
            <span className="text-slate-700 font-medium">Run marginal-gain knapsack engine</span>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center font-bold text-[10px] text-blue-700 shrink-0">
              3
            </span>
            <span className="text-slate-700 font-medium">Review explainable reasons & ROSI</span>
          </div>
        </div>
      </div>

      {/* Step 1: Budget Ceiling & Balance Bar */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Step 1: Choose Annual Cybersecurity Budget
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-900 mt-0.5">
              {formatINR(budget)}
            </div>
          </div>

          {/* Clean budget presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            {BUDGET_PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => setBudget(p.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  budget === p.value
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Allocation Progress Bar */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600">
              Allocated: <strong className="text-slate-900">{formatINR(liveMetrics.allocatedTotal)}</strong>
            </span>
            <span className={liveMetrics.remainingBudget === 0 ? 'text-emerald-700 font-bold' : 'text-blue-700'}>
              Unallocated: <strong className="font-bold">{formatINR(liveMetrics.remainingBudget)}</strong>
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full transition-all duration-300 ${
                liveMetrics.allocatedTotal > budget
                  ? 'bg-rose-600'
                  : 'bg-blue-600'
              }`}
              style={{ width: `${Math.min(100, (liveMetrics.allocatedTotal / budget) * 100)}%` }}
            />
          </div>

          {budgetExceededWarning && (
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{budgetExceededWarning}</span>
            </div>
          )}
        </div>
      </div>

      {/* Step 2: Before vs After Benchmark Yield Comparison */}
      <ROSIComparison
        currentBudget={budget}
        currentEAL={3840000}
        currentRiskScore={68}
        optimizedBudget={budget}
        projectedEAL={optimizationResult?.projectedEAL || 2170000}
        optimizedRiskScore={optimizationResult?.optimizedRiskScore || 41}
        riskReductionPct={optimizationResult?.riskReductionPct || 42.8}
        lossAvoided={optimizationResult?.expectedLossAvoided || 1670000}
        rosiMultiplier={optimizationResult?.rosi || 2.6}
      />

      {/* Main Grid: Control Sliders vs Step-by-Step Reasoning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Step 2: Control Allocation Sandbox
                </h3>
                <p className="text-xs text-slate-500">
                  Sliders reflect current spend vs. algorithm recommendation.
                </p>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {controls.length} Controls
              </span>
            </div>

            <div className="space-y-3">
              {controls.map((ctrl) => {
                const currentSpend = allocations[ctrl.id] || 0;
                const recSpend = optimizationResult?.allocations[ctrl.id] || 0;
                const isSelected = selectedControlForCurve === ctrl.id;

                return (
                  <div
                    key={ctrl.id}
                    onClick={() => setSelectedControlForCurve(ctrl.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/40 border-blue-300 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div>
                        <span className="text-xs font-bold text-slate-900">{ctrl.name}</span>
                        <span className="text-[10px] text-slate-500 ml-2">
                          Maturity L{ctrl.currentMaturity}/5
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 font-mono text-xs">
                        <span className="text-slate-900 font-bold">{formatINR(currentSpend)}</span>
                        {recSpend !== currentSpend && (
                          <span className="text-[11px] text-blue-700 font-medium">
                            (Rec: {formatINR(recSpend)})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Touch Slider */}
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max={Math.min(budget, ctrl.saturationBudget * 1.5)}
                        step="25000"
                        value={currentSpend}
                        onChange={(e) => handleSliderChange(ctrl.id, Number(e.target.value))}
                        aria-label={`Allocate budget for ${ctrl.name}`}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateAllocation(ctrl.id, recSpend);
                        }}
                        title="Set to recommended"
                        className="px-2 py-1 text-[10px] font-medium text-blue-700 bg-white hover:bg-blue-50 rounded border border-slate-200 shrink-0 shadow-2xs"
                      >
                        Apply Rec
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
                      <span>Max Reduction: {ctrl.maxRiskReductionPct}%</span>
                      <span>Saturation Point: ~{formatINR(ctrl.saturationBudget)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Step 3: Explainable Reasoning & Diminishing Curve (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Diminishing Returns Curve */}
          <DiminishingReturnsCurve selectedControlId={selectedControlForCurve} />

          {/* Reasoning Panel */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Step 3: Why This Investment?
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Explainable Rationale
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Our algorithm prioritizes high-criticality assets that operate at lower maturity levels, avoiding capital waste past saturation plateaus:
            </p>

            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
              {optimizationResult?.reasonings.slice(0, 4).map((r) => (
                <div
                  key={r.controlId}
                  className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{r.controlName}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        r.delta > 0
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : r.delta < 0
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {r.delta > 0 ? `+${formatINR(r.delta)}` : r.delta < 0 ? `-${formatINR(Math.abs(r.delta))}` : 'Maintain'}
                    </span>
                  </div>

                  <ul className="space-y-1 text-xs text-slate-600">
                    {r.reason.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Loss Avoided:</span>
                    <span className="font-mono font-bold text-emerald-700">
                      {formatINR(r.expectedLossAvoided)} / yr
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
