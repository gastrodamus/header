import React from 'react';
import PriceCategoryEdit from './PriceCategoryEdit.jsx';

const StarsReviewsDetails = () => (
  <div>
    <div>
      <span>****</span>
      <span>200 reviews</span>
      <button
        className="details"
        onClick={props.openModal}
      >Details
      </button>
      <Modal 
        isOpen={props.detailsModalStatus}
        onRequestClose={props.closeDetailsModal}
        style={customStyles}
      />
    </div>
    <div>
      <PriceCategoryEdit />
    </div>
  </div>
);

export default StarsReviewsDetails;
