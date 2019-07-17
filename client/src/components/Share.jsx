import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement(document.getElementById('app'))

const ShareTitle = styled.button`
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

const ShareBusinessHeader = styled.h2`
  color: #333;
  font-size: 21px;
  font-weight: bold;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  text-align: center;
`;

const FBButton = styled.button`
  color: #fff;
  background: #3b5998;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  width: 195px;
  height: 40px;
  margin: 5px;
`;

const TwitterButton = styled.button`
  color: #fff;
  background: #50abf1;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  width: 195px;
  height: 40px;
  margin: 5px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const ShareLink = styled.input`
  width: 400px;
  height: 20px;
  margin-left: 22px;
  margin-bottom: 20px;
`;

const ShareTitles = styled.span`
  color: #333;  
  font-size: 14px;
  font-weight: bold;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  margin-left: 22px;
  margin-top: 5px;
  margin-bottom: 8px;
`;

const ShareInputField = styled.input`
  width: 400px;
  height: 20px;
  margin-left: 22px;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const OptionalInputField = styled.input`
  width: 400px;
  height: 55px;
  margin-left: 22px;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const ShareTitleSmall = styled.span`
  color: #999;  
  font-size: 12px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  margin-top: 5px;
  margin-bottom: 8px;
`;

const ShareButton = styled.button`
  color: #fff ;
  background: #d32323;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  width: 210px;
  height: 40px;
  margin: 5px;
  text-align: center;
`;

const ShareButtonWrapper = styled.div`
  text-align: center;
`;

const NameWrapper = styled.div`
  margin-top: 20px;
`;

const Share = (props) => {
  const shareStyle = Object.assign({}, props.shareStyle)
  return (
    <div>
      <ShareTitle
        className="share"
        onClick={props.openShareModal}
      ><i className="fas fa-share-square"></i> Share
      </ShareTitle>
      <Modal
        isOpen={props.shareModalStatus}
        onRequestClose={props.closeShareModal}
        style={shareStyle}
      >
        <div>
          <div>
            <ShareBusinessHeader>Share business</ShareBusinessHeader>
          </div>
          <div className="space-div-notsureifneeded"></div>
          <div>
            <ButtonWrapper>
              <FBButton><i className="fab fa-facebook-square"></i> Share on Facebook</FBButton>
              <TwitterButton><i className="fab fa-twitter"></i> Share on Twitter</TwitterButton>
            </ButtonWrapper>
            <div>
              <ShareLink></ShareLink>
            </div>
            <hr></hr>
            <div>
              <NameWrapper>
                <label>
                  <ShareTitles>Your Name</ShareTitles>
                </label>
                <ShareInputField></ShareInputField>
              </NameWrapper>
              <div>
                <label>
                  <ShareTitles>Your Email</ShareTitles>
                </label>
                <ShareInputField></ShareInputField>
              </div>
              <div>
                <label>
                  <ShareTitles>To</ShareTitles>
                  <ShareTitleSmall> Email addresses</ShareTitleSmall>
                </label>
                <ShareInputField></ShareInputField>
              </div>
              <div>
                <label>
                  <ShareTitles>Add a note</ShareTitles>
                  <ShareTitleSmall> Optional</ShareTitleSmall>
                </label>
                <OptionalInputField></OptionalInputField>
              </div>
            </div>
            <ShareButtonWrapper>
              <ShareButton>Share</ShareButton>
            </ShareButtonWrapper>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Share;
