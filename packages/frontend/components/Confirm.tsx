import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Requirement } from "../types/Requirement"

export default function Confirm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Confirm your Airdrop Requirement
      </Typography>
      <h2>No.1</h2>
      <div>SnapshotDate: 2023-03-01T00:00:00Z</div>
      <div>Token Contract: 0xcE6E3a14B5F8cE2b05aF0F117Dc922769779aA3b</div>
      <div>Amount: 1</div>
      <div>Priority: 50</div>
    </React.Fragment>
  );
}
