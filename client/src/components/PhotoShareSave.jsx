import React from 'react';

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
        openModal={props.openModal}
        closeShareModal={props.closeShareModal}
      />
    </div>
    <div>
      <Save 
        saveModalStatus={props.saveModalStatus}
        openModal={props.openModal}
        closeSaveModal={props.closeSaveModal}
      />
    </div>
  </div>
);

export default PhotoShareSave;
