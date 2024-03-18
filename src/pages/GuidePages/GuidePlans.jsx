import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GuidePlans.css'; // Import the CSS file

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
    <div className="container-guideplans">
      <h1>Tour Plan Upload</h1>
      <form onSubmit={handleSubmit}>
        <label className="label-guideplans">
          User Email:
          <input className="input-guideplans" type="email" name="userEmail" value={formData.userEmail} onChange={handleInputChange} />
        </label>
        <label className="label-guideplans">
          Guide Email:
          <input className="input-guideplans" type="email" name="guideEmail" value={formData.guideEmail} onChange={handleInputChange} />
        </label>
        <label className="label-guideplans">
          Location Name:
          <input className="input-guideplans" type="text" name="locname" value={formData.locname} onChange={handleInputChange} />
        </label>
        <label className="label-guideplans">
          Plan Details:
          <textarea 
            className="textarea-guideplans" 
            name="planDetails" 
            value={formData.planDetails} 
            onChange={handleInputChange} 
            rows="5" 
            cols="50" 
            style={{ resize: "vertical" }} 
          />
        </label>
        <label className="label-guideplans">
          Hotel Accommodation:
          <input className="input-guideplans" type="text" name="hotelAccommodation" value={formData.hotelAccommodation} onChange={handleInputChange} />
        </label>
        <label className="label-guideplans">
          Travel Vehicle Details:
          <input className="input-guideplans" type="text" name="travelVehicleDetails" value={formData.travelVehicleDetails} onChange={handleInputChange} />
        </label>
        <label className="label-guideplans">From Date</label><br/>
        <input className="input-guideplans" type= 'date' name="fromdate" placeholder="From Date" value={formData.fromdate} onChange={handleInputChange} required /><br/><br/>
        <label className="label-guideplans">To Date</label><br/>
        <input className="input-guideplans" type= 'date' name="todate" placeholder="To Date" value={formData.todate} onChange={handleInputChange} required /><br/><br/>
        <label className="label-guideplans">
          Budget:
          <input className="input-guideplans" type="number" name="budget" value={formData.budget} onChange={handleInputChange} />
        </label>
        <label className="label-guideplans">
          Hotel Images:
          <input className="input-guideplans" type="file" name="hotelImages" multiple onChange={(e) => handleImageChange(e, 'hotelImages')} />
        </label>
        <label className="label-guideplans">
          Vehicle Images:
          <input className="input-guideplans" type="file" name="vehicleImages" multiple onChange={(e) => handleImageChange(e, 'vehicleImages')} />
        </label>
        <label className="label-guideplans">
          Places Images:
          <input className="input-guideplans" type="file" name="placesImages" multiple onChange={(e) => handleImageChange(e, 'placesImages')} />
        </label>
        <button className="button-guideplans" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GuidePlans;
