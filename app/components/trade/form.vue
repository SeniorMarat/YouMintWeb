<script setup lang="ts">
import { OButton, OField, OInput, OTabItem, OTabs } from "@oruga-ui/oruga-next"
import { useTonConnectUI, useTonWallet } from "@townsquarelabs/ui-vue"
import { useRouteQuery } from "@vueuse/router"

const address = useRouteQuery<string>("token_address")

const { tonConnectUI } = useTonConnectUI()
const wallet = useTonWallet()

const activeTab = ref("Buy")
const amount = ref()

async function buy() {
  const { messages } = await $fetch("/api/buy", {
    method: "POST",
    body: {
      tokenAddress: address.value,
      amount: Number(amount.value),
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
      amount: Number(amount.value),
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
.form
  o-field
    o-tabs(v-model="activeTab" type="pills" expanded @change="amount = null")
      o-tab-item(value="Buy" label="Buy")
      o-tab-item(value="Sell" label="Sell")
    o-input(v-model="amount" placeholder="amount" expanded rounded)
  o-button(expanded rounded :variant="activeTab === 'Buy' ? 'primary' : 'danger'" @click="activeTab === 'Buy' ? buy() : sell()") {{ activeTab }}
</template>
