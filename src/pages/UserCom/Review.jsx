/**(1)import React, { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

function Review() {
  const [ratings, setRatings] = useState({
    guidePerformance: {
      knowledge: { rating: 0, description: '' },
      communication: { rating: 0, description: '' },
      engagement: { rating: 0, description: '' },
      friendliness: { rating: 0, description: '' },
      rating: 0
    },
    locationExperience: {
      accessibility: { rating: 0, description: '' },
      cleanliness: { rating: 0, description: '' },
      safety: { rating: 0, description: '' },
      facilities: { rating: 0, description: '' },
      rating: 0
    },
    tourOrganization: {
      timing: { rating: 0, description: '' },
      itinerary: { rating: 0, description: '' },
      pace: { rating: 0, description: '' },
      rating: 0
    },
    valueForMoney: {
      pricing: { rating: 0, description: '' },
      overallSatisfaction: { rating: 0, description: '' },
      rating: 0
    },
    overallExperience: {
      enjoyment: { rating: 0, description: '' },
      memorability: { rating: 0, description: '' },
      rating: 0
    }
  });

  const handleRatingChange = (category, factor, value) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [category]: {
        ...prevRatings[category],
        [factor]: { ...prevRatings[category][factor], rating: value }
      }
    }));
  };

  const handleDescriptionChange = (category, factor, value) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [category]: {
        ...prevRatings[category],
        [factor]: { ...prevRatings[category][factor], description: value }
      }
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/reviews', { ratings });
      console.log('Response:', response.data);
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again later.');
    }
  };

  const renderStarRating = (category, factor) => {
    return (
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name={`${category}-${factor}-rating`}
                value={ratingValue}
                onClick={() => handleRatingChange(category, factor, ratingValue)}
              />
              <FaStar
                className="star"
                color={ratingValue <= ratings[category][factor].rating ? '#ffc107' : '#e4e5e9'}
                size={20}
              />
            </label>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h2>Enter Your Review</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(ratings).map(([category, factors]) => (
          <div key={category}>
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            {Object.entries(factors).map(([factor, value]) => (
              <div key={factor}>
                {factor !== 'rating' && (
                  <>
                    <label>{factor.charAt(0).toUpperCase() + factor.slice(1)}:</label>
                    {renderStarRating(category, factor)}
                  </>
                )}
                {factor === 'rating' && (
                  <input
                    type="text"
                    value={value.description}
                    onChange={(e) => handleDescriptionChange(category, factor, e.target.value)}
                    placeholder="Enter description"
                    required
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default Review;**/
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StarRating({ rating, onRatingChange }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      {stars.map((star, index) => (
        <span
          key={index}
          style={{ cursor: 'pointer', color: star <= rating ? 'orange' : 'gray' }}
          onClick={() => onRatingChange(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

function Review() {
  const [reviews, setReviews] = useState([]);
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      location,
      rating,
      comment,
    };
    axios.post('http://localhost:5000/api/reviews', newReview)
      .then(response => {
        setReviews([...reviews, response.data]);
        setLocation('');
        setRating(0);
        setComment('');
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <h1>Tour Reviews</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <label>
          Rating:
          <StarRating rating={rating} onRatingChange={setRating} />
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        </label>
        <button type="submit">Submit Review</button>
      </form>
      
    </div>
  );
}

export default Review;
/**<h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            <strong>Location:</strong> {review.location} | <strong>Rating:</strong> {review.rating} | <strong>Comment:</strong> {review.comment}
          </li>
        ))}
      </ul>**/