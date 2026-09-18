'use client';

import React, { useState } from 'react';
import {
  Search,
  Crosshair,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { SeverityBadge } from '@/components/Badges';
import { formatINR } from '@/lib/riskEngine';

export default function ThreatsPage() {
  const { threats } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = React.useMemo(() => {
    return Array.from(new Set(threats.map((t) => t.category)));
  }, [threats]);

  const filteredThreats = React.useMemo(() => {
    return threats.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.mitreTactic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.mitreTechnique.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === 'All' || t.category === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [threats, searchTerm, categoryFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Crosshair className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Threat Intelligence & Campaign Matrix
            </h1>
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono font-medium">
              {threats.length} ADVERSARY PATTERNS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulated banking sector threat landscape mapped to MITRE ATT&CK tactics, techniques, and potential financial impact.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search threats by name or MITRE technique..."
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
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Threats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredThreats.map((threat) => (
          <div
            key={threat.id}
            className="bg-white rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4 border border-slate-200/90 hover:border-slate-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-medium">
                  {threat.category}
                </span>
                <SeverityBadge severity={threat.severity} />
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {threat.name}
              </h3>

              <div className="mt-2 text-xs text-slate-500 space-y-1">
                <div>
                  <span className="text-slate-400">MITRE Tactic: </span>
                  <span className="text-slate-700 font-mono text-[11px]">{threat.mitreTactic}</span>
                </div>
                <div>
                  <span className="text-slate-400">Technique: </span>
                  <span className="text-blue-700 font-mono text-[11px]">{threat.mitreTechnique}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-mono uppercase">Probability</div>
                  <div className="font-mono font-bold text-slate-900 mt-0.5">
                    {Math.round(threat.probability * 100)}%
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 font-mono uppercase">Worst-Case Loss</div>
                  <div className="font-mono font-bold text-rose-700 mt-0.5">
                    {formatINR(threat.potentialFinancialImpact)}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="text-[10px] uppercase font-bold text-blue-800 mb-1">
                  Mitigation Directive
                </div>
                <div className="leading-relaxed text-[11px] text-slate-600">{threat.recommendedAction}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
