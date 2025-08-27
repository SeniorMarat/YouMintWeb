import { Address, beginCell, toNano } from "@ton/core"

import { storeJettonTransfer } from "../contracts/BondingCurve_BondingCurve"
import { JettonWallet } from "../contracts/Jetton_JettonWallet"

import { getBondingCurveAddress } from "./address"

export async function sell({
  userAddress,
  tokenAddress,
  amount,
  minTonOut,
}: { userAddress: string, tokenAddress: string, amount: number, minTonOut: number }) {
  const jettonWalletAddress = (await JettonWallet.fromInit(0n, Address.parse(userAddress), Address.parse(tokenAddress))).address
  const bondingCurveAddress = await getBondingCurveAddress(tokenAddress)

  const forwardPayload = beginCell().storeBit(false).storeCoins(BigInt(minTonOut)).asSlice()

  const payload = beginCell().store(storeJettonTransfer({
    $$type: "JettonTransfer",
    queryId: 0n,
    amount: toNano(amount),
    destination: bondingCurveAddress,
    responseDestination: Address.parse(userAddress),
    customPayload: null,
    forwardTonAmount: toNano("0.1"),
    forwardPayload,
  })).endCell()

  const sellMessage = {
    address: jettonWalletAddress.toString(),
    amount: toNano("0.5").toString(),
    payload: payload.toBoc().toString("base64"),
  }
  return sellMessage
}
