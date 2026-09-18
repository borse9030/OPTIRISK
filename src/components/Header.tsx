'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  User,
  CheckCircle2,
  ChevronDown,
  Building2,
  RefreshCw,
  ChevronRight,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useData, USER_PERSONAS, UserPersona } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';

const ROUTE_NAMES: Record<string, string> = {
  '/dashboard': 'Executive Overview',
  '/optimizer': 'Investment Optimizer',
  '/risk-intelligence': 'Risk Intelligence',
  '/simulator': 'Scenario Simulator',
  '/reports': 'Executive Reports',
  '/assets': 'Asset Inventory',
  '/threats': 'Threat Intelligence',
  '/vulnerabilities': 'Vulnerabilities',
  '/controls': 'Security Controls',
  '/compliance': 'Compliance Posture',
  '/map': 'Infrastructure Map',
  '/analyst': 'Analyst Co-Pilot',
  '/settings': 'Settings',
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { organization, currentUser, switchPersona, resetToDefaults } = useData();
  const { user: authUser, logout, loginWithDemoPersona, isFirebaseActive } = useAuth();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  // Active user name and avatar prefers authUser if available
  const activeName = authUser?.displayName || currentUser.name;
  const activeAvatar = authUser?.avatar || currentUser.avatar;
  const activeRole = authUser?.role || currentUser.role;

  // Current section title
  const currentTitle = ROUTE_NAMES[pathname] || 'Dashboard';

  const handlePersonaSwitch = (pKey: UserPersona) => {
    switchPersona(pKey);
    loginWithDemoPersona(pKey);
    setShowPersonaMenu(false);
  };

  const handleSignOut = async () => {
    setShowPersonaMenu(false);
    await logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 h-14 px-4 sm:px-6 flex items-center justify-between">
      {/* Brand Identity & Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm group-hover:bg-blue-700 transition-colors">
            <span className="font-mono">O</span>
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-900 hidden sm:inline">
            OptiRisk
          </span>
        </Link>

        {/* Breadcrumb divider */}
        <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />

        {/* Current Active Page breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="hidden md:inline text-slate-400">Platform</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 hidden md:inline" />
          <span className="font-semibold text-slate-800">{currentTitle}</span>
        </div>
      </div>

      {/* Right controls: Organization indicator, Reset, Persona Switcher */}
      <div className="flex items-center gap-2.5">
        {/* Organization Name Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200 text-xs text-slate-600">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-medium text-slate-700">{organization.name}</span>
        </div>

        {/* Reset Demo State */}
        <button
          onClick={resetToDefaults}
          title="Reset Demo Data"
          className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {/* User Profile & Persona Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowPersonaMenu(!showPersonaMenu)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 transition-colors"
          >
            <div className="w-5 h-5 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-700">
              {activeAvatar}
            </div>
            <span className="font-medium text-slate-700 text-xs hidden sm:inline">
              {activeName}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showPersonaMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg p-2.5 z-50 animate-in fade-in zoom-in-95 space-y-2">
              {/* Account summary header */}
              <div className="px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-xs font-semibold text-slate-900 truncate">{activeName}</div>
                <div className="text-[11px] text-slate-500 truncate">{activeRole}</div>
                {authUser?.email && (
                  <div className="text-[10px] text-blue-600 font-mono truncate mt-0.5">
                    {authUser.email}
                  </div>
                )}
                <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{isFirebaseActive ? 'Firebase Auth Verified' : 'Demo Auth Active'}</span>
                </div>
              </div>

              {/* Persona Switch Options */}
              <div>
                <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Persona:
                </div>
                <div className="space-y-1">
                  {(Object.keys(USER_PERSONAS) as UserPersona[]).map((pKey) => {
                    const p = USER_PERSONAS[pKey];
                    const isActive = currentUser.persona === pKey;
                    return (
                      <button
                        key={pKey}
                        onClick={() => handlePersonaSwitch(pKey)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-800 font-semibold border border-blue-200'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-medium">{p.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">{p.role}</div>
                        </div>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
