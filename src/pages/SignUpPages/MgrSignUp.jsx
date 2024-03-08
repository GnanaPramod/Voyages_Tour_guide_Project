// Frontend (React.js)
// Frontend (React.js)
// Frontend (React.js)

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MgrSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    profilePicture: null,
    mgrid: '' // Manager ID field
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignInClick = () => {
    navigate("/signincom/mgrsignin");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.mgrid) {
      setError('All fields are required');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('profilePicture', formData.profilePicture);
      formDataToSend.append('mgrid', formData.mgrid);
      console.log(formData.mgrid);
      const response = await axios.post('http://localhost:5000/mgrsignup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      console.log("Response:", error.response);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Manager Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} /><br/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /><br/>
        <input type="text" name="name" placeholder="Name (Optional)" value={formData.name} onChange={handleChange} /><br/>
        <input type="file" name="profilePicture" onChange={handleFileChange} /><br/>
        <input type="text" name="mgrid" placeholder="Manager ID" value={formData.mgrid} onChange={handleChange} /><br/> {/* Manager ID field */}
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleSignInClick}>Sign In</button> {/* Changed to type="button" */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      </form>
    </div>
  );
}

export default MgrSignUp;
