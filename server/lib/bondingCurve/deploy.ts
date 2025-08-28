import type { StateInit } from "@ton/core"
import { Address, beginCell, storeStateInit, toNano } from "@ton/core"

import { BondingCurve } from "#server/lib/contracts/BondingCurve_BondingCurve"
import { JettonMinter } from "#server/lib/contracts/Jetton_JettonMinter"
import { deployJetton } from "#server/lib/jetton/deploy"
import { buildOnchainMetadata } from "#server/lib/jetton/metadata"

export async function deployBondingCurve({
  ownerAddress,
  metadata,
}: {
  ownerAddress: string
  metadata: {
    name: string
    description: string
    image: string
    decimals: string
    symbol: string
  }
}) {
  const adminAddress = Address.parse(ownerAddress)

  const content = buildOnchainMetadata(metadata)
  const jettonMinter = await JettonMinter.fromInit(0n, adminAddress, content, true)

  const bondingCurve = await BondingCurve.fromInit(0n, 0n, jettonMinter.address)

  const init = {
    code: bondingCurve.init?.code,
    data: bondingCurve.init?.data,
  } satisfies StateInit

  const stateInit = beginCell().store(storeStateInit(init)).endCell()

  const bondingCurveMessage = {
    address: bondingCurve.address.toString(),
    amount: toNano("0.1").toString(),
    payload: "",
    stateInit: stateInit.toBoc().toString("base64"),
  }

  const jettonMessage = await deployJetton({ ownerAddress, bondingCurveAddress: bondingCurve.address.toString(), metadata })

  return { messages: [
    jettonMessage,
    bondingCurveMessage,
  ], tokenAddress: jettonMinter.address.toString() }
}
