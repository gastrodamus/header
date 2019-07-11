import React from 'react';
import WriteReview from './WriteReview.jsx';
import PhotoShareSave from './PhotoShareSave.jsx';

const RPSSWrapper = {
  height: 50,
  marginTop: 30,
  marginRight: 80,
};

const headerRightStyle = {
  marginRight: 100,
};

const HeaderRight = props => (
  <div style={headerRightStyle}>
    <div className="header-right" style={RPSSWrapper}>
      <div className="write-review">
        <WriteReview />
      </div>
      <div>
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
      </div>
    </div>
  </div>
);

export default HeaderRight;
