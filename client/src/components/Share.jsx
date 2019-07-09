import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('app'))

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 570,
    width: 455,
  },
};

const Share = props => (
  <div>
    <button onClick={props.openShareModal}
    >Share
    </button>
    <Modal 
      isOpen={props.shareModalStatus}
      onRequestClose={props.closeShareModal}
      style={customStyles}
    />
  </div>
);

export default Share;
