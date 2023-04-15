namespace Balances {
  export interface Root {
    data: Data
    loading: boolean
    networkStatus: number
  }

  export interface Data {
    TokenNfts: TokenNfts
  }

  export interface TokenNfts {
    __typename: string
    pageInfo: PageInfo
    TokenNft: TokenNft[]
  }

  export interface PageInfo {
    __typename: string
    nextCursor: string
    prevCursor: string
  }

  export interface TokenNft {
    __typename: string
    address: string
    tokenId: string
    tokenBalances?: TokenBalance[]
  }

  export interface TokenBalance {
    __typename: string
    owner: Owner
  }

  export interface Owner {
    __typename: string
    addresses: string[]
  }
}

namespace Transfers {
  export interface Root {
    data: Data
    loading: boolean
    networkStatus: number
  }

  export interface Data {
    TokenTransfers: TokenTransfers
  }

  export interface TokenTransfers {
    __typename: string
    TokenTransfer: TokenTransfer[]
    pageInfo: PageInfo
  }

  export interface TokenTransfer {
    __typename: string
    blockNumber: number
    blockTimestamp: string
    from: From
    to: To
    tokenType: string
    tokenId: string
  }

  export interface From {
    __typename: string
    addresses: string[]
  }

  export interface To {
    __typename: string
    addresses: string[]
  }

  export interface PageInfo {
    __typename: string
    nextCursor: string
    prevCursor: string
  }
}
