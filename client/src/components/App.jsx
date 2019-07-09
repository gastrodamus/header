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
  }

  render() {
    return (
      <div className="flex-container">
        <div className="header-left">
          <HeaderLeft />
        </div>
        <div>
          <HeaderRight />
        </div>
      </div>
    )
  }
}

export default App;
