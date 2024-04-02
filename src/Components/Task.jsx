import React, { useState } from 'react';
import axios from 'axios';
import Navbar1 from './Navbar1';
import Footer from './Footer';
import { Box, Button, TextField, Typography, Container, Grid, CssBaseline, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme();

const Task = () => {
  const [taskData, setTaskData] = useState({
    employeeId: '',
    taskName: '',
    taskCount: ''
  });

  const [errors, setErrors] = useState({
    employeeId: false,
    taskName: false,
    taskCount: false
  });

  const captureData = () => {
    // Check for empty fields
    if (!taskData.employeeId || !taskData.taskName || !taskData.taskCount) {
      setErrors({
        employeeId: !taskData.employeeId,
        taskName: !taskData.taskName,
        taskCount: !taskData.taskCount
      });
      return;
    }
  
    axios.post('http://localhost:8080/task/tasksave', taskData)
      .then((res) => {
        console.log(res);
        alert('Task sent successfully');
        // Clear the form after submission
        setTaskData({
          employeeId: '',
          taskName: '',
          taskCount: ''
        });
        // Reset errors
        setErrors({
          employeeId: false,
          taskName: false,
          taskCount: false
        });
      })
      .catch((error) => {
        console.error('Error sending task:', error);
        alert('Error sending task');
      });
  };
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar1 />
      <Box
        sx={{
          backgroundColor: 'rgb(224, 224, 224)', // Dark grey background color

          minHeight: '100vh', // Set minimum height to fill the screen
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              backgroundColor: 'white', // White background color for the form
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
              Task Handler
            </Typography>
            <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%', marginTop: '1rem' }}>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="employeeId"
                    label="Employee ID"
                    type="number"
                    fullWidth
                    value={taskData.employeeId}
                    onChange={(event) => setTaskData({ ...taskData, employeeId: event.target.value })}
                    error={errors.employeeId}
                    helperText={errors.employeeId ? "Employee ID is required" : ""}
                    sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="taskName"
                    label="Task Name"
                    fullWidth
                    value={taskData.taskName}
                    onChange={(event) => setTaskData({ ...taskData, taskName: event.target.value })}
                    error={errors.taskName}
                    helperText={errors.taskName ? "Task Name is required" : ""}
                    sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="taskCount"
                    label="Task Count"
                    type="number"
                    fullWidth
                    value={taskData.taskCount}
                    onChange={(event) => setTaskData({ ...taskData, taskCount: event.target.value })}
                    error={errors.taskCount}
                    helperText={errors.taskCount ? "Task Count is required" : ""}
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
                onClick={captureData}
                sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
              >
                Send
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default Task;
