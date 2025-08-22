<script setup lang="ts">
import { useTonConnectUI } from "@townsquarelabs/ui-vue"

const { address } = useRoute().params as { address: string }

const { tonConnectUI } = useTonConnectUI()

const amount = ref(0)

async function buy() {
  const { messages } = await $fetch("/api/buy", {
    method: "POST",
    body: {
      tokenAddress: address,
      amount: amount.value,
      minTokensOut: 1,
    },
  })

  await tonConnectUI.sendTransaction({
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages,
  })
}
</script>

<template lang="pug">
div
  input(v-model.number="amount" placeholder="amount of toncoins")
  button(@click="buy") Buy
</template>
