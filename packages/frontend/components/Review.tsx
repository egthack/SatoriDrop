import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DownloadCSVButton from "@/components/DownloadCSVButton";

type Props = {
  snapshotDate: Date | null;
  contractAddress: string;
};

export default function Review({ snapshotDate, contractAddress }: Props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Download Results
      </Typography>
      <div>You can download csv</div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {(snapshotDate && contractAddress )&&
          <DownloadCSVButton
            contractAddress={contractAddress}
            snapshotDate={snapshotDate?.toISOString()}
          />
        }
      </Box>
    </React.Fragment>
  );
}
