import React from 'react';
import styled from 'styled-components';

const RestaurantTitle = styled.div`
  font-size: 36px;
  font-weight: Bold;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #333333;
`;

const ClaimedTitle = styled.div`
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  display: inline-block;
  margin-top: 22px;
  margin-left: 5px;
`;

const CheckButton = styled.div`
  color: #0073bb;
  margin-right: 7px
`;

const RestaurantNameDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

const RestaurantName = props => (
  <RestaurantNameDiv>
    <RestaurantTitle>
      {props.restaurantName}
    </RestaurantTitle>
    <ClaimedTitle>
      <CheckButton className="fas fa-check-circle"></CheckButton>
      Claimed
    </ClaimedTitle>
  </RestaurantNameDiv>
);

export default RestaurantName;
