import { fileURLToPath } from "node:url"

import VitePluginVue from "@vitejs/plugin-vue"
import vueCssModule from "vite-plugin-vue-css-module"

export default defineNuxtConfig({
  compatibilityDate: "2025-08-06",
  devtools: { enabled: true },

  // @sort
  modules: [
    "nuxt-open-fetch",
    "nuxt-svgo",
  ],

  ssr: false,

  alias: {
    "#server": fileURLToPath(new URL("./server", import.meta.url)),
  },

  nitro: {
    rollupConfig: {
      plugins: [VitePluginVue()],
    } as any,
    esbuild: {
      options: {
        target: "ESNext",
      },
    },
  },

  vite: {
    plugins: [
      vueCssModule({ attrName: "mclass", pugClassLiterals: true }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@/styles/mixins' as *;",
        },
      },
    },
  },

  openFetch: {
    clients: {
      api: {
        baseURL: "https://testnet.toncenter.com",
      },
    },
  },

  css: [
    "~/styles/index.scss",
    "@oruga-ui/theme-bulma/dist/bulma.css",
  ],

  svgo: {
    explicitImportsOnly: true,
  },

})
