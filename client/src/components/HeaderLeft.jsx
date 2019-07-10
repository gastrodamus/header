import React from 'react';
import RestaurantName from './RestaurantName.jsx';
import StarsReviewsDetails from './StarsReviewsDetails.jsx';
import PriceCategoryEdit from './PriceCategoryEdit.jsx';

const HeaderLeft = props => (
  <div>
    <div className="restaurant-name">
      <RestaurantName />
    </div>
    <div className="stars-reviews-details">
      <StarsReviewsDetails
        detailsModalStatus={props.detailsModalStatus}
        openModal={props.openModal}
        closeDetailsModal={props.closeDetailsModal}
      />
    </div>
    <div>
      <PriceCategoryEdit />
    </div>
  </div>
);

export default HeaderLeft;
