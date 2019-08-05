import React from 'react';
import styled from 'styled-components';

const PriceTitle = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #333333;
`;

const CategoryTitle = styled.span`
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #0073BB;
  margin-left: 10px;
`;

const Button = styled.button`
  font-size: 12px;
  color: #999999;
  margin-left: 10px;
  height: 20px;
  border-radius: 2px;
  outline: none;
  &:hover {
    cursor: pointer;
    background: rgb(245, 245, 245);
    color: #333;
  }
`;

const PriceCategoryEditDiv = styled.div`
  display: flex;
`;

const PriceCategoryEdit = (props) => {
  const { categoryNames } = props || null;
  let categoryTitle = null;
  if (categoryNames.length) {
    categoryTitle = categoryNames.slice(0, categoryNames.length - 1).map((el) => {
      return (
        <CategoryTitle>
          {el.category_name}
          ,
        </CategoryTitle>
      );
    });
    categoryTitle.push(<CategoryTitle>{categoryNames[categoryNames.length - 1].category_name}</CategoryTitle>);
  }
  return (
    <PriceCategoryEditDiv>
      <div>
        <PriceTitle>$$$</PriceTitle>
      </div>
      <div>
        {categoryTitle}
      </div>
      <div>
        <Button>Edit</Button>
      </div>
    </PriceCategoryEditDiv>
  );
};

export default PriceCategoryEdit;
