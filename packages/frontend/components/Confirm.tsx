import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Requirement } from "../types/Requirement"

type Props = {
  snapshotDate: Date | null;
  contractAddress: string;
};

export default function Confirm({ snapshotDate, contractAddress }: Props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Confirm your Airdrop Requirement
      </Typography>
      <h2>No.1</h2>
      <div>SnapshotDate: {snapshotDate!.toString()}</div>
      <div>Token Contract: {contractAddress}</div>
      <div>Amount: 1</div>
      <div>Priority: 50</div>
    </React.Fragment>
  );
}
