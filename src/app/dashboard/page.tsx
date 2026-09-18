'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  IndianRupee,
  Wallet,
  TrendingDown,
  ArrowRight,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import KPICard from '@/components/KPICard';
import RiskTrendChart from '@/components/RiskTrendChart';
import ROSIComparison from '@/components/ROSIComparison';
import { SeverityBadge, ScoreBadge } from '@/components/Badges';
import { formatINR } from '@/lib/riskEngine';

export default function DashboardPage() {
  const { liveMetrics, budget, risks, organization } = useData();

  // Top 5 Critical Risks
  const topRisks = React.useMemo(() => {
    return [...risks]
      .sort((a, b) => b.riskScore - a.riskScore || b.expectedAnnualLoss - a.expectedAnnualLoss)
      .slice(0, 5);
  }, [risks]);

  // Risk Distribution counts
  const distribution = React.useMemo(() => {
    const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    risks.forEach((r) => {
      counts[r.severity] = (counts[r.severity] || 0) + 1;
    });
    return counts;
  }, [risks]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Executive Briefing Banner */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                {organization.name}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">FY 2026-27 Cyber Risk Briefing</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Executive Cyber Risk Summary
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Your organization has an <strong className="text-slate-900 font-semibold">Expected Annual Loss (EAL) of {formatINR(liveMetrics.eal)}</strong>.
              Reallocating your <strong className="text-slate-900 font-semibold">{formatINR(budget)}</strong> cybersecurity budget can avoid <strong className="text-emerald-700 font-semibold">{formatINR(liveMetrics.lossAvoided)} in annual losses</strong> at a <strong className="text-blue-700 font-semibold">{liveMetrics.rosi.toFixed(1)}× return</strong>.
            </p>
          </div>

          <Link
            href="/optimizer"
            className="soft-btn-primary px-4 py-2.5 text-xs font-semibold flex items-center justify-center gap-2 self-start sm:self-auto shrink-0 shadow-xs"
          >
            <span>Review Budget Optimizer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Top 5 Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <KPICard
          title="Cyber Risk Score"
          value={`${liveMetrics.riskScore} / 100`}
          subtitle="Overall Exposure"
          badge="HIGH"
          badgeType="danger"
          icon={ShieldAlert}
          trend="-13 pts in 90d"
          trendPositive={true}
          helpText="Likelihood × impact × asset criticality"
        />

        <KPICard
          title="Expected Annual Loss"
          value={formatINR(liveMetrics.eal)}
          subtitle="Annual Loss Exposure (ALE)"
          badge="ANNUAL"
          badgeType="warning"
          icon={IndianRupee}
          trend="₹38.4L baseline"
          trendPositive={false}
          helpText="Probability × financial damage"
        />

        <KPICard
          title="Security Budget"
          value={formatINR(budget)}
          subtitle={`Allocated: ${formatINR(liveMetrics.allocatedTotal)}`}
          badge={`Rem: ${formatINR(liveMetrics.remainingBudget)}`}
          badgeType="info"
          icon={Wallet}
          helpText="Fiscal limit approved by board"
        />

        <KPICard
          title="Risk Reduction"
          value={`${liveMetrics.riskReductionPct}%`}
          subtitle="With Optimal Spend"
          badge="YIELD"
          badgeType="success"
          icon={TrendingDown}
          trend="+18.4% efficiency"
          trendPositive={true}
          helpText="Loss avoided via optimal rebalancing"
        />

        <KPICard
          title="ROSI Multiplier"
          value={`${liveMetrics.rosi.toFixed(1)}×`}
          subtitle="Return on Security Spend"
          badge="BENCHMARK"
          badgeType="success"
          icon={Layers}
          trend="₹16.7L saved"
          trendPositive={true}
          helpText="Net loss avoided per ₹1 invested"
        />
      </div>

      {/* Before vs After Hero Benchmark */}
      <ROSIComparison
        currentBudget={budget}
        currentEAL={3840000}
        currentRiskScore={68}
        optimizedBudget={budget}
        projectedEAL={2170000}
        optimizedRiskScore={41}
        riskReductionPct={liveMetrics.riskReductionPct}
        lossAvoided={liveMetrics.lossAvoided}
        rosiMultiplier={liveMetrics.rosi}
      />

      {/* Middle Section: Trend Chart & Severity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskTrendChart />
        </div>

        {/* Risk Distribution Breakdown */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Severity Distribution
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                {risks.length} Exposure Vectors
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Critical */}
              <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-xs font-semibold text-rose-800">Critical Risks</span>
                </div>
                <span className="text-base font-mono font-bold text-rose-700">
                  {distribution.Critical}
                </span>
              </div>

              {/* High */}
              <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs font-semibold text-amber-800">High Risks</span>
                </div>
                <span className="text-base font-mono font-bold text-amber-700">
                  {distribution.High}
                </span>
              </div>

              {/* Medium */}
              <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-semibold text-blue-800">Medium Risks</span>
                </div>
                <span className="text-base font-mono font-bold text-blue-700">
                  {distribution.Medium}
                </span>
              </div>

              {/* Low */}
              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-800">Low Risks</span>
                </div>
                <span className="text-base font-mono font-bold text-emerald-700">
                  {distribution.Low}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link
              href="/risk-intelligence"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium text-xs transition-colors"
            >
              <span>View Full Risk Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] text-slate-400 font-mono">FAIR STANDARDS</span>
          </div>
        </div>
      </div>

      {/* Top Critical Risks Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Top Financial Cyber Risks
            </h3>
            <p className="text-xs text-slate-500">
              Ranked by annual financial loss potential and likelihood
            </p>
          </div>

          <Link
            href="/risk-intelligence"
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 self-start sm:self-auto transition-colors"
          >
            <span>View All {risks.length} Risks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile View: Touch Cards */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {topRisks.map((risk) => (
            <div
              key={risk.id}
              className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-semibold text-slate-900 text-xs leading-snug">{risk.title}</div>
                <SeverityBadge severity={risk.severity} />
              </div>
              <div className="text-[11px] text-slate-500">Asset: {risk.assetName}</div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200">
                <span className="text-slate-500">Annual Loss:</span>
                <span className="font-mono font-bold text-slate-900">
                  {formatINR(risk.expectedAnnualLoss)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Remedy:</span>
                <span className="text-blue-700 font-medium truncate max-w-[200px]">
                  {risk.recommendedControlName}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Clean Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold text-[11px]">
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Risk Scenario</th>
                <th className="py-2.5 px-3">Target Asset</th>
                <th className="py-2.5 px-3 text-right">Probability</th>
                <th className="py-2.5 px-3 text-right">Potential Impact</th>
                <th className="py-2.5 px-3 text-right">Annual Loss (EAL)</th>
                <th className="py-2.5 px-3 text-center">Score</th>
                <th className="py-2.5 px-3">Recommended Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topRisks.map((risk) => (
                <tr key={risk.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <SeverityBadge severity={risk.severity} />
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-900 max-w-xs truncate">
                    {risk.title}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {risk.assetName}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600">
                    {Math.round(risk.probabilityOfLoss * 100)}%
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600">
                    {formatINR(risk.financialImpact)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatINR(risk.expectedAnnualLoss)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <ScoreBadge score={risk.riskScore} />
                  </td>
                  <td className="py-3 px-3 text-blue-700 font-medium truncate max-w-[180px]">
                    {risk.recommendedControlName}
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
