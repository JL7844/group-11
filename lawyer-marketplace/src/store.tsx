import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { UserRole } from './types';

interface AuthState {
  role: UserRole | null;
  name: string | null;
}

interface AuthContextValue extends AuthState {
  login: (role: UserRole, name: string) => void;
  logout: () => void;
}

const AUTH_KEY = 'lm_auth_v1';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ role: null, name: null });

  useEffect(() => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      try {
        setState(JSON.parse(raw) as AuthState);
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AuthContextValue>(
    () => ({
      role: state.role,
      name: state.name,
      login: (role, name) => setState({ role, name }),
      logout: () => setState({ role: null, name: null }),
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}