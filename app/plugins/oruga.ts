import { Dropdown, Modal, OrugaConfig, Tooltip } from "@oruga-ui/oruga-next"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp
    .use(Dropdown)
    .use(Modal)
    .use(Tooltip)
    .use(OrugaConfig, {
      modal: {
        teleport: true,
        mobileBreakpoint: "768px",
      },
    })
})
