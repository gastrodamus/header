import React from 'react';
import WriteReview from './WriteReview.jsx';
import PhotoShareSave from './PhotoShareSave.jsx';

const HeaderRight = () => (
  <div className="header-right">
    <div className="write-review">
      <WriteReview />
    </div>
    <div>
      <PhotoShareSave />
    </div>
  </div>
);

export default HeaderRight;
