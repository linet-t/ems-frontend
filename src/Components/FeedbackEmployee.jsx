import React, { useState, useEffect } from 'react';
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
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const empId = sessionStorage.getItem('empId');
      const response = await axios.get(`http://localhost:8080/feedbacks/list/${empId}`);
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedbackList([]);
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
        fetchFeedback();
        setShowFeedbackForm(false);
      })
      .catch((error) => {
        console.error('Error sending feedback:', error);
        setSubmissionError('Failed to send feedback. Please try again.');
        setSubmitting(false);
      });
  };
  

  useEffect(() => {
    fetchFeedback();
  }, []);

  const snackbarLightStyle = {
    backgroundColor: '#4caf50', // Green color for success
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle shadow
  };

  return (
    <div>
      <Navbar2 />
      <div className="container-fluid">
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
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              <Container component="main" maxWidth="xs">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowFeedbackForm(true)}
                  style={{ backgroundColor: '#1976d2', marginBottom: '10px' }}
                >
                  Add Feedback
                </Button>
                <br />
                <br />
                <Box
                  sx={{
                    backgroundColor: 'white',
                    p: 3,
                    borderRadius: 8,
                    border: '2px solid #ccc',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    display: showFeedbackForm ? 'block' : 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '20px', // Adjusted marginTop for the form
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: 'secondary.main', backgroundColor: 'red' }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h6" fontWeight="bold" style={{ fontFamily: 'Arial', marginTop: '10px' }}>
                    Feedback Form
                  </Typography>
                  <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%', marginTop: '1rem' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          id="feedback"
                          label="Feedback"
                          multiline
                          rows={4}
                          fullWidth
                          required
                          error={!!submissionError} 
                          helperText={submissionError}
                          value={feedbackData.feedback}
                          onChange={(event) => setFeedbackData({ ...feedbackData, feedback: event.target.value })}
                          sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      style={{ margin: '1rem 0', backgroundColor: 'black' }}
                      onClick={captureValue}
                    >
                      Submit
                    </Button>
                  </form>
                </Box>
                <TableContainer component={Paper}>
                  <Table aria-label="feedback table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>ID</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Feedback</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>Reply</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={3}>Loading...</TableCell>
                        </TableRow>
                      ) : feedbackList.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3}>No feedback found</TableCell>
                        </TableRow>
                      ) : (
                        feedbackList.map((feedback, index) => (
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{feedback.feedback}</TableCell>
                            <TableCell>{feedback.reply}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
            </Box>
          </div>
        </div>
      </div>
      <Footer />
      <Snackbar
        anchorOrigin={{
          vertical: 'top', // Set the Snackbar to top
          horizontal: 'center', // Center the Snackbar horizontally
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        ContentProps={{
          style: snackbarLightStyle,
        }}
      />
    </div>
  );
};

export default FeedbackEmployee;
