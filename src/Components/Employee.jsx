import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Employee = () => {
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    // Fetch data from the API
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
    display: 'block', // Change to block for better spacing
    marginTop: '30px', // Set constant margin top for consistent spacing
    fontFamily: 'Times New Roman', // Set font family
    textAlign: 'center' // Align links to center
  };
  
  return (
    <div>
      <Navbar2 />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-3">
            <section className="section" style={{  backgroundColor: '#ffffff', height: '100vh', overflowY: 'scroll' }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Link to="/" style={linkStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house-check" viewBox="0 0 16 16">
                    <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708z"/>
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514"/>
                  </svg>
                  <br />
                  Home
                </Link>
                <Link to="/leaveemployee" style={linkStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-walking" viewBox="0 0 16 16">
                    <path d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6.44 3.752A.75.75 0 0 1 7 3.5h1.445c.742 0 1.32.643 1.243 1.38l-.43 4.083a1.8 1.8 0 0 1-.088.395l-.318.906.213.242a.8.8 0 0 1 .114.175l2 4.25a.75.75 0 1 1-1.357.638l-1.956-4.154-1.68-1.921A.75.75 0 0 1 6 8.96l.138-2.613-.435.489-.464 2.786a.75.75 0 1 1-1.48-.246l.5-3a.75.75 0 0 1 .18-.375l2-2.25Z"/>
                    <path d="M6.25 11.745v-1.418l1.204 1.375.261.524a.8.8 0 0 1-.12.231l-2.5 3.25a.75.75 0 1 1-1.19-.914zm4.22-4.215-.494-.494.205-1.843.006-.067 1.124 1.124h1.44a.75.75 0 0 1 0 1.5H11a.75.75 0 0 1-.531-.22Z"/>
                  </svg>
                  <br />
                  Leave
                </Link>
                <Link to="/taskemployee" style={linkStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-workspace" viewBox="0 0 16 16">
                    <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                    <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z"/>
                  </svg>
                  <br />
                  Task
                </Link>
                <Link to="/eventemployee" style={linkStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                  </svg>
                  <br />
                  Event
                </Link>
                <Link to="/feedbackemployee" style={linkStyle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                  </svg>
                  <br />
                  Feedback
                </Link>
              </div>
              <p className="section-text"></p>
            </section>
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
            {/* Table displaying employee data */}
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
