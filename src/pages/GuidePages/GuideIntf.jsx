import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function GuideIntf() {
  const [userDetails, setUserDetails] = useState(null);
  const userEmail = localStorage.getItem('email'); // Retrieve the signed-in user's email from local storage
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/guide/profile/${userEmail}`); // Pass the user's email as part of the request
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userEmail]);
  function handleBtn(){
    navigate("/usrtoinfo");
  }
  function handlePlnBtn(){
    navigate("/guideplans");
  }
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
    {console.log('Profile Picture Path:','http://localhost:5000/'+ userDetails.profilePicture)}
    <img src={`http://localhost:5000/${userDetails.profilePicture.replace("uploads\\", "uploads/").replace(/\\/g, "/")}`} alt="Profile" />
  </div>
)}
          <button onClick={handleBtn}>Get User Requirements</button>
          <button onClick = {handlePlnBtn}>Send Plans</button>
            </div>
          )}
        </div>
      )}
      
    </div>
  );
}

export default GuideIntf;
