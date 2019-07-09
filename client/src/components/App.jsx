import React from 'react';
import HeaderLeft from './HeaderLeft.jsx';
import HeaderRight from './HeaderRight.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsModalIsOpen: false,
      shareModalIsOpen: false,
      saveModalIsOpen: false
    };

    this.openDetailsModal = this.openDetailsModal.bind(this);
    this.closeDetailsModal = this.closeDetailsModal.bind(this);
    this.openShareModal = this.openShareModal.bind(this);
    this.closeShareModal = this.closeShareModal.bind(this);
    this.openSaveModal = this.openSaveModal.bind(this);
    this.closeSaveModal = this.closeSaveModal.bind(this);
  }

  openDetailsModal() {
    const state = Object.assign({}, this.state);
    state.detailsModalIsOpen = true;
    this.setState(state);
  }

  closeDetailsModal() {
    const state = Object.assign({}, this.state);
    state.detailsModalIsOpen = false;
    this.setState(state);
  }

  openShareModal() {
    const state = Object.assign({}, this.state);
    state.shareModalIsOpen = true;
    this.setState(state);
  }

  closeShareModal() {
    const state = Object.assign({}, this.state);
    state.shareModalIsOpen = false;
    this.setState(state);
  }

  openSaveModal() {
    const state = Object.assign({}, this.state);
    state.saveModalIsOpen = true;
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
        <div>
          <HeaderLeft
            detailsModalStatus={this.state.detailsModalIsOpen}
            openDetailsModal={this.openDetailsModal}
            closeDetailsModal={this.closeDetailsModal}
          />
        </div>
        <div>
          <HeaderRight
            shareModalStatus={this.state.shareModalIsOpen}
            openShareModal={this.openShareModal}
            closeShareModal={this.closeShareModal}
            saveModalStatus={this.state.saveModalIsOpen}
            openSaveModal={this.openSaveModal}
            closeSaveModal={this.closeSaveModal}
          />
        </div>
      </div>
    );
  }
}

export default App;
