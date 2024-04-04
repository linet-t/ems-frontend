// Leave.jsx

// Existing imports...
import React, { Component } from 'react';
import axios from 'axios';
import Footer from './Footer';
import Navbar1 from './Navbar1';

class Leave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingLeave: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:8080/leave/pending');
      console.log('Backend Response:', response.data);
      this.setState({ pendingLeave: response.data });
    } catch (error) {
      console.error('Error fetching leave data:', error);
    }
  }

  handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:8080/leave/reject/${id}`);
      // Instead of filtering out the leave request, you can directly fetch the updated list
      const response = await axios.get('http://localhost:8080/leave/pending');
      this.setState({ pendingLeave: response.data }, () => {
        alert('Leave rejected successfully.');
      });
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };
  
  
  handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:8080/leave/approve/${id}`);
      const updatedLeave = this.state.pendingLeave.filter((leave) => leave.id !== id);
      this.setState({ pendingLeave: updatedLeave }, () => {
        alert('Leave approved successfully.');
      });
    } catch (error) {
      console.error('Error approving leave:', error);
    }
  };
  
  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format date as "YYYY-MM-DD"
  };

  render() {
    const { pendingLeave } = this.state;

    return (
      <div>
        <Navbar1 />
        <h2 style={{ textAlign: 'center', fontFamily: 'Times New Roman', marginTop: '80px' }}>PENDING LEAVE REQUESTS</h2>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign:'center' }}>ID</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign:'center' }}>Employee Name</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign:'center' }}>Department</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign:'center' }}>Leave Type</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign:'center' }}>Reason</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign:'center' }}>Start Date</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign:'center' }}>End Date</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' , textAlign:'center'}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingLeave.map((leave) => (
                  <tr key={leave.id} style={{ backgroundColor: '#fff' }}>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' , textAlign:'center'}}>{leave.id}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman', textAlign:'center' }}>{leave.employeeName || 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman', textAlign:'center' }}>{leave.department || 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' , textAlign:'center'}}>{leave.leaveType || 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{leave.reason || 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{this.formatDate(leave.startDate) || 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>{this.formatDate(leave.endDate) || 'N/A'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                      <button
                        style={{ backgroundColor: 'green', color: 'white', marginRight: '5px'}}
                        onClick={() => this.handleApprove(leave.id)}
                      >
                        Approve
                      </button>
                      <button
                        style={{ backgroundColor: 'red', color: 'white', fontFamily: 'Times New Roman' }}
                        onClick={() => this.handleReject(leave.id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Leave;
