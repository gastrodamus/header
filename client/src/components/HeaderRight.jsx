import React from 'react';
import WriteReview from './WriteReview.jsx';
import PhotoShareSave from './PhotoShareSave.jsx';

const HeaderRight = props => (
  <div className="header-right">
    <div className="write-review">
      <WriteReview />
    </div>
    <div>
      <PhotoShareSave
        shareModalStatus={props.shareModalStatus}
        openShareModal={props.openShareModal}
        closeShareModal={props.closeShareModal}
        saveModalStatus={props.saveModalStatus}
        openSaveModal={props.openSaveModal}
        closeSaveModal={props.closeSaveModal}
      />
    </div>
  </div>
);

export default HeaderRight;
