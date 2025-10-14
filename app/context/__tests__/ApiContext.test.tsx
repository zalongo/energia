import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ApiProvider, useApi } from "~/context/ApiContext";
import * as authApi from "~/api/auth";

jest.mock("~/api/auth");

function TestComp() {
  const { user, loading } = useApi();
  return (
    <div>
      <div data-testid="loading">{String(loading)}</div>
      <div data-testid="user">{user?.email ?? "null"}</div>
    </div>
  );
}

describe("ApiContext", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("hidrata user desde me() al montar", async () => {
    (authApi.me as jest.Mock).mockResolvedValueOnce({
      id: "1",
      userName: "u",
      email: "u@e.com",
      nombre: null,
      apellido: null,
      roles: ["Usuario"],
    });

    render(
      <ApiProvider>
        <TestComp />
      </ApiProvider>
    );

    expect(screen.getByTestId("loading").textContent).toBe("true");

    await waitFor(() => expect(screen.getByTestId("loading").textContent).toBe("false"));
    expect(screen.getByTestId("user").textContent).toBe("u@e.com");
  });

  it("deja user en null si me() falla", async () => {
    (authApi.me as jest.Mock).mockRejectedValueOnce(new Error("no session"));

    render(
      <ApiProvider>
        <TestComp />
      </ApiProvider>
    );

    await waitFor(() => expect(screen.getByTestId("loading").textContent).toBe("false"));
    expect(screen.getByTestId("user").textContent).toBe("null");
  });
});
