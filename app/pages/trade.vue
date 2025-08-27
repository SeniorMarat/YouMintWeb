<script setup lang="ts">
import { OButton } from "@oruga-ui/oruga-next"
import { useTonConnectUI, useTonWallet } from "@townsquarelabs/ui-vue"
import { useRouteQuery } from "@vueuse/router"

const address = useRouteQuery<string>("token_address")

const { tonConnectUI } = useTonConnectUI()
const wallet = useTonWallet()

function formatPrice(tonReserveStr: string, tokenReserveStr: string): number {
  const tonReserve = BigInt(tonReserveStr)
  const tokenReserve = BigInt(tokenReserveStr)

  // оба значения в nano (1 TON = 1e9 nanoTON, токены скорее всего тоже в 1e9)
  const tonPerToken = Number(tonReserve) / Number(tokenReserve)

  // переведём в TON за 1 токен
  return tonPerToken
}

const buyAmount = ref(0)
const sellAmount = ref(0)

const $api = useApiFetch()

const jettonData = await $api("/api/v3/jetton/wallets", {
  query: {
    jetton_address: [address.value],
  },
})

const { tonReserve, tokenReserve } = await $fetch("/api/reserve", {
  method: "GET",
  query: {
    tokenAddress: address.value,
  },
})

const priceTon = formatPrice(tonReserve, tokenReserve)

const jettonMaster = computed(() => Object.values(jettonData.metadata!)
  .flatMap((m: any) => m.token_info || [])
  .find((t: any) => t.type === "jetton_masters"))

async function buy() {
  const { messages } = await $fetch("/api/buy", {
    method: "POST",
    body: {
      tokenAddress: address.value,
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
      tokenAddress: address.value,
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
pre {{ priceTon }}
pre {{ jettonMaster.name }}
div
  input(v-model.number="buyAmount" placeholder="amount of toncoins")
  button(@click="buy") Buy
div
  input(v-model.number="sellAmount" placeholder="amount of tokens")
  button(@click="sell") Sell
o-button(variant="primary" rounded) test
</template>
