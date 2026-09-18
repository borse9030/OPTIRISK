'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  ArrowRight,
  User,
  Briefcase,
  AlertCircle,
  X,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useData, UserPersona } from '@/context/DataContext';

export default function LoginPage() {
  const router = useRouter();
  const { switchPersona } = useData();
  const {
    loginWithEmail,
    signupWithEmail,
    loginWithGoogle,
    loginWithDemoPersona,
    isFirebaseActive,
    error,
    clearError,
  } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('v.malhotra@titanfinancial.bank');
  const [password, setPassword] = useState('demo123456');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('Chief Information Security Officer (CISO)');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();
    setLoading(true);

    try {
      if (mode === 'signin') {
        await loginWithEmail(email, password);
      } else {
        if (!displayName.trim()) {
          setLocalError('Please provide your full name.');
          setLoading(false);
          return;
        }
        await signupWithEmail(email, password, displayName, role);
      }
      router.push('/dashboard');
    } catch (err: any) {
      setLocalError(err.message || 'Authentication failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    clearError();
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push('/dashboard');
    } catch (err: any) {
      setLocalError(err.message || 'Google sign-in was not completed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPersona = (personaKey: UserPersona) => {
    loginWithDemoPersona(personaKey);
    switchPersona(personaKey);
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 250);
  };

  const activeError = localError || error;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-md space-y-5">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-xl bg-blue-600 items-center justify-center text-white font-mono font-bold text-xl shadow-sm mb-1">
            O
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
            OptiRisk
          </h1>
          <p className="text-xs text-blue-700 font-medium tracking-wide">
            Cyber Risk Quantification & Optimization Platform
          </p>
          <div className="text-[11px] text-slate-500">
            Titan Financial Group • Tier-1 Enterprise Gateway
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
          {/* Header Status Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Firebase Authentication
            </span>
            {isFirebaseActive ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Firebase Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Demo Mode
              </span>
            )}
          </div>

          {/* Quick Persona Demo Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                1-Click Persona Access:
              </label>
              <span className="text-[10px] text-blue-600 font-medium">Instant Test</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickPersona('ciso')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-center transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                  CISO
                </div>
                <div className="text-[10px] text-slate-500 truncate">V. Malhotra</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPersona('cfo')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-center transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                  CFO
                </div>
                <div className="text-[10px] text-slate-500 truncate">A. Deshmukh</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPersona('risk_analyst')}
                className="p-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-center transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                  Analyst
                </div>
                <div className="text-[10px] text-slate-500 truncate">R. Sharma</div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-100 w-full" />
            <span className="bg-white px-2 text-[10px] text-slate-400 font-mono uppercase absolute">
              Or Authenticate with Account
            </span>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setLocalError(null);
                clearError();
              }}
              className={`py-1.5 rounded-md transition-all ${
                mode === 'signin'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setLocalError(null);
                clearError();
              }}
              className={`py-1.5 rounded-md transition-all ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Alert */}
          {activeError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-[11px] leading-relaxed">{activeError}</div>
              <button
                type="button"
                onClick={() => {
                  setLocalError(null);
                  clearError();
                }}
                className="text-rose-500 hover:text-rose-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-2 px-3 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Dr. Rohan Roy"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                      required={mode === 'signup'}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Executive Role
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                    >
                      <option value="Chief Information Security Officer (CISO)">
                        Chief Information Security Officer (CISO)
                      </option>
                      <option value="Chief Financial Officer (CFO)">
                        Chief Financial Officer (CFO)
                      </option>
                      <option value="Principal Cyber Risk Analyst">
                        Principal Cyber Risk Analyst
                      </option>
                      <option value="Audit & Compliance Officer">
                        Audit & Compliance Officer
                      </option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Corporate Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-700">
                  {mode === 'signup' ? 'Create Password (min 6 chars)' : 'Passcode / Password'}
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="soft-btn-primary w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <span>
                {loading
                  ? 'Authenticating...'
                  : mode === 'signin'
                  ? 'Sign In to OptiRisk'
                  : 'Register Account'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="text-center pt-2 text-[11px] text-slate-400 font-mono">
            Smart India Hackathon 2026 • SIH26105
          </div>
        </div>
      </div>
    </div>
  );
}
