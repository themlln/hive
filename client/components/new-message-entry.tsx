import * as React from 'react'
import { gotNewMessage, Message } from '../store/Chat'
import { connect } from 'react-redux'

class NewMessageEntry extends React.Component<ChatDispatchToProps> {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (event: any) => {
    event.preventDefault()
    const date: Date = new Date()
    const content: string = event.target.content.value
    const timestamp: Date = date
    console.log('TIMESTAMP ==>', timestamp)
    const newMessage: Message = {
      content: content,
      timestamp: timestamp
    }
    this.props.gotNewMessage(newMessage)
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

interface ChatDispatchToProps {
  gotNewMessage: (newMessage: Message) => {newMessage: Message}
}

const mapDispatchToProps = (dispatch: any): ChatDispatchToProps => {
  return {
    gotNewMessage: (newMessage: Message) => dispatch(gotNewMessage(newMessage))
  }
}

export const ConnectNewMessageEntry = connect(mapDispatchToProps)(NewMessageEntry)
