import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Requirement } from "../types/Requirement"

type Props = {
  tokenType: "ERC20" | "ERC721";
  snapshotDate: Date | null;
  contractAddress: string;
  tokenAmount: number
};

export default function Confirm({ tokenType, snapshotDate, contractAddress, tokenAmount }: Props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Confirm your Airdrop Requirement
      </Typography>
      <h2>No.1</h2>
      <div>Token Type: {tokenType}</div>
      <div>SnapshotDate: {snapshotDate!.toString()}</div>
      <div>Token Contract: {contractAddress}</div>
      <div>Amount: {tokenAmount}</div>
      <div>Priority: 50</div>
    </React.Fragment>
  );
}
