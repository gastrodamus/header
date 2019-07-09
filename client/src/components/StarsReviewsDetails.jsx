import React from 'react';
import PriceCategoryEdit from './PriceCategoryEdit.jsx';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'))

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 630,
    width: 500,
  },
};

// const ModalWrapper = styled.div`
//   top: '50%';
//   left: '50%';
//   right: 'auto';
//   bottom: 'auto';
//   marginRight: '-50%';
//   transform: 'translate(-50%; -50%)';
//   height: 646;
//   width: 540;
// `;

const StarsReviewsDetails = props => (
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
