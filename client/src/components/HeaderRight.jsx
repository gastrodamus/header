import React from 'react';
import WriteReview from './WriteReview.jsx';
import PhotoShareSave from './PhotoShareSave.jsx';
import styled from 'styled-components';

const HeaderRightStyle = styled.div`
  display: inline-block;
`;

const WriteReviewDiv = styled.div`
  display: inline-block;
`;

const HeaderRightDiv = styled.div`
  display: inline-block;
  padding-top: 30px;
`;

const PhotoShareSaveDiv = styled.div`
  display: inline-block;
`;

const HeaderRight = props => (
  <HeaderRightDiv>
    <HeaderRightStyle>
      <WriteReviewDiv>
        <WriteReview />
      </WriteReviewDiv>
      <PhotoShareSaveDiv>
        <PhotoShareSave
          shareModalStatus={props.shareModalStatus}
          openShareModal={props.openShareModal}
          closeShareModal={props.closeShareModal}
          shareStyle={props.shareStyle}
          saveModalStatus={props.saveModalStatus}
          openSaveModal={props.openSaveModal}
          closeSaveModal={props.closeSaveModal}
          saveStyle={props.saveStyle}
        />
      </PhotoShareSaveDiv>
    </HeaderRightStyle>
  </HeaderRightDiv>
);

export default HeaderRight;
