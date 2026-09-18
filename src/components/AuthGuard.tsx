'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Lock } from 'lucide-react';

const PUBLIC_ROUTES = ['/', '/login'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!loading && !user && !isPublicRoute) {
      // Unauthenticated user attempting to access protected route -> bounce to login
      router.replace('/login');
    }
  }, [loading, user, isPublicRoute, router]);

  // If public route (e.g. /login or /), render directly
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // If still checking authentication state, display enterprise verification gateway
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm max-w-sm w-full text-center space-y-4 animate-in fade-in duration-300">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-2xl shadow-md">
              O
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              OptiRisk Security Gateway
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verifying enterprise credentials & cryptographic session...
            </p>
          </div>

          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full animate-pulse w-3/4" />
          </div>

          <div className="text-[10px] text-slate-400 font-mono">
            Titan Financial Group • SIH26105 Gateway
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated and on a protected route, show redirect screen while router navigates
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-sm w-full text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-slate-900">Access Restricted</div>
          <p className="text-xs text-slate-500">
            Authentication required. Redirecting to corporate login portal...
          </p>
        </div>
      </div>
    );
  }

  // Authenticated user: render protected portal
  return <>{children}</>;
}
