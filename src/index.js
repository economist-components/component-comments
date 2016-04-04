import React from 'react';

export default class Comments extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(clickEvent) {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    const { addFirstComment, showComments, numberOfComments } = this.props;
    const onClick = numberOfComments > 0 ? showComments : addFirstComment;
    if (typeof onClick === 'function') {
      onClick();
    }
  }

  render() {
    const { firstToCommentLabel, numberOfComments, viewCommentsLabel } = this.props;
    const label = (numberOfComments > 0) ?
      `${ viewCommentsLabel } (${ numberOfComments })` :
      firstToCommentLabel;
    return (
      <button className="comments" onClick={this.handleOnClick}>
        <div className="comments__icon icon icon--balloon-economist" />
        <div className="comments__label">
          {label}
        </div>
      </button>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  Comments.propTypes = {
    firstToCommentLabel: React.PropTypes.string.isRequired,
    numberOfComments: React.PropTypes.number.isRequired,
    addFirstComment: React.PropTypes.func,
    showComments: React.PropTypes.func,
    viewCommentsLabel: React.PropTypes.string.isRequired,
  };
}
