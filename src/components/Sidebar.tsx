'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  SlidersHorizontal,
  AlertOctagon,
  FlaskConical,
  FileText,
  Boxes,
  ShieldCheck,
  Bug,
  Scale,
  Settings,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Layers,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const PRIMARY_MODULES: NavItem[] = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Budget Optimizer', href: '/optimizer', icon: SlidersHorizontal },
  { name: 'Risk Quantification', href: '/risk-intelligence', icon: AlertOctagon },
  { name: 'Scenario Simulator', href: '/simulator', icon: FlaskConical },
  { name: 'Executive Reports', href: '/reports', icon: FileText },
];

const SECONDARY_MODULES: NavItem[] = [
  { name: 'Asset Inventory', href: '/assets', icon: Boxes },
  { name: 'Threat Intel', href: '/threats', icon: ShieldCheck },
  { name: 'Vulnerabilities', href: '/vulnerabilities', icon: Bug },
  { name: 'Security Controls', href: '/controls', icon: Layers },
  { name: 'Compliance (RBI)', href: '/compliance', icon: Scale },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // If on landing or login page, don't show the persistent desktop sidebar
  if (pathname === '/' || pathname === '/login') {
    return null;
  }

  return (
    <aside
      className={`hidden lg:flex flex-col justify-between border-r border-slate-200/90 bg-white transition-all duration-300 ease-in-out shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Navigation Groups */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-6">
        {/* Collapse toggle */}
        <div className="px-2 flex items-center justify-between">
          {!collapsed && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Core Platform
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-auto"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Primary 5 Modules */}
        <div className="space-y-1">
          {PRIMARY_MODULES.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? item.name : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />

                {!collapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </div>

        {/* Secondary Technical Inventory */}
        <div className="space-y-1 pt-2 border-t border-slate-100">
          {!collapsed && (
            <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Security Repositories
            </div>
          )}
          {SECONDARY_MODULES.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? item.name : undefined}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-slate-700' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />

                {!collapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sidebar Footer: Clean Budget Efficiency Snapshot */}
      {!collapsed ? (
        <div className="p-3 m-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <span className="font-medium">Model Yield</span>
            <span className="text-emerald-700 font-bold font-mono">2.6× ROSI</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-[80%] rounded-full" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>₹10.0L Budget</span>
            <span className="text-emerald-700 font-medium flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -42.8% Risk
            </span>
          </div>
        </div>
      ) : (
        <div className="p-2 text-center text-[10px] font-mono text-emerald-700 border-t border-slate-100">
          2.6×
        </div>
      )}
    </aside>
  );
}
