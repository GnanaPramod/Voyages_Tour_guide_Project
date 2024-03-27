// frontend/src/App.js
/**(1)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TourPgInfo() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/tours')
      .then(response => {
        setTours(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Tours</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {tours.map(tour => (
          <li key={tour._id}>
            <h2>{tour.locname}</h2>
            <p>Places: {tour.places}</p>
            <p>Description: {tour.description}</p>
            <p>Days: {tour.days}</p>
            <p>Budget: {tour.budget}</p>
            <p>Images:</p>
            <div>
              {tour.images.map(image => (
                <img key={image} src={`http://localhost:5000/uploads/${image}`} alt={image} style={{ maxWidth: '200px', margin: '5px' }} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TourPgInfo;**/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Places from '../../components/Places.jsx';
import Footer from '../../components/Footer.jsx';
import './TourPgInfo.css';

function TourPgInfo() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tours')
      .then(response => {
        setTours(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleSearch = () => {
    const filteredTours = tours.filter(tour => tour.locname.toLowerCase().includes(searchValue.toLowerCase()));
    setTours(filteredTours);
  };

  return (
    <div className="tour-page-info">
      <h1>Tours</h1>
      <div className="search-bar">
        <input
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Search by location name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>Error: {error}</p>}
      <div className="tour-container">
        {tours.map(tour => (
          <div key={tour.id} className="tour-card">
            {tour.images.length > 0 ? (
              <Places
                img={`http://localhost:5000/uploads/${tour.images[0]}`}  // Using the first image from the array
                name={tour.locname}
                info={' '}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default TourPgInfo;
