import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App.jsx';

describe('App component rendering test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});

describe('App state', () => {
  it('checks state before function runs', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.instance().state.detailsModalIsOpen).toEqual(false);
    expect(wrapper.instance().state.shareModalIsOpen).toEqual(false);
    expect(wrapper.instance().state.saveModalIsOpen).toEqual(false);
  });
  it('updates details state when openDetails method is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().openDetailsModal();
    expect(wrapper.instance().state.detailsModalIsOpen).toBe(true);
  });
  it('updates share state when openShare method is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().openShareModal();
    expect(wrapper.instance().state.shareModalIsOpen).toBe(true);
  });
  it('updates save state when openSave method is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().openSaveModal();
    expect(wrapper.instance().state.saveModalIsOpen).toBe(true);
  });
  it('updates details state when closeDetails method is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().closeDetailsModal();
    expect(wrapper.instance().state.detailsModalIsOpen).toBe(false);
  });
  it('updates share state when closeShare method is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().closeShareModal();
    expect(wrapper.instance().state.shareModalIsOpen).toBe(false);
  });
  it('updates save state when closeSave method is called', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().closeSaveModal();
    expect(wrapper.instance().state.saveModalIsOpen).toBe(false);
  });
});
