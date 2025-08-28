import { Button, Dropdown, Modal, OrugaConfig, Tabs, Tooltip } from "@oruga-ui/oruga-next"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp
    .use(Dropdown)
    .use(Modal)
    .use(Tooltip)
    .use(Tabs)
    .use(Button)
    .use(OrugaConfig, {
      modal: {
        teleport: true,
        mobileBreakpoint: "768px",
      },
    })
})
