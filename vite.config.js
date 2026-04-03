import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@tabler-icons-svg": fileURLToPath(
        new URL("./node_modules/@tabler/icons/icons/outline", import.meta.url),
      ),
    },
  },
  build: {
    minify: "esbuild",
    sourcemap: false,
    target: "es2022",
  },
});
