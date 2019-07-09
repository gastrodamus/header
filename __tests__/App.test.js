import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App.jsx';

describe('React component rendering test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});

