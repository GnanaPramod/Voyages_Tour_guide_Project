/**import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TourPlanDetails() {
  const [tourPlan, setTourPlan] = useState(null);
  //const [userEmail, setUserEmail] = useState('');
  const userEmail = localStorage.getItem('email');
  const [confirmation, setConfirmation] = useState(false);
 

  const fetchTourPlan = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/fetchTourPlan/${userEmail}`);
      setTourPlan(response.data);
    } catch (error) {
      console.error('Error fetching tour plan:', error);
      setTourPlan(null);
    }
  };
  const handleConfirm = async () => {
    try {
      await axios.post(`http://localhost:5000/confirmTourPlan`, {
        userEmail: tourPlan.userEmail,
        guideEmail: tourPlan.guideEmail,
        locname:tourPlan.locname,
        fromDate: tourPlan.fromdate,
        toDate: tourPlan.todate
      });

      // Update state to indicate confirmation
      setConfirmation(true);
    } catch (error) {
      console.error('Error confirming tour plan:', error);
    }
  };

  useEffect(() => {
    if (userEmail !== '') {
      fetchTourPlan();
    }
  }, [userEmail]);

  return (
    <div >
      <h1>Tour Plan Details</h1>
      
      {tourPlan && (
        <div>
          <h2>Tour Plan Details</h2>
          <p>User Email: {tourPlan.userEmail}</p>
          <p>Guide Email: {tourPlan.guideEmail}</p>
          <p>Location Name: {tourPlan.locname}</p>
          <p>Plan Details: {tourPlan.planDetails}</p>
          <p>From Date: {new Date(tourPlan.fromdate).toLocaleDateString()}</p>
          <p>To Date: {new Date(tourPlan.todate).toLocaleDateString()}</p>
          <p>Hotel Accommodation: {tourPlan.hotelAccommodation}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {tourPlan.hotelImages && tourPlan.hotelImages.map((image, index) => (
                <img key={index} src={`http://localhost:5000/uploads/${image}`} alt={`Vehicle Image ${index}`} style={{ width: '200px', height: 'auto', margin: '5px' }} />
            ))}
        </div>
          <p>Travel Vehicle Details: {tourPlan.travelVehicleDetails}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {tourPlan.vehicleImages && tourPlan.vehicleImages.map((image, index) => (
                <img key={index} src={`http://localhost:5000/uploads/${image}`} alt={`Vehicle Image ${index}`} style={{ width: '200px', height: 'auto', margin: '5px' }} />
             ))}
         </div>
          <p>Budget: {tourPlan.budget}</p>
          <h3>Images:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {tourPlan.placesImages && tourPlan.placesImages.map((image, index) => (
                <img key={index} src={`http://localhost:5000/uploads/${image}`} alt={`Vehicle Image ${index}`} style={{ width: '200px', height: 'auto', margin: '5px' }} />
             ))}
         </div>
         <div>
          {!confirmation && <button onClick={handleConfirm}>Confirm</button>}
          {confirmation && <p>Tour plan confirmed and saved!</p>}
         </div>
        </div>
      )}
    </div>
  );
}

export default TourPlanDetails;**/
/** (2)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TourPlanCard from './TourPlanCard.jsx'; // Importing the TourPlanCard component

function TourPlanDetails() {
  const [tourPlan, setTourPlan] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const userEmail = localStorage.getItem('email');

  const fetchTourPlan = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/fetchTourPlan/${userEmail}`);
      setTourPlan(response.data);
    } catch (error) {
      console.error('Error fetching tour plan:', error);
      setTourPlan(null);
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post(`http://localhost:5000/confirmTourPlan`, {
        userEmail: tourPlan.userEmail,
        guideEmail: tourPlan.guideEmail,
        locname: tourPlan.locname,
        fromDate: tourPlan.fromdate,
        toDate: tourPlan.todate
      });

      // Update state to indicate confirmation
      setConfirmation(true);
    } catch (error) {
      console.error('Error confirming tour plan:', error);
    }
  };

  useEffect(() => {
    if (userEmail !== '') {
      fetchTourPlan();
    }
  }, [userEmail]);

  return (
    <div>
      <h1>Tour Plan Details</h1>
      {tourPlan && (
        <div>
          <TourPlanCard tourPlan={tourPlan} /> 
          {!confirmation && <button onClick={handleConfirm}>Confirm</button>}
          {confirmation && <p>Tour plan confirmed and saved!</p>}
        </div>
      )}
    </div>
  );
}

export default TourPlanDetails;**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TourPlanCard from './TourPlanCard.jsx'; // Importing the TourPlanCard component

function TourPlanDetails() {
  const [tourPlans, setTourPlans] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
  const userEmail = localStorage.getItem('email');

  const fetchAllTourPlans = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/fetchTourPlan/${userEmail}`);
      setTourPlans(response.data);
    } catch (error) {
      console.error('Error fetching tour plans:', error);
      setTourPlans([]); // Set tourPlans as an empty array if there's an error
    }
  };

  const handleConfirm = async (tourPlanId) => {
    try {
      await axios.post(`http://localhost:5000/confirmTourPlan`, {
        tourPlanId: tourPlanId
      });

      // Update state to indicate confirmation
      setConfirmation(true);
    } catch (error) {
      console.error('Error confirming tour plan:', error);
    }
  };

  useEffect(() => {
    if (userEmail !== '') {
      fetchAllTourPlans();
    }
  }, [userEmail]);

  return (
    <div>
      <h1>All Tour Plan Details</h1>
      {tourPlans.length > 0 ? (
        tourPlans.map((tourPlan, index) => (
          <div key={index}>
            <TourPlanCard tourPlan={tourPlan} /> 
            {!confirmation && <button onClick={() => handleConfirm(tourPlan._id)}>Confirm</button>}
            {confirmation && <p>Tour plan confirmed and saved!</p>}
          </div>
        ))
      ) : (
        <p>No tour plans found.</p>
      )}
    </div>
  );
}

export default TourPlanDetails;
