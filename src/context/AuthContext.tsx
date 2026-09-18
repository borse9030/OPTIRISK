'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '@/lib/firebase';
import { USER_PERSONAS, UserPersona, UserProfile } from './DataContext';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: string;
  persona: UserPersona;
  avatar: string;
  isAnonymous?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isFirebaseActive: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (
    email: string,
    password: string,
    displayName: string,
    role: string
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loginWithDemoPersona: (personaKey: UserPersona) => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_USER: AuthUser = {
  uid: 'usr_ciso_vikram',
  email: 'v.malhotra@titanfinancial.bank',
  displayName: 'Vikram Malhotra',
  role: 'Chief Information Security Officer (CISO)',
  persona: 'ciso',
  avatar: 'VM',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize Auth listener or retrieve stored session
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          const email = firebaseUser.email || '';
          // Determine persona / role from email or profile
          let persona: UserPersona = 'risk_analyst';
          let role = 'Risk Operations Specialist';

          if (email.includes('malhotra') || email.includes('ciso')) {
            persona = 'ciso';
            role = 'Chief Information Security Officer (CISO)';
          } else if (email.includes('deshmukh') || email.includes('cfo')) {
            persona = 'cfo';
            role = 'Chief Financial Officer (CFO)';
          }

          const displayName =
            firebaseUser.displayName || email.split('@')[0].toUpperCase();
          const avatar = displayName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase() || 'OP';

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName,
            role,
            persona,
            avatar,
          });
        } else {
          // If no active Firebase user, check local storage for user session
          const stored = localStorage.getItem('optirisk_auth_user');
          if (stored) {
            try {
              setUser(JSON.parse(stored));
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Local fallback mode when Firebase keys are pending
      const stored = localStorage.getItem('optirisk_auth_user');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, []);

  const saveLocalSession = (authUser: AuthUser | null) => {
    setUser(authUser);
    if (authUser) {
      localStorage.setItem('optirisk_auth_user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('optirisk_auth_user');
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    setError(null);
    setLoading(true);

    try {
      if (isFirebaseConfigured && auth) {
        // Real Firebase Auth
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Simulated local authentication when Firebase keys are absent
        await new Promise((res) => setTimeout(res, 400));
        let persona: UserPersona = 'risk_analyst';
        let name = 'Analyst User';
        let role = 'Principal Cyber Risk Specialist';

        if (email.toLowerCase().includes('ciso') || email.toLowerCase().includes('malhotra')) {
          persona = 'ciso';
          name = 'Vikram Malhotra';
          role = 'Chief Information Security Officer (CISO)';
        } else if (email.toLowerCase().includes('cfo') || email.toLowerCase().includes('deshmukh')) {
          persona = 'cfo';
          name = 'Anita Deshmukh';
          role = 'Chief Financial Officer (CFO)';
        }

        const newUser: AuthUser = {
          uid: `usr_${Date.now()}`,
          email,
          displayName: name,
          role,
          persona,
          avatar: name.split(' ').map((n) => n[0]).join('').toUpperCase() || 'OP',
        };

        saveLocalSession(newUser);
      }
    } catch (err: any) {
      console.error('Firebase login error:', err);
      let message = 'Failed to authenticate. Please check your credentials.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = 'Invalid email or password.';
      } else if (err.code === 'auth/invalid-credential') {
        message = 'Invalid authentication credentials.';
      } else if (err.code === 'auth/too-many-requests') {
        message = 'Access temporarily disabled due to multiple failed login attempts.';
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const signupWithEmail = async (
    email: string,
    password: string,
    displayName: string,
    role: string
  ) => {
    setError(null);
    setLoading(true);

    try {
      if (isFirebaseConfigured && auth) {
        // Real Firebase Account Creation
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName });

        const newUser: AuthUser = {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName,
          role,
          persona: role.toLowerCase().includes('cfo') ? 'cfo' : 'ciso',
          avatar: displayName.split(' ').map((n) => n[0]).join('').toUpperCase() || 'OP',
        };
        saveLocalSession(newUser);
      } else {
        // Local account emulation
        await new Promise((res) => setTimeout(res, 400));
        const newUser: AuthUser = {
          uid: `usr_${Date.now()}`,
          email,
          displayName,
          role,
          persona: role.toLowerCase().includes('cfo') ? 'cfo' : 'ciso',
          avatar: displayName.split(' ').map((n) => n[0]).join('').toUpperCase() || 'OP',
        };
        saveLocalSession(newUser);
      }
    } catch (err: any) {
      console.error('Firebase registration error:', err);
      let message = 'Failed to register account.';
      if (err.code === 'auth/email-already-in-use') {
        message = 'An account with this email already exists.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password must be at least 6 characters.';
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setError(null);
    setLoading(true);

    try {
      if (isFirebaseConfigured && auth && googleProvider) {
        await signInWithPopup(auth, googleProvider);
      } else {
        // Simulated Google login for hackathon demo
        await new Promise((res) => setTimeout(res, 400));
        const googleUser: AuthUser = {
          uid: `usr_google_${Date.now()}`,
          email: 'executive.user@titanfinancial.bank',
          displayName: 'Titan Executive User',
          role: 'Executive Board Member',
          persona: 'ciso',
          avatar: 'TE',
        };
        saveLocalSession(googleUser);
      }
    } catch (err: any) {
      console.error('Google sign-in error:', err);
      setError(err.message || 'Google sign-in failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (isFirebaseConfigured && auth) {
        await signOut(auth);
      }
      saveLocalSession(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const loginWithDemoPersona = (personaKey: UserPersona) => {
    const p = USER_PERSONAS[personaKey];
    const demoUser: AuthUser = {
      uid: `usr_${personaKey}`,
      email: p.email,
      displayName: p.name,
      role: p.role,
      persona: p.persona,
      avatar: p.avatar,
    };
    saveLocalSession(demoUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseActive: isFirebaseConfigured,
        loginWithEmail,
        signupWithEmail,
        loginWithGoogle,
        logout,
        loginWithDemoPersona,
        error,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
