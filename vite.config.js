import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

import path from "path";

const alias = {
  "@components": path.resolve(__dirname, "src/components"),
  "@assets": path.resolve(__dirname, "src/assets"),
  "@utils": path.resolve(__dirname, "src/utils"),
  "@pages": path.resolve(__dirname, "src/pages"),
  "@contexts": path.resolve(__dirname, "src/contexts"),
  "@hooks": path.resolve(__dirname, "src/hooks"),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // for prduction build
  },
  resolve: {
    alias,
  },

  optimizeDeps: {
    disabled: false,
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    commonjsOptions: {
      include: [], // it will fix require not defined error
    },
  },
});
