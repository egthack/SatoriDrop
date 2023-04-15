import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Requirement } from "../types/Requirement"

export default function RequirementsForm() {
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const [tokenType, setTokenType] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [snapshotDate, setSnapshotDate] = useState(null);
  const [priority, setPriority] = useState(50);

  const handleTokenType = (event: any) => {
    setTokenType(event.target.value);
  }
  
  const handleAdd = () => {
    const id = elements.length;
    const newElement = (
      <div key={id} style={{ display: "flex", alignItems: "center" }}>
        <Box marginBottom={2}>
          <Card>
            <CardContent>
              No.{id+1}
              <Box marginY={2}>
                <div>Token Type</div>
                <FormControl>
                  <RadioGroup
                    row
                    onChange={handleTokenType}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="ERC20" control={<Radio />} label="ERC20" />
                    <FormControlLabel value="ERC721" control={<Radio />} label="ERC721" />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box marginBottom={2}>
                <TextField
                  label="Contract Address"
                  fullWidth
                  required
                />
              </Box>
              <Grid container spacing={3}>
                <Grid item >
                  <Box marginBottom={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Select a snapshot date"
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
                <Grid item >
                  <Box>
                    <TextField
                      label="Token Amount"
                      type="number"
                      fullWidth
                      required
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box marginBottom={2}>
                <div>Requirement Priority</div>
                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="on" />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <button onClick={() => handleRemove(id)} style={{ marginLeft: "1rem" }}>
          🗑️
        </button>
      </div>
    );
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const handleRemove = (id: number) => {
    setElements((prevElements) => prevElements.filter((_, index) => index !== id));
    // 指定した要素も削除する処理を入れる
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        You can define Airdrop Requirements
      </Typography>
      <Grid container spacing={3} direction="column" alignItems="center" justifyContent="center">
        <Grid item >
          <div>{elements}</div>
          <button onClick={handleAdd}> Add element</button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
