import React from 'react';
import Modal from 'react-modal';
import Share from './Share.jsx';
import Save from './Save.jsx';

Modal.setAppElement(document.getElementById('app'));

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 580,
    width: 440,
  },
};

const PhotoShareSave = props => (
  <div className="photo-share-save">
    <div>
      <button>Add photo</button>
    </div>
    <div>
      <Share 
        shareModalStatus={props.shareModalStatus}
        openShareModal={props.openShareModal}
        closeShareModal={props.closeShareModal}
      />
    </div>
    <div>
      <Save 
        saveModalStatus={props.saveModalStatus}
        openSaveModal={props.openSaveModal}
        closeSaveModal={props.closeSaveModal}
      />
    </div>
  </div>
);

export default PhotoShareSave;
