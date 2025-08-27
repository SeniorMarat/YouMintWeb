import * as v from "valibotx"

import { buy } from "../lib/bondingCurve"

const parseBody = v.flatErrorsParser(
  v.object({
    tokenAddress: v.string(),
    amount: v.number(),
    minTokensOut: v.number(),
  }),
)

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, parseBody)
  const { tokenAddress, amount, minTokensOut } = body

  const message = await buy({
    tokenAddress,
    amount,
    minTokensOut,
  })

  return { success: true, messages: [message] }
})
