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
  Menu,
  X,
  Boxes,
  ShieldCheck,
  Bug,
  Scale,
  Sparkles,
  MapPin,
  Settings,
  ChevronRight,
} from 'lucide-react';

export default function MobileNavBar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hide on landing or login page
  if (pathname === '/' || pathname === '/login') {
    return null;
  }

  const PRIMARY_TABS = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Optimizer', href: '/optimizer', icon: SlidersHorizontal },
    { name: 'Risks', href: '/risk-intelligence', icon: AlertOctagon },
  ];

  const DRAWER_GROUPS = [
    {
      group: 'Decision Engines',
      items: [
        { name: 'Scenario Simulator', href: '/simulator', icon: FlaskConical, desc: 'What-If Simulations' },
        { name: 'Executive Reports', href: '/reports', icon: FileText, desc: 'Board & Audit Packets' },
        { name: 'Analyst Co-Pilot', href: '/analyst', icon: Sparkles, desc: 'AI Cyber Guidance' },
      ],
    },
    {
      group: 'Security Repositories',
      items: [
        { name: 'Asset Inventory', href: '/assets', icon: Boxes, desc: 'Critical Infrastructure' },
        { name: 'Threat Intelligence', href: '/threats', icon: ShieldCheck, desc: 'Adversary Tracking' },
        { name: 'Vulnerabilities', href: '/vulnerabilities', icon: Bug, desc: 'CVE Exposure' },
        { name: 'Security Controls', href: '/controls', icon: SlidersHorizontal, desc: 'Defense Portfolio' },
        { name: 'Compliance Posture', href: '/compliance', icon: Scale, desc: 'RBI & NIST Benchmarks' },
        { name: 'Infrastructure Map', href: '/map', icon: MapPin, desc: 'Network Topology' },
      ],
    },
    {
      group: 'Configuration',
      items: [
        { name: 'Platform Settings', href: '/settings', icon: Settings, desc: 'Telemetry & Integrations' },
      ],
    },
  ];

  return (
    <>
      {/* Sleek 4-Item Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 lg:hidden px-3 py-1.5 shadow-lg safe-area-pb">
        <div className="grid grid-cols-4 items-center gap-1">
          {PRIMARY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[11px] font-medium transition-all ${
                  isActive
                    ? 'text-blue-700 bg-blue-50/70 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="tracking-tight">{tab.name}</span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[11px] font-medium transition-all ${
              drawerOpen
                ? 'text-blue-700 bg-blue-50/70 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Menu className="w-5 h-5 mb-0.5 text-slate-400" />
            <span className="tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* Slide-over Drawer for all secondary tools */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-4 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="text-sm font-bold text-slate-900">OptiRisk Platform</div>
                  <div className="text-[11px] text-slate-500">Navigation & Tools</div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {DRAWER_GROUPS.map((grp) => (
                <div key={grp.group} className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {grp.group}
                  </div>
                  {grp.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDrawerOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                          <div>
                            <div className="font-medium text-slate-800">{item.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{item.desc}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
              Titan Financial Group • SIH26105
            </div>
          </div>
        </div>
      )}
    </>
  );
}
