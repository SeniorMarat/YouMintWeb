import { addSeconds, isAfter, subDays } from "date-fns"
import * as v from "valibotx"

const parseQuery = v.flatErrorsParser(
  v.object({
    tokenAddress: v.string(),
  }),
)

export default defineEventHandler(async (event) => {
  const { tokenAddress: _ } = await getValidatedQuery(event, parseQuery)

  const timestamps: string[] = []
  for (let date = subDays(new Date(), 1); !isAfter(date, new Date()); date = addSeconds(date, 3600)) {
    timestamps.push(date.toISOString())
  }
  const values = timestamps.map(_ => getRandomNumber(6500))

  const data: [string, number][] = timestamps.map((t, i) => [t, values[i]])
  return data
})
