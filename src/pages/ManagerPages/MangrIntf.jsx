import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Manager.css'; // Import your CSS file for styling

function MangrIntf() {
  const [userDetails, setUserDetails] = useState(null);
  const userEmail = localStorage.getItem('email');
  const [mgremail, setMgrEmail] = useState(userEmail);
   // Retrieve the signed-in user's email from local storage

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setMgrEmail(userEmail)
        const response = await axios.get(`http://localhost:5000/mgr/profile/${mgremail}`); // Pass the user's email as part of the request
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userEmail]);

  return (
    <div>
    <div className="manager-container">
      <div className="manager-profile">
        <h2>Manager Profile</h2>
        {userDetails && (
          <div>
          {userDetails.profilePicture && (
              <div className="manager-photo">
                <img src={`http://localhost:5000/${userDetails.profilePicture.replace("uploads\\", "uploads/").replace(/\\/g, "/")}`} alt="Profile" />
              </div>
           )}
            <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
            {/* Display other user details */}
           
          </div>
        )}
      </div>
    </div> 
    <div className="mrc"> 
      <Link to="/manager/upload" className="manager-link">Manager Upload</Link>
      <Link to="/manager/complaint" className="manager-com">ViewComplaints</Link>
    </div>
  </div>  
  );
}

export default MangrIntf;
