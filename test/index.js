import 'babel-polyfill';
import Comments from '../src';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount } from 'enzyme';
import spies from 'chai-spies';
chai.use(chaiEnzyme()).use(spies).should();

describe('Comments', () => {
  it('renders a React element', () => {
    React.isValidElement(<Comments />).should.equal(true);
  });

  describe('Rendering', () => {
    let rendered = null;
    let comments = null;
    beforeEach(() => {
      rendered = mount(<Comments />);
      comments = rendered.find('.comments');
    });

    it('renders a top level div.comments', () => {
      comments.should.have.tagName('button');
      comments.should.have.className('comments');
    });

    it('renders the descendents', () => {
      comments = mount(<Comments />);
      comments.should.have.exactly(1).descendants('.comments__label');
      comments.should.have.exactly(1).descendants('.comments__icon');
      comments.find('.comments__label').should.have.tagName('div');
      comments.find('.comments__icon').should.have.tagName('div');
    });
  });

  describe('Number of comments', () => {
    let spiedShowComments = null;
    let spiedAddFirstComment = null;
    beforeEach(() => {
      spiedShowComments = chai.spy();
      spiedAddFirstComment = chai.spy();
    });

    it('should behave correctly when 0 comments', () => {
      const comments = mount(
        <Comments
          firstToCommentLabel="Be the first to comment"
          numberOfComments={0}
          viewCommentsLabel="View comments"
          showComments={spiedShowComments}
          addFirstComment={spiedAddFirstComment}
        />
      );
      comments.find('.comments__label').should.have.text('Be the first to comment');
      comments.simulate('click');
      spiedAddFirstComment.should.have.been.called.exactly(1);
      spiedShowComments.should.have.been.called.exactly(0);
    });

    it('should behave correctly when more than 0 comments', () => {
      const comments = mount(
        <Comments
          firstToCommentLabel="Be the first to comment"
          numberOfComments={250}
          viewCommentsLabel="View comments"
          showComments={spiedShowComments}
          addFirstComment={spiedAddFirstComment}
        />
      );
      comments.find('.comments__label').should.have.text('View comments (250)');
      comments.simulate('click');
      spiedShowComments.should.have.been.called.exactly(1);
      spiedAddFirstComment.should.have.been.called.exactly(0);
    });
  });

});
