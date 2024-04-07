import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { Card, CardContent, Typography } from '@mui/material';

const Taskemployee = () => {
    const[input,setInput]=useState(
      {"id":sessionStorage.getItem("empId")});
      const[data,setData]=useState([])
    useEffect(() => {
        axios.post('http://localhost:8080/task/taskemployee',input)
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
  return (
    <div>
      <Navbar/>
      <h1>Task Assigned</h1>
      {data.map((item, index) => (
        <Card key={index} variant="outlined" style={{ margin: '1rem' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Task ID: {item.task_id}
            </Typography>
            <Typography variant="body1" component="div">
              Employee ID: {item.employeeid}
            </Typography>
            <Typography variant="body1" component="div">
              Task Name: {item.task_name}
            </Typography>
            <Typography variant="body1" component="div">
              Task Count: {item.task_count}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Taskemployee