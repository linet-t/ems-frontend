import React, { useState } from 'react';
import './Task.css';
import axios from 'axios';

const Task = () => {
  const [taskdata, setTaskdata] = useState({
    employeeid: "",
    task_name: "",
    task_count: ""
  });

  function capturedata() {
    console.log(taskdata);
    axios.post('http://localhost:8080/task/tasksave', taskdata)
      .then((res) => {
        console.log(res);
        alert('Task sent successfully');
      })
      .catch((error) => {
        console.error('Error sending task:', error);
        alert('Error sending task');
      });
  }

  return (
    <div id='taskdesign' className='taskpage'>
      <h3>Task Handler</h3>
      <br /><br />
      <div className="container">
        <div id='cardesign' className="card">
          <div className="col col-3 col-lg-12 col-sm-12 col-md-12 col-xl-12 col-xxl-12">
            <div className="card-body">
              <div className="row g-3">
                <div className="col col-12 col-sm-6 col-xl-6 col-xxl-6 col-md-12">
                  <label htmlFor="employeeid" className='form-label'>Employee ID</label>
                  <input
                    type="number"
                    className='form-control'
                    id='employeeid'
                    name='Employee_id'
                    value={taskdata.employeeid}
                    onChange={(e) => {
                      setTaskdata({ ...taskdata, employeeid: e.target.value });
                    }}
                  />
                </div>
                <div className="col col-12 col-sm-6 col-xl-6 col-xxl-6 col-md-12">
                  <label htmlFor="taskname" className='form-label'>Task Name</label>
                  <input
                    type="text"
                    className='form-control large-textbox'
                    id='taskname'
                    name='task_name'
                    value={taskdata.task_name}
                    onChange={(e) => {
                      setTaskdata({ ...taskdata, task_name: e.target.value });
                    }}
                  />
                </div>
                <div className="col col-12 col-sm-6 col-xl-6 col-xxl-6 col-md-12">
                  <label htmlFor="taskcount" className='form-label'>Task Count</label>
                  <input
                    type="number"
                    className='form-control'
                    id='taskcount'
                    name='task_count'
                    value={taskdata.task_count}
                    onChange={(e) => {
                      setTaskdata({ ...taskdata, task_count: e.target.value });
                    }}
                  />
                </div>
                <div className="col col-12 col-sm-6 col-xl-6 col-xxl-6 col-md-12">
                  <button className='btn btn-dark' id='button' name='taskbutton' onClick={capturedata}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
