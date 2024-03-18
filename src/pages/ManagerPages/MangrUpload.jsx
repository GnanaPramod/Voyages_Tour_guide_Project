import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MangrUpload.css'; // Import your CSS file for styling

function MangrUpload() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    locid:'',
    locname:'',
    places: '',
    description:'',
    days:'',
    budget: '',
    images: []
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('locid', formData.locid);
    data.append('locname', formData.locname);
    data.append('places', formData.places);
    data.append('description',formData.description);
    data.append('days', formData.days);
    data.append('budget', formData.budget);
    for (let i = 0; i < formData.images.length; i++) {
      data.append('images', formData.images[i]);
    }

    try {
      await axios.post('http://localhost:5000/manager', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/tourpage/success');
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading images');
    }
  };

  return (
    <div className="upload-container">
      <h1>Manager Upload</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <label htmlFor="locid">Location ID:</label>
        <input type="number" id="locid" name="locid" value={formData.locid} onChange={handleInputChange} />

        <label htmlFor="locname">Location Name:</label>
        <input type="text" id="locname" name="locname" value={formData.locname} onChange={handleInputChange} />

        <label htmlFor="places">Places:</label>
        <input type="text" id="places" name="places" value={formData.places} onChange={handleInputChange} />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="8"></textarea>

        <label htmlFor="days">Days Can Spend:</label>
        <input type="number" id="days" name="days" value={formData.days} onChange={handleInputChange} />

        <label htmlFor="budget">Budget:</label>
        <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleInputChange} />

        <label htmlFor="images">Images:</label>
        <input type="file" id="images" name="images" multiple onChange={handleImageChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MangrUpload;
