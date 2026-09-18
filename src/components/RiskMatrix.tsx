'use client';

import React, { useState } from 'react';
import { CyberRisk } from '@/lib/types';
import { useData } from '@/context/DataContext';
import { formatINR } from '@/lib/riskEngine';
import { SeverityBadge } from './Badges';
import { X, ShieldAlert, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RiskMatrix() {
  const { risks } = useData();
  const [selectedRisk, setSelectedRisk] = useState<CyberRisk | null>(null);

  // Group risks into a 5x5 grid: Likelihood (1-5, Y axis bottom to top) vs Impact (1-5, X axis left to right)
  const matrixGrid = React.useMemo(() => {
    const grid: CyberRisk[][][] = Array(5)
      .fill(null)
      .map(() =>
        Array(5)
          .fill(null)
          .map(() => [])
      );

    risks.forEach((r) => {
      const lIndex = Math.min(5, Math.max(1, r.likelihood)) - 1;
      const iIndex = Math.min(5, Math.max(1, r.impact)) - 1;
      grid[lIndex][iIndex].push(r);
    });

    return grid;
  }, [risks]);

  // Soft cell color generator
  const getCellColor = (likelihood: number, impact: number) => {
    const product = likelihood * impact;
    if (product >= 15) return 'bg-rose-50 border-rose-200 hover:bg-rose-100/80 text-rose-900';
    if (product >= 10) return 'bg-amber-50 border-amber-200 hover:bg-amber-100/80 text-amber-900';
    if (product >= 5) return 'bg-blue-50 border-blue-200 hover:bg-blue-100/80 text-blue-900';
    return 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100/80 text-emerald-900';
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            5×5 Cyber Risk Exposure Heatmap
          </h3>
          <p className="text-xs text-slate-500">
            Likelihood vs. Financial Impact matrix. Click any cell to inspect risk parameters.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-[11px] font-medium font-mono">
          <span className="flex items-center gap-1.5 text-rose-800">
            <span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block" /> Critical (15-25)
          </span>
          <span className="flex items-center gap-1.5 text-amber-800">
            <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /> High (10-14)
          </span>
          <span className="flex items-center gap-1.5 text-blue-800">
            <span className="w-2.5 h-2.5 rounded bg-blue-500 inline-block" /> Moderate (5-9)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-800">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Low (1-4)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Grid Container */}
        <div className="lg:col-span-2">
          <div className="relative pl-10 pb-8">
            {/* Y Axis Label */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Likelihood (1 → 5)
            </div>

            {/* 5x5 Grid (Reversed L from 5 down to 1) */}
            <div className="grid grid-rows-5 gap-1.5 h-[340px]">
              {[5, 4, 3, 2, 1].map((likelihood) => (
                <div key={likelihood} className="grid grid-cols-5 gap-1.5 items-stretch">
                  {[1, 2, 3, 4, 5].map((impact) => {
                    const cellRisks = matrixGrid[likelihood - 1][impact - 1];
                    const colorStyle = getCellColor(likelihood, impact);
                    return (
                      <div
                        key={`${likelihood}-${impact}`}
                        className={`rounded-lg border p-1.5 transition-all flex flex-col justify-between cursor-pointer relative group ${colorStyle}`}
                      >
                        <div className="flex items-center justify-between text-[10px] opacity-70 font-mono">
                          <span>L{likelihood}×I{impact}</span>
                          {cellRisks.length > 0 && (
                            <span className="font-bold px-1 rounded bg-white/70 shadow-2xs">
                              {cellRisks.length}
                            </span>
                          )}
                        </div>

                        {cellRisks.length > 0 ? (
                          <div className="space-y-1 overflow-hidden mt-1">
                            {cellRisks.slice(0, 2).map((r) => (
                              <button
                                key={r.id}
                                onClick={() => setSelectedRisk(r)}
                                className="w-full text-left truncate text-[10px] font-medium px-1 py-0.5 rounded bg-white/60 hover:bg-white transition-colors"
                              >
                                {r.title}
                              </button>
                            ))}
                            {cellRisks.length > 2 && (
                              <div
                                onClick={() => setSelectedRisk(cellRisks[0])}
                                className="text-[9px] text-center font-mono opacity-80 cursor-pointer hover:underline"
                              >
                                +{cellRisks.length - 2} more
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center justify-center text-[10px] opacity-25">
                            -
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* X Axis Label */}
            <div className="text-center text-[11px] font-bold tracking-wider text-slate-500 uppercase mt-3">
              Financial Impact (1 → 5)
            </div>
          </div>
        </div>

        {/* Selected Risk Inspection Drawer */}
        <div className="lg:col-span-1 rounded-xl bg-slate-50 border border-slate-200/90 p-4 flex flex-col justify-between">
          {selectedRisk ? (
            <div className="space-y-3">
              <div className="flex items-start justify-between pb-2 border-b border-slate-200">
                <div className="space-y-1">
                  <SeverityBadge severity={selectedRisk.severity} />
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {selectedRisk.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedRisk(null)}
                  className="p-1 rounded text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500">Affected Asset:</span>
                  <div className="font-semibold text-slate-900 mt-0.5">
                    {selectedRisk.assetName}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500">Active Threat:</span>
                  <div className="text-slate-800 mt-0.5">{selectedRisk.threatName}</div>
                </div>

                {selectedRisk.vulnerabilityId && (
                  <div>
                    <span className="text-slate-500">Associated CVE:</span>
                    <span className="ml-2 font-mono text-blue-700 font-bold">
                      {selectedRisk.vulnerabilityId}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase">Worst-Case Impact</span>
                    <div className="font-mono font-bold text-rose-700">
                      {formatINR(selectedRisk.financialImpact)}
                    </div>
                  </div>
                  <div className="p-2 rounded bg-white border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase">Annual Loss (EAL)</span>
                    <div className="font-mono font-bold text-slate-900">
                      {formatINR(selectedRisk.expectedAnnualLoss)}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-[10px] text-blue-900 uppercase font-semibold">
                    Recommended Control
                  </span>
                  <div className="font-medium text-slate-900 text-xs mt-0.5">
                    {selectedRisk.recommendedControlName}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <Link
                  href="/optimizer"
                  className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Allocate Capital for this Risk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
              <ShieldAlert className="w-8 h-8 text-slate-400 opacity-60" />
              <div className="font-semibold text-slate-700 text-xs">Risk Inspector</div>
              <p className="text-[11px] text-slate-500">
                Click any cell in the 5×5 matrix to inspect asset exposure, financial loss model, and remediation control.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
