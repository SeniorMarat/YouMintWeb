<script setup lang="ts">
import type { TokenData } from "#server/utils"

defineProps<{
  data: TokenData
}>()
</script>

<template lang="pug">
.info
  .block
    .block-header price usd
    .block-value $0.00000045
  .block
    .block-header price
    .block-value {{ data.priceTon }} TON
  .block
    .block-header mkt cap
    .block-value $2500
  .block
    .block-header liquidity
    .block-value $1000
  .block
    .block-header ton collected
    .block-value {{ Math.floor(Number(data.tonReserve) / 1e9) }}/1000
</template>

<style module lang="scss">
.info {
  display: flex;
  gap: 10px;
  @include todo;
  flex: 1;
  border-radius: 25px;
  padding: 10px;
}

.block {
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
}

.block-header {
  color: gray;
}

.block-value {
  color: white;
}
</style>
