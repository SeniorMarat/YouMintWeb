import type { StateInit } from "@ton/core"
import { Address, beginCell, storeStateInit, toNano } from "@ton/core"

import { JettonMinter, storeMint } from "#server/lib/contracts/Jetton_JettonMinter"

import type { JettonMetaData } from "./metadata"
import { buildOnchainMetadata } from "./metadata"

export async function deployJetton({
  ownerAddress,
  bondingCurveAddress,
  metadata,
}: {
  ownerAddress: string
  bondingCurveAddress: string
  metadata: JettonMetaData
}) {
  const adminAddress = Address.parse(ownerAddress)

  const content = buildOnchainMetadata(metadata)
  const jettonMinter = await JettonMinter.fromInit(0n, adminAddress, content, true)

  const supply = toNano(1000000000) // 1_000_000_000 jettons

  const packedMsg = beginCell().store(storeMint({
    $$type: "Mint",
    queryId: 0n,
    mintMessage: {
      $$type: "JettonTransferInternal",
      amount: supply,
      sender: adminAddress,
      responseDestination: adminAddress,
      queryId: 0n,
      forwardTonAmount: toNano("0.1"),
      forwardPayload: beginCell().storeBit(true).storeCoins(supply).asSlice(),
    },
    receiver: Address.parse(bondingCurveAddress),
    tonAmount: toNano("0.1"),
  }),
  ).endCell()

  const init = {
    code: jettonMinter.init?.code,
    data: jettonMinter.init?.data,
  } satisfies StateInit

  const stateInit = beginCell().store(storeStateInit(init)).endCell()

  return {
    address: jettonMinter.address.toString(),
    amount: toNano("0.2").toString(),
    payload: packedMsg.toBoc().toString("base64"),
    stateInit: stateInit.toBoc().toString("base64"),
  }
}
