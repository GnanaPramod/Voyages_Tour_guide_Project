// AboutUs.js
import React from 'react';
import './AboutUs.css';

const About = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="description">
        <p>Welcome to Voyages, your one-stop destination for planning amazing trips!</p>
        <p>At Voyages, we specialize in creating personalized travel experiences tailored to your needs.</p>
        {/* Add more information about your company */}
      </div>
      <div className="trip-planner">
        <h2>Trip Planner</h2>
        {/* Add trip planning form */}
      </div>
      <div className="guide-assignment">
        <h2>Guide Assignment</h2>
        {/* Add guide assignment feature */}
      </div>
    </div>
  );
};

export default About;

