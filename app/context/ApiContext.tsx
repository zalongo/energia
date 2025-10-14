import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as authApi from "~/api/auth";
import type { AuthUser, LoginPayload } from "~/api/auth";

interface ApiContextValue {
  user: AuthUser | null;
  loading: boolean;
  error?: string;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  fetchMe: () => Promise<void>;
  hasRole: (roles: string | string[]) => boolean;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchMe = useCallback(async () => {
    try {
      setError(undefined);
      const me = await authApi.me();
      setUser(me);
    } catch (err: any) {
      // Si no hay sesión, dejamos user en null sin propagar error
      setUser(null);
    }
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    setError(undefined);
    try {
      await authApi.login(payload);
      await fetchMe();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Error al iniciar sesión";
      setError(msg);
      throw err;
    }
  }, [fetchMe]);

  const logout = useCallback(async () => {
    setError(undefined);
    try {
      await authApi.logout();
      setUser(null);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Error al cerrar sesión";
      setError(msg);
      throw err;
    }
  }, []);

  const refresh = useCallback(async () => {
    setError(undefined);
    try {
      await authApi.refresh();
      await fetchMe();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Error al refrescar sesión";
      setError(msg);
      throw err;
    }
  }, [fetchMe]);

  const hasRole = useCallback(
    (roles: string | string[]) => {
      if (!user) return false;
      const required = Array.isArray(roles) ? roles : [roles];
      return user.roles?.some((r) => required.includes(r));
    },
    [user]
  );

  useEffect(() => {
    (async () => {
      try {
        await fetchMe();
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchMe]);

  const value = useMemo<ApiContextValue>(() => ({
    user,
    loading,
    error,
    login,
    logout,
    refresh,
    fetchMe,
    hasRole,
  }), [user, loading, error, login, logout, refresh, fetchMe, hasRole]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error("useApi debe usarse dentro de ApiProvider");
  return ctx;
}
