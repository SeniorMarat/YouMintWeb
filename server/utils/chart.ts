import type { ElementOf } from "rambda"

export type BreakdownData = [label: string, value: number][]
export type ChartData = [timestamp: string, value: number][]

export const dashboardIntervals = ["hour", "day", "week", "month"] as const
export type DashboardInterval = ElementOf<typeof dashboardIntervals>

export const getRandomNumber = (range: number, decimals: number = 0) => Math.ceil(Math.random() * range * 10 ** decimals) / 10 ** decimals
