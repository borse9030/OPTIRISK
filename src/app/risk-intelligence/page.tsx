'use client';

import React, { useState } from 'react';
import {
  AlertOctagon,
  Search,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { SeverityBadge, ScoreBadge } from '@/components/Badges';
import RiskMatrix from '@/components/RiskMatrix';
import { formatINR } from '@/lib/riskEngine';
import Link from 'next/link';

export default function RiskIntelligencePage() {
  const { risks } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');

  // Dynamic formula tester values
  const [testProb, setTestProb] = useState(12); // 12%
  const [testImpactCr, setTestImpactCr] = useState(3.2); // ₹3.2 Crore

  const calculatedTestEAL = Math.round((testProb / 100) * (testImpactCr * 10000000));

  const filteredRisks = React.useMemo(() => {
    return risks.filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.threatName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSeverity = severityFilter === 'All' || r.severity === severityFilter;
      return matchSearch && matchSeverity;
    });
  }, [risks, searchTerm, severityFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Risk Intelligence & Financial Quantification
            </h1>
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono font-medium">
              {risks.length} EXPOSURE VECTORS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Deterministic mathematical calculations translating technical vulnerabilities into balance-sheet Rupee loss expectancies.
          </p>
        </div>

        <Link
          href="/optimizer"
          className="soft-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 self-start transition-colors"
        >
          <span>Allocate Capital for Risks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Transparent Calculation Formulas & Dynamic Formula Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Mathematical Formulas */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Calculator className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Deterministic Calculation Engines
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Formula 1 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-slate-900">
                1. Expected Annual Loss (EAL / ALE)
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs text-blue-700 font-bold">
                EAL = Probability × Financial Impact
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Quantifies the expected financial cash outflow per annum for an unmitigated threat vector.
              </p>
            </div>

            {/* Formula 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-slate-900">
                2. Normalized Risk Score (0 - 100)
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs text-blue-700 font-bold">
                Score = (L × I × Criticality) / 125 × 100
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Multiplies Likelihood (1-5), Impact (1-5), and Asset Criticality (1-5), normalized against max product (125).
              </p>
            </div>
          </div>
        </div>

        {/* Right: Dynamic Interactive Formula Validator */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Interactive EAL Model Calculator
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-medium">Live Compute</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Threat Probability:</span>
                <span className="font-mono font-bold text-slate-900">{testProb}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={testProb}
                onChange={(e) => setTestProb(Number(e.target.value))}
                aria-label="Threat Probability Slider"
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">Potential Worst-Case Impact:</span>
                <span className="font-mono font-bold text-slate-900">₹{testImpactCr.toFixed(1)} Crore</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.1"
                value={testImpactCr}
                onChange={(e) => setTestImpactCr(Number(e.target.value))}
                aria-label="Potential Worst-Case Impact Slider"
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-500">Calculated EAL</div>
                <div className="text-xl font-mono font-bold text-slate-900">
                  {formatINR(calculatedTestEAL)}
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-500 font-mono">
                {testProb}% × ₹{testImpactCr}Cr
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2D Risk Heatmap Matrix */}
      <RiskMatrix />

      {/* Complete Quantified Risks Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Quantified Cyber Risk Inventory
            </h3>
            <p className="text-xs text-slate-500">
              FAIR-aligned risk register with transparent operational parameters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search risks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              aria-label="Filter by severity"
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold text-[11px]">
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Risk Title & CVE</th>
                <th className="py-2.5 px-3">Target Asset</th>
                <th className="py-2.5 px-3 text-center">Likelihood</th>
                <th className="py-2.5 px-3 text-center">Impact</th>
                <th className="py-2.5 px-3 text-center">Criticality</th>
                <th className="py-2.5 px-3 text-right">Potential Exposure</th>
                <th className="py-2.5 px-3 text-right">Annual Loss (EAL)</th>
                <th className="py-2.5 px-3 text-center">Risk Score</th>
                <th className="py-2.5 px-3">Recommended Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRisks.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <SeverityBadge severity={r.severity} />
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-900 max-w-xs truncate">{r.title}</div>
                    {r.vulnerabilityId && (
                      <div className="text-[10px] font-mono text-blue-700 mt-0.5">
                        {r.vulnerabilityId}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-[140px] truncate">
                    {r.assetName}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-600">
                    L{r.likelihood}/5
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-600">
                    I{r.impact}/5
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-600">
                    C{r.assetCriticality}/5
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-slate-700">
                    {formatINR(r.financialImpact)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatINR(r.expectedAnnualLoss)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <ScoreBadge score={r.riskScore} />
                  </td>
                  <td className="py-3 px-3 text-blue-700 font-medium max-w-[150px] truncate">
                    {r.recommendedControlName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
