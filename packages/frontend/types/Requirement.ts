export type Requirement = {
  tokenType: "ERC20" | "ERC721"
  contractAddress: string
  snapshotDate: string
  tokenAmount: number
  priority: number
}
