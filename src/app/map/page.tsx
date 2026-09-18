'use client';

import React from 'react';
import GeoRiskMap from '@/components/GeoRiskMap';
import { MapPin, Server, Radio } from 'lucide-react';

export default function MapPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <MapPin className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Geospatial Infrastructure & Regional Risk Map
            </h1>
            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-mono font-medium">
              SIMULATED TOPOLOGY
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualizing physical infrastructure concentration risk across Tier-4 bank vaults, disaster recovery sites, and regional branch networks.
          </p>
        </div>
      </div>

      {/* Main Interactive Map Component */}
      <GeoRiskMap />

      {/* Infrastructure Node Telemetry Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            <Server className="w-4 h-4 text-blue-600" />
            <span>Primary Core (Mumbai DC)</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">450 TB Vault Storage</div>
          <p className="text-xs text-slate-500 mt-1">
            Oracle Exadata X9M clustering running with synchronous active-active zero-data-loss standby.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            <Radio className="w-4 h-4 text-emerald-600" />
            <span>Disaster Recovery (Chennai Site)</span>
          </div>
          <div className="text-xl font-bold font-mono text-emerald-700">Sub-2h RTO Verified</div>
          <p className="text-xs text-slate-500 mt-1">
            Quarterly unannounced mock drill completed in compliance with RBI circular on operational resilience.
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            <Server className="w-4 h-4 text-blue-600" />
            <span>Hybrid Cloud (Bengaluru NPCI Hub)</span>
          </div>
          <div className="text-xl font-bold font-mono text-slate-900">99.995% Uptime SLA</div>
          <p className="text-xs text-slate-500 mt-1">
            Redundant high-frequency UPI switch routing with automatic failover to local data centers.
          </p>
        </div>
      </div>
    </div>
  );
}
