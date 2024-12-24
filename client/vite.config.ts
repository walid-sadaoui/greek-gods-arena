import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      host: "0.0.0.0",
      port: parseInt(env.VITE_PORT ?? 5001),
      watch: {
        usePolling: true,
      },
    },
    plugins: [reactRefresh(), svgrPlugin(), tsconfigPaths()],
  };
});
