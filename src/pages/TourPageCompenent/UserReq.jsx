import React, { useState } from 'react';
import axios from 'axios';
import img2 from './tourimages/img2.jpg';
import { useNavigate } from 'react-router-dom';
const UserReq = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid:'',
    username: '',
    usrphno:'',
    email: '',
    locname:'',
    days:'',
    fromdate:'',
    todate:'',
    bdgt:'',
    plcs:''
    
  });
  
  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('/tourpage', formData);
      console.log(response.data);
      navigate('/tourpage/success');

      // Add any further actions you want to perform after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error
    }
  };

  return (
    <div>
      <img id = "backimg" src = {img2} alt = ""/>
      <div id = "heading">   User Requirements </div><br/><br/><br/><br/>
      <form id= "usr-req" onSubmit={handleSubmit}>
        <label>User Id</label><br/>
        <input id = "usrid" type = "number" name = "userid" placeholder='User Id' value= {formData.userid} onChange={handleChange} required /><br/><br/>
        <label>User Name</label><br/>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required /><br/><br/>
        <label>User Mobile Number</label><br/>
        <input type='number' name="usrphno" placeholder="Mobile Number" value={formData.usrphno} onChange={handleChange} required /><br/><br/>
        <label>User Email</label><br/>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br/><br/>
        <label>Location Name</label><br/>
        <input type='text' name="locname" placeholder="Location Name" value={formData.locname} onChange={handleChange} required /><br/><br/>
        <label>Expected Number of Days</label><br/>
        <input type= 'number' name="days" placeholder="Number of Days" value={formData.days} onChange={handleChange} required /><br/><br/>
        <label>From Date</label><br/>
        <input type= 'date' name="fromdate" placeholder="From Date" value={formData.fromdate} onChange={handleChange} required /><br/><br/>
        <label>To Date</label><br/>
        <input type= 'date' name="todate" placeholder="To Date" value={formData.todate} onChange={handleChange} required /><br/><br/>
        <label>Expected Budget</label>
        <input type= 'number' name="bdgt" placeholder="Expected Budget" value={formData.bdgt} onChange={handleChange} required /><br/><br/>
        <label>List Of Places</label><br/>
        <input type='text' name="plcs" placeholder="List of Places if interested/ NA" value={formData.plcs} onChange={handleChange} required /><br/><br/>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserReq;
