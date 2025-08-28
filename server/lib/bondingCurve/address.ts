import { Address } from "@ton/core"

import { BondingCurve } from "#server/lib/contracts/BondingCurve_BondingCurve"

export async function getBondingCurveAddress(tokenAddress: string) {
  return (await BondingCurve.fromInit(0n, 0n, Address.parse(tokenAddress))).address
}
