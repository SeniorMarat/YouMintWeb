import { deployJetton } from "../lib/deploy"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { ownerAddress, metadata } = body

  const result = await deployJetton({
    ownerAddress,
    metadata,
  })

  return { success: true, ...result }
})
