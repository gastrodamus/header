import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'));

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

const StarsReviewsDetails = (props) => {
  const detailStyle = Object.assign({}, props.detailStyle)
  return (
    <div className="srd-wrapper">
      <div style={SRDWrapper}> 
        <StarTitle>* * * *</StarTitle>
        <ReviewCountTitle>2125 reviews</ReviewCountTitle>
        <Button
          className="details"
          onClick={props.openDetailsModal}
        >Details
        </Button>
        <Modal
          isOpen={props.detailsModalStatus}
          onRequestClose={props.closeDetailsModal}
          style={detailStyle}
        >
          <h1>details modal</h1>
        </Modal>
      </div>
    </div>
  );
};

export default StarsReviewsDetails;
