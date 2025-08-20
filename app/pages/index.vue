<script setup lang="ts">
import { useTonConnectUI, useTonWallet } from "@townsquarelabs/ui-vue"
import type { SendTransactionRequest } from "@townsquarelabs/ui-vue"

const token_name = ref("")
const { tonConnectUI } = useTonConnectUI()
const wallet = useTonWallet()

async function deploy() {
  const { address, stateInit, body } = await $fetch("/api/deploy", {
    method: "POST",
    body: {
      ownerAddress: wallet.value?.account.address,
      metadata: {
        name: token_name.value,
        symbol: token_name.value,
        decimals: "9",
      },
    },
  })

  await tonConnectUI.sendTransaction({
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages: [
      {
        address,
        amount: (0.05 * 1e9).toString(),
        payload: body,
        stateInit,
      },
    ],
  } as SendTransactionRequest)
}
</script>

<template lang="pug">
div
  pre {{ token_name }}
  input(v-model="token_name" placeholder="jetton name")
  button(@click="deploy") Deploy
</template>
