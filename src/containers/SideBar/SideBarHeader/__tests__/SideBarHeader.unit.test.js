import React from 'react';
import {shallow} from 'enzyme';
import SideBarHeader from '../SideBarHeader';

describe('SideBarHeader', () => {
  test('renders without title', () => {
    const wrapper = shallow(<SideBarHeader/>);
    expect(wrapper).toMatchSnapshot();
  });


  test('renders with an empty title', () => {
    const wrapper = shallow(<SideBarHeader title="" />);
    expect(wrapper).toMatchSnapshot();
  });

  test('renders with a title', () => {
    const wrapper = shallow(<SideBarHeader title="ust a title" />);
    expect(wrapper).toMatchSnapshot();
  });


});