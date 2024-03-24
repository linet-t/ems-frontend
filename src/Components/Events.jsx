import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Footer from './Footer';
const Events = () => {
  const [eventData, setEventData] = useState({
    admin_name: '',
    event_description: '',
    date_event: '',
    event_location: '',
    event_name: ''
  });

  const captureValue = () => {
    console.log(eventData);
    axios.post('http://localhost:8080/Event/eventsave', eventData)
      .then((res) => {
        console.log(res);
        alert(`Task sent successfully`);
      })
      .catch((error) => {
        console.error('Error sending task:', error);
        alert(`Failed to send task. Please try again.`);
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
            <h2 style={{ fontFamily: 'Times New Roman', fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}>EVENTS TABLE</h2>
            <div className="card-body">
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '35ch' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  alignItems: 'center'
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required
                    id="outlined"
                    label="Admin name"
                    type="name"
                    value={eventData.admin_name}
                    onChange={(event) => setEventData({ ...eventData, admin_name: event.target.value })}
                    sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                  />
                </div>
                <div>
                  <TextField
                    required
                    id="outlined"
                    label="Event name"
                    type="Name"
                    value={eventData.event_name}
                    onChange={(event) => setEventData({ ...eventData, event_name: event.target.value })}
                    sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                  />
                </div>
                <div>
                  <TextField
                    id="outlinedinput"
                    label="Event description"
                    type="text"
                    value={eventData.event_description}
                    onChange={(event) => setEventData({ ...eventData, event_description: event.target.value })}
                    sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-text"
                    label="Date"
                    type="date"
                    value={eventData.date_event}
                    onChange={(event) => setEventData({ ...eventData, date_event: event.target.value })}
                    sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-text"
                    label="Event location"
                    type="text"
                    value={eventData.event_location}
                    onChange={(event) => setEventData({ ...eventData, event_location: event.target.value })}
                    sx={{ '& label.Mui-focused': { color: 'black' }, '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: 'black' } } }}
                  />
                </div>
                <div>
                  <Button variant="contained" onClick={captureValue} style={{ color: 'white', backgroundColor: 'black' }}>Submit</Button>
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

export default Events;
