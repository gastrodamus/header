import React from 'react';
import { shallow } from 'enzyme';
import Details from '../client/src/components/Details';

describe('Details component rendering test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<Details />);
  });
});

describe('Details state', () => {
  it('checks state before function runs', () => {
    const wrapper = shallow(<Details />);
    expect(wrapper.instance().state.currentYearToggled).toEqual(false);
    expect(wrapper.instance().state.lastYearToggled).toEqual(false);
    expect(wrapper.instance().state.twoYearsAgoToggled).toEqual(false);
    expect(wrapper.instance().state.threeYearsAgoToggled).toEqual(false);
    expect(wrapper.instance().state.fourYearsAgoToggled).toEqual(false);
  });
});