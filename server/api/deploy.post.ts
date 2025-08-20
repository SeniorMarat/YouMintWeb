import { deployBondingCurve } from "../lib/bondingCurve/deploy"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { ownerAddress, metadata } = body

  const messages = await deployBondingCurve({
    ownerAddress,
    metadata,
  })

  return { success: true, messages }
})
