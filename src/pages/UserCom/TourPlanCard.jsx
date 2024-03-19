
/**(1)import React from 'react';

import React from 'react';


function TourPlanCard(props) {
  const { tourPlan } = props; // Destructuring tourPlan from props

  return (
    <div>
      <h2>Tour Plan Details</h2>
      <p>User Email: {tourPlan.userEmail}</p>
      <p>Guide Email: {tourPlan.guideEmail}</p>y
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


export default TourPlanCard;**/
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './TourPlanCard.css'; // Import the CSS file
import ImageSliderLocation from '../TourPageCompenent/ImageSliderLocation';
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

  // Split planDetails into day-wise paragraphs
  const dayWiseDetails = tourPlan.planDetails.split('\n');

  return (
    <div className="tour-plan-card">
      <h2>Tour Plan Details</h2>
      <p>User Email: {tourPlan.userEmail}</p>
      <p>Guide Email: {tourPlan.guideEmail}</p>
      <p>Location Name: {tourPlan.locname}</p>
      <h3>Images:</h3>
      <ImageSliderLocation slides={tourPlan.placesImages.map(image => ({ url: `http://localhost:5000/uploads/${image}` }))} />
      <div>
        <h3>Plan Details:</h3>
        {dayWiseDetails.map((detail, index) => (
          <p key={index}>{detail}</p>
        ))}
      </div>
      <p>From Date: {new Date(tourPlan.fromdate).toLocaleDateString()}</p>
      <p>To Date: {new Date(tourPlan.todate).toLocaleDateString()}</p>
      <p>Hotel Accommodation: {tourPlan.hotelAccommodation}</p>
      <ImageSliderLocation slides={tourPlan.hotelImages.map(image => ({ url: `http://localhost:5000/uploads/${image}` }))} />
      
      <p>Travel Vehicle Details: {tourPlan.travelVehicleDetails}</p>
      <ImageSliderLocation slides={tourPlan.vehicleImages.map(image => ({ url: `http://localhost:5000/uploads/${image}` }))} />
      
      <p>Budget: {tourPlan.budget}</p>
      
      
      {!confirmation && <button onClick={handleConfirm}>Confirm</button>}
      {confirmation && <p>Tour plan confirmed and saved!</p>}
    </div>
  );
}

export default TourPlanCard;


/**<div className="image-container">
        {tourPlan.hotelImages && tourPlan.hotelImages.map((image, index) => (
          <img key={index} src={`http://localhost:5000/uploads/${image}`} alt={`Hotel Image ${index}`} />
        ))}
      </div>

<div className="image-container">
        {tourPlan.vehicleImages && tourPlan.vehicleImages.map((image, index) => (
          <img key={index} src={`http://localhost:5000/uploads/${image}`} alt={`Vehicle Image ${index}`} />
        ))}
      </div>
<div className="image-container">
        {tourPlan.placesImages && tourPlan.placesImages.map((image, index) => (
          <img key={index} src={`http://localhost:5000/uploads/${image}`} alt={`Place Image ${index}`} />
        ))}
      </div>
      **/