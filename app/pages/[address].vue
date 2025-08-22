<script setup lang="ts">
import { useTonConnectUI, useTonWallet } from "@townsquarelabs/ui-vue"

const { address } = useRoute().params as { address: string }

const { tonConnectUI } = useTonConnectUI()
const wallet = useTonWallet()

const buyAmount = ref(0)
const sellAmount = ref(0)

const $api = useApiFetch()

const jettonData = await $api("/api/v3/jetton/wallets", {
  query: {
    jetton_address: [address],
  },
})

const jettonMaster = computed(() => Object.values(jettonData.metadata!)
  .flatMap((m: any) => m.token_info || [])
  .find((t: any) => t.type === "jetton_masters"))

async function buy() {
  const { messages } = await $fetch("/api/buy", {
    method: "POST",
    body: {
      tokenAddress: address,
      amount: buyAmount.value,
      minTokensOut: 1,
    },
  })

  await tonConnectUI.sendTransaction({
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages,
  })
}

async function sell() {
  const { messages } = await $fetch("/api/sell", {
    method: "POST",
    body: {
      userAddress: wallet.value?.account.address,
      tokenAddress: address,
      amount: sellAmount.value,
      minTonOut: 1,
    },
  })

  await tonConnectUI.sendTransaction({
    validUntil: Math.floor(Date.now() / 1000) + 60,
    messages,
  })
}
</script>

<template lang="pug">
pre {{ jettonMaster.name }}
div
  input(v-model.number="buyAmount" placeholder="amount of toncoins")
  button(@click="buy") Buy
div
  input(v-model.number="sellAmount" placeholder="amount of tokens")
  button(@click="sell") Sell
</template>
