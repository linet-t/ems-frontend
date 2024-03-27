import React, { useState } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import { Box, Button, TextField } from '@mui/material';

const LeaveEmployee = () => {
  const [leaveData, setLeaveData] = useState({
    leaveType: '',
    reason: '',
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState({
    leaveType: false,
    reason: false,
    startDate: false,
    endDate: false
  });

  const captureValue = () => {
    if (!leaveData.leaveType || !leaveData.reason || !leaveData.startDate || !leaveData.endDate) {
      setErrors({
        leaveType: !leaveData.leaveType,
        reason: !leaveData.reason,
        startDate: !leaveData.startDate,
        endDate: !leaveData.endDate
      });
      return;
    }
  
    console.log(leaveData);
    axios.post('http://localhost:8080/leave/save', leaveData)
      .then((res) => {
        console.log(res);
        alert("Leave application submitted successfully"); // Fixed the alert message
      })
      .catch((error) => {
        console.error('Error submitting leave application:', error);
        alert("Failed to submit leave application. Please try again."); // Fixed the alert message
      });
  };
  
  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    const endDate = leaveData.endDate;

    if (new Date(startDate) < new Date()) {
      setErrors({ ...errors, startDate: true });
    } else {
      setErrors({ ...errors, startDate: false });
    }

    if (endDate && new Date(startDate) >= new Date(endDate)) {
      setErrors({ ...errors, endDate: true });
    } else {
      setErrors({ ...errors, endDate: false });
    }

    setLeaveData({ ...leaveData, startDate });
  };

  const handleEndDateChange = (event) => {
    const endDate = event.target.value;
    const startDate = leaveData.startDate;

    if (new Date(endDate) <= new Date(startDate)) {
      setErrors({ ...errors, endDate: true });
    } else {
      setErrors({ ...errors, endDate: false });
    }

    setLeaveData({ ...leaveData, endDate });
  };

  return (
    <div>
      <Navbar2 />
      <br />
      <div className="container">
        <div className="card-container">
          <div className="card">
            <br />
            <h2 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', textAlign: 'center' }}>LEAVE APPLICATION FORM</h2>

            <div className="card-body">
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '35ch' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  alignItems: 'center', // Centering the form
                  border: 'none' // Remove default border
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="leaveType"
                    label="Leave Type"
                    multiline
                    rows={1}
                    value={leaveData.leaveType}
                    onChange={(event) => setLeaveData({ ...leaveData, leaveType: event.target.value })}
                    error={errors.leaveType}
                    helperText={errors.leaveType ? "Leave type is required" : ""}
                  />
                </div>
                <div>
                  <TextField
                    id="reason"
                    label="Reason"
                    multiline
                    rows={3}
                    value={leaveData.reason}
                    onChange={(event) => setLeaveData({ ...leaveData, reason: event.target.value })}
                    error={errors.reason}
                    helperText={errors.reason ? "Reason is required" : ""}
                  />
                </div>
                <div>
                  <TextField
                    id="startDate"
                    label="Start Date"
                    type="date"
                    value={leaveData.startDate}
                    onChange={handleStartDateChange}
                    error={errors.startDate}
                    helperText={errors.startDate ? "Start date is required and cannot be in the past" : ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    id="endDate"
                    label="End Date"
                    type="date"
                    value={leaveData.endDate}
                    onChange={handleEndDateChange}
                    error={errors.endDate}
                    helperText={errors.endDate ? "End date must be greater than start date" : ""}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <Button variant="contained" onClick={captureValue} style={{ color: 'white', backgroundColor: 'black' }}>Submit Leave Application</Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LeaveEmployee;