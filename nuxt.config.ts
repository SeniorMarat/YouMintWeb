import VitePluginVue from "@vitejs/plugin-vue"
import vueCssModule from "vite-plugin-vue-css-module"

export default defineNuxtConfig({
  compatibilityDate: "2025-08-06",
  devtools: { enabled: true },

  // @sort
  modules: [
    "nuxt-svgo",
  ],

  ssr: false,

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

  css: [
    "~/styles/index.scss",
  ],

  svgo: {
    explicitImportsOnly: true,
  },

})
