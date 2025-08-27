import * as v from "valibotx"

import { getBondingCurveAddress } from "../lib/bondingCurve"

const parseQuery = v.flatErrorsParser(
  v.object({
    tokenAddress: v.string(),
  }),
)

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

  if (tonReserveRes && tonReserveRes.stack && tokenReserveRes && tokenReserveRes.stack) {
    // TODO: fix types and remove this as ... as ...
    const tonReserve = BigInt(tonReserveRes.stack[0].value as unknown as string ?? "")
    const tokenReserve = BigInt(tokenReserveRes.stack[0].value as unknown as string ?? "")
    return {
      tonReserve: tonReserve.toString(),
      tokenReserve: tokenReserve.toString(),
    }
  }
  return { tonReserve: "0", tokenReserve: "0" }
})
