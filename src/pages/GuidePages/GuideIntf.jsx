import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Guide.css'; // Import your CSS file for styling

function GuideIntf() {
  const [userDetails, setUserDetails] = useState(null);
  const userEmail = localStorage.getItem('email'); 
  const [guideemail, setGuideEmail] = useState(userEmail);
  // Retrieve the signed-in user's email from local storage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setGuideEmail(userEmail);
        const response = await axios.get(`http://localhost:5000/guide/profile/${guideemail}`); // Pass the user's email as part of the request
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userEmail]);

  function handleBtn() {
    navigate("/usrtoinfo");
  }

  function handlePlnBtn() {
    navigate("/guideplans");
  }
  function handleConfirmBtn(){
    navigate("/confirmedusrguideplan");
  }
  return (
    <div>
    <div className="guide-container">
      <div className="guide-profile">
        <h2>Guide Profile</h2>
        {userDetails && (
          <div>
            {userDetails.profilePicture && (
              <div className="guide-photo">
                <img src={`http://localhost:5000/${userDetails.profilePicture.replace("uploads\\", "uploads/").replace(/\\/g, "/")}`} alt="Profile" />
              </div>
            )}
            <div className="guide-info">
              <p>Username: {userDetails.username}</p>
              <p>Email: {userDetails.email}</p>
              <p>Mobile number: {userDetails.mobileno}</p>
            </div>
          </div>
        )}
      </div>
    </div>  
      <div className="guide-buttons">
        <button onClick={handleBtn}>Get User Requirements</button>
        <button onClick={handlePlnBtn}>Send Plans</button>
        <button onClick={handleConfirmBtn}>Confirmed User Details</button>
      </div>
  </div>  
  );
}

export default GuideIntf;
