<script setup lang="ts">
import { useTonConnectUI, useTonWallet } from "@townsquarelabs/ui-vue"

const { tonConnectUI } = useTonConnectUI()
const wallet = useTonWallet()
async function deploy() {
  const { address, stateInit } = await $fetch("/api/deploy", {
    method: "POST",
    body: {
      ownerAddress: wallet.value?.account.address,
    },
  })

  console.log(address)
  await tonConnectUI.sendTransaction({
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages: [
      {
        address,
        amount: (0.05 * 1000000000).toString(), // пример
        payload: "", // если нужно
        stateInit,
      },
    ],
  })
}
</script>

<template lang="pug">
div
  pre {{ token_name }}
  input(v-model="token_name" placeholder="jetton name")
  button(@click="deploy({ name: token_name })") Deploy
</template>
