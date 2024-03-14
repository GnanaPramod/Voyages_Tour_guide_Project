<<<<<<< HEAD
/**(1)import React from 'react';
=======
import React from 'react';
>>>>>>> e5b0befb5d229766ea75ea916f569481e7625d78

function TourPlanCard(props) {
  const { tourPlan } = props; // Destructuring tourPlan from props

  return (
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
        {tourPlan.placesImages &&  tourPlan.placesImages.map((image, index) => (
            <img key={index} src={`http://localhost:5000/uploads/${image}`} alt={`Vehicle Image ${index}`} style={{ width: '200px', height: 'auto', margin: '5px' }} />
         ))}
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default TourPlanCard;**/
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function TourPlanCard(props) {
  const { tourPlan } = props; // Destructuring tourPlan from props

  // State to manage confirmation status
  const [confirmation, setConfirmation] = useState(false);

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


  return (
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
        {tourPlan.placesImages &&  tourPlan.placesImages.map((image, index) => (
            <img key={index} src={`http://localhost:5000/uploads/${image}`} alt={`Vehicle Image ${index}`} style={{ width: '200px', height: 'auto', margin: '5px' }} />
         ))}
      </div>

      
      {!confirmation && <button onClick={handleConfirm}>Confirm</button>}
          {confirmation && <p>Tour plan confirmed and saved!</p>}
    </div>
  );
}

export default TourPlanCard;


=======
export default TourPlanCard;
>>>>>>> e5b0befb5d229766ea75ea916f569481e7625d78
