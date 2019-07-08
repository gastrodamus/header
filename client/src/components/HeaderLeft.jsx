import React from 'react';
import RestaurantName from './RestaurantName.jsx';
import StarReviewsDetails from './StarsReviewsDetails.jsx';

const HeaderLeft = (props) => (
  <div>
    HeaderLeft
    <div>
      <RestaurantName />
      <StarReviewsDetails
        modalStatus={props.modalStatus}
        openModal={props.openModal}
        closeModal={props.closeModal}
        afterOpenModal={props.afterOpenModal}
      />
    </div>
  </div>
);

export default HeaderLeft;
