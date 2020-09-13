class Visibility extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldToggleDetail: false,
    };

    this.handleVisibility = this.handleVisibility.bind(this);
  }

  handleVisibility() {
    this.setState((prevState) => {
      return {
        shouldToggleDetail: !prevState.shouldToggleDetail,
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>

        <button onClick={ this.handleVisibility }>
          { this.state.shouldToggleDetail ? 'Hide Details' : 'Show Details' }
        </button>

        { this.state.shouldToggleDetail && <p>Hey, these are some details you can now see!</p> }
    </div>
    );
  }
}


ReactDOM.render(<Visibility />, document.getElementById('app'));
