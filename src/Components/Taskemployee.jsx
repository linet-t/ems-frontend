import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Card, CardContent, Typography } from '@mui/material';

const Taskemployee = () => {
  // Access the employee ID from sessionStorage
 
  const empId = sessionStorage.getItem("empId"); // Notice the string "empId" inside getItem()

  
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    fetchTaskData();
  }, []);

  const fetchTaskData =  () => {
    try {
      // Fetch total, pending, and completed task counts
      const totalResponse =  axios.get('http://localhost:8080/task/totalTaskCount');
      const pendingResponse =  axios.get('http://localhost:8080/task/pendingTaskCount');
      const completedResponse =  axios.get('http://localhost:8080/task/completedTaskCount');

      setTotalTasks(totalResponse.data);
      setPendingTasks(pendingResponse.data);
      setCompletedTasks(completedResponse.data);

      // Fetch tasks assigned to the employee
      const tasksResponse =  axios.post('http://localhost:8080/task/taskemployee',   { id: empId } );
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error fetching task data:', error);
    }
  };

  const handleCompleteTask = (task_id) => {
    try {
       axios.post(`http://localhost:8080/task/complete/${task_id}`);
      fetchTaskData(); // Fetch updated task data after marking task as completed
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };
  
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Task Management</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
        <Card variant="outlined" style={{ width: '30%' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Total Tasks
            </Typography>
            <Typography variant="h3" component="div">
              {totalTasks}
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" style={{ width: '30%' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Pending Tasks
            </Typography>
            <Typography variant="h3" component="div">
              {pendingTasks}
            </Typography>
          </CardContent>
        </Card>
        <Card variant="outlined" style={{ width: '30%' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Completed Tasks
            </Typography>
            <Typography variant="h3" component="div">
              {completedTasks}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <h2>Tasks Assigned</h2>
        {tasks.map(task => (
          <Card key={task.task_id} variant="outlined" style={{ width: '50%', marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Task ID: {task.task_id}
              </Typography>
              <Typography variant="body1" component="div">
                Task Name: {task.task_name}
              </Typography>
              <Typography variant="body1" component="div">
                Task Count: {task.task_count}
              </Typography>
              <Button variant="contained" onClick={() => handleCompleteTask(task.task_id)}>Complete Task</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Taskemployee;