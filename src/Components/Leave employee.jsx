import React, { useState } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import Section from './Section';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Avatar,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LeaveEmployee = () => {
  const [leaveData, setLeaveData] = useState({
    empId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [errors, setErrors] = useState({
    empId: false,
    leaveType: false,
    startDate: false,
    endDate: false,
    reason: false
  });

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const captureLeaveData = () => {
    setLoading(true);

    if (!leaveData.empId || !leaveData.leaveType || !leaveData.startDate || !leaveData.endDate || !leaveData.reason) {
      setErrors({
        empId: !leaveData.empId,
        leaveType: !leaveData.leaveType,
        startDate: !leaveData.startDate,
        endDate: !leaveData.endDate,
        reason: !leaveData.reason
      });
      setLoading(false);
      return;
    }

    axios.post('http://localhost:8080/leave/save', leaveData)
      .then((res) => {
        console.log(res);
        setSnackbarMessage('Leave application submitted successfully');
        setOpenSnackbar(true);
        setLeaveData({
          empId: '',
          leaveType: '',
          startDate: '',
          endDate: '',
          reason: ''
        });
        setErrors({
          empId: false,
          leaveType: false,
          startDate: false,
          endDate: false,
          reason: false
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error submitting leave application:', error);
        setSnackbarMessage('Failed to submit leave application. Please try again.');
        setOpenSnackbar(true);
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar2 />
      <div className="container-fluid" style={{ marginTop: '70px' }}>
        <div className="row">
          <div className="col-12 col-md-3">
            <Section />
          </div>
          <div className="col-12 col-md-9">
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
                marginTop: '20px', // Adjusted marginTop
                marginBottom: '20px',
                width: '40%', // Adjusted width
                margin: 'auto' // Center the box horizontally
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main', backgroundColor: 'red' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h6" fontWeight="bold" style={{ fontFamily: 'Arial', marginTop: '10px' }}>
                Leave Application
              </Typography>
              <form style={{ width: '100%', marginTop: '1rem', }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="employeeId"
                      label="Employee ID"
                      fullWidth
                      required
                      error={errors.empId}
                      value={leaveData.empId}
                      onChange={(event) => setLeaveData({ ...leaveData, empId: event.target.value })}
                      helperText={errors.empId ? "Employee ID is required" : ""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth required error={errors.leaveType}>
                      <InputLabel id="leaveType-label">Leave Type</InputLabel>
                      <Select
                        labelId="leaveType-label"
                        id="leaveType"
                        value={leaveData.leaveType}
                        onChange={(event) => setLeaveData({ ...leaveData, leaveType: event.target.value })}
                        label="Leave Type"
                      >
                        <MenuItem value="">Select Leave Type</MenuItem>
                        <MenuItem value="PL">Privilege Leave (PL)</MenuItem>
                        <MenuItem value="EL">Earned Leave (EL)</MenuItem>
                        <MenuItem value="CL">Casual Leave (CL)</MenuItem>
                        <MenuItem value="SL">Sick Leave (SL)</MenuItem>
                        <MenuItem value="ML">Maternity Leave (ML)</MenuItem>
                        <MenuItem value="Comp-off">Compensatory Off (Comp-off)</MenuItem>
                        <MenuItem value="Marriage Leave">Marriage Leave</MenuItem>
                        <MenuItem value="Paternity Leave">Paternity Leave</MenuItem>
                        <MenuItem value="Bereavement Leave">Bereavement Leave</MenuItem>
                        <MenuItem value="LOP">Loss of Pay (LOP) / Leave Without Pay (LWP)</MenuItem>
                      </Select>
                      {errors.leaveType && <Typography variant="caption" color="error">Leave type is required</Typography>}
                    </FormControl>
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
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Apply'}
                </Button>
              </form>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
}

export default LeaveEmployee;
