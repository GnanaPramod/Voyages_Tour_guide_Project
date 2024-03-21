// ComplaintList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Managercomp() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch submitted complaints from the backend
    axios.get('http://localhost:5000/viewcomplaints')
      .then(response => {
        setComplaints(response.data);
      })
      .catch(error => {
        console.error('Error fetching complaints:', error);
      });
  }, []);

  return (
    <div>
      <h2>Submitted Complaints</h2>
      <ul>
        {complaints.map(complaint => (
          <li key={complaint._id}>
            <p>User Email: {complaint.userEmail}</p>
            <p>Guide Email: {complaint.guideEmail}</p>
            <p>Complaint: {complaint.complaint}</p>
            <p>Location Name: {complaint.locName}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Managercomp;
