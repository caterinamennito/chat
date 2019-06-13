import React from 'react'


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: Date.now()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    let newTime = Date.now();
    let stringy = newTime -this.state.time;
    console.log(this.state.time/1000);
    this.setState({
      time: parseInt(stringy)
    });
  }

  render() {
    return (
      <span className="App-clock">
        sent {this.state.time} m ago.
      </span>
    );
  }
}

export default Clock
