import api from "~/api/axiosInstance";

describe("axiosInstance", () => {
  it("debe configurar baseURL y withCredentials", () => {
    const defaults = (api as any).defaults;
    expect(defaults.baseURL).toBeDefined();
    expect(defaults.withCredentials).toBe(true);
  });
});
