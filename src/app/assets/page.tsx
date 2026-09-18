'use client';

import React, { useState } from 'react';
import {
  Boxes,
  Search,
  ChevronRight,
  X,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { Asset } from '@/lib/types';
import { SeverityBadge, ScoreBadge } from '@/components/Badges';
import { formatINR } from '@/lib/riskEngine';

export default function AssetsPage() {
  const { assets, risks, vulnerabilities } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [critFilter, setCritFilter] = useState<string>('All');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Filter & Search
  const filteredAssets = React.useMemo(() => {
    return assets.filter((asset) => {
      const matchSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = typeFilter === 'All' || asset.type === typeFilter;
      const matchCrit = critFilter === 'All' || asset.criticality === critFilter;

      return matchSearch && matchType && matchCrit;
    });
  }, [assets, searchTerm, typeFilter, critFilter]);

  // Associated risks for selected asset
  const assetRisks = React.useMemo(() => {
    if (!selectedAsset) return [];
    return risks.filter((r) => r.assetId === selectedAsset.id);
  }, [selectedAsset, risks]);

  // Associated CVEs
  const assetVulns = React.useMemo(() => {
    if (!selectedAsset) return [];
    return vulnerabilities.filter((v) => v.assetId === selectedAsset.id);
  }, [selectedAsset, vulnerabilities]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Boxes className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Enterprise Asset Inventory
            </h1>
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono font-medium">
              {assets.length} ACTIVE ASSETS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Titan Financial Group • Authoritative registry of high-value banking applications, core infrastructure, and endpoints.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search assets by name, department, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter by asset type"
            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Application">Application</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Cloud">Cloud</option>
            <option value="Endpoint">Endpoint</option>
            <option value="Database">Database</option>
            <option value="Third-Party">Third-Party</option>
          </select>

          {/* Criticality Filter */}
          <select
            value={critFilter}
            onChange={(e) => setCritFilter(e.target.value)}
            aria-label="Filter by criticality"
            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Criticalities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Assets Table Container */}
      <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-semibold text-[11px]">
                <th className="py-3 px-4">Asset Name & Scope</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Criticality</th>
                <th className="py-3 px-3 text-right">Balance Sheet Valuation</th>
                <th className="py-3 px-3 text-right">Annual Loss (EAL)</th>
                <th className="py-3 px-3 text-center">Risk Score</th>
                <th className="py-3 px-3 text-center">CVEs</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {asset.name}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-sm">
                      {asset.usersCount ? `${asset.usersCount} • ` : ''}{asset.department}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-mono">
                      {asset.type}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <SeverityBadge severity={asset.criticality} />
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-slate-700">
                    {formatINR(asset.financialValuation)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatINR(asset.eal)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <ScoreBadge score={asset.currentRiskScore} />
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-600">
                    {asset.vulnerabilityCount}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-blue-700 group-hover:underline text-[11px] font-medium inline-flex items-center gap-0.5">
                      Inspect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-in Asset Inspection Modal / Sheet */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 h-full overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <SeverityBadge severity={selectedAsset.criticality} />
                  <span className="text-xs font-mono text-slate-500 uppercase">
                    {selectedAsset.type}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{selectedAsset.name}</h2>
                <p className="text-xs text-slate-500 mt-1">{selectedAsset.description}</p>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics overview */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-mono font-medium">
                  Asset Valuation
                </span>
                <div className="text-lg font-mono font-bold text-slate-900 mt-0.5">
                  {formatINR(selectedAsset.financialValuation)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-mono font-medium">
                  Expected Annual Loss
                </span>
                <div className="text-lg font-mono font-bold text-slate-900 mt-0.5">
                  {formatINR(selectedAsset.eal)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-mono font-medium">
                  Risk Score
                </span>
                <div className="text-lg font-mono font-bold text-rose-700 mt-0.5">
                  {selectedAsset.currentRiskScore} / 100
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-mono font-medium">
                  Owner & Location
                </span>
                <div className="text-xs font-medium text-slate-800 mt-1 truncate">
                  {selectedAsset.owner}
                </div>
                <div className="text-[10px] text-slate-500 truncate">{selectedAsset.location}</div>
              </div>
            </div>

            {/* Associated Quantified Risks */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Quantified Exposure Scenarios ({assetRisks.length})
              </h3>
              {assetRisks.length > 0 ? (
                <div className="space-y-2">
                  {assetRisks.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-900">{r.title}</span>
                        <SeverityBadge severity={r.severity} />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-200">
                        <span>P: {Math.round(r.probabilityOfLoss * 100)}%</span>
                        <span className="text-slate-900 font-bold">EAL: {formatINR(r.expectedAnnualLoss)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic p-2">
                  No critical risks mapped to this asset.
                </div>
              )}
            </div>

            {/* Associated CVE Vulnerabilities */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Active CVE Vulnerabilities ({assetVulns.length})
              </h3>
              {assetVulns.map((v) => (
                <div
                  key={v.id}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono font-bold text-blue-700">{v.id}</span>
                    <span className="text-slate-700 ml-2">{v.title}</span>
                  </div>
                  <span className="font-mono text-rose-700 font-bold">CVSS {v.cvssScore}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
