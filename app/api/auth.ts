import api from "./axiosInstance";

// Tipos basados en la guía .github/copilot-instructions.md
export type Rol = "Administrador" | "Usuario" | "Empresa" | string;

export interface Usuario {
  id: string;
  userName: string;
  email: string;
  nombre: string | null;
  apellido: string | null;
  roles: Rol[];
}

export interface LoginResponse {
  message: string;
  usuario: Usuario;
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
  const { data } = await api.get<Usuario>("/auth/me");
  return data;
}

export async function refresh() {
  const { data } = await api.post<LoginResponse>("/auth/refresh");
  return data;
}

export async function logout() {
  await api.post("/auth/logout");
}

export type { Usuario as AuthUser };
