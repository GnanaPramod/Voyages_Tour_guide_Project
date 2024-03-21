import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StarRating({ rating }) {
  return (
    <div>
      {rating}
    </div>
  );
}

function ViewReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="App">
      <h1>Tour Reviews</h1>
      <ul>
        {reviews.map(review => (
          <li key={review._id}>
            <strong>Location:</strong> {review.location} | <strong>Rating:</strong> <StarRating rating={review.rating} />
            <br />
            <strong>Comment:</strong> {review.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewReview;
