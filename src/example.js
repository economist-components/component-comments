import 'babel-polyfill';
import Comments from './';
import React from 'react';

const debug = console;
function showComments() {
  debug.log('Show more comments triggered.');
}

function addFirstComment() {
  debug.log('Add first comment triggered.');
}

export default (
  <div className="example-comments" style={{ margin: '2rem', padding: '1rem' }}>
    <h2>#comments > 0, onClick shows them</h2>
    <Comments
      firstToCommentLabel="Be the first to comment"
      numberOfComments={250}
      viewCommentsLabel="View comments"
      showComments={showComments}
    />
    <h2>0 comments, onClick adds the first comment</h2>
    <Comments
      firstToCommentLabel="Be the first to comment"
      numberOfComments={0}
      viewCommentsLabel="View comments"
      addFirstComment={addFirstComment}
    />
  </div>
);
