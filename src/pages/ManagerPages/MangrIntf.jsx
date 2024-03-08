import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MangrIntf() {
  const [userDetails, setUserDetails] = useState(null);
  const userEmail = localStorage.getItem('email'); // Retrieve the signed-in user's email from local storage

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/mgr/profile/${userEmail}`); // Pass the user's email as part of the request
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userEmail]);

  return (
    <div>
      <h2>User Profile</h2>
      {userDetails && (
        <div>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          {/* Display other user details */}
          {userDetails.profilePicture && (
            <div>
            {console.log('Profile Picture Path:', userDetails.profilePicture)}
            {userDetails.profilePicture && (
  <div>
    {console.log('Profile Picture Path:', userDetails.profilePicture)}
    <img src={`http://localhost:5000/${userDetails.profilePicture.replace("uploads\\", "uploads/").replace(/\\/g, "/")}`} alt="Profile" />
  </div>
)}

            </div>
          )}
        </div>
      )}
      <Link to="/manager/upload">Manager Uplaod</Link>
    </div>
  );
}

export default MangrIntf;
