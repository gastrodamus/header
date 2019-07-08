import React from 'react';
import RestaurantName from './RestaurantName.jsx';
import StarsReviewsDetails from './StarsReviewsDetails.jsx';

const HeaderLeft = () => (
  <div>
    <div className="restaurant-name">
      <RestaurantName />
    </div>
    <div className="stars-reviews-details">
      <StarsReviewsDetails />
    </div>
  </div>
);

export default HeaderLeft;
