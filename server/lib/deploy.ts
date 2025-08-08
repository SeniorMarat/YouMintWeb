import { Buffer } from "node:buffer"

import { Address, beginCell, Cell, contractAddress, storeStateInit } from "@ton/core"

import compiledMinter from "../contracts/jettonMinter.compiled.json"
import compiledWallet from "../contracts/JettonWallet.compiled.json"

function jettonContentToCell(content: { type: number, uri: string }) {
  return beginCell()
    .storeUint(content.type, 8)
    .storeStringTail(content.uri) // Snake logic under the hood
    .endCell()
}

export async function deployJetton({ ownerAddress }: {
  ownerAddress: string
}) {
  const adminAddress = Address.parse(ownerAddress)
  const code = Cell.fromBoc(Buffer.from(compiledMinter.hex, "hex"))[0]
  const walletCode = Cell.fromBoc(Buffer.from(compiledWallet.hex, "hex"))[0]
  const content = jettonContentToCell({ type: 1, uri: "https://testjetton.org/content.json" })
  const data = beginCell()
    .storeCoins(0)
    .storeAddress(adminAddress)
    .storeRef(content)
    .storeRef(walletCode)
    .endCell()

  const address = contractAddress(0, { code, data })
  const stateInitCell = beginCell().store(storeStateInit({ code, data })).endCell()
  const stateInit = stateInitCell.toBoc().toString("base64")

  return {
    address: address.toString({ testOnly: true }),
    stateInit,
  }
}
