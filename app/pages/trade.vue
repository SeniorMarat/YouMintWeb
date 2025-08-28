<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router"

const address = useRouteQuery<string>("token_address")

const tokenMetaData = await $fetch("/api/reserve", {
  query: { tokenAddress: address.value },
})

const priceData = await $fetch("/api/price", {
  query: { tokenAddress: address.value },
})
</script>

<template lang="pug">
.page
  .column
    trade-header(:data="tokenMetaData")
    trade-chart(:data="priceData" interval="day")
  .column
    trade-form
    trade-info(:data="tokenMetaData")
</template>

<style module lang="scss">
.page {
  display: flex;
  gap: 24px;
  width: 100%;
  flex-wrap: nowrap;
}

.column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}
</style>
