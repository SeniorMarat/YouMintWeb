import * as v from "valibotx"

import { sell } from "#server/lib/bondingCurve"

const parseBody = v.flatErrorsParser(
  v.object({
    userAddress: v.string(),
    tokenAddress: v.string(),
    amount: v.number(),
    minTonOut: v.number(),
  }),
)

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, parseBody)
  const { userAddress, tokenAddress, amount, minTonOut } = body

  const message = await sell({
    userAddress,
    tokenAddress,
    amount,
    minTonOut,
  })

  return { success: true, messages: [message] }
})
