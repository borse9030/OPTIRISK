'use client';

import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Lock,
  Activity,
  Award,
  ChevronRight,
  Scale,
  Zap,
  Building2,
  Globe,
  DollarSign,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatINR } from '@/lib/riskEngine';

// High-performance smooth counter component with ease-out physics
function AnimatedMetric({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = 0;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out expo for natural slowing down
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = startValue + (endValue - startValue) * easeProgress;
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function LandingPage() {
  const { user } = useAuth();
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'quantify' | 'optimize' | 'compliance'>('optimize');

  // Interactive Live Budget & ROI Sandbox right on the landing page
  const [simBudget, setSimBudget] = useState(1000000); // ₹10,00,000 baseline
  const baselineEAL = 3840000; // ₹38.4 Lakhs baseline loss

  // Diminishing returns curve calculation in real time
  const riskReductionFraction = 1 - Math.exp(-simBudget / 1900000);
  const projectedEAL = Math.round(baselineEAL * (1 - riskReductionFraction * 0.58));
  const lossAvoided = Math.max(0, baselineEAL - projectedEAL);
  const rosiMultiplier = Number((lossAvoided / simBudget).toFixed(1));
  const riskScore = Math.max(25, Math.round(68 - (riskReductionFraction * 32)));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Top Floating Glow Elements for Modern SaaS Look */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden -z-10 opacity-70">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl" />
      </div>

      {/* Top Navigation Bar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-between max-w-7xl mx-auto w-full sticky top-0 z-30 transition-all">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            <span className="font-mono tracking-tighter">O</span>
          </div>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-sm font-bold tracking-wider text-slate-900 uppercase">
              OptiRisk
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 hidden sm:inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Production Live
            </span>
          </div>
        </div>

        {/* Action Button: Authenticated vs Unauthenticated */}
        <div className="flex items-center gap-2">
          <a
            href="/OptiRisk_SIH_Master_Presentation_Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="Download SIH Master Presentation Guide (English PDF)"
            className="text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 px-2.5 py-2 rounded-lg transition-all hidden md:flex items-center gap-1.5 shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-600" />
            <span>SIH Deck (EN)</span>
          </a>

          <a
            href="/OptiRisk_SIH_Master_Presentation_Guide_Hindi.pdf"
            target="_blank"
            rel="noopener noreferrer"
            title="डाउनलोड करें SIH मास्टर प्रेजेंटेशन गाइड (हिंदी PDF)"
            className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2.5 py-2 rounded-lg transition-all hidden sm:flex items-center gap-1.5 shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            <span>SIH गाइड (हिंदी)</span>
          </a>

          {user ? (
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-xs transition-all flex items-center gap-1.5 hover:shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Enter Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-xs transition-all flex items-center gap-1.5 hover:shadow-sm"
            >
              <span>Sign In to Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 text-center flex flex-col items-center">
        {/* Live Accreditation Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs mb-6 animate-in fade-in duration-500">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>FAIR™ Institute Aligned • Banking Cyber Risk Optimization</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>

        {/* Primary Hero Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 max-w-4xl leading-[1.15]">
          Continuous Cyber Risk Financial Quantification &{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Investment Optimization
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-slate-600 mt-5 max-w-2xl leading-relaxed">
          Bridge the communication barrier between CISO, CFO, and Board. Translate CVE exposure into balance-sheet
          Expected Annual Loss (EAL in ₹) and optimize security budget allocations using algorithmic marginal return knapsacks.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-7 w-full sm:w-auto">
          {user ? (
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all hover:shadow-md"
            >
              <span>Launch Executive Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs flex items-center justify-center gap-2 transition-all hover:shadow-md"
            >
              <span>Sign In to Access Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <a
            href="#live-simulator"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium border border-slate-200 shadow-2xs flex items-center justify-center gap-2 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <span>Interactive ROI Simulator</span>
          </a>

          <a
            href="/OptiRisk_SIH_Master_Presentation_Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 text-cyan-950 text-sm font-semibold border border-cyan-300 shadow-2xs flex items-center justify-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4 text-cyan-600" />
            <span>SIH Deck (EN)</span>
          </a>

          <a
            href="/OptiRisk_SIH_Master_Presentation_Guide_Hindi.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-950 text-sm font-semibold border border-emerald-300 shadow-2xs flex items-center justify-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>SIH गाइड (हिंदी PDF)</span>
          </a>
        </div>

        {/* Animated Live Metric Strip */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm max-w-4xl w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-left">
          <div className="p-2 sm:p-3 border-r border-slate-100">
            <div className="text-[10px] sm:text-[11px] uppercase font-mono text-slate-500 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Baseline Exposure
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-rose-700 mt-1">
              <AnimatedMetric value={68} suffix=" / 100" />
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Normalized Risk</div>
          </div>

          <div className="p-2 sm:p-3 sm:border-r border-slate-100">
            <div className="text-[10px] sm:text-[11px] uppercase font-mono text-slate-500 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Annual Loss (EAL)
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-1">
              ₹<AnimatedMetric value={38.4} decimals={1} suffix=" Lakhs" />
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Unmitigated Exposure</div>
          </div>

          <div className="p-2 sm:p-3 border-r border-slate-100">
            <div className="text-[10px] sm:text-[11px] uppercase font-mono text-slate-500 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Risk Reduction
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-blue-700 mt-1">
              +<AnimatedMetric value={42.8} decimals={1} suffix="%" />
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Optimized Knapsack</div>
          </div>

          <div className="p-2 sm:p-3">
            <div className="text-[10px] sm:text-[11px] uppercase font-mono text-slate-500 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              ROSI Multiplier
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-700 mt-1">
              <AnimatedMetric value={2.6} decimals={1} suffix="× Return" />
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Per ₹1 Invested</div>
          </div>
        </div>
      </section>

      {/* Interactive Live ROI Simulator Card right on the Landing Page */}
      <section id="live-simulator" className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Live Interactive Simulator
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Scrub Budget to Test Marginal Return & ROSI in Real-Time
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Experience how OptiRisk dynamically reallocates capital to achieve maximum risk reduction.
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-semibold flex items-center gap-1.5 self-start sm:self-auto">
              <Activity className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '3s' }} />
              Live Compute Active
            </div>
          </div>

          {/* Interactive Slider */}
          <div className="p-4 sm:p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Annual Security Budget Ceiling:
              </span>
              <span className="text-2xl font-mono font-bold text-slate-900">
                {formatINR(simBudget)}
              </span>
            </div>

            <input
              type="range"
              min="500000"
              max="5000000"
              step="100000"
              value={simBudget}
              onChange={(e) => setSimBudget(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all"
            />

            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>₹5.0 Lakhs</span>
              <span>₹25.0 Lakhs</span>
              <span>₹50.0 Lakhs</span>
            </div>
          </div>

          {/* Real-time Dynamic Yield Output Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">Projected Annual Loss</span>
              <div className="text-lg sm:text-xl font-mono font-bold text-slate-900 mt-1">
                {formatINR(projectedEAL)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                <span className="line-through text-slate-400">{formatINR(baselineEAL)}</span>
                <span className="text-emerald-700 font-semibold font-mono">
                  (-{Math.round(((baselineEAL - projectedEAL) / baselineEAL) * 100)}%)
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80">
              <span className="text-[10px] uppercase font-mono text-emerald-800 block font-semibold">
                Financial Loss Avoided
              </span>
              <div className="text-lg sm:text-xl font-mono font-bold text-emerald-700 mt-1">
                {formatINR(lossAvoided)}
              </div>
              <div className="text-[11px] text-emerald-800 mt-1 font-medium">
                Annual savings to bottom line
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80">
              <span className="text-[10px] uppercase font-mono text-blue-800 block font-semibold">
                ROSI Multiplier
              </span>
              <div className="text-lg sm:text-xl font-mono font-bold text-blue-700 mt-1">
                {rosiMultiplier}× Return
              </div>
              <div className="text-[11px] text-blue-800 mt-1 font-medium">
                Net gain per ₹1 allocated
              </div>
            </div>
          </div>

          {/* Quick link to enter portal */}
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-slate-500">Want to simulate custom CVEs and MITRE attack vectors?</span>
            <Link
              href={user ? "/optimizer" : "/login"}
              className="text-blue-700 font-semibold flex items-center gap-1 hover:underline"
            >
              <span>Explore Full Control Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Showcase Tabs */}
      <section className="border-t border-slate-200 bg-white py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Enterprise Cyber Financial Decision Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Engineered for Chief Information Security Officers (CISO), Chief Financial Officers (CFO), and Enterprise Audit Committees.
            </p>
          </div>

          {/* Showcase Tabs Switcher */}
          <div className="flex justify-center">
            <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveShowcaseTab('optimize')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeShowcaseTab === 'optimize'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingDown className="w-4 h-4 text-blue-600" />
                <span>Budget Optimization</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveShowcaseTab('quantify')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeShowcaseTab === 'quantify'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span>FAIR Model EAL</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveShowcaseTab('compliance')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeShowcaseTab === 'compliance'
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>RBI & NIST Benchmarks</span>
              </button>
            </div>
          </div>

          {/* Active Tab Showcase View */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8">
            {activeShowcaseTab === 'optimize' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold font-mono">
                    KNAPSACK MODEL WITH DIMINISHING RETURNS
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Shift Capital From Saturated Tools to High-Yield Controls
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Most enterprises overspend on mature perimeter firewalls while leaving high-yield vectors like API Security and Phishing Defense underfunded. OptiRisk computes the mathematical inflection point to maximize risk reduction per Rupee invested.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Reduces overall enterprise risk score from 68 down to 41.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Non-linear saturation curve prevents over-investing in plateaued tools.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-700">Optimization Matrix</span>
                    <span className="text-emerald-700 font-bold">Status: Optimized</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target Budget:</span>
                      <span className="font-bold">₹10,00,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Unmitigated Loss (EAL):</span>
                      <span className="font-bold text-rose-700">₹38,40,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mitigated Loss:</span>
                      <span className="font-bold text-emerald-700">₹21,70,000</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-100">
                      <span className="text-slate-800 font-bold">Annual Loss Avoided:</span>
                      <span className="font-bold text-emerald-700 text-sm">₹16,70,000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeShowcaseTab === 'quantify' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold font-mono">
                    FAIR™ METHODOLOGY FORMULATION
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Expected Annual Loss (EAL) = Probability × Financial Impact
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Convert subjective &ldquo;High / Medium / Low&rdquo; heatmaps into auditable Rupee financial loss figures. Incorporates asset criticality, data record valuations, and MITRE adversary frequency.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-xs text-indigo-700 font-bold">
                    EAL = Likelihood (Annual Frequency) × Damage (Asset Criticality)
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
                  <div className="font-bold text-slate-900">Sample Exposure Vector</div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-medium">Threat: Ransomware Cryptolocker</span>
                      <span className="text-rose-700 font-bold">Critical</span>
                    </div>
                    <div className="text-[11px] text-slate-500">Target Asset: Core Banking Transaction Node</div>
                    <div className="flex justify-between font-mono pt-1 text-[11px]">
                      <span>Likelihood: 15% / yr</span>
                      <span className="text-slate-900 font-bold">Impact: ₹2.5 Crore</span>
                    </div>
                    <div className="flex justify-between font-mono pt-1 border-t border-slate-200 font-bold text-rose-700">
                      <span>Annual Financial Risk (EAL):</span>
                      <span>₹37,50,000 / yr</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeShowcaseTab === 'compliance' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                    REGULATORY POSTURE
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Continuous Alignment with RBI Master Directions & NIST CSF
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Automated compliance mapping against the Reserve Bank of India (RBI) Cyber Security Framework for Banks and NIST CSF 2.0. Export auditable packets for board oversight and statutory reviews.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>RBI CSBF Compliance Score: 88.4%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>NIST CSF 2.0 Benchmark: 91.2%</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
                  <div className="font-bold text-slate-900">Compliance Audit Readiness</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1 font-medium">
                        <span>RBI Cyber Security Framework</span>
                        <span className="text-emerald-700 font-mono font-bold">88.4%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full w-[88.4%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1 font-medium">
                        <span>NIST CSF 2.0 Controls</span>
                        <span className="text-blue-700 font-mono font-bold">91.2%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full w-[91.2%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust & Enterprise Standards Strip */}
      <section className="border-t border-slate-200 bg-slate-50 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-slate-500 text-xs text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-slate-400 shrink-0" />
            <div>
              <div className="font-semibold text-slate-800">Target Enterprise Cluster</div>
              <div className="text-[11px]">Titan Financial Group • Tier-1 Core Banking Node</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono">
            <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
              FAIR™ Certified Engine
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
              256-Bit TLS Handshake
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
              Firebase Auth Security
            </span>
          </div>
        </div>
      </section>

      {/* Production Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 sm:px-6 py-6 text-xs text-slate-500 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          OptiRisk Platform • Continuous Cyber Risk Financial Quantification & Budget Optimization
        </div>
        <div className="text-slate-600 font-mono text-[11px]">
          Enterprise Production Architecture v2.4
        </div>
      </footer>
    </div>
  );
}
