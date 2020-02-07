import * as React from 'react'
import { gotNewMessage, Message, sendMessage } from '../store/Chat'
import { connect } from 'react-redux'

class NewMessageEntry extends React.Component<NewMessageDispatchToProps> {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (event: any) => {
    event.preventDefault()
    const content: string = event.target.content.value
    const date: Date = new Date()
    const timestamp: number = date.getMilliseconds()
    console.log('TIMESTAMP ==>', timestamp)
    const newMessage: Message = {
      content: content,
      timestamp: timestamp
    }
    this.props.sendMessage(newMessage)
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

interface NewMessageMapStateToProps {
  user: object
}

interface NewMessageDispatchToProps {
  sendMessage: (newMessage: Message) => {newMessage: Message}
}

const mapStateToProps = (state: any): NewMessageMapStateToProps => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch: any): NewMessageDispatchToProps => {
  return {
    sendMessage: (newMessage: Message) => dispatch(sendMessage(newMessage))
  }
}

export const ConnectNewMessageEntry = connect(mapDispatchToProps)(NewMessageEntry)
