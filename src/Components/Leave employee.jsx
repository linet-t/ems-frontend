import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Section from './Section'; // Import the Section component
import { Box, Button, TextField, Typography, Container, Grid, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LeaveEmployee = () => {
  const [leaveData, setLeaveData] = useState({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [errors, setErrors] = useState({
    employeeId: false,
    leaveType: false,
    startDate: false,
    endDate: false,
    reason: false
  });

  const captureLeaveData = () => {
    // Check if all fields are filled
    if (!leaveData.employeeId || !leaveData.leaveType || !leaveData.startDate || !leaveData.endDate || !leaveData.reason) {
      setErrors({
        employeeId: !leaveData.employeeId,
        leaveType: !leaveData.leaveType,
        startDate: !leaveData.startDate,
        endDate: !leaveData.endDate,
        reason: !leaveData.reason
      });
      return;
    }

    axios.post('http://localhost:8080/leave/save', leaveData)
      .then((res) => {
        console.log(res);
        alert('Leave application submitted successfully');
        setLeaveData({
          employeeId: '',
          leaveType: '',
          startDate: '',
          endDate: '',
          reason: ''
        });
        setErrors({
          employeeId: false,
          leaveType: false,
          startDate: false,
          endDate: false,
          reason: false
        });
      })
      .catch((error) => {
        console.error('Error submitting leave application:', error);
        alert('Failed to submit leave application. Please try again.');
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid" style={{ marginTop: '70px' }}>
        <div className="row">
          <div className="col-12 col-md-3">
            <Section />
          </div>
          <div className="col-12 col-md-9">
            <Box
              sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    backgroundColor: 'white',
                    p: 3,
                    borderRadius: 8,
                    border: '2px solid #ccc',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '80px',
                    marginBottom: '20px',
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main', backgroundColor: 'red' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h6" fontWeight="bold" style={{ fontFamily: 'Arial', marginTop: '10px' }}>
                    Leave Application
                  </Typography>
                  <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%', marginTop: '1rem' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          id="employeeId"
                          label="Employee ID"
                          fullWidth
                          required
                          error={errors.employeeId}
                          value={leaveData.employeeId}
                          onChange={(event) => setLeaveData({ ...leaveData, employeeId: event.target.value })}
                          helperText={errors.employeeId ? "Employee ID is required" : ""}
                          sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="leaveType"
                          label="Leave Type"
                          fullWidth
                          required
                          error={errors.leaveType}
                          value={leaveData.leaveType}
                          onChange={(event) => setLeaveData({ ...leaveData, leaveType: event.target.value })}
                          helperText={errors.leaveType ? "Leave type is required" : ""}
                          sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="startDate"
                          label="Start Date"
                          type="date"
                          fullWidth
                          required
                          error={errors.startDate}
                          value={leaveData.startDate}
                          onChange={(event) => setLeaveData({ ...leaveData, startDate: event.target.value })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText={errors.startDate ? "Start date is required" : ""}
                          sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="endDate"
                          label="End Date"
                          type="date"
                          fullWidth
                          required
                          error={errors.endDate}
                          value={leaveData.endDate}
                          onChange={(event) => setLeaveData({ ...leaveData, endDate: event.target.value })}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          helperText={errors.endDate ? "End date is required" : ""}
                          sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="reason"
                          label="Reason"
                          fullWidth
                          required
                          error={errors.reason}
                          value={leaveData.reason}
                          onChange={(event) => setLeaveData({ ...leaveData, reason: event.target.value })}
                          helperText={errors.reason ? "Reason is required" : ""}
                          sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ margin: '1rem 0', backgroundColor: 'black' }}
                      onClick={captureLeaveData}
                    >
                      Apply
                    </Button>
                  </form>
                </Box>
              </Container>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LeaveEmployee;
