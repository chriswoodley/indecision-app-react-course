import React from 'react';

export default class AddOption extends React.Component {
  state = {
    error: undefined,
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const el = evt.target.elements.option;
    const option = el.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({
      error
    }));

    el.value = '';
  }

  render() {
    return (
      <div>
       {this.state.error && <p class="add-option-error">{this.state.error}</p>}
        <form
          className="add-option"
          onSubmit={this.handleSubmit}
        >
          <input
            className="add-option__input"
            type="text"
            name="option"
            id="option"
          />

          <button
            className="button add-option__button"
            type="submit"
          >
            Add Option
          </button>
        </form>
      </div>
    );
  }
}
