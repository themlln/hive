import * as React from 'react'
import { gotNewMessage, Message, sendMessage } from '../store/Chat'
import { connect } from 'react-redux'

class NewMessageEntry extends React.Component<ChatDispatchToProps> {
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
      user: {
        name: 'Lucy',
        image: 'https://www.rover.com/blog/wp-content/uploads/2019/06/bernese-mountain-dog-1177074_1920-960x540.jpg'
      },
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

interface ChatDispatchToProps {
  sendMessage: (newMessage: Message) => {newMessage: Message}
}

const mapDispatchToProps = (dispatch: any): ChatDispatchToProps => {
  return {
    sendMessage: (newMessage: Message) => dispatch(sendMessage(newMessage))
  }
}

export const ConnectNewMessageEntry = connect(mapDispatchToProps)(NewMessageEntry)
