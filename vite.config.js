import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "public",
  server: {
    port: 5174,
    open: false,
    host: true,
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
