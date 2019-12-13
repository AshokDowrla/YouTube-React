
import React from 'react';
import {shallow} from 'enzyme';
import CommentHeader from '../CommentHeader';


describe('CommentsHeader', () => {
    test('CommentsHeader renders with props.amountComments = null', () => {
      const wrapper = shallow(
        <CommentHeader/>
      );
      expect(wrapper).toMatchSnapshot();
    });
  
    test('CommentsHeader renders with props.amountComments = 0', () => {
      const wrapper = shallow(
        <CommentHeader amountComments={123}/>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });