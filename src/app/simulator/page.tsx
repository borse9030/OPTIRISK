'use client';

import React from 'react';
import {
  FlaskConical,
  RotateCcw,
  CheckCircle2,
  SlidersHorizontal,
  ArrowRight,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { formatINR } from '@/lib/riskEngine';

export default function SimulatorPage() {
  const {
    scenarios,
    applyScenario,
    activeScenarioId,
    budget,
    allocations,
    updateAllocation,
    threatMultiplier,
    setThreatMultiplier,
    criticalityWeight,
    setCriticalityWeight,
    liveMetrics,
    controls,
    resetToDefaults,
  } = useData();

  const baseline = {
    riskScore: 68,
    eal: 3840000,
    budget: 1000000,
  };

  const deltaRisk = baseline.riskScore - liveMetrics.riskScore;
  const deltaEAL = baseline.eal - liveMetrics.eal;

  const handleQuickReallocation = () => {
    const edrSpend = allocations['ctrl_edr'] || 200000;
    const apiSpend = allocations['ctrl_api_sec'] || 150000;
    updateAllocation('ctrl_edr', Math.max(50000, edrSpend - 150000));
    updateAllocation('ctrl_api_sec', apiSpend + 150000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Scenario Modeling
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">Sandbox Playground</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Cybersecurity What-If Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
              Stress-test financial exposure scenarios before committing capital. For example: <em>&ldquo;What happens to our annual loss if we move ₹1.5L from EDR to API Security?&rdquo;</em>
            </p>
          </div>

          <button
            onClick={resetToDefaults}
            className="p-2.5 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors self-start sm:self-auto"
            title="Reset sandbox"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Scenario Cards */}
      <div className="space-y-2.5">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Quick Simulated Scenarios (1-Click to Test):
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {scenarios.map((scen) => {
            const isActive = activeScenarioId === scen.id;
            return (
              <button
                key={scen.id}
                onClick={() => applyScenario(scen.id)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isActive
                    ? 'bg-blue-50/70 border-blue-300 shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      {scen.badge}
                    </span>
                    {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {scen.name}
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-baseline justify-between text-[11px] font-mono">
                  <span className="text-slate-500">Yield:</span>
                  <span className="text-emerald-700 font-bold">+{scen.riskReductionPct}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Before vs. After Sandbox Diff */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
            Real-Time Delta: Status Quo vs. Sandbox State
          </h3>
          <span className="text-[11px] font-mono text-slate-500">Live Compute</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Before */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              1. Status Quo (Before)
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Risk Score:</span>
                <span className="font-mono font-bold text-slate-900">{baseline.riskScore} / 100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Annual Loss (EAL):</span>
                <span className="font-mono font-bold text-rose-700">{formatINR(baseline.eal)}</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-2">
            <div className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              2. Simulated Result (After)
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Simulated Risk:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {liveMetrics.riskScore} / 100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Projected EAL:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {formatINR(liveMetrics.eal)}
                </span>
              </div>
            </div>
          </div>

          {/* Delta */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              3. Net Measurable Delta
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-emerald-800">Risk Reduction:</span>
                <span className="font-mono font-bold text-emerald-800">
                  {deltaRisk >= 0 ? `-${deltaRisk} pts` : `+${Math.abs(deltaRisk)} pts`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800">Loss Avoided:</span>
                <span className="font-mono font-bold text-emerald-800">
                  {deltaEAL >= 0 ? `${formatINR(deltaEAL)} / yr` : `-${formatINR(Math.abs(deltaEAL))}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tuning Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Factors */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Threat Factor Tuning
          </h3>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-medium">Threat Frequency Multiplier</span>
              <span className="font-mono font-bold text-blue-700">{threatMultiplier.toFixed(2)}×</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.05"
              value={threatMultiplier}
              onChange={(e) => setThreatMultiplier(Number(e.target.value))}
              aria-label="Threat Frequency Multiplier"
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0.5× Calm</span>
              <span>1.0× Normal</span>
              <span>2.0× Surge</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-medium">Asset Criticality Weight</span>
              <span className="font-mono font-bold text-blue-700">{criticalityWeight.toFixed(2)}×</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.5"
              step="0.05"
              value={criticalityWeight}
              onChange={(e) => setCriticalityWeight(Number(e.target.value))}
              aria-label="Asset Criticality Weight"
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Quick experiment button */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              Quick Experiment: Shift ₹1.5L from EDR to API Security
            </div>
            <p className="text-xs text-slate-600">
              Shift budget away from saturated endpoint agents into high-exposure API Gateway defenses.
            </p>
            <button
              onClick={handleQuickReallocation}
              className="soft-btn-primary w-full py-2 text-xs font-semibold mt-1 shadow-xs"
            >
              Apply Rebalancing
            </button>
          </div>
        </div>

        {/* Live Control Budget Sliders */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Control Budget Sandbox
            </h3>
            <span className="text-xs font-mono text-slate-500">
              {formatINR(liveMetrics.allocatedTotal)} of {formatINR(budget)}
            </span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {controls.slice(0, 8).map((ctrl) => {
              const spend = allocations[ctrl.id] || 0;
              return (
                <div key={ctrl.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-800">{ctrl.name}</span>
                    <span className="font-mono text-slate-900 font-bold">{formatINR(spend)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={budget}
                    step="25000"
                    value={spend}
                    onChange={(e) => updateAllocation(ctrl.id, Number(e.target.value))}
                    aria-label={`Simulate budget for ${ctrl.name}`}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
