import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import DownloadCSVButton from "@/components/DownloadCSVButton";

export default function Review() {
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
        <DownloadCSVButton
          contractAddress="0xcE6E3a14B5F8cE2b05aF0F117Dc922769779aA3b"
          snapshotDate="2023-03-01T00:00:00Z"
        />
      </Box>
    </React.Fragment>
  );
}
