import React from 'react';
import HeaderLeft from './HeaderLeft.jsx';
import HeaderRight from './HeaderRight.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <div>
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