
import React from 'react';
import { shallow } from 'enzyme';
import SideBarItem from '../SideBarItem';


describe('SideBarItem', () => {


    test('Render non-highlighted SideBarItem', () => {
        const wrapper = shallow(
            <SideBarItem icon='fire' label='Trending' location={location} />
        );
        expect(wrapper).toMatchSnapshot();
    });


    test('Render highlighted SideBarItem', () => {
        const wrapper = shallow(
            <SideBarItem icon='fire'  label='Trending' highlight />
        );
        expect(wrapper).toMatchSnapshot();
    });



});