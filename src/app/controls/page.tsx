'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  SlidersHorizontal,
  Search,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { formatINR } from '@/lib/riskEngine';

export default function ControlsPage() {
  const { controls, allocations, assets } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = React.useMemo(() => {
    return Array.from(new Set(controls.map((c) => c.category)));
  }, [controls]);

  const filteredControls = React.useMemo(() => {
    return controls.filter((ctrl) => {
      const matchSearch =
        ctrl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ctrl.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === 'All' || ctrl.category === categoryFilter;
      return matchSearch && matchCat;
    });
  }, [controls, searchTerm, categoryFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Security Control Catalog & Maturity Stack
            </h1>
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono font-medium">
              {controls.length} CONTROLS PROFILED
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise defensive posture catalog mapping CMMI maturity levels, effectiveness scores, and non-linear cost curves.
          </p>
        </div>

        <Link
          href="/optimizer"
          className="soft-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 self-start transition-colors"
        >
          <span>Open Budget Optimizer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search security controls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
          className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredControls.map((ctrl) => {
          const currentSpend = allocations[ctrl.id] || ctrl.currentInvestment;

          return (
            <div
              key={ctrl.id}
              className="bg-white rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 border border-slate-200/90 hover:border-slate-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                    {ctrl.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-slate-500 font-mono">Maturity:</span>
                    <span className="text-xs font-mono font-bold text-slate-800 px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200">
                      Level {ctrl.currentMaturity} / 5
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900">{ctrl.name}</h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {ctrl.description}
                </p>

                {/* Framework references */}
                <div className="mt-3 pt-2 border-t border-slate-100 space-y-1 text-[10px] font-mono text-slate-500">
                  <div className="truncate">
                    <span className="text-slate-400">NIST: </span>
                    <span className="text-slate-700">{ctrl.nistRef}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-slate-400">RBI Direction: </span>
                    <span className="text-blue-700 font-medium">{ctrl.rbiRef}</span>
                  </div>
                </div>
              </div>

              {/* Numerical Metrics */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-mono">
                      Active Spend
                    </span>
                    <div className="text-sm font-mono font-bold text-slate-900 mt-0.5">
                      {formatINR(currentSpend)}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-mono">
                      Max Reduction
                    </span>
                    <div className="text-sm font-mono font-bold text-emerald-700 mt-0.5">
                      {ctrl.maxRiskReductionPct}% Cap
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Fleet Coverage:</span>
                    <span className="font-mono text-slate-900 font-bold">{ctrl.coveragePercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${ctrl.coveragePercentage}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Protected Assets: {ctrl.associatedAssetIds.length}</span>
                  <Link
                    href="/optimizer"
                    className="text-blue-700 hover:underline font-medium inline-flex items-center gap-0.5"
                  >
                    Adjust in Optimizer <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
