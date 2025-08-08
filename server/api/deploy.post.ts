import { deployJetton } from "../lib/deploy"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { ownerAddress } = body

  const result = await deployJetton({
    ownerAddress,
  })

  return { success: true, ...result }
})
