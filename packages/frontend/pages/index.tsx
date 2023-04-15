import React, { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RequirementsForm from '../components/RequirementsForm';
import Confirm from '../components/Confirm';
import Review from '../components/Review';
import { Requirement } from "../types/Requirement"
import DownloadCSVButton from "@/components/DownloadCSVButton";

const steps = ['Airdrop Requirements', 'Calculating Importance', 'Download Results'];

function getStepContent(step: number, setSnapshotDate: React.Dispatch<React.SetStateAction<null>>, setContractAddress: React.Dispatch<React.SetStateAction<string>>) {
  switch (step) {
    case 0:
      return <RequirementsForm setSnapshotDate={setSnapshotDate} setContractAddress={setContractAddress} />;
    case 1:
      return <Confirm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [snapshotDate, setSnapshotDate] = useState(null);
  const [contractAddress, setContractAddress] = useState("");

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const fetchData = async() =>{
    console.log("hi")
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Satori Drop
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, setSnapshotDate, setContractAddress)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'complete' : 'Next'}
                </Button>

                <>
                  {/* <DownloadCSVButton
                  contractAddress="0xcE6E3a14B5F8cE2b05aF0F117Dc922769779aA3b"
                  snapshotDate="2023-03-01T00:00:00Z"
                  /> */}
                  {/* {(snapshotDate && contractAddress) && <DownloadCSVButton
                    contractAddress={contractAddress}
                    snapshotDate={snapshotDate}
                  />} */}
                </>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
