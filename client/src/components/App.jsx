import React from 'react';
import HeaderLeft from './HeaderLeft.jsx';
import HeaderRight from './HeaderRight.jsx';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fill_me_in : ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeDetailsModal = this.closeDetailsModal.bind(this);
    this.closeShareModal = this.closeShareModal.bind(this);
    this.closeSaveModal = this.closeSaveModal.bind(this);
  }

  openModal(e) {
    const className = e.target.className;
    const state = Object.assign({}, this.state);
    if (className === 'details') {
      state.detailsModalIsOpen = true;
    } else if (className === 'share') {
      state.shareModalIsOpen = true;
    } else if (className === 'save') {
      state.saveModalIsOpen = true;
    }
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
        <div>
          <HeaderLeft
            detailsModalStatus={this.state.detailsModalIsOpen}
            openModal={this.openModal}
            closeDetailsModal={this.closeDetailsModal}
          />
        </div>
        <div>
          <HeaderRight
            shareModalStatus={this.state.shareModalIsOpen}
            openModal={this.openModal}
            closeShareModal={this.closeShareModal}
            saveModalStatus={this.state.saveModalIsOpen}
            closeSaveModal={this.closeSaveModal}
          />
        </div>
      </div>
    )
  }
}

export default App;
