export const getHolderByToken = (
  balances: Balances.TokenNft[],
  transfers: Transfers.TokenTransfer[]
) => {
  if (!transfers) {
    return { error: "error processing holders." }
  }

  try {
    transfers.forEach((t: any) => {
      if (balances[t.tokenId] != t.from.addresses[0]) {
        console.log(
          "owner rollback",
          balances[t.tokenId],
          " to ",
          t.from.addresses[0]
        )
        balances[t.tokenId] = t.from.addresses[0]
      }
    })
  } catch (e) {
    return e
  }

  return balances
}

export const getAllHolderByToken = (balances: Balances.TokenNft[]) => {
  const result = {} as any
  if (!balances) {
    throw new Error("no balances")
  }
  try {
    balances.forEach((t) => {
      result[t.tokenId] = null
      if (t.tokenBalances) {
        result[t.tokenId] = t.tokenBalances[0].owner.addresses[0]
      }
    })
  } catch (e) {
    return e
  }

  return result
}
