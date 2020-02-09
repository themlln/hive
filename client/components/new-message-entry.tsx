import * as React from 'react'
import { gotNewMessage, sendMessage } from '../store/Chat'
import {Message} from '../types/storeTypes'
import {NewMessageDispatchToProps, NewMessageMapStateToProps} from '../types/componentTypes'
import { connect } from 'react-redux'

class NewMessageEntry extends React.Component<NewMessageMapStateToProps & NewMessageDispatchToProps> {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (event: any) => {
    event.preventDefault()
    const content: string = event.target.content.value
    const timestamp: string = new Date().toLocaleTimeString()
    const userId: number = this.props.user.id
    if (userId) {
      const newMessage: Message = {
        userId: userId,
        content: content,
        timestamp: timestamp
      }
      this.props.sendMessage(newMessage)
    } else {
      alert('You need to sign up to use mlln Chat.')
    }
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Type here..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Send</button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state: React.ComponentState): NewMessageMapStateToProps => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>): object => {
  return {
    sendMessage: (newMessage: Message) => dispatch(sendMessage(newMessage))
  }
}

export const ConnectNewMessageEntry = connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry)
