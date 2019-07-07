import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

