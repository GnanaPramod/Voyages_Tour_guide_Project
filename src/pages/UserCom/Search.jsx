// // /**(original)
// // import React from "react"
// // import "./Search.css"
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { faStar as goldenstar } from '@fortawesome/free-solid-svg-icons';
// // import { faLocationDot as location  } from "@fortawesome/free-solid-svg-icons"; 

// // import img1 from './userimg/IndianGate.jpg';
// // import img2 from './userimg/lotusTemple.jpg';
// // import img3 from './userimg/goldenTemple.jpg';
// // import img4 from './userimg/mysorepalace.jpg';
// // import img5 from './userimg/Tajmahal.jpg';



// // function Search(){
// //     return(
// //           <div>
// //           <div className="container">
// //             <FontAwesomeIcon icon={location} beat flip="horizontal" size="xl"style={{color: "#74C0FC",}} />
// //             <input type="text" placeholder="Enter Location" />
// //             <button className="search">Search</button>
// //             <button className="subscribe">Subscribe<FontAwesomeIcon icon={goldenstar} fade size="2xl" style={{color: "#080808",}} /></button>
// //           </div>
// //           <div className="usrimg">
// //              <button><img src={img1} alt="Tourist place"/><br></br>Indian Gate</button>
// //              <button><img src={img2} alt="Tourist place"/> <br></br>Lotus Temple</button>
// //              <button><img src={img3} alt="Tourist place"/><br></br> Golden Temple</button>
// //              <button><img src={img4} alt="Tourist place"/><br></br>Mysore Palace</button>
// //              <button><img src={img5} alt="Tourist place"/><br></br>Tajmahal</button>

// //           </div>
// //           </div>
        
// //     );
// // }
// // export default Search;**/
// // UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Search.css'; // Import your CSS file for styling

function Search() {
  const [userDetails, setUserDetails] = useState(null);
  const userEmail = localStorage.getItem('email');
  const [usrEmail, setUsrEmail] = useState(userEmail);
   // Retrieve the signed-in user's email from local storage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setUsrEmail(userEmail);
        const response = await axios.get(`http://localhost:5000/user/profile/${usrEmail}`); // Pass the user's email as part of the request
        setUserDetails(response.data);
        localStorage.setItem('email', userDetails.email);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userEmail]);

  // Function to navigate to tour page info
  function handleBtn() {
    navigate('/tourpginfo');
  }

  function handlePlnBtn() {
    navigate('/tourplandetails');
  }

  function handleTourBtn() {
    navigate('/tourpage');
  }
  function handleconfirmBtn(){
    navigate('/confirmeddetails');
  }
  return (
    <div>
      <div className="user-profile">
        {userDetails && (
          <div className="user-details">
            <div className="user-photo">
              {userDetails.profilePicture && (
                <img src={`http://localhost:5000/uploads/${userDetails.profilePicture}`} alt="Profile" />
              )}
            </div>
            <div className="user-info">
              <h2>User Profile</h2>
              <p>Username: {userDetails.username}</p>
              <p>Email: {userDetails.email}</p>
              <p>Mobile no:{userDetails.mobileno}</p>
            </div>
          </div>
        )}
      </div>

      <button className="u1" onClick={handleBtn}>Search Locations</button>
      <button className="u2"onClick={handlePlnBtn}>Get Plan Details</button>
      <button className="u3"onClick={handleTourBtn}>Get Guide</button>
      <button onClick={handleconfirmBtn}>Confirmed Tour Details</button>
    </div>
  );
}

export default Search;

