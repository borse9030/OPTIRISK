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
    { name: 'Simulator', href: '/simulator', icon: FlaskConical },
    { name: 'Reports', href: '/reports', icon: FileText },
  ];

  const SECONDARY_PAGES = [
    { name: 'Asset Inventory', href: '/assets', icon: Boxes },
    { name: 'Threat Intelligence', href: '/threats', icon: ShieldCheck },
    { name: 'Vulnerabilities', href: '/vulnerabilities', icon: Bug },
    { name: 'Security Controls', href: '/controls', icon: SlidersHorizontal },
    { name: 'Compliance (RBI/NIST)', href: '/compliance', icon: Scale },
  ];

  return (
    <>
      {/* Sleek Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 lg:hidden px-2 py-1.5">
        <div className="flex items-center justify-around">
          {PRIMARY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{tab.name}</span>
              </Link>
            );
          })}

          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium text-slate-500 hover:text-slate-800"
          >
            <Menu className="w-5 h-5 mb-0.5 text-slate-400" />
            <span>More</span>
          </button>
        </div>
      </nav>

      {/* Slide-over Drawer for secondary views */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-900">Security Repositories</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {SECONDARY_PAGES.map((page) => {
                  const Icon = page.icon;
                  const isActive = pathname === page.href;
                  return (
                    <Link
                      key={page.href}
                      href={page.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-slate-500" />
                      <span>{page.name}</span>
                    </Link>
                  );
                })}
              </div>
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
