import React from 'react';
import HeaderLeft from './HeaderLeft.jsx';
import HeaderRight from './HeaderRight.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
  }

  openModal() {
    var state = Object.assign({}, this.state);
    state.modalIsOpen = true;
    this.setState(state);
    
    // let { modalIsOpen } = this.state;
    // this.setState({
    //   modalIsOpen: true;
    // })
  }

  closeModal() {
    var state = Object.assign({}, this.state);
    state.modalIsOpen = false;
    this.setState(state);


  }

  afterOpenModal() {
    // this.subtitle.style.color = '#f00';
    console.log('hello world')
  }

  render() {
    return (
      <div>
        <div>
          <HeaderLeft
            modalStatus={this.state.modalIsOpen}
            openModal={this.openModal}
            closeModal={this.closeModal}
            afterOpenModal={this.afterOpenModal}
          />
        </div>
        <div>
          <HeaderRight />
        </div>
      </div>
    )
  }
}

export default App;