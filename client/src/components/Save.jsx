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
    height: 640,
    width: 500,
  },
};

const Save = props => (
  <div>
    <button 
      className="save"
      onClick={props.openModal}
    >Save
    </button>
    <Modal 
      isOpen={props.saveModalStatus}
      onRequestClose={props.closeSaveModal}
      style={customStyles}
    />
  </div>
);

export default Save;