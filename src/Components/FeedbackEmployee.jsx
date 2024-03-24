import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Footer from './Footer';
const FeedbackEmployee = () => {
  const [feedbackData, setFeedbackData] = useState({
    employeeId: '',
    employeeName: '',
    department: '',
    feedback: ''
  });

  const captureValue = () => {
    console.log(feedbackData);
    axios.post('http://localhost:8080/feedback/save', feedbackData)
      .then((res) => {
        console.log(res);
        alert(`Feedback sent successfully`);
      })
      .catch((error) => {
        console.error('Error sending feedback:', error);
        alert(`Failed to send feedback. Please try again.`);
      });
  };

  return (
    <div>
      <Navbar2 />
      <br />
      <div className="container">
        <div className="card-container">
          <div className="card">
            <br />
            <h2 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', textAlign: 'center' }}>FEEDBACK FORM</h2>

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
                    required
                    id="employeeId"
                    label="Employee ID"
                    value={feedbackData.employeeId}
                    onChange={(event) => setFeedbackData({ ...feedbackData, employeeId: event.target.value })}
                  />
                </div>
                <div>
                  <TextField
                    required
                    id="employeeName"
                    label="Employee Name"
                    value={feedbackData.employeeName}
                    onChange={(event) => setFeedbackData({ ...feedbackData, employeeName: event.target.value })}
                  />
                </div>
                <div>
                  <TextField
                    required
                    id="department"
                    label="Department"
                    value={feedbackData.department}
                    onChange={(event) => setFeedbackData({ ...feedbackData, department: event.target.value })}
                  />
                </div>
                <div>
                  <TextField
                    id="feedback"
                    label="Feedback"
                    multiline
                    rows={4}
                    value={feedbackData.feedback}
                    onChange={(event) => setFeedbackData({ ...feedbackData, feedback: event.target.value })}
                  />
                </div>
                <div>
                  <Button variant="contained" onClick={captureValue} style={{ color: 'white', backgroundColor: 'black' }}>Submit Feedback</Button>
                </div>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FeedbackEmployee;
