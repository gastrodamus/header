import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Details from './Details.jsx'

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

const SRDWrapper = {
  height: 50,
  marginTop: -15,
  marginRight: 170,
  display: 'flex',
  justifyContent: 'center',
};

const StarsReviewsDetails = props => (
  <div className="srd-wrapper">
    <div style={SRDWrapper}>
      <StarTitle>{props.averageStars} stars</StarTitle>
      <ReviewCountTitle>{props.reviewCount} reviews</ReviewCountTitle>
      <Details
        detailsModalStatus={props.detailsModalStatus}
        closeDetailsModal={props.closeDetailsModal}
        openDetailsModal={props.openDetailsModal}
        detailStyle={props.detailStyle}
        reviews={props.reviews}
      />
    </div>
  </div>
);

export default StarsReviewsDetails;
