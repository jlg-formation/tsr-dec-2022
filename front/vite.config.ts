import { defineConfig } from "vite";
import typescript from "@rollup/plugin-typescript";
import ttsc from "ttypescript";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    typescript({
      typescript: ttsc,
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});
