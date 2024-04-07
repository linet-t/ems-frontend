import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Section from './Section'; // Import the Section component
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Avatar,
  Snackbar,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const FeedbackEmployee = () => {
  const [feedbackData, setFeedbackData] = useState({
    feedback: ''
  });

  const [submissionError, setSubmissionError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false); // State to control the visibility of the feedback form

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const empId = sessionStorage.getItem('empId');
      const response = await axios.get(`http://localhost:8080/feedbacks/list/${empId}`); // Corrected backticks
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const captureValue = () => {
    if (!feedbackData.feedback) {
      setSubmissionError('Feedback is required');
      return;
    }
  
    setSubmitting(true);
  
    const dataToSend = {
      empId: sessionStorage.getItem('empId'),
      feedback: feedbackData.feedback
    };
  
    axios.post('http://localhost:8080/feedbacks/save', dataToSend)
      .then((res) => {
        console.log(res);
        setSnackbarMessage('Feedback sent successfully');
        setOpenSnackbar(true);
        setFeedbackData({ feedback: '' });
        setSubmitting(false);
        setSubmissionError('');
        // Fetch feedback after successful submission
        fetchFeedback();
        // Show the table and hide the form after submission
        setShowFeedbackForm(false);
      })
      .catch((error) => {
        console.error('Error sending feedback:', error);
        setSubmissionError('Failed to send feedback. Please try again.');
        setSubmitting(false);
      });
  };
  

  useEffect(() => {
    // Fetch feedback on component mount
    fetchFeedback();
  }, []);

  const snackbarLightStyle = {
    backgroundColor: '#4caf50', // Green color for success
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
  };

  const snackbarDarkStyle = {
    backgroundColor: '#333', // Dark background color
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.2)', 
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = feedbackList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid" style={{ marginTop: '70px' }}>
        <div className="row">
          <div className="col-12 col-md-3">
            {/* Keep the Section component fixed */}
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
                marginTop: '80px', // Move the marginTop here to ensure consistent spacing
                marginBottom: '20px',
              }}
            >
              <Container component="main" maxWidth="xs">
                <Box
                  sx={{
                    display: showFeedbackForm ? 'none' : 'block', // Show feedback table if form is not displayed
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setShowFeedbackForm(true)} // Show feedback form on button click
                      style={{ backgroundColor: '#1976d2' }}
                    >
                      Add Feedback
                    </Button>
                  </div>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Feedback</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentItems.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.feedback}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box
                  sx={{
                    display: showFeedbackForm ? 'block' : 'none', // Show feedback form if enabled
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Feedback
                  </Typography>
                  <form noValidate>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="feedback"
                      label="Feedback"
                      name="feedback"
                      autoFocus
                      multiline
                      rows={4}
                      value={feedbackData.feedback}
                      onChange={(e) => setFeedbackData({ feedback: e.target.value })}
                      error={submissionError !== ''}
                      helperText={submissionError}
                    />
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={submitting}
                      onClick={captureValue}
                      style={{ backgroundColor: '#1976d2', marginBottom: '10px' }}
                    >
                      {submitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </form>
                </Box>
                <Snackbar
                  open={openSnackbar}
                  autoHideDuration={6000}
                  onClose={handleSnackbarClose}
                  message={snackbarMessage}
                  ContentProps={{
                    style: snackbarLightStyle,
                  }}
                />
              </Container>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </Button>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      Page {currentPage} of {Math.ceil(feedbackList.length / itemsPerPage)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={currentPage === Math.ceil(feedbackList.length / itemsPerPage)}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeedbackEmployee;
