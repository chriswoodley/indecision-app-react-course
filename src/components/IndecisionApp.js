import React from 'react';

import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined,
  };

  handleDeleteAllOptions = () => {
    this.setState(() => ({
      options: []
    }));
  }

  handleAction = () => {
    const idx = Math.floor(Math.random() * this.state.options.length);
    this.setState(() => ({
      selectedOption: this.state.options[idx]
    }));
  }

  handleClearSelectedOption = () => {
    this.setState(() => ({
      selectedOption: undefined
    }));
  }

  handleAddOption = (option) => {
    if (!option) {
      return 'Option is required.'
    }

    if (this.state.options.includes(option)) {
      return `Option ${option} already exist.`;
    }

    this.setState((prevState) => ({
      options: [...prevState.options, option]
    }));
  }

  handleDeleteOption = (option) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((opt) => opt !== option),
    }));
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({
          options
        }));
      }
    } catch (error) {
      // do nothing
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      localStorage.setItem('options', JSON.stringify(this.state.options))
    }
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  render() {
    return (
      <div>
        <Header subtitle="Put your life in the hands of a computer!" />

        <div className="container">
          <Action
            shouldBeDisabled={!this.state.options.length}
            handleAction={this.handleAction}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteAllOptions={this.handleDeleteAllOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>

        <OptionModal
          option={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}
