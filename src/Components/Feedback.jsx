import React, { Component } from 'react';
import axios from 'axios';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import Section1 from './Section1';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: [],
      selectedFeedbackId: null,
      reply: '',
      showReplyForm: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:8080/feedbacks/feedback_emp');
      this.setState({ feedback: response.data });
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  }

  handleApprove = (feedbackId) => {
    this.setState({ selectedFeedbackId: feedbackId, showReplyForm: true, reply: '' });
  };

  handleChangeReply = (event) => {
    this.setState({ reply: event.target.value });
  };

  handleSubmitReply = async () => {
    const { selectedFeedbackId, reply } = this.state;
    try {
      await axios.put(`http://localhost:8080/feedbacks/${selectedFeedbackId}/reply`, { reply });
      const response = await axios.get('http://localhost:8080/feedbacks/feedback_emp');
      this.setState({ feedback: response.data, showReplyForm: false });
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  render() {
    const { feedback, showReplyForm, reply } = this.state;

    return (
      <div className='row'>
        <Navbar2 />
        <div className="col-3 col-md-3">
            <Section1/>
        </div>
        <div className="col-9 col-md-9">
        <h2 style={{ textAlign: 'center', fontFamily: 'Times New Roman', marginTop: '80px' }}>FEEDBACKS</h2>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Times New Roman' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Employee</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Feedback</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {feedback.map((feedbackItem, index) => (
                  <tr key={feedbackItem[0]} style={{ backgroundColor: '#fff' }}>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                      {index + 1}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                      {feedbackItem[1]}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                      {feedbackItem[2]}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'Times New Roman' }}>
                      <button
                        style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}
                        onClick={() => this.handleApprove(feedbackItem[0])}
                      >
                        Reply
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showReplyForm && (
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ textAlign: 'center', fontFamily: 'Times New Roman' }}>Reply to Feedback</h3>
                <form style={{ display: 'flex', justifyContent: 'center' }}>
                  <textarea
                    value={reply}
                    onChange={this.handleChangeReply}
                    placeholder="Enter your reply"
                    style={{ marginRight: '10px' }}
                  />
                  <button type="button" onClick={this.handleSubmitReply}>
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Feedback;