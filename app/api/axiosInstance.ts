import axios from "axios";
import { API_BASE_URL, API_TIMEOUT_MS } from "~/utils/env";

export const api = axios.create({
  baseURL: API_BASE_URL,
  // Importante para cookies HTTP-only con el backend
  withCredentials: true,
  timeout: API_TIMEOUT_MS,
  // Headers por defecto; aceptar JSON.
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor de request: ejemplo para futuros headers (trazabilidad, etc.)
api.interceptors.request.use((config) => {
  // Puedes agregar headers personalizados aquí si es necesario.
  // p.ej. config.headers["X-Client"] = "sibne-front";
  return config;
});

// Interceptor de respuesta: manejo básico de errores y refresh (placeholder)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Si el backend provee estatus 401/403, aquí se podría intentar refresh.
    // Lo implementaremos luego en app/api/auth.ts y ApiContext.
    return Promise.reject(error);
  }
);

export default api;
