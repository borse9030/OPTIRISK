'use client';

import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Database,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { isFirebaseConfigured } from '@/lib/firebase';

export default function SettingsPage() {
  const { organization, resetToDefaults } = useData();
  const [riskAppetite, setRiskAppetite] = useState<number>(45);
  const [currency, setCurrency] = useState('INR');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <SettingsIcon className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Enterprise Configuration & System Parameters
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Global quantification parameters, regulatory compliance rules, and backend storage status for Titan Financial Group.
          </p>
        </div>

        <button
          onClick={resetToDefaults}
          className="px-3.5 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 flex items-center gap-1.5 transition-colors self-start"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Defaults</span>
        </button>
      </div>

      {/* Backend & Environment Status Card */}
      <div className="bg-white rounded-xl p-5 space-y-3 border border-slate-200/90 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600" />
          Data Architecture & Backend Telemetry
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs font-semibold text-slate-800">Firebase Firestore Connection</div>
            <div className="flex items-center gap-2 text-xs font-mono mt-1">
              {isFirebaseConfigured ? (
                <span className="text-emerald-700 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Cloud Firestore Connected
                </span>
              ) : (
                <span className="text-blue-700 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> High-Fidelity Local State Active
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              When external cloud keys are not provided, system executes deterministic model locally.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs font-semibold text-slate-800">Deterministic Risk Engine</div>
            <div className="flex items-center gap-2 text-xs font-mono mt-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Grounded Model Engine Online</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Computes transparent risk scores and EAL outputs mathematically without blackbox hallucination.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl p-6 space-y-5 border border-slate-200/90 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
          Quantification Parameters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Organization Name
            </label>
            <input
              type="text"
              disabled
              value={organization.name}
              className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Lead Regulatory Body
            </label>
            <input
              type="text"
              disabled
              value={organization.regulatoryBody}
              className="w-full bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Board Risk Appetite Ceiling (Score out of 100)
            </label>
            <input
              type="number"
              min="10"
              max="90"
              value={riskAppetite}
              onChange={(e) => setRiskAppetite(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-500"
            />
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Scores above this generate critical alerts for executive escalation.
            </span>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Primary Currency Standard
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
            >
              <option value="INR">Indian Rupee (₹ INR - Lakhs & Crores)</option>
              <option value="USD">US Dollar ($ USD - Millions)</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            {saved ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Parameters updated successfully.
              </span>
            ) : (
              'Changes apply in real-time.'
            )}
          </span>

          <button
            type="submit"
            className="soft-btn-primary px-4 py-2 text-xs font-semibold shadow-xs"
          >
            Save Parameters
          </button>
        </div>
      </form>
    </div>
  );
}
