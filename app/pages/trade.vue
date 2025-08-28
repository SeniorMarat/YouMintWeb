<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router"

const address = useRouteQuery<string>("token_address")

const data = await $fetch("/api/reserve", {
  query: { tokenAddress: address.value },
})
</script>

<template lang="pug">
.page
  .column
    trade-header(:data="data")
    trade-chart(:data="data")
  .column
    trade-form
    trade-info(:data="data")
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
