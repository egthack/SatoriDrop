import express, { Request, Response } from "express"
import fetch from "cross-fetch"
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { getAllHolderByToken, getHolderByToken } from "./utils/holder"
import { getTokenBalance, getTokenTransferHistory } from "./utils/queries"

const app = express()
const PORT = process.env["PORT"] ?? 3000
const API_URL = "https://api.airstack.xyz/gql"
const token = process.env["AIR_STACK_KEY"]
if (!token) {
  throw new Error("no AIR_STACK_KEY !!!")
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: API_URL, fetch }),
  headers: {
    authorization: `Bearer ${token}`,
  },
})

app.get("/api", async (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  try {
    const tokenAddress = req.query.tokenAddress as string
    const blockTimestamp = req.query.blockTimestamp as string
    if (!tokenAddress || !blockTimestamp) {
      throw new Error(
        "tokenAddress or blockTimestamp was not found on request."
      )
    }
    const balances = (await tokenBalance(tokenAddress)) as Balances.TokenNft[]
    const allBalances = getAllHolderByToken(balances) as Balances.TokenNft[]
    const transfers = (await tokenTransfers(
      tokenAddress,
      blockTimestamp
    )) as Transfers.TokenTransfer[]
    const result = getHolderByToken(allBalances, transfers)
    res.status(200).json(result)
  } catch (err: any) {
    res.status(500).json({ error: err.toString() })
  }
})

const tokenBalance = async (
  tokenAddress: string
): Promise<Balances.TokenNft[] | unknown> => {
  let hasNext = true
  let result = []
  let prevCursor = ""
  let count = 0
  // allows 10000 holders.
  const MAX_BALANCE_COUNT = 200

  try {
    while (hasNext && count < MAX_BALANCE_COUNT) {
      const balances: Balances.Root = await client.query({
        query: getTokenBalance,
        variables: {
          tokenAddress,
          cursor: prevCursor,
        },
      })

      result.push(...balances.data.TokenNfts.TokenNft)
      prevCursor = balances.data.TokenNfts.pageInfo.nextCursor

      if (!balances.data.TokenNfts.pageInfo.nextCursor) {
        hasNext = false
      }

      count++
      console.log(count)

      await delay(300)
    }
    return result
  } catch (err: any) {
    hasNext = false
    throw new Error(err.toString())
  }
}

const tokenTransfers = async (
  tokenAddress: string,
  blockTimestamp: string
): Promise<Transfers.TokenTransfer[] | unknown> => {
  let hasNext = true
  let result = []
  let prevCursor = ""
  let count = 0
  // allows 15000 transfers.
  const MAX_TRANSFER_COUNT = 300
  try {
    while (hasNext && count < MAX_TRANSFER_COUNT) {
      const transfers: Transfers.Root = await client.query({
        query: getTokenTransferHistory,
        variables: {
          tokenAddress,
          cursor: prevCursor,
          blockTimestamp,
        },
      })
      if (!transfers.data.TokenTransfers.TokenTransfer) {
        throw new Error("transfers fetch failed")
      }
      result.push(...transfers.data.TokenTransfers.TokenTransfer)
      prevCursor = transfers.data.TokenTransfers.pageInfo.nextCursor

      if (!transfers.data.TokenTransfers.pageInfo.nextCursor) {
        hasNext = false
      }

      count++
      console.log(count)
      await delay(300)
    }
    return result
  } catch (err: any) {
    hasNext = false
    throw new Error(err.toString())
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const server = app.listen(PORT)
