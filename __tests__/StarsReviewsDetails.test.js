import React from 'react';
import { shallow } from 'enzyme';
import StarsReviewsDetails from '../client/src/components/StarsReviewsDetails.jsx';

describe('StarsReviewsDetails', () => {
  it('button click should trigger modal', () => {
    const clickFn = jest.fn();
    const component = shallow(<StarsReviewsDetails onClick={clickFn()} />);
    component.find('.details').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
