<script setup lang="ts">
import { OSlider } from "@oruga-ui/oruga-next"

import type { TokenData } from "#server/utils"

const props = defineProps<{
  data: TokenData
}>()

const progress = computed(() => {
  return Math.floor(Number(props.data.tonReserve) / 1e10)
})
</script>

<template lang="pug">
.header
  .section
    .section-header {{ data.name }}
    .section-content 28.08.2025
  .section
    .section-header dev
    .section-content @username
  .section
    .section-header cap
    .section-content {{ Number(data.tokenReserve) * data.priceTon }}
  .section
    .section-header progress {{ progress }}%
    o-slider(:model-value="progress" disabled)
</template>

<style module lang="scss">
.header {
  display: flex;
}

.section {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
}

.section-header {
  text-transform: uppercase;
}
</style>
