import React, { Component } from 'react'
import socketIOClient from "socket.io-client"
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'



//const URL = 'ws://localhost:3030'
 const socket = socketIOClient(this.state.endpoint);

class Chat extends Component {
  state = {
    name: 'Your Name',
    messages: [],
    endpoint: "ws://localhost:3030",
    users: 1
  }

  socket = new WebSocket(URL)

  componentDidMount() {
    this.socket.onopen = () => {
      // on connecting, do nothing but log it to the console
      this.setState({ users: this.state.users + 1 })
      console.log('user connected')

    }

    this.socket.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.socket.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        socket: new WebSocket(URL),
        users: this.state.users - 1
      })
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: this.state.name, message: messageString }
    this.socket.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    return (
      <div>
        <label htmlFor="users">
        users connected:{this.state.users}
        </label><br/>

        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id={'name'}
            placeholder={'Enter your name...'}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value})}
          />
        </label>
        <ChatInput
          socket={this.socket}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />
        {this.state.messages.map((message, index) =>
          <ChatMessage
            key={index}
            message={message.message}
            name={message.name}
          />

        )}

      </div>
    )
  }
}

export default Chat
