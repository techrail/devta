import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import dependenciesListGenerator from "./dependenciesListGenerator.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dependenciesListGenerator()],
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "balm-ui-plus": "balm-ui/dist/balm-ui-plus.esm.js",
      "balm-ui-css": "balm-ui/dist/balm-ui.css",
      "@": path.resolve(__dirname, "src/components/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@stores": path.resolve(__dirname, "src/stores/"),
      "@src": path.resolve(__dirname, "src/"),
    },
  },
});
