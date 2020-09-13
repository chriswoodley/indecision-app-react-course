import React from 'react';

const Action = (props) => (
  <div>
    <button
      className="big-button"
      disabled={props.shouldBeDisabled}
      onClick={props.handleAction}
    >
      What Should I Do?
    </button>
  </div>
);

export default Action;
