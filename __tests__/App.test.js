import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App.jsx';

describe('First react component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});

