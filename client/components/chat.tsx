import * as React from 'react'
import {loadMessages, gotNewMessage, deleteMessage, Message, ChatState} from '../store/Chat'
import { SingleMessage} from './single-message'
import { ConnectNewMessageEntry } from './new-message-entry'
import { connect } from 'react-redux'

class Chat extends React.Component<ChatStateProps & ChatDispatchProps> {

  componentDidMount() {
    this.props.loadMessages(this.props.messages)
  }

  render() {
    return (
      <div>
        <ul className="message-list">
          { this.props.messages.map(message => <SingleMessage message={message} key={message.timestamp} />) }
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
  loadMessages: (messages: Message[]) => {messages: Message[]},
  deleteMessage: (timestamp: number) => {timestamp: number}
}
const mapStateToProps = (state: ChatState): ChatStateProps => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch: any): ChatDispatchProps => {
  return {
    loadMessages: (messages: Message[]) => dispatch(loadMessages(messages)),
    deleteMessage: (timestamp: number) => dispatch(deleteMessage(timestamp))
  }
}

const ConnectChat = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ConnectChat
