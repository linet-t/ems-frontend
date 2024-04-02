import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import Section from './Section'; // Import the Section component
import { Box, Button, TextField, Typography, Container, Grid, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const FeedbackEmployee = () => {
  const [feedbackData, setFeedbackData] = useState({
    employeeId: '',
    employeeName: '',
    department: '',
    feedback: ''
  });

  const [errors, setErrors] = useState({
    employeeId: false,
    employeeName: false,
    department: false,
    feedback: false
  });

  const captureValue = () => {
    // Check for empty fields
    if (!feedbackData.employeeId || !feedbackData.employeeName || !feedbackData.department || !feedbackData.feedback) {
      setErrors({
        employeeId: !feedbackData.employeeId,
        employeeName: !feedbackData.employeeName,
        department: !feedbackData.department,
        feedback: !feedbackData.feedback
      });
      return;
    }

    axios.post('http://localhost:8080/feedback/save', feedbackData)
      .then((res) => {
        console.log(res);
        alert(`Feedback sent successfully`);
        setFeedbackData({
          employeeId: '',
          employeeName: '',
          department: '',
          feedback: ''
        });
        // Reset errors
        setErrors({
          employeeId: false,
          employeeName: false,
          department: false,
          feedback: false
        });
      })
      .catch((error) => {
        console.error('Error sending feedback:', error);
        alert(`Failed to send feedback. Please try again.`);
      });
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
                    backgroundColor: 'white',
                    p: 3,
                    borderRadius: 8,
                    border: '2px solid #ccc',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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
                          id="employeeId"
                          label="Employee ID"
                          fullWidth
                          required
                          error={errors.employeeId}
                          value={feedbackData.employeeId}
                          onChange={(event) => setFeedbackData({ ...feedbackData, employeeId: event.target.value })}
                          helperText={errors.employeeId ? "Employee ID is required" : ""}
                          sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="employeeName"
                          label="Employee Name"
                          fullWidth
                          required
                          error={errors.employeeName}
                          value={feedbackData.employeeName}
                          onChange={(event) => setFeedbackData({ ...feedbackData, employeeName: event.target.value })}
                          helperText={errors.employeeName ? "Employee Name is required" : ""}
                          sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="department"
                          label="Department"
                          fullWidth
                          required
                          error={errors.department}
                          value={feedbackData.department}
                          onChange={(event) => setFeedbackData({ ...feedbackData, department: event.target.value })}
                          helperText={errors.department ? "Department is required" : ""}
                          sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="feedback"
                          label="Feedback"
                          multiline
                          rows={4}
                          fullWidth
                          required
                          error={errors.feedback}
                          value={feedbackData.feedback}
                          onChange={(event) => setFeedbackData({ ...feedbackData, feedback: event.target.value })}
                          helperText={errors.feedback ? "Feedback is required" : ""}
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
                      Submit Feedback
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
};

export default FeedbackEmployee;
