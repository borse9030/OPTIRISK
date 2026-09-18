'use client';

import React, { useState } from 'react';
import { SeverityBadge } from './Badges';
import { ShieldCheck, MapPin } from 'lucide-react';
import { formatINR } from '@/lib/riskEngine';

interface GeoNode {
  id: string;
  name: string;
  type: 'Data Center' | 'Branch Network' | 'ATM Cluster' | 'Cloud Region';
  city: string;
  x: number; // percentage on map
  y: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  riskScore: number;
  financialEAL: number;
  assetCount: number;
  details: string;
}

const GEO_NODES: GeoNode[] = [
  {
    id: 'node_mumbai_dc',
    name: 'Primary Tier-4 Mainframe Vault & DC',
    type: 'Data Center',
    city: 'Mumbai, Maharashtra',
    x: 32,
    y: 58,
    severity: 'Critical',
    riskScore: 82,
    financialEAL: 1420000,
    assetCount: 6,
    details: 'Houses Oracle Exadata Mainframe, SWIFT Vault, and Kong API Gateway.',
  },
  {
    id: 'node_bengaluru_cloud',
    name: 'NPCI Switch & AWS India Cloud Center',
    type: 'Cloud Region',
    city: 'Bengaluru, Karnataka',
    x: 42,
    y: 78,
    severity: 'High',
    riskScore: 71,
    financialEAL: 890000,
    assetCount: 4,
    details: 'Hosts real-time IMPS/UPI switch nodes and digital loan microservices.',
  },
  {
    id: 'node_delhi_ops',
    name: 'Northern Operations & Corporate Hub',
    type: 'Branch Network',
    city: 'New Delhi / NCR',
    x: 44,
    y: 28,
    severity: 'Medium',
    riskScore: 58,
    financialEAL: 420000,
    assetCount: 3,
    details: 'Corporate Treasury desks and regional branch routing hub.',
  },
  {
    id: 'node_chennai_dr',
    name: 'Disaster Recovery (DR) Site & Cold Tape Vault',
    type: 'Data Center',
    city: 'Chennai, Tamil Nadu',
    x: 48,
    y: 80,
    severity: 'Low',
    riskScore: 38,
    financialEAL: 180000,
    assetCount: 2,
    details: 'Synchronous SAN replica with air-gapped immutable backup storage.',
  },
  {
    id: 'node_hyderabad_soc',
    name: 'Cyber Security Operations Center (C-SOC)',
    type: 'Data Center',
    city: 'Hyderabad, Telangana',
    x: 46,
    y: 64,
    severity: 'Medium',
    riskScore: 49,
    financialEAL: 290000,
    assetCount: 3,
    details: '24/7 Managed SIEM telemetry and incident response command post.',
  },
  {
    id: 'node_west_atms',
    name: 'Western Zone ATM Fleet (450 Terminals)',
    type: 'ATM Cluster',
    city: 'Pune & Gujarat Corridor',
    x: 34,
    y: 62,
    severity: 'High',
    riskScore: 68,
    financialEAL: 380000,
    assetCount: 1,
    details: 'Cash dispensing fleet running locked down Windows Embedded with HSMs.',
  },
  {
    id: 'node_kolkata_hub',
    name: 'Eastern Regional Clearing Desk',
    type: 'Branch Network',
    city: 'Kolkata, West Bengal',
    x: 72,
    y: 48,
    severity: 'Low',
    riskScore: 41,
    financialEAL: 260000,
    assetCount: 2,
    details: 'Cheque truncation system and rural branch connectivity gateway.',
  },
];

export default function GeoRiskMap() {
  const [selectedNode, setSelectedNode] = useState<GeoNode>(GEO_NODES[0]);
  const [filterType, setFilterType] = useState<string>('All');

  const filteredNodes = React.useMemo(() => {
    if (filterType === 'All') return GEO_NODES;
    return GEO_NODES.filter((n) => n.type === filterType);
  }, [filterType]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Geospatial Infrastructure Risk View
            </h3>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
              Pan-India Topology
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulated geographical risk distribution across Tier-1 data centers, cloud regions, and ATM fleets.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center rounded-lg bg-slate-50 p-1 border border-slate-200 text-xs">
          {['All', 'Data Center', 'Cloud Region', 'ATM Cluster'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-2.5 py-1 rounded-md transition-colors text-[11px] font-medium ${
                filterType === f
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Map Canvas Visualizer */}
        <div className="lg:col-span-2 relative bg-slate-50 rounded-xl border border-slate-200 h-[380px] overflow-hidden flex items-center justify-center p-4">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* India Geographical SVG Outline Contour */}
          <svg
            className="absolute inset-0 w-full h-full text-slate-300 pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 38 10 L 48 14 L 54 22 L 70 28 L 78 36 L 82 46 L 72 52 L 60 56 L 48 88 L 44 94 L 40 88 L 32 68 L 24 50 L 26 34 L 38 10 Z"
              fill="#F1F5F9"
              stroke="#CBD5E1"
              strokeWidth="0.8"
            />
            {/* Dark fiber links */}
            <line x1="32" y1="58" x2="42" y2="78" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="32" y1="58" x2="48" y2="80" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="32" y1="58" x2="44" y2="28" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="42" y1="78" x2="46" y2="64" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="2 2" />
          </svg>

          {/* Markers */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            let markerColor = 'bg-emerald-500 ring-4 ring-emerald-100';
            if (node.severity === 'Critical') markerColor = 'bg-rose-500 ring-4 ring-rose-100';
            else if (node.severity === 'High') markerColor = 'bg-amber-500 ring-4 ring-amber-100';
            else if (node.severity === 'Medium') markerColor = 'bg-blue-500 ring-4 ring-blue-100';

            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all z-10 ${
                  isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                }`}
                title={node.name}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full ${markerColor} border-2 border-white flex items-center justify-center`}
                />
                <div
                  className={`absolute top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] whitespace-nowrap font-mono transition-opacity shadow-xs ${
                    isSelected
                      ? 'bg-slate-900 text-white font-semibold opacity-100'
                      : 'bg-white text-slate-700 border border-slate-200 opacity-80 group-hover:opacity-100'
                  }`}
                >
                  {node.city.split(',')[0]}
                </div>
              </button>
            );
          })}

          <div className="absolute bottom-2 left-2 text-[10px] text-slate-400 font-mono">
            * Coordinates simulated for Titan Financial Group demo topology
          </div>
        </div>

        {/* Node Detail Sheet */}
        <div className="lg:col-span-1 rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-4">
          <div className="space-y-1 pb-3 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono text-slate-500">
                {selectedNode.type}
              </span>
              <SeverityBadge severity={selectedNode.severity} />
            </div>
            <h4 className="text-sm font-bold text-slate-900">{selectedNode.name}</h4>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-600" />
              <span>{selectedNode.city}</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {selectedNode.details}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-mono">Risk Score</span>
              <div className="text-base font-bold font-mono text-rose-700">
                {selectedNode.riskScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-mono">Financial EAL</span>
              <div className="text-base font-bold font-mono text-slate-900">
                {formatINR(selectedNode.financialEAL)}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs">
            <div className="font-semibold text-blue-900 flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              Connected Resiliency Status
            </div>
            <div className="text-slate-600 text-[11px] leading-relaxed">
              Encrypted IPsec tunnel active. Synchronized with Mumbai Primary DC and Chennai DR vault.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
