'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useData } from '@/context/DataContext';

export default function RiskTrendChart() {
  const { history } = useData();
  const [timeframe, setTimeframe] = useState<'30d' | '90d' | '12m'>('90d');

  // Filter or scale history based on timeframe
  const chartData = React.useMemo(() => {
    if (timeframe === '30d') {
      return history.slice(-4);
    }
    if (timeframe === '12m') {
      return [
        { date: '12m ago', riskScore: 89, eal: 56.4 },
        { date: '9m ago', riskScore: 84, eal: 51.0 },
        { date: '6m ago', riskScore: 78, eal: 45.2 },
        { date: '3m ago', riskScore: 71, eal: 40.2 },
        { date: 'Current', riskScore: 68, eal: 38.4 },
      ];
    }
    return history;
  }, [history, timeframe]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Cyber Risk & Financial Loss Trajectory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Historical progression of Normalized Risk Score vs. Expected Annual Loss (EAL)
          </p>
        </div>

        {/* Timeframe pill selector */}
        <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200/80 self-start">
          {(['30d', '90d', '12m'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-all ${
                timeframe === tf
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tf.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#94A3B8"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#E2E8F0' }}
              minTickGap={14}
              tickFormatter={(v: string) => v.replace(' ago', '')}
            />
            {/* Left Y Axis: Risk Score 0 - 100 */}
            <YAxis
              yAxisId="score"
              domain={[0, 100]}
              stroke="#94A3B8"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
              width={25}
            />
            {/* Right Y Axis: EAL in ₹ Lakhs */}
            <YAxis
              yAxisId="eal"
              orientation="right"
              stroke="#0284C7"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₹${v}L`}
              width={35}
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
              labelStyle={{ color: '#0F172A', fontWeight: 600, marginBottom: '4px' }}
              formatter={(value: any, name: any) => {
                if (name === 'Risk Score') return [`${value} / 100`, name];
                if (name === 'Expected Annual Loss') return [`₹${value} Lakhs`, name];
                return [value, name];
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              iconType="circle"
            />
            <Area
              yAxisId="score"
              type="monotone"
              dataKey="riskScore"
              name="Risk Score"
              stroke="#2563EB"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#scoreGradientLight)"
            />
            <Line
              yAxisId="eal"
              type="monotone"
              dataKey="eal"
              name="Expected Annual Loss"
              stroke="#0284C7"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: '#0284C7', strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] sm:text-[11px] text-slate-500 border-t border-slate-100 pt-2">
        <span>Continuous Risk Quantification Engine</span>
        <span className="font-mono text-emerald-700 font-medium">Trajectory: -13 pts over 90 days</span>
      </div>
    </div>
  );
}
