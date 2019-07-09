import React from 'react';
import RestaurantName from './RestaurantName.jsx';
import StarsReviewsDetails from './StarsReviewsDetails.jsx';

const HeaderLeft = props => (
  <div className="header-left">
    <div className="restaurant-name">
      <RestaurantName />
    </div>
    <div className="stars-reviews-details">
      <StarsReviewsDetails
        detailsModalStatus={props.detailsModalStatus}
        openDetailsModal={props.openDetailsModal}
        closeDetailsModal={props.closeDetailsModal}
      />
    </div>
  </div>
);

export default HeaderLeft;
