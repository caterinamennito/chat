import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' })
    };
  }
  render() {
    return (
      <small>  {this.state.time}</small>
      );
  }
}

export default Timer;
