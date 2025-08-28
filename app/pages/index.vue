<script setup lang="ts">
import { useTonConnectUI, useTonWallet } from "@townsquarelabs/ui-vue"
import type { SendTransactionRequest } from "@townsquarelabs/ui-vue"

const token_name = ref("")
const { tonConnectUI } = useTonConnectUI()
const wallet = useTonWallet()

const router = useRouter()

async function deploy() {
  const { messages, tokenAddress } = await $fetch("/api/deploy", {
    method: "POST",
    body: {
      ownerAddress: wallet.value?.account.address,
      metadata: {
        name: token_name.value,
        description: "Test jetton",
        image: "9",
        decimals: "9",
        symbol: token_name.value,
      },
    },
  })

  try {
    await tonConnectUI.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages,
    } as SendTransactionRequest)
  } finally {
    await router.push({ path: "/trade", query: { token_address: tokenAddress } })
  }
}
</script>

<template lang="pug">
div
  input(v-model="token_name" placeholder="jetton name")
  button(@click="deploy") Deploy
</template>
