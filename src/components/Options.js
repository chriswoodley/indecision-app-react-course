import React from 'react';
import Option from './Option'


const Options = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>

      <button
        className="button button--link"
        onClick={props.handleDeleteAllOptions}
      >
        Remove All
      </button>
    </div>

    {!props.options.length &&
      <p className="widget__message">Please add an option to get started.</p>
    }

    {
      props.options.map((option, idx) => (
        <Option
          key={idx}
          option={option}
          count={idx + 1}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))
    }
  </div>
);

export default Options;
