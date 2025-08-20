import type { StateInit } from "@ton/core"
import { Address, beginCell, storeStateInit, toNano } from "@ton/core"

import { JettonMinter, storeMint } from "../contracts/Jetton_JettonMinter"

import { buildOnchainMetadata } from "./metadata"

export async function deployJetton({
  ownerAddress,
  metadata,
}: {
  ownerAddress: string
  metadata: {
    name: string
    description: string
    image: string
  }
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
      forwardTonAmount: 0n,
      forwardPayload: beginCell().storeUint(0, 1).asSlice(),
    },
    receiver: adminAddress,
    tonAmount: toNano(1),
  }),
  ).endCell()

  const init = {
    code: jettonMinter.init?.code,
    data: jettonMinter.init?.data,
  } satisfies StateInit

  const stateInit = beginCell().store(storeStateInit(init)).endCell()

  return {
    address: jettonMinter.address.toString(),
    stateInit: stateInit.toBoc().toString("base64"),
    body: packedMsg.toBoc().toString("base64"),
  }
}
