import * as auth from "~/api/auth";
import api from "~/api/axiosInstance";

jest.mock("~/api/axiosInstance", () => {
  const actual = jest.requireActual("axios");
  const instance = actual.create();
  // mockear métodos usados
  (instance as any).get = jest.fn();
  (instance as any).post = jest.fn();
  return { __esModule: true, default: instance };
});

describe("auth api", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("login llama a /auth/login usando userName y retorna datos", async () => {
    const response = {
      message: "Login exitoso",
      usuario: {
        id: "1",
        userName: "test",
        email: "test@example.com",
        nombre: "Test",
        apellido: null,
        roles: ["Usuario"],
      },
      accessToken: "token",
    };
    (api.post as any).mockResolvedValueOnce({ data: response });
    const data = await auth.login({ email: "test@example.com", password: "pass" });
    expect(api.post).toHaveBeenCalledWith("/auth/login", { userName: "test@example.com", password: "pass" });
    expect(data).toEqual(response);
  });

  it("me llama a /auth/me y retorna usuario", async () => {
    const user = {
      id: "1",
      userName: "u",
      email: "u@e.com",
      nombre: null,
      apellido: null,
      roles: ["Usuario"],
    };
    (api.get as any).mockResolvedValueOnce({ data: user });
    const data = await auth.me();
    expect(api.get).toHaveBeenCalledWith("/auth/me");
    expect(data).toEqual(user);
  });
});
