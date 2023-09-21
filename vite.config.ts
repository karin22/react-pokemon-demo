import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target: "https://pokeapi.co/api/v2/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      types: `${path.resolve(__dirname, "./src/@types")}`,
      service: `${path.resolve(__dirname, "./src/service")}`,
      store: `${path.resolve(__dirname, "./src/store")}`,
    },
  },
});
