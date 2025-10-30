import api from "./axiosInstance";

// Tipos basados en la guía .github/copilot-instructions.md
export type Rol = "Administrador" | "Usuario" | "Supervisor" | string;

export interface User {
  id: string;
  userName: string;
  email: string;
  nombre: string | null;
  apellido: string | null;
  roles: Rol[];
}

export interface LoginResponse {
  message: string;
  // Propiedad en la respuesta del backend sigue siendo `usuario` (nombre en español).
  // Conservamos la clave tal cual para no romper el contrato HTTP, pero el tipo
  // interno que usamos en TypeScript es `User`.
  usuario: User;
  accessToken: string;
}

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  nombre?: string;
  apellido?: string;
}

export type LoginPayload =
  | { userName: string; password: string }
  | { email: string; password: string };

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<LoginResponse>("/auth/register", payload);
  return data;
}

export async function login(payload: LoginPayload) {
  // Normalizamos: el backend espera userName
  const body = {
    userName: (payload as any).userName ?? (payload as any).email,
    password: (payload as any).password,
  };
  const { data } = await api.post<LoginResponse>("/auth/login", body);
  return data;
}

export async function me() {
  const { data } = await api.get<User>("/auth/me");
  return data;
}

export async function refresh() {
  const { data } = await api.post<LoginResponse>("/auth/refresh");
  return data;
}

export async function logout() {
  await api.post("/auth/logout");
}

// Exportamos el tipo `User` como `AuthUser` para mantener la misma interfaz de import
// usada por `ApiContext` y otros módulos.
export type { User as AuthUser };
