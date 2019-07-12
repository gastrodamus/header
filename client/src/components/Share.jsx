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
        <div>
          <div>
            <h2>Share Business</h2>
          </div>
          <div className="space-div-notsureifneeded"></div>
          <div className="share-options">
            <button>Share on Facebook</button>
            <button>Share on Twitter</button>
            <div>
              <input></input>
            </div>
            <hr></hr>
            <div>
              <div>
                <label>
                  <span>Your Name</span>
                </label>
                <input></input>
              </div>
              <div>
                <label>
                  <span>Your Email</span>
                </label>
                <input></input>
              </div>
              <div>
                <label>
                  <span>To</span>
                  <span>Email addresses</span>
                </label>
                <input></input>
              </div>
              <div>
                <label>
                  <span>Add a note</span>
                  <span>Optional</span>
                </label>
                <input></input>
              </div>
            </div>
            <button>Share</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Share;
