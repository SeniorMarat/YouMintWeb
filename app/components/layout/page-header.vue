<script setup lang="ts">
import { TonConnectButton } from "@townsquarelabs/ui-vue"
</script>

<template lang="pug">
.header
  ton-connect-button
</template>

<style module lang="scss">
.header {
  display: flex;
  justify-content: flex-end;
  padding: 24px;
}
</style>
