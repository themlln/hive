import * as React from 'react'
import { fetchMessages, deleteMessage, Message, ChatState } from '../store/Chat'
import { SingleMessage } from './single-message'
import { ConnectNewMessageEntry } from './new-message-entry'
import { connect } from 'react-redux'

class Chat extends React.Component<ChatStateProps & ChatDispatchProps> {

  componentDidMount() {
    this.props.fetchMessages()
  }

  render() {
    return (
      <div>
        <p>This is a test!</p>
        <ul className="message-list">
          { this.props.messages.map(message => <SingleMessage message={message} key={message.timestamp} deleteMessage={this.props.deleteMessage} />) }
        </ul>
        <ConnectNewMessageEntry />
      </div>
    );
  }
}

//INTERFACE
interface ChatStateProps {
  messages: Message[]
}

interface ChatDispatchProps {
  fetchMessages: () => {},
  deleteMessage: (message: Message) => {message: Message}
}
const mapStateToProps = (state: ChatState): ChatStateProps => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch: any): ChatDispatchProps => {
  return {
    fetchMessages: () => dispatch(fetchMessages()),
    deleteMessage: (message: Message) => dispatch(deleteMessage(message))
  }
}

const ConnectChat = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ConnectChat
