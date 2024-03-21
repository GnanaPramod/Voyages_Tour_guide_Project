import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./SignUpGuide.css";
function GuideSig() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    locname:'',
    name: '',
    mobileno: '',
    profilePicture: null,
    guideid: '' // Manager ID field
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignInClick = () => {
    navigate("/signincom/guidesignin");
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
    if (!formData.username || !formData.email || !formData.password || !formData.guideid) {
      setError('All fields are required');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('locname', formData.locname);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('mobileno', formData.mobileno);
      formDataToSend.append('profilePicture', formData.profilePicture);
      formDataToSend.append('guideid', formData.guideid);
      console.log(formData.guideid);
      const response = await axios.post('http://localhost:5000/guidesignup', formDataToSend, {
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
    <div className="sign-up-gui">
      <h2>Guide Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <div className="guide">
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} /><br/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br/>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /><br/>
        <input type="text" name="locname" placeholder="Loc Name (Optional)" value={formData.locname} onChange={handleChange} /><br/>
        <input type="text" name="name" placeholder="Name " value={formData.name} onChange={handleChange} /><br/>
        <input type="text" name="mobileno" placeholder="Mobile Number" value={formData.mobileno} onChange={handleChange} /><br/>
        <input type="file" name="profilePicture" onChange={handleFileChange} /><br/>
        <input type="text" name="guideid" placeholder="Guide ID" value={formData.guideid} onChange={handleChange} /><br/> {/* Manager ID field */}
      </div>
      <div className="gsb">
        <button className="gsb1" type="submit">Sign Up</button>
        <button className="gsb2" type="button" onClick={handleSignInClick}>Sign In</button> {/* Changed to type="button" */}
       </div> 
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      </form>
    </div>
  );
}

export default GuideSig;
