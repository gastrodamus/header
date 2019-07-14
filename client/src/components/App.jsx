import React from 'react';
import HeaderLeft from './HeaderLeft.jsx';
import HeaderRight from './HeaderRight.jsx';

const shareStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 570,
    width: 450,
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.7)",
  },
};

const detailsStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 630,
    width: 500,
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.7)",
  },
};

const saveStyle = {
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
  overlay: {
    background: "rgba(0, 0, 0, 0.7)",
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsModalIsOpen: false,
      shareModalIsOpen: false,
      saveModalIsOpen: false,
      modalStyle: '',
    };

    this.openDetailsModal = this.openDetailsModal.bind(this);
    this.openShareModal = this.openShareModal.bind(this);
    this.openSaveModal = this.openSaveModal.bind(this);

    this.closeDetailsModal = this.closeDetailsModal.bind(this);
    this.closeShareModal = this.closeShareModal.bind(this);
    this.closeSaveModal = this.closeSaveModal.bind(this);
  }

  openDetailsModal () {
    const state = Object.assign({}, this.state);
    state.detailsModalIsOpen = true;
    state.modalStyle = detailsStyle;
    this.setState(state);
  }

  openShareModal () {
    const state = Object.assign({}, this.state);
    state.shareModalIsOpen = true;
    state.modalStyle = shareStyle;
    this.setState(state);
  }

  openSaveModal () {
    const state = Object.assign({}, this.state);
    state.saveModalIsOpen = true;
    state.modalStyle = saveStyle;
    this.setState(state);
  }

  closeDetailsModal() {
    const state = Object.assign({}, this.state);
    state.detailsModalIsOpen = false;
    this.setState(state);
  }

  closeShareModal() {
    const state = Object.assign({}, this.state);
    state.shareModalIsOpen = false;
    this.setState(state);
  }

  closeSaveModal() {
    const state = Object.assign({}, this.state);
    state.saveModalIsOpen = false;
    this.setState(state);
  }

  render() {
    return (
      <div className="flex-container">
        <div className="header-left">
          <HeaderLeft
            detailsModalStatus={this.state.detailsModalIsOpen}
            openDetailsModal={this.openDetailsModal}
            closeDetailsModal={this.closeDetailsModal}
            detailStyle={this.state.modalStyle}
          />
        </div>
        <div>
          <HeaderRight
            shareModalStatus={this.state.shareModalIsOpen}
            openShareModal={this.openShareModal}
            closeShareModal={this.closeShareModal}
            shareStyle={this.state.modalStyle}
            saveModalStatus={this.state.saveModalIsOpen}
            openSaveModal={this.openSaveModal}
            closeSaveModal={this.closeSaveModal}
            saveStyle={this.state.modalStyle}
          />
        </div>
      </div>
    );
  }
}

export default App;
