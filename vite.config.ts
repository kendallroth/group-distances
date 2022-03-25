import vue from "@vitejs/plugin-vue";
import vuetify from "@vuetify/vite-plugin";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source: any, fp: any) {
          // NOTE: Both '@use' and '@forward' rules MUST be some of the first rules
          //         in an SCSS file! Therefore, if the Vuetify overrides has any
          //         SCSS imports prepended, it will break this order and cause errors!
          if (fp.endsWith("vuetify.scss")) return source;

          return `
              @import "@styles/_breakpoints.scss";
              @import "@styles/_vars.scss";
              ${source}
            `;
        },
      },
    },
  },
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: "expose",
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@composables": fileURLToPath(new URL("./src/composables", import.meta.url)),
      "@config": fileURLToPath(new URL("./src/config", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
      "@typings": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
      "@utilites": fileURLToPath(new URL("./src/utilities", import.meta.url)),
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  },
  */
});
