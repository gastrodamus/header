import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'))

const ShareTitle = styled.button`
  height: 31px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #666666;
  background: #FFFFFF;
  padding: 5px 8px;
`;

const Share = (props) => {
  const shareStyle = Object.assign({}, props.shareStyle)
  return (
    <div>
      <ShareTitle
        className="share"
        onClick={props.openShareModal}
      >Share
      </ShareTitle>
      <Modal
        isOpen={props.shareModalStatus}
        onRequestClose={props.closeShareModal}
        style={shareStyle}
      >
        <h1>share modal</h1>
      </Modal>
    </div>
  );
};

export default Share;
