import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'))

const SaveTitle = styled.button`
  height: 31px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 5px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  color: #666666;
  background: #FFFFFF;
  padding: 5px 8px;
`;


const Save = (props) => {
  const saveStyle = Object.assign({}, props.saveStyle)
  return (
    <div>
      <SaveTitle
        className="save"
        onClick={props.openSaveModal}
      >Save
      </SaveTitle>
      <Modal
        isOpen={props.saveModalStatus}
        onRequestClose={props.closeSaveModal}
        style={saveStyle}
      >
        <h1>save modal</h1>
      </Modal>
    </div>
  );
};

export default Save;
