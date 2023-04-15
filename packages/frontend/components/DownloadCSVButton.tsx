import * as React from 'react';
import Button from '@mui/material/Button';
import { parse } from 'json2csv';
import { Requirement } from "../types/Requirement"
import { useState } from 'react';

type Props = Pick<Requirement, "contractAddress" | "snapshotDate">

const DownloadCSVButton = (props: Props) => {
  const [message, setMessage] = useState("")  
  const API_URL = process.env["NEXT_PUBLIC_API_URL"] ?? 'http://localhost:3000/api';

  const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const downloadCSV = async (props: Props) => {
    const queryString = `?tokenAddress=${props.contractAddress}&blockTimestamp=${props.snapshotDate}`
    setMessage("File downloading...")
    try {
      // Send GET request to API endpoint with query string
      const apiPromise = fetch(API_URL + queryString).then(response => response.json());

      // Wait for either the API response or the timeout
      const result = await Promise.race([apiPromise, timeout(600000)]);

      if (result instanceof Error) {
        // Handle error
        console.error(result);
      } else if (result) {
        // Convert JSON data to CSV string
        const csvData = parse(result);

        // Create a temporary link and trigger a download
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
        link.download = 'data.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMessage("")
      };
    } catch(error: any) {    
      setMessage(error.toString())
    }  
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => downloadCSV(props)}>
        Download CSV
      </Button>
      <p style={{textAlign: 'center'}}>
        {message ? message : ""}
      </p>
    </div>
    
  );
};

export default DownloadCSVButton;
