import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, Typography } from '@mui/material';
import Navbar2 from './Navbar2';
import Footer from './Footer';
const Eventemployee = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/Event/eventlist')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div>
        <Navbar2/>
      <h1>Data from Database</h1>
      {data.map((item, index) => (
        <Card key={index} variant="outlined" style={{ margin: '1rem' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Event ID: {item.event_id}
            </Typography>
            <Typography variant="body1" component="div">
              Event Name: {item.event_name}
            </Typography>
            <Typography variant="body1" component="div">
              Event Logo: {item.logo}
            </Typography>
            <Typography variant="body1" component="div">
              Admin Name: {item.admin_name}
            </Typography>
            <Typography variant="body1" component="div">
              Event Description: {item.event_description}
            </Typography>
            <Typography variant="body1" component="div">
              Date of Event: {item.date_event}
            </Typography>
            <Typography variant="body1" component="div">
              Event Location: {item.event_location}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Footer></Footer>
    </div>
  )
}

export default Eventemployee