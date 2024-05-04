import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        dir: "../output",
        entryFileNames: "media.js",
        assetFileNames: "media.css",
        chunkFileNames: "chunk.js",
        manualChunks: undefined,
      },
    },
  },
});
