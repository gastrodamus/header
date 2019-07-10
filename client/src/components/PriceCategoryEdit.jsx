import React from 'react';
import styled from 'styled-components';

const PriceTitle = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #333333;
  margin: 0 10px;
`;

const CategoryTitle = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #0073BB;
  margin: 0 10px;
`;

const Button = styled.button`
  font-size: 12px;
  color: #999999;
`;

const PCEWrapper = {
  height: 1,
  marginTop: -20,
  marginRight: 190,
};

const PriceCategoryEdit = () => {
  return (
    <div style={PCEWrapper} className="price-category-edit">
      <div>
        <PriceTitle>$$$</PriceTitle>
      </div>
      <div>
        <CategoryTitle>Steakhouses</CategoryTitle>
      </div>
      <div>
        <Button>Edit</Button>
      </div>
    </div>
  );
};

export default PriceCategoryEdit;
