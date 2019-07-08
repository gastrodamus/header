import React from 'react';
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



const StarReviewsDetails = props => (
  <div>
    <div>
      <span>****</span>
      <span>200 reviews</span>
      <button
        onClick={props.openModal}
      >Details
      </button>
        <Modal 
          isOpen={props.modalStatus}
          onAfterOpen={props.afterOpenModal}
          onRequestClose={props.closeModal}
          style={customStyles}
        />
    </div>
  </div>
);

export default StarReviewsDetails;
