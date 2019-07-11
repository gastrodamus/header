import React from 'react';
import { shallow, render, mount } from 'enzyme';
import StarsReviewsDetails from '../client/src/components/StarsReviewsDetails.jsx';
import Share from '../client/src/components/Share.jsx';
import Save from '../client/src/components/Save.jsx';

describe('StarsReviewsDetails', () => {
  it('details button click should trigger details modal', () => {
    const clickFn = jest.fn();
    const wrapper = mount(<StarsReviewsDetails />);
    wrapper.setProps({
      openDetailsModal: clickFn,
    });
    wrapper.find('button').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
  it('share button click should trigger share modal', () => {
    const clickFn = jest.fn();
    const wrapper = mount(<Share />);
    wrapper.setProps({
      openShareModal: clickFn,
    });
    wrapper.find('button').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
  it('save button click should trigger save modal', () => {
    const clickFn = jest.fn();
    const wrapper = mount(<Save />);
    wrapper.setProps({
      openSaveModal: clickFn,
    });
    wrapper.find('button').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
