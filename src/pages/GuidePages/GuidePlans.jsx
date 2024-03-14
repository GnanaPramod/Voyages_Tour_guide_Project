// Frontend code (React)

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GuidePlans() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userEmail: '',
    guideEmail: '',
    locname:'',
    planDetails: '',
    hotelAccommodation: '',
    travelVehicleDetails: '',
    fromdate:'',
    todate:'',
    hotelImages: [],
    vehicleImages: [],
    placesImages: [],
    budget: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**const handleImageChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.files
    });
  };**/
  const handleImageChange = (e, field) => {
    const filesArray = Array.from(e.target.files);
    setFormData({
      ...formData,
      [field]: filesArray
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('userEmail', formData.userEmail);
    data.append('guideEmail', formData.guideEmail);
    data.append('locname', formData.locname);
    data.append('planDetails', formData.planDetails);
    data.append('hotelAccommodation', formData.hotelAccommodation);
    data.append('travelVehicleDetails', formData.travelVehicleDetails);
    data.append('fromdate',formData.fromdate );
    data.append('todate', formData.todate);
    for (let i = 0; i < formData.hotelImages.length; i++) {
        data.append('hotelImages', formData.hotelImages[i]);
      }
      
      for (let i = 0; i < formData.vehicleImages.length; i++) {
        data.append('vehicleImages', formData.vehicleImages[i]);
      }
      
      for (let i = 0; i < formData.placesImages.length; i++) {
        data.append('placesImages', formData.placesImages[i]);
      }
      
    /**formData.hotelImages.forEach((image) => {
      data.append('hotelImages', image);
    });
    formData.vehicleImages.forEach((image) => {
      data.append('vehicleImages', image);
    });
    formData.placesImages.forEach((image) => {
      data.append('placesImages', image);
    });**/
    data.append('budget', formData.budget);
    try {
      await axios.post('http://localhost:5000/guideupload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/tourpage/success');
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('An error occurred while uploading data');
    }
  };

  return (
    <div >
      <h1>Tour Plan Upload</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User Email:
          <input type="email" name="userEmail" value={formData.userEmail} onChange={handleInputChange} />
        </label>
        <label>
          Guide Email:
          <input type="email" name="guideEmail" value={formData.guideEmail} onChange={handleInputChange} />
        </label>
        <label>
          Location Name:
          <input type="text" name="locname" value={formData.locname} onChange={handleInputChange} />
        </label>
        <label>
          Plan Details:
          <textarea 
            name="planDetails" 
            value={formData.planDetails} 
            onChange={handleInputChange} 
            rows="5" 
            cols="50" 
            style={{ resize: "vertical" }} 
          />
        </label>
        <label>
          Hotel Accommodation:
          <input type="text" name="hotelAccommodation" value={formData.hotelAccommodation} onChange={handleInputChange} />
        </label>
        <label>
          Travel Vehicle Details:
          <input type="text" name="travelVehicleDetails" value={formData.travelVehicleDetails} onChange={handleInputChange} />
        </label>
        <label>From Date</label><br/>
        <input type= 'date' name="fromdate" placeholder="From Date" value={formData.fromdate} onChange={handleInputChange} required /><br/><br/>
        <label>To Date</label><br/>
        <input type= 'date' name="todate" placeholder="To Date" value={formData.todate} onChange={handleInputChange} required /><br/><br/>
        <label>
          Budget:
          <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} />
        </label>
        <label>
          Hotel Images:
          <input type="file" name="hotelImages" multiple onChange={(e) => handleImageChange(e, 'hotelImages')} />
        </label>
        <label>
          Vehicle Images:
          <input type="file" name="vehicleImages" multiple onChange={(e) => handleImageChange(e, 'vehicleImages')} />
        </label>
        <label>
          Places Images:
          <input type="file" name="placesImages" multiple onChange={(e) => handleImageChange(e, 'placesImages')} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GuidePlans;
