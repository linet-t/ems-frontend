import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Section from './Section';
import {
  Box,
  Button,
  Typography,
  Container,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Snackbar,
  TextField
} from '@mui/material';

const LeaveEmployee = () => {
  const [leaveList, setLeaveList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveData, setLeaveData] = useState({
    leaveType: '',
    reason: '',
    startDate: '',
    endDate: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10); // Decreased items per page for demonstration
  const [minEndDate, setMinEndDate] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchLeaveData();
  }, [currentPage]);

  useEffect(() => {
    if (leaveList.length > 0) {
      const totalPagesCount = Math.ceil(leaveList.length / itemsPerPage);
      setTotalPages(totalPagesCount);
    }
  }, [leaveList, itemsPerPage]);

  const fetchLeaveData = async () => {
    try {
      setLoading(true);
      const empId = sessionStorage.getItem('empId');
      const response = await axios.get(`http://localhost:8080/leave/employee/${empId}`);
      setLeaveList(response.data);
    } catch (error) {
      console.error('Error fetching leave data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const dataToSend = {
        empId: sessionStorage.getItem('empId'),
        leaveType: leaveData.leaveType,
        reason: leaveData.reason,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate
      };

      const response = await axios.post('http://localhost:8080/leave/save', dataToSend);
      console.log(response);
      fetchLeaveData();
      setLeaveData({
        leaveType: '',
        reason: '',
        startDate: '',
        endDate: ''
      });
      setShowLeaveForm(false);
      showSnackbar('Leave application submitted successfully');
    } catch (error) {
      console.error('Error submitting leave application:', error);
      alert('Failed to submit leave application. Please try again.');
    }
  };

  const handleLeaveTypeChange = (event) => {
    setLeaveData({ ...leaveData, leaveType: event.target.value });
  };

  const handleReasonChange = (event) => {
    setLeaveData({ ...leaveData, reason: event.target.value });
  };

  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    setLeaveData({ ...leaveData, startDate });
    setMinEndDate(startDate);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveList.slice(indexOfFirstItem, indexOfLastItem);

  const handleEndDateChange = (event) => {
    const selectedEndDate = event.target.value;
    const selectedStartDate = leaveData.startDate;

    if (selectedStartDate && selectedEndDate < selectedStartDate) {
      setLeaveData({ ...leaveData, startDate: selectedEndDate, endDate: selectedEndDate });
    } else {
      setLeaveData({ ...leaveData, endDate: selectedEndDate });
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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
                marginTop: '80px',
                marginBottom: '20px'
              }}
            >
              <Container component="main" maxWidth="md">
                {showLeaveForm ? (
                  <div>
                    <Typography component="h1" variant="h6" fontWeight="bold" style={{ fontFamily: 'Arial', marginTop: '10px' }}>
                      Leave Application
                    </Typography>
                    <TextField
                      id="leaveType"
                      label="Leave Type"
                      fullWidth
                      required
                      value={leaveData.leaveType}
                      onChange={handleLeaveTypeChange}
                      variant="outlined"
                      margin="normal"
                    />
                    <TextField
                      id="reason"
                      label="Reason"
                      multiline
                      rows={4}
                      fullWidth
                      required
                      value={leaveData.reason}
                      onChange={handleReasonChange}
                      variant="outlined"
                      margin="normal"
                    />
                    <TextField
                      id="startDate"
                      label="Start Date"
                      type="date"
                      fullWidth
                      required
                      value={leaveData.startDate}
                      onChange={handleStartDateChange}
                      variant="outlined"
                      margin="normal"
                      inputProps={{ min: new Date().toISOString().split('T')[0] }}
                    />
                    <TextField
                      id="endDate"
                      label="End Date"
                      type="date"
                      fullWidth
                      required
                      value={leaveData.endDate}
                      onChange={handleEndDateChange}
                      variant="outlined"
                      margin="normal"
                      inputProps={{ min: new Date().toISOString().split('T')[0] }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      style={{ marginTop: '20px', marginRight: '10px' }}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setShowLeaveForm(false)}
                      style={{ marginTop: '20px' }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setShowLeaveForm(true)}
                        style={{ backgroundColor: '#1976d2' }}
                      >
                        Add Leave
                      </Button>
                    </div>
                    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
                      <Table aria-label="leave table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>No.</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Leave Type</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Reason</Typography>
                            </TableCell>
                            <TableCell><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Start Date</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>End Date</Typography></TableCell>
                            <TableCell><Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Approved</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow>
                              <TableCell colSpan={6}>Loading...</TableCell>
                            </TableRow>
                          ) : leaveList.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6}>No leave records found</TableCell>
                            </TableRow>
                          ) : (
                            leaveList.map((leave, index) => (
                              <TableRow key={index + 1}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{leave[1]}</TableCell>
                                <TableCell>{leave[2]}</TableCell>
                                <TableCell>{new Date(leave[3]).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(leave[4]).toLocaleDateString()}</TableCell>
                                <TableCell>{leave[5]}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                      <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outlined"
                        color="primary"
                        style={{ marginRight: '10px' }}
                      >
                        Previous
                      </Button>
                      <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentItems.length < itemsPerPage}
                        variant="outlined"
                        color="primary"
                      >
                        Next
                      </Button>
                    </Box>
                  </div>
                )}
              </Container>
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
};

export default LeaveEmployee;
