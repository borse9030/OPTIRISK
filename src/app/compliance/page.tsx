'use client';

import React, { useState } from 'react';
import {
  Scale,
  CheckCircle2,
  Clock,
  Search,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { ComplianceControl } from '@/lib/types';
import { SeverityBadge } from '@/components/Badges';

export default function CompliancePage() {
  const { compliance } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompliance = React.useMemo(() => {
    return compliance.filter((c) => {
      return (
        c.controlName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.gapSummary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [compliance, searchTerm]);

  const getStatusBadge = (status: 'Implemented' | 'Partial' | 'Planned') => {
    if (status === 'Implemented') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" /> Implemented
        </span>
      );
    }
    if (status === 'Partial') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <Clock className="w-3 h-3" /> Partial
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
        Planned
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Scale className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Regulatory Compliance & Governance Mapping
            </h1>
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono font-medium">
              RBI • NIST CSF • ISO 27001
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Titan Financial Group • Continuous control gap assessment against RBI Master Directions, ISO/IEC 27001:2022, and NIST CSF 2.0.
          </p>
        </div>
      </div>

      {/* Framework Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Reserve Bank of India (RBI)
            </span>
            <span className="text-xs font-mono font-bold text-blue-700">86% Aligned</span>
          </div>
          <p className="text-xs text-slate-500">
            Master Direction on Cyber Security Framework in Banks (2024 revised controls).
          </p>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div className="bg-blue-600 h-full w-[86%]" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              NIST CSF 2.0
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700">91% Aligned</span>
          </div>
          <p className="text-xs text-slate-500">
            Govern, Identify, Protect, Detect, Respond, and Recover maturity functions.
          </p>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div className="bg-emerald-600 h-full w-[91%]" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              ISO/IEC 27001:2022
            </span>
            <span className="text-xs font-mono font-bold text-amber-700">79% Aligned</span>
          </div>
          <p className="text-xs text-slate-500">
            Annex A Information Security, Cyber Security, and Privacy Protection controls.
          </p>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div className="bg-amber-500 h-full w-[79%]" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search compliance requirements or gap findings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Compliance Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold text-[11px]">
                <th className="py-3 px-4">Control & Governance Focus</th>
                <th className="py-3 px-3">RBI Framework</th>
                <th className="py-3 px-3">NIST CSF 2.0</th>
                <th className="py-3 px-3">ISO 27001:2022</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-4">Audit Gap Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCompliance.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{c.controlName}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{c.category}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="space-y-1">
                      {getStatusBadge(c.rbiStatus)}
                      <div className="text-[10px] text-slate-500 font-mono">{c.rbiId}</div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="space-y-1">
                      {getStatusBadge(c.nistStatus)}
                      <div className="text-[10px] text-slate-500 font-mono">{c.nistId}</div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="space-y-1">
                      {getStatusBadge(c.isoStatus)}
                      <div className="text-[10px] text-slate-500 font-mono">{c.isoId}</div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <SeverityBadge severity={c.riskLevel} />
                  </td>
                  <td className="py-3 px-4 text-slate-600 leading-relaxed max-w-sm">
                    {c.gapSummary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 font-mono text-center">
        * Compliance status indicators represent internal self-assessment tracking for Titan Financial Group and do not claim official third-party certification.
      </div>
    </div>
  );
}
