import { Address, beginCell, toNano } from "@ton/core"

import { BondingCurve, storeBuy } from "../contracts/BondingCurve_BondingCurve"

export async function buy({
  tokenAddress,
  amount,
  minTokensOut,
}: { tokenAddress: string, amount: number, minTokensOut: number }) {
  const bondingCurveAddress = (await BondingCurve.fromInit(0n, 0n, Address.parse(tokenAddress))).address

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
