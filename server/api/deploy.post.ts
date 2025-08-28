import * as v from "valibotx"

import { deployBondingCurve } from "#server/lib/bondingCurve"

const parseBody = v.flatErrorsParser(
  v.object({
    ownerAddress: v.string(),
    metadata: v.object({
      name: v.string(),
      description: v.string(),
      image: v.string(),
      decimals: v.string(),
      symbol: v.string(),
    }),
  }),
)

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, parseBody)
  const { ownerAddress, metadata } = body

  const { messages, tokenAddress } = await deployBondingCurve({
    ownerAddress,
    metadata,
  })

  return { success: true, messages, tokenAddress }
})
