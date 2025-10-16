import axios from "axios";
import { config } from "../utils/config";

export const api = axios.create({
  baseURL: config.API_URL,
  // Importante para cookies HTTP-only con el backend
  withCredentials: true,
  timeout: config.API_TIMEOUT_MS,
  // Headers por defecto; aceptar JSON.
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor de request: ejemplo para futuros headers (trazabilidad, etc.)
api.interceptors.request.use((config) => {
  return config;
});

// Interceptor de respuesta: manejo básico de errores y refresh (placeholder)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
