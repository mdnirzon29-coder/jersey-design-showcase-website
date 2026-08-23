import React, { createContext, useContext, useEffect, useState } from "react";
import { AUTH_STORAGE_KEY, DEMO_ADMIN_CREDENTIALS } from "../config/adminConfig";

// ============================================================================
// AUTH CONTEXT (DEMO IMPLEMENTATION)
// ----------------------------------------------------------------------------
// This provides a simple authenticated/unauthenticated state for the admin
// area. In this frontend-only demo, credentials are checked against a local
// config file and the session flag is stored in localStorage.
//
// TO CONNECT A REAL BACKEND:
//   1. Replace `login()` below with a call to your auth API
//      (e.g. Firebase Auth, Supabase Auth, or your own JWT/session endpoint).
//   2. Store the returned token instead of a boolean flag.
//   3. Protect all category/jersey write operations (add/edit/delete) on the
//      SERVER using that token — never rely on the frontend alone.
// ============================================================================

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem(AUTH_STORAGE_KEY) === "true"
  );

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [isAuthenticated]);

  function login(username: string, password: string): boolean {
    const ok =
      username === DEMO_ADMIN_CREDENTIALS.username &&
      password === DEMO_ADMIN_CREDENTIALS.password;
    if (ok) setIsAuthenticated(true);
    return ok;
  }

  function logout() {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
