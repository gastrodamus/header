import React from 'react';
import Modal from 'react-modal';
import Share from './Share.jsx';
import Save from './Save.jsx';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'));

const PhotoTitle = styled.button`
  height: 31px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 4px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #666666;
  background: #FFFFFF;
  padding: 5px 8px;
  outline: none;
  &:hover {
    cursor: pointer;
    background: rgb(245, 245, 245);
  }
`;

const PhotoShareSaveDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const PhotoShareSave = props => (
  <PhotoShareSaveDiv>
    <div>
      <PhotoTitle><i className="fas fa-camera"></i> Add photo</PhotoTitle>
    </div>
    <div>
      <Share
        shareModalStatus={props.shareModalStatus}
        openShareModal={props.openShareModal}
        closeShareModal={props.closeShareModal}
        shareStyle={props.shareStyle}
      />
    </div>
    <div>
      <Save
        saveModalStatus={props.saveModalStatus}
        openSaveModal={props.openSaveModal}
        closeSaveModal={props.closeSaveModal}
        saveStyle={props.saveStyle}
      />
    </div>
  </PhotoShareSaveDiv>
);

export default PhotoShareSave;
