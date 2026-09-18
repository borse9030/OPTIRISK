'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { useData } from '@/context/DataContext';
import { generateDiminishingReturnsCurve, formatINR } from '@/lib/riskEngine';

export default function DiminishingReturnsCurve({
  selectedControlId,
}: {
  selectedControlId?: string;
}) {
  const { controls, allocations } = useData();
  const [activeCtrlId, setActiveCtrlId] = useState<string>(
    selectedControlId || 'ctrl_api_sec'
  );

  const activeControl = controls.find((c) => c.id === activeCtrlId) || controls[0];
  const currentSpend = allocations[activeControl.id] || activeControl.currentInvestment;

  // Generate 12 curve sample points from ₹0 to ₹10 Lakhs
  const curveData = React.useMemo(() => {
    return generateDiminishingReturnsCurve(activeControl, 1000000, 10);
  }, [activeControl]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              Diminishing Returns Saturation Curve
            </h3>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              Non-Linear Yield
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Illustrates marginal risk reduction: spending past the saturation ceiling yields diminishing returns.
          </p>
        </div>

        {/* Control Selector Dropdown */}
        <select
          value={activeCtrlId}
          onChange={(e) => setActiveCtrlId(e.target.value)}
          aria-label="Select Security Control"
          className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
        >
          {controls.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} (Max {c.maxRiskReductionPct}%)
            </option>
          ))}
        </select>
      </div>

      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={curveData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="diminishGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="investmentLabel"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              domain={[0, Math.ceil(activeControl.maxRiskReductionPct * 1.1)]}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E2E8F0',
                borderRadius: '8px',
                fontSize: '12px',
                boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.08)',
                color: '#0F172A',
              }}
              formatter={(value: any) => [`${value}% Reduction`, 'Yield']}
              labelFormatter={(label) => `Investment: ${label}`}
            />
            <ReferenceLine
              x={formatINR(activeControl.saturationBudget)}
              stroke="#F59E0B"
              strokeDasharray="3 3"
              label={{
                value: 'Saturation Point',
                position: 'top',
                fill: '#D97706',
                fontSize: 10,
              }}
            />
            <Area
              type="monotone"
              dataKey="reductionPct"
              name="Risk Reduction %"
              stroke="#2563EB"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#diminishGradientLight)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
        <span>Current Allocation: <strong className="text-slate-800">{formatINR(currentSpend)}</strong></span>
        <span className="font-mono text-slate-600">Saturation Threshold: ~{formatINR(activeControl.saturationBudget)}</span>
      </div>
    </div>
  );
}
