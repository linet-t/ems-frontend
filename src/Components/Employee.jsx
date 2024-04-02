import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Section from './Section';

const Employee = () => {
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/employees/${sessionStorage.getItem("empId")}`)
      .then(response => {
        setEmployeeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    display: 'block',
    marginTop: '30px',
    fontFamily: 'Times New Roman',
    textAlign: 'center'
  };
  
  return (
    <div>
      <Navbar />
      <div className="container-fluid" style={{ marginTop: '70px' }}> {/* Adjusted top margin */}
        <div className="row">
          <div className="col-12 col-md-3">
            <Section />
          </div>
          <div className="col-12 col-md-9">
            <div className="row">
              <div className="col-12 mt-3">
                <div className="d-flex justify-content-between">
                  <div className="card bg-danger text-white" style={{ width: '10rem', height: '7rem' }}>
                    <div className="card-body">
                      <h5 className="card-title">Total Task</h5>
                      <h1 style={{ textAlign: 'center' }}>10</h1>
                    </div>
                  </div>
                  <div className="card bg-success text-white" style={{ width: '10rem', height: '7rem' }}>
                    <div className="card-body">
                      <h5 className="card-title">Completed</h5>
                      <h1 style={{ textAlign: 'center' }}>7</h1>
                    </div>
                  </div>
                  <div className="card bg-warning text-white" style={{ width: '10rem', height: '7rem' }}>
                    <div className="card-body">
                      <h5 className="card-title">Pending Task</h5>
                      <h1 style={{ textAlign: 'center' }}>3</h1>
                    </div>
                  </div>
                  <div className="card bg-info text-white" style={{ width: '10rem', height: '7rem' }}>
                    <div className="card-body">
                      <h5 className="card-title">Leave Pending</h5>
                      <h1 style={{ textAlign: 'center' }}>6</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="row mt-3">
              <div className="col-12">
                <table className="table" style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead style={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman', textAlign: 'center' }}>
                    <tr>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>ID</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Full Name</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Email</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Date of Birth</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Address</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Phone Number</th>
                      <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#333', color: '#fff' }}>Department</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ backgroundColor: '#fff', fontFamily: 'Times New Roman', textAlign: 'center' }}>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.id}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.fullName}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.email}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.dateOfBirth}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.address}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.phoneNumber}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'normal' }}>{employeeData.department}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Employee;
