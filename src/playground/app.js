const Header = (props) =>  (
  <div>
    <h1>{props.title}</h1>
    {props.subtitle && <h2>{props.subtitle}</h2>}
  </div>
);

Header.defaultProps = {
  title: 'Indecision'
}

const Action = (props) => (
  <div>
    <button
      disabled={props.shouldBeDisabled}
      onClick={props.handleAction}
    >
      What Should I Do?
    </button>
  </div>
);

const Options = (props) => (
  <div>
    <button onClick={props.handleDeleteAllOptions}>Remove All</button>

    {!props.options.length && <p>Please add an option to get started.</p>}

    {
      props.options.map((option, idx) => (
        <Option
          key={idx}
          option={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))
    }
  </div>
);

const Option = (props) => (
  <div>
    {props.option}
    <button
      onClick={(e) => {
        props.handleDeleteOption(props.option);
      }}
    >
      Remove
    </button>
  </div>
);

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
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
       {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="option" id="option"/>
          <button type="submit">Add Option</button>
        </form>
      </div>
    );
  }
}

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };

    this.handleDeleteAllOptions = this.handleDeleteAllOptions.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
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

  handleDeleteAllOptions() {
    this.setState(() => ({
      options: []
    }));
  }

  handleAction() {
    const idx = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[idx]);
  }

  handleAddOption(option) {
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

  handleDeleteOption(option) {
    this.setState((prevState) => ({
      options: prevState.options.filter((opt) => opt !== option),
    }));
  }

  render() {
    return (
      <div>
        <Header subtitle="Put your life in the hands of a computer!" />
        <Action
          shouldBeDisabled={!this.state.options.length}
          handleAction={this.handleAction}
        />
        <Options
          options={this.state.options}
          handleDeleteAllOptions={this.handleDeleteAllOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}



ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
