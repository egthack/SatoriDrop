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

const steps = ['Airdrop Requirements', 'Calculating Importance', 'Download Results'];

function getStepContent(step: number, tokenType: "ERC20" | "ERC721", snapshotDate: Date | null, contractAddress: string, tokenAmount: number,priority: number, setTokenType:React.Dispatch<React.SetStateAction<"ERC20" | "ERC721">>,  setSnapshotDate: React.Dispatch<React.SetStateAction<Date | null>>, setContractAddress: React.Dispatch<React.SetStateAction<string>>, setTokenAmount:React.Dispatch<React.SetStateAction<number>>, setPriority:React.Dispatch<React.SetStateAction<number>>) {
  switch (step) {
    case 0:
      return <RequirementsForm setTokenType={setTokenType} setSnapshotDate={setSnapshotDate} setContractAddress={setContractAddress} setTokenAmount={setTokenAmount} setPriority={setPriority} />;
    case 1:
      return <Confirm tokenType={tokenType} snapshotDate={snapshotDate} contractAddress={contractAddress} tokenAmount={tokenAmount} priority={priority} />;
    case 2:
      return <Review snapshotDate={snapshotDate} contractAddress={contractAddress} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [tokenType, setTokenType] = useState<"ERC20" | "ERC721">("ERC721");
  const [snapshotDate, setSnapshotDate] = useState<Date | null>(new Date);
  const [contractAddress, setContractAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [priority, setPriority] = useState<number>(50);

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
              {getStepContent(activeStep, tokenType, snapshotDate, contractAddress, tokenAmount, priority, setTokenType, setSnapshotDate, setContractAddress, setTokenAmount, setPriority)}
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
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
