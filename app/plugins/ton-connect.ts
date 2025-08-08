import { THEME, TonConnectUIPlugin } from "@townsquarelabs/ui-vue"
import type { TonConnectUIProviderProps } from "@townsquarelabs/ui-vue"

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(TonConnectUIPlugin, {
    manifestUrl: "https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json",
    uiPreferences: { theme: THEME.DARK },
  } satisfies TonConnectUIProviderProps)
})
