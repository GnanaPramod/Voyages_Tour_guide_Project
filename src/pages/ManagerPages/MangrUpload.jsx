import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      await axios.post('http://localhost:3000/manager', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      //alert('Images uploaded successfully');
      navigate('/tourpage/success');
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('An error occurred while uploading images');
    }
  };

  return (
    <div className="App">
      <h1>Manager Upload</h1>
      <form onSubmit={handleSubmit}>
       <label>
          Location ID:<br/>
          <input type="number" name="locid" value={formData.locid} onChange={handleInputChange} />
        </label>
        <label>
          Location Name:
          <input type="text" name="locname" value={formData.locname} onChange={handleInputChange} />
        </label>
        <label>
          Places:
          <input type="text" name="places" value={formData.places} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <label>
          Days Can Spend:
          <input type="number" name="days" value={formData.days} onChange={handleInputChange} />
        </label>
        <label>
          Budget:
          <input type="number" name="budget" value={formData.budget} onChange={handleInputChange} />
        </label>
        <label>
          Images:
          <input type="file" name="images" multiple onChange={handleImageChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MangrUpload;
