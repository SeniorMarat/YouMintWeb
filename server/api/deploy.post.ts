import * as v from "valibotx"

import { deployBondingCurve } from "../lib/bondingCurve/deploy"

const parseBody = v.flatErrorsParser(
  v.object({
    ownerAddress: v.string(),
    metadata: v.object({
      name: v.string(),
      description: v.string(),
      image: v.string(),
    }),
  }),
)

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, parseBody)
  const { ownerAddress, metadata } = body

  const messages = await deployBondingCurve({
    ownerAddress,
    metadata,
  })

  return { success: true, messages }
})
