import React from 'react';
import styled from 'styled-components';

const RestaurantTitle = styled.div`
  font-size: 36px;
  font-weight: Bold;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #333333;
  margin: 0px 0px 6px;
  padding: 6px 0px 0px
`;

const ClaimedTitle = styled.div`
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  display: inline-block;
  margin: 0;
  border: 0;
  padding-top: 12px;
  padding-left: 10px;
  vertical-align: baseline;
`;

const CheckButton = styled.div`
  color: #0073bb;
  margin-right: 5px;
`;

const RestaurantName = () => (
  <div className="restaurant-name">
    <RestaurantTitle>
      5A5 Steak Lounge
    </RestaurantTitle>
    <ClaimedTitle>
      <CheckButton className="fas fa-check-circle"></CheckButton>
      Claimed
    </ClaimedTitle>
  </div>
);

export default RestaurantName;
