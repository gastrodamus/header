import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'));

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

const StarTitle = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #333333;
  margin: 0px 6px 0px 0px;
`;

const ReviewCountTitle = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #666666;
`;

const Button = styled.button`
  font-size: 12px;
  color: #999999;
  padding: 0 6px;
  margin-left: 10px; 
`;

const SRDWrapper = {
  height: 50,
  marginTop: -15,
  marginRight: 170,
};

const StarsReviewsDetails = props => (
  <div>
    <div style={SRDWrapper}> 
      <StarTitle>* * * *</StarTitle>
      <ReviewCountTitle>2125 reviews</ReviewCountTitle>
      <Button
        className="details"
        onClick={props.openModal}
      >Details
      </Button>
      <Modal 
        isOpen={props.detailsModalStatus}
        onRequestClose={props.closeDetailsModal}
        style={customStyles}
      />
    </div>
  </div>
);

export default StarsReviewsDetails;
