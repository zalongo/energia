import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  let API_PROXY_TARGET = process.env.VITE_API_PROXY_TARGET || undefined;
  // Si no se especificó target pero existe VITE_API_URL, podemos inferir el origin
  if (!API_PROXY_TARGET && process.env.VITE_API_URL) {
    try {
      const u = new URL(process.env.VITE_API_URL);
      API_PROXY_TARGET = `${u.protocol}//${u.host}`;
    } catch {}
  }

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    server: {
      proxy: API_PROXY_TARGET
        ? {
            "/api": {
              target: API_PROXY_TARGET,
              changeOrigin: true,
              secure: false,
              // Reescribe si el backend no espera el prefijo /api
              // rewrite: (path) => path.replace(/^\/api/, ""),
            },
          }
        : undefined,
    },
  };
});
