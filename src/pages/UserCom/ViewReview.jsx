import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewReview.css';
function StarRating({ rating }) {
  return (
    <div>
      {rating}
    </div>
  );
}

function ViewReview() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => console.log(error));
  }, []);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredReviews = reviews.filter(review =>
    review.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div id = "head1">
      <h1>Tour Reviews</h1>
      
      <input id ="search1"
        type="text"
        placeholder="Search by location"
        value={searchTerm}
        onChange={handleSearch}
      /><br/><br/><br/><br/><br/>
      <ul>
      {filteredReviews.map(review => (
          <li key={review._id}>
            <strong>Location: </strong> {review.location}<br /><br/>
            <strong>UserEmail: </strong>{review.userEmail}<br/><br/>
            <strong>Rating: </strong> <StarRating rating={review.rating} />
            <br />
            <strong>Comment: </strong> <br />{review.comment}<br /><br /><br/><br/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewReview;

/**{reviews.map(review => (
  <li key={review._id}>
    <strong>Location:</strong> {review.location}<br/>  <strong>Rating:</strong> <StarRating rating={review.rating} />
    <br />
    <strong>Comment:</strong> <br/>{review.comment}<br/><br/>
  </li>
))}**/