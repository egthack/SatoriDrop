import { gql } from "@apollo/client"
export const getTokenBalance = gql`
  query GetTokenBalance($tokenAddress: Address!, $cursor: String) {
    TokenNfts(
      input: {
        filter: { address: { _eq: $tokenAddress } }
        blockchain: ethereum
        limit: 50
        cursor: $cursor
      }
    ) {
      pageInfo {
        nextCursor
        prevCursor
      }
      TokenNft {
        address
        tokenId
        tokenBalances {
          owner {
            addresses
          }
        }
      }
    }
  }
`

export const getTokenTransferHistory = gql`
  query GetTransfers(
    $tokenAddress: Address!
    $cursor: String
    $blockTimestamp: Time!
  ) {
    TokenTransfers(
      input: {
        filter: {
          tokenAddress: { _eq: $tokenAddress }
          blockTimestamp: { _gte: $blockTimestamp }
        }
        cursor: $cursor
        blockchain: ethereum
        limit: 50
        order: { blockTimestamp: DESC }
      }
    ) {
      TokenTransfer {
        blockNumber
        blockTimestamp
        from {
          addresses
        }
        to {
          addresses
        }
        tokenType
        tokenId
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }
`
