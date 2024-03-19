/**import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Search.css'; // Import your CSS file for styling

function ConfirmedPlanDetails() {
  const [confirmationDetails, setConfirmationDetails] = useState([]);
  const userEmail = localStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfirmationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/confirmation/${userEmail}`);
        setConfirmationDetails(response.data);
      } catch (error) {
        console.error('Error fetching confirmation details:', error);
      }
    };

    fetchConfirmationDetails();
  }, [userEmail]);

 
  return (
    <div>
      <div className="confirmation-details">
        <h2>Confirmation Details</h2>
        <ul>
          {confirmationDetails.map((confirmation, index) => (
            <li key={index}>
              <p>User Email: {confirmation.userEmail}</p>
              <p>Guide Email: {confirmation.guideEmail}</p>
              <p>Location Name: {confirmation.locname}</p>
              <p>From Date: {confirmation.fromDate}</p>
              <p>To Date: {confirmation.toDate}</p>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
}

export default ConfirmedPlanDetails;**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css'; // Import your CSS file for styling

function ConfirmedPlanDetails() {
  const [details, setDetails] = useState([]);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/confirmation/${userEmail}`);
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
              {details.guideDetails && details.guideDetails[index] && (
                <div>
                  <p>Guide Name: {details.guideDetails[index].username}</p>
                  <p>Guide Email: {details.guideDetails[index].email}</p>
                  <p>Guide Mobile: {details.guideDetails[index].mobileno}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ConfirmedPlanDetails;

