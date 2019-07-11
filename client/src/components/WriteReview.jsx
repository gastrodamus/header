import React from 'react';
import styled from 'styled-components';

const ReviewTitle = styled.button`
  height: 36px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #FFFFFF;
  background: #D32323;
  margin: 0px 12px 0px 0px;
  padding: 8px 19px 9px 12px;
`;

const WriteReview = () => (
  <div>
    <ReviewTitle>Write a Review</ReviewTitle>
  </div>
);

export default WriteReview;
