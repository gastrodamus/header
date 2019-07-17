import React from 'react';
import RestaurantName from './RestaurantName.jsx';
import StarsReviewsDetails from './StarsReviewsDetails.jsx';
import PriceCategoryEdit from './PriceCategoryEdit.jsx';

const HeaderLeft = (props) => {
  return (
  <div>
    <div className="restaurant-name">
      <RestaurantName 
        restaurantName={props.restaurantName}
      />
    </div>
    <div className="stars-reviews-details">
      <StarsReviewsDetails
        detailsModalStatus={props.detailsModalStatus}
        openDetailsModal={props.openDetailsModal}
        closeDetailsModal={props.closeDetailsModal}
        detailStyle={props.detailStyle}
        reviewCount={props.reviewCount}
        averageStars={props.averageStars}
        reviews={props.reviews}
      />
    </div>
    <div>
      <PriceCategoryEdit 
        categoryNames={props.categoryNames}
      />
    </div>
  </div>
  );
}
export default HeaderLeft;
