'use client';

import React, { useState } from 'react';
import {
  Bug,
  Search,
  ShieldCheck,
  AlertTriangle,
  Flame,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { formatINR } from '@/lib/riskEngine';

export default function VulnerabilitiesPage() {
  const { vulnerabilities, controls } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');

  // Summary counts
  const stats = {
    critical: 12,
    high: 37,
    medium: 84,
    low: 142,
  };

  const filteredVulns = React.useMemo(() => {
    return vulnerabilities.filter((v) => {
      const matchSearch =
        v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.cwe.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'All' || v.status === statusFilter;
      const matchSeverity = severityFilter === 'All' || v.severity === severityFilter;

      return matchSearch && matchStatus && matchSeverity;
    });
  }, [vulnerabilities, searchTerm, statusFilter, severityFilter]);

  const controlMap = React.useMemo(() => {
    const map = new Map<string, string>();
    controls.forEach((c) => map.set(c.id, c.name));
    return map;
  }, [controls]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              <Bug className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Enterprise Vulnerability & Exposure Registry
            </h1>
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono font-medium">
              30 ACTIVE CVES TRACKED
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            CVE tracking with exploitability telemetry and direct financial exposure quantification.
          </p>
        </div>
      </div>

      {/* Top 4 Severity Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl p-4 border border-rose-200 bg-rose-50/60 shadow-xs">
          <div className="flex items-center justify-between text-xs text-rose-800 font-semibold mb-1">
            <span>Critical Severity</span>
            <Flame className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-rose-700">
            {stats.critical}
          </div>
          <div className="text-[11px] text-rose-800 mt-1">
            Actively exploited zero-day & RCE vulnerabilities
          </div>
        </div>

        <div className="rounded-xl p-4 border border-amber-200 bg-amber-50/60 shadow-xs">
          <div className="flex items-center justify-between text-xs text-amber-800 font-semibold mb-1">
            <span>High Severity</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-700">
            {stats.high}
          </div>
          <div className="text-[11px] text-amber-800 mt-1">
            Privilege escalations & auth bypass vectors
          </div>
        </div>

        <div className="rounded-xl p-4 border border-blue-200 bg-blue-50/60 shadow-xs">
          <div className="flex items-center justify-between text-xs text-blue-800 font-semibold mb-1">
            <span>Medium Severity</span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-blue-700">
            {stats.medium}
          </div>
          <div className="text-[11px] text-blue-800 mt-1">
            Internal network exposure & minor issues
          </div>
        </div>

        <div className="rounded-xl p-4 border border-emerald-200 bg-emerald-50/60 shadow-xs">
          <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
            <span>Low Severity</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700">
            {stats.low}
          </div>
          <div className="text-[11px] text-emerald-800 mt-1">
            Information disclosure with low exploitability
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search CVE identifier, title, asset, or CWE..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            aria-label="Filter by severity"
            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by remediation status"
            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Remediated">Remediated</option>
          </select>
        </div>
      </div>

      {/* Vulnerabilities Table */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold text-[11px]">
                <th className="py-3 px-4">CVE Identifier</th>
                <th className="py-3 px-3">Title & Classification</th>
                <th className="py-3 px-3">Affected Asset</th>
                <th className="py-3 px-3 text-center">CVSS Score</th>
                <th className="py-3 px-3">Exploitability</th>
                <th className="py-3 px-3 text-right">Financial Exposure</th>
                <th className="py-3 px-3">Remediation Control</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVulns.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                    {v.id}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-900 max-w-xs truncate">{v.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{v.cwe}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-[150px] truncate">
                    {v.assetName}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                        v.cvssScore >= 9.0
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : v.cvssScore >= 7.0
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      {v.cvssScore.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                        v.exploitability === 'Active Exploit'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : v.exploitability === 'PoC Available'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {v.exploitability}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-rose-700">
                    {formatINR(v.financialExposure)}
                  </td>
                  <td className="py-3 px-3 text-blue-700 font-medium max-w-[160px] truncate">
                    {controlMap.get(v.recommendedControlId) || 'Security Control'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                        v.status === 'Open'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : v.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {v.status}
                    </span>
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
