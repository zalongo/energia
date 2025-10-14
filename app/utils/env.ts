// Centraliza el acceso a variables de entorno Vite (prefijo VITE_)
// Nota: Vite expone import.meta.env en runtime del cliente/servidor.

// Definición minimal de tipos para autocompletado: puedes ampliar con d.ts si lo prefieres.
interface AppEnv {
  VITE_API_BASE_URL?: string;
  VITE_API_TIMEOUT_MS?: string | number;
  VITE_API_URL?: string;
}

const env = (import.meta as any).env as AppEnv | undefined;

const toNumber = (v: string | number | undefined, fallback: number) => {
  if (v == null) return fallback;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
};

// Preferimos VITE_API_URL si está definida (p.ej. http://localhost:3000/api)
export const API_BASE_URL = env?.VITE_API_URL ?? env?.VITE_API_BASE_URL ?? "/api";
export const API_TIMEOUT_MS = toNumber(env?.VITE_API_TIMEOUT_MS, 15000);
