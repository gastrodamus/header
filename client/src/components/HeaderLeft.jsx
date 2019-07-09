import React from 'react';
import RestaurantName from './RestaurantName.jsx';
import StarsReviewsDetails from './StarsReviewsDetails.jsx';

const HeaderLeft = props => (
  <div>
    <div className="restaurant-name">
      <RestaurantName />
    </div>
    <div className="stars-reviews-details">
      <StarsReviewsDetails
        modalStatus={props.modalStatus}
        openModal={props.openModal}
        closeModal={props.closeModal}
        afterOpenModal={props.afterOpenModal}
      />
    </div>
  </div>
);

export default HeaderLeft;
