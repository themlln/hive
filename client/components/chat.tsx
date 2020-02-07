import * as React from 'react'
import { fetchMessages, deleteMessage } from '../store/Chat'
import { Message, ChatState } from '../types/storeTypes'
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
        {/* <div>WHAT IS THE {this.props.chat.messages[0]}??</div> */}
        <ul className="message-list">
          {this.props.chat.messages.map((message: object) => <SingleMessage message={message} key={message.id} deleteMessage={this.props.deleteMessage} user={this.props.user} />)}
        </ul>
        <ConnectNewMessageEntry />
      </div>
    );
  }
}

//INTERFACE
interface ChatStateProps {
  chat: {
    messages: Message[]
  },
  user: Array<object>
}

interface ChatDispatchProps {
  fetchMessages: () => {},
  deleteMessage: (message: Message) => {message: Message}
}
const mapStateToProps = (state: ChatState): ChatStateProps => {
  console.log('STATE', state.chat.messages)
  return {
    chat: {
      messages: state.chat.messages
    },
    user: state.user
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
