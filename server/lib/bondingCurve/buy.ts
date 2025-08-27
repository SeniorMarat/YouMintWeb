import { beginCell, toNano } from "@ton/core"

import { storeBuy } from "../contracts/BondingCurve_BondingCurve"

import { getBondingCurveAddress } from "./address"

export async function buy({
  tokenAddress,
  amount,
  minTokensOut,
}: { tokenAddress: string, amount: number, minTokensOut: number }) {
  const bondingCurveAddress = await getBondingCurveAddress(tokenAddress)
  const payload = beginCell().store(storeBuy({
    $$type: "Buy",
    minTokensOut: BigInt(minTokensOut),
  })).endCell()

  const buyMessage = {
    address: bondingCurveAddress.toString(),
    amount: toNano(amount).toString(),
    payload: payload.toBoc().toString("base64"),
  }

  return buyMessage
}
