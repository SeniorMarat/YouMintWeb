<script setup lang="ts">
import { TonConnectButton } from "@townsquarelabs/ui-vue"
</script>

<template lang="pug">
.header
  router-link.logo(to="/") Logo
  ton-connect-button
</template>

<style module lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding: 24px;
}

.logo {
  @include todo;
}
</style>
