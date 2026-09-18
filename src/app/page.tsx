'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingDown,
  ArrowRight,
  BarChart3,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Top minimal header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-between max-w-7xl mx-auto w-full sticky top-0 z-30">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-xs">
            <span className="font-mono tracking-tighter">O</span>
          </div>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-sm font-bold tracking-wider text-slate-900 uppercase">
              OptiRisk
            </span>
            <span className="text-[10px] font-mono text-blue-700 px-1.5 py-0.2 rounded bg-blue-50 border border-blue-200 hidden sm:inline">
              SIH26105
            </span>
          </div>
        </div>

        {/* Auth-Synchronized Top Navigation Button */}
        <div className="flex items-center gap-2">
          {user ? (
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-lg shadow-xs transition-all flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Go to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-lg shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] sm:text-xs font-medium text-blue-700 mb-5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Smart India Hackathon 2026 • Problem Statement SIH26105</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl leading-tight">
          Quantify Cyber Risk.{' '}
          <span className="text-blue-600">
            Optimize Security Investment.
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-slate-600 mt-4 sm:mt-6 max-w-2xl leading-relaxed">
          An enterprise continuous cyber risk quantification platform for banking and enterprise.
          Translate technical vulnerabilities into balance-sheet financial metrics and allocate security budgets
          where they produce the highest measurable risk reduction.
        </p>

        {/* Action CTAs: Properly synchronized with authentication state */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 mt-6 sm:mt-8 w-full sm:w-auto">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Enter Executive Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/optimizer"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Explore Budget Optimizer</span>
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Sign In to Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>1-Click Demo Personas</span>
              </Link>
            </>
          )}
        </div>

        {/* Benchmark Metric Pill Strip */}
        <div className="mt-10 sm:mt-12 p-3 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-xs max-w-3xl w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 text-left">
          <div className="p-2 border-r border-slate-100">
            <div className="text-[10px] uppercase font-mono text-slate-500 font-semibold">Baseline Risk</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-rose-700 mt-0.5">68 / 100</div>
          </div>
          <div className="p-2 sm:border-r border-slate-100">
            <div className="text-[10px] uppercase font-mono text-slate-500 font-semibold">Baseline EAL</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-0.5">₹38.4 Lakhs</div>
          </div>
          <div className="p-2 border-r border-slate-100">
            <div className="text-[10px] uppercase font-mono text-slate-500 font-semibold">Security Budget</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-0.5">₹10.0 Lakhs</div>
          </div>
          <div className="p-2">
            <div className="text-[10px] uppercase font-mono text-slate-500 font-semibold">Optimized Yield</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-emerald-700 mt-0.5">2.6× ROSI</div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars Section */}
      <section className="border-t border-slate-200 bg-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Enterprise Cyber Financial Decision Engine
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto">
              Bridging the strategic communication and investment gap between the CISO, CFO, and Board of Directors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Pillar 1: Quantify */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-3 sm:mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2">1. Quantify</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Turn technical vulnerability scans and CVE telemetry into transparent financial metrics:
                  Expected Annual Loss (EAL = Probability × Financial Impact) and Normalized Risk Scores.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] font-mono text-slate-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Deterministic FAIR-aligned calculations
              </div>
            </div>

            {/* Pillar 2: Optimize */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-5 sm:p-6 flex flex-col justify-between hover:border-blue-300 transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 mb-3 sm:mb-4">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2">2. Optimize</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Find where cybersecurity spending produces the highest measurable reduction in financial risk.
                  Our greedy marginal risk reduction knapsack accounts for non-linear diminishing returns.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200 text-[11px] font-mono text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Risk reduced from 68 → 41 (2.6× ROSI)
              </div>
            </div>

            {/* Pillar 3: Simulate */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 mb-3 sm:mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2">3. Simulate</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Model security investment reallocations before committing capital. Test: &ldquo;What happens if we
                  shift ₹1.5L from EDR to API Security?&rdquo; and observe real-time before/after delta curves.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] font-mono text-slate-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                Real-time stress testing & RBI alignment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 sm:px-6 py-5 text-center text-xs text-slate-500 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          OptiRisk • Smart India Hackathon 2026 • Problem Statement SIH26105
        </div>
        <div className="text-slate-600 font-mono text-[11px]">
          Target Banking Environment: Titan Financial Group
        </div>
      </footer>
    </div>
  );
}
