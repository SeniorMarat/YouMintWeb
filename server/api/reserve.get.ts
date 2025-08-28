import * as v from "valibotx"

import { getBondingCurveAddress } from "#server/lib/bondingCurve"
import type { TokenData } from "#server/utils"

const parseQuery = v.flatErrorsParser(
  v.object({
    tokenAddress: v.string(),
  }),
)

function formatPrice(tonReserveStr: string, tokenReserveStr: string): number {
  const tonReserve = BigInt(tonReserveStr)
  const tokenReserve = BigInt(tokenReserveStr)
  if (tokenReserve === 0n) {
    return 0
  }
  return Number(tonReserve) / Number(tokenReserve)
}

export default defineEventHandler(async (event) => {
  const { $api } = useNitroApp()
  const query = await getValidatedQuery(event, parseQuery)
  const { tokenAddress } = query

  const bondingCurveAddress = await getBondingCurveAddress(tokenAddress)

  const tonReserveRes = await $api("/api/v3/runGetMethod", {
    method: "POST",
    body: {
      address: bondingCurveAddress.toString(),
      method: "get_ton_reserve",
    },
  })

  await new Promise(resolve => setTimeout(resolve, 1500))

  const tokenReserveRes = await $api("/api/v3/runGetMethod", {
    method: "POST",
    body: {
      address: bondingCurveAddress.toString(),
      method: "get_token_reserve",
    },
  })

  // jetton info (название, символ и т.п.)
  const jettonData = await $api("/api/v3/jetton/wallets", {
    query: { jetton_address: [tokenAddress] },
  })

  const name
    = Object.values(jettonData.metadata!)
      .flatMap((m: any) => m.token_info || [])
      .find((t: any) => t.type === "jetton_masters")?.name ?? "Unknown"

  if (tonReserveRes?.stack && tokenReserveRes?.stack) {
    const tonReserve = BigInt(tonReserveRes.stack[0].value as unknown as string ?? "0")
    const tokenReserve = BigInt(tokenReserveRes.stack[0].value as unknown as string ?? "0")

    return {
      tonReserve: tonReserve.toString(),
      tokenReserve: tokenReserve.toString(),
      priceTon: formatPrice(tonReserve.toString(), tokenReserve.toString()),
      name: name as string,
    } as TokenData
  }

  return { tonReserve: "0", tokenReserve: "0", priceTon: 0, name: name as string } as TokenData
})
