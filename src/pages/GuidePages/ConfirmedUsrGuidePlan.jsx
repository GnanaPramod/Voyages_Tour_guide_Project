import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './Search.css'; // Import your CSS file for styling

function ConfirmedUsrGuidePlan() {
  const [details, setDetails] = useState([]);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/confirmationguide/${userEmail}`);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [userEmail]);

  return (
    <div>
      <div className="details-container">
        <h2>Confirmed Plan Details</h2>
        <ul>
          {details.confirmations && details.confirmations.map((confirmation, index) => (
            <li key={index}>
              <p>User Email: {confirmation.userEmail}</p>
              <p>Guide Email: {confirmation.guideEmail}</p>
              <p>Location Name: {confirmation.locname}</p>
              <p>From Date: {confirmation.fromDate}</p>
              <p>To Date: {confirmation.toDate}</p>
              {details.userDetails && details.userDetails[index] && (
                <div>
                  <p>User Name: {details.userDetails[index].username}</p>
                  <p>User Email: {details.userDetails[index].email}</p>
                  <p>User Mobile: {details.userDetails[index].mobileno}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ConfirmedUsrGuidePlan;

