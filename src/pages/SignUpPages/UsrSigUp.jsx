
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./SignUpUser.css";
function UsrSigUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobileno: '',
    name: '',
   
    profilePicture: null
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const handleSignInClick = () => {
    navigate("/signincom/usrsignin");
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
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('mobileno', formData.mobileno);
    formDataToSend.append('name', formData.name);
    
    formDataToSend.append('profilePicture', formData.profilePicture);

    try {
      const response = await axios.post('http://localhost:5000/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage(response.data.message);
      //navigate('/postlist');
    } catch (error) {
      console.error("Error:", error);
      console.log("Response:", error.response);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="sign-up-user">
      <h2>User Sign Up</h2>
      <form onSubmit={handleSubmit}>
       <div className="user"> 
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} /><br/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /><br/>
        
        <input type="text" name="name" placeholder="Name " value={formData.name} onChange={handleChange} /><br/>
        <input type="text" name="mobileno" placeholder="Mobile number" value={formData.mobileno} onChange={handleChange} /><br/>
        <input type="file" name="profilePicture" onChange={handleFileChange} /><br/>
       </div> 
        <button type="submit">Sign Up</button>
        <button type = "submit" onClick={handleSignInClick}>Sign In</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      </form>
    </div>
  );
}

export default UsrSigUp;
