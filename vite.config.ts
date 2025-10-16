import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	 server: {
        host: true, // 0.0.0.0
        port: 3002,
        strictPort: true,
    },
    preview: {
        host: true,
        port: 3002,
        strictPort: true,
    },
	plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
