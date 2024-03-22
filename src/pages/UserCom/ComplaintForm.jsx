import React, { useState } from 'react';
import axios from 'axios';
import './Complaint.css';
function ComplaintForm() {
  const [userEmail, setUserEmail] = useState('');
  const [guideEmail, setGuideEmail] = useState('');
  const [complaint, setComplaint] = useState('');
  const [locName, setLocName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make POST request to backend API to create new complaint
      const response = await axios.post('http://localhost:5000/complaints', {
        userEmail,
        guideEmail,
        complaint,
        locName
      });

      // Display success message
      setMessage('Complaint submitted successfully!');
      
      // Clear input fields
      setUserEmail('');
      setGuideEmail('');
      setComplaint('');
      setLocName('');
    } catch (error) {
      // Display error message
      setMessage('Error submitting complaint. Please try again later.');
      console.error('Error submitting complaint:', error);
    }
  };

  return (
    <div>
      <h2 id = "header2">Submit a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div id = "userEmail2">
          <label >User Email:</label><br/>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div><br/>
        <div id = "guideEmail2">
          <label>Guide Email:</label><br/>
          <input
            type="email"
            value={guideEmail}
            onChange={(e) => setGuideEmail(e.target.value)}
            required
          />
        </div><br/>
        <div id = "locname2">
          <label>Location Name:</label><br/>
          <input
            type="text"
            value={locName}
            onChange={(e) => setLocName(e.target.value)}
            required
          />
        </div><br/>
        <div id = "complaint">
          <label>Complaint:</label><br/>
          <textarea id ="txt2"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            required
          />
        </div><br/><br/>
        
        
        <button id = "sbmt2" type="submit" >Submit Complaint</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ComplaintForm;
