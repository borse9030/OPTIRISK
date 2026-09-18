'use client';

import React, { useState } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { formatINR } from '@/lib/riskEngine';

export default function ReportsPage() {
  const {
    organization,
    budget,
    liveMetrics,
    risks,
  } = useData();

  const [reportDate] = useState(
    new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  const topRisks = React.useMemo(() => {
    return [...risks]
      .sort((a, b) => b.riskScore - a.riskScore || b.expectedAnnualLoss - a.expectedAnnualLoss)
      .slice(0, 5);
  }, [risks]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      {/* Action Bar (Hidden in Print) */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Executive Cyber Risk Briefing Report
            </h1>
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono font-medium">
              BOARD DOSSIER
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated executive briefing document translating operational security vulnerabilities into balance-sheet risk.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="soft-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Formal Printable Document Container */}
      <div className="bg-white rounded-xl p-8 sm:p-12 space-y-8 border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                O
              </div>
              <span className="font-mono font-bold text-sm uppercase tracking-wider text-slate-900">
                OptiRisk • SIH26105
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Cyber Risk Quantification & Budget Optimization Briefing
            </h2>
            <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2.5">
              <span>Organization: <strong className="text-slate-800">{organization.name}</strong></span>
              <span>•</span>
              <span>Prepared for: <strong className="text-slate-800">CISO & CFO</strong></span>
              <span>•</span>
              <span>Date: <strong className="text-slate-800">{reportDate}</strong></span>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-slate-500">
            <div className="font-bold text-slate-800">CONFIDENTIAL</div>
            <div>BOARD REVIEW ONLY</div>
            <div>REGULATOR: RBI / NIST</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800">
            1. Executive Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
            This briefing provides a quantified evaluation of the cyber risk exposure facing{' '}
            <strong className="text-slate-900">{organization.name}</strong>. Moving away from qualitative red/yellow/green heatmaps, this analysis uses the
            Factor Analysis of Information Risk (FAIR) framework to project an active{' '}
            <strong className="text-slate-900">Expected Annual Loss (EAL) of {formatINR(liveMetrics.eal)}</strong> against a balance-sheet asset
            base of ₹245 Crore. Through our deterministic marginal-yield optimization engine, reallocating our{' '}
            <strong className="text-slate-900">{formatINR(budget)}</strong> annual cybersecurity budget yields an estimated{' '}
            <strong className="text-emerald-800">{liveMetrics.riskReductionPct}% reduction in annualized financial risk</strong>, saving an estimated{' '}
            <strong className="text-emerald-800">{formatINR(liveMetrics.lossAvoided)} annually</strong> at an exceptional{' '}
            <strong className="text-blue-800">{liveMetrics.rosi.toFixed(1)}× Return on Security Investment (ROSI)</strong>.
          </p>
        </div>

        {/* Section 2: Key Financial Metrics Snapshot */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800">
            2. Financial Risk Quantification Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] uppercase font-mono text-slate-500">
                Baseline Cyber Risk
              </div>
              <div className="text-xl font-bold font-mono text-rose-700 mt-0.5">
                {liveMetrics.riskScore} / 100
              </div>
              <div className="text-[10px] text-slate-500 mt-1">High Exposure Vector</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] uppercase font-mono text-slate-500">
                Expected Annual Loss
              </div>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                {formatINR(liveMetrics.eal)}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Probability × Impact</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] uppercase font-mono text-slate-500">
                Annual Loss Avoided
              </div>
              <div className="text-xl font-bold font-mono text-emerald-800 mt-0.5">
                {formatINR(liveMetrics.lossAvoided)}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Optimized Savings</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] uppercase font-mono text-slate-500">
                Program ROSI
              </div>
              <div className="text-xl font-bold font-mono text-blue-800 mt-0.5">
                {liveMetrics.rosi.toFixed(1)}×
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Economic Return</div>
            </div>
          </div>
        </div>

        {/* Section 3: Top Critical Risk Exposures */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800">
            3. Top Vulnerability & Threat Exposures
          </h3>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold text-[11px]">
                  <th className="py-2.5 px-3">Risk Vector</th>
                  <th className="py-2.5 px-3">Affected Asset</th>
                  <th className="py-2.5 px-3 text-right">Potential Impact</th>
                  <th className="py-2.5 px-3 text-right">Annual Loss (EAL)</th>
                  <th className="py-2.5 px-3">Mitigating Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topRisks.map((r) => (
                  <tr key={r.id} className="text-slate-700">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {r.title}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{r.assetName}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                      {formatINR(r.financialImpact)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {formatINR(r.expectedAnnualLoss)}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-blue-700">
                      {r.recommendedControlName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Recommended Investment Allocation */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800">
            4. Recommended Budget Allocation
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Based on diminishing returns modeling, the platform advises shifting capital from overfunded, saturated
            vectors into areas offering high marginal risk reduction per rupee:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-xs text-slate-900">
                <span>API Security & WAAP Shield</span>
                <span className="font-mono text-emerald-800">₹3.50L Recommended (+₹2.0L)</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Addresses BOLA vulnerabilities and protects ₹8.4L in active EAL across Mobile and API gateways.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-xs text-slate-900">
                <span>Identity & Access Management (PAM)</span>
                <span className="font-mono text-emerald-800">₹1.75L Recommended (+₹75K)</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Enforces just-in-time session recording across Oracle Exadata database and SWIFT international terminals.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-xs text-slate-900">
                <span>Endpoint Detection & Response (EDR)</span>
                <span className="font-mono text-amber-800">₹1.25L Recommended (-₹75K)</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Reallocates redundant budget past the saturation point without compromising 94% fleet coverage.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between font-bold text-xs text-slate-900">
                <span>Cloud Security Posture (CSPM)</span>
                <span className="font-mono text-emerald-800">₹1.50L Recommended (+₹50K)</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Automates drift remediation across AWS VPCs and Snowflake analytics repositories.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Recommended Next Steps */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800">
            5. Strategic Next Steps for Board Approval
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Formally approve the rebalancing of ₹2.0 Lakhs towards the API Security and WAAP program.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Direct the procurement team to mandate FIDO2 hardware authentication in the upcoming RBI audit cycle.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Schedule the next quarterly continuous risk quantification review for FY2026 Q3.
              </span>
            </li>
          </ul>
        </div>

        {/* Document Ending Tagline */}
        <div className="pt-6 border-t border-slate-200 text-center text-xs font-mono font-medium text-slate-500">
          From Cybersecurity Spending → Cyber Risk Quantification & Intelligence
        </div>
      </div>
    </div>
  );
}
