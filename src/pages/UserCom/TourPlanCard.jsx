import React from 'react';

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

export default TourPlanCard;
