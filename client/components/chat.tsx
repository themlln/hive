import * as React from 'react'
import { fetchMessages, deleteMessage } from '../store/Chat'
import { Message, ChatState } from '../types/storeTypes'
import { ChatStateProps, ChatDispatchProps } from '../types/componentTypes'
import { SingleMessage } from './single-message'
import { ConnectNewMessageEntry } from './new-message-entry'
import { clientSocket } from './home'
import { connect } from 'react-redux'

class Chat extends React.Component<ChatStateProps & ChatDispatchProps> {

  componentDidMount() {
    this.props.fetchMessages()
    clientSocket.on('replay-messages', (instructions) => {

    })
  }

  render() {
    return (
      <div>
        <ul className="message-list">
          {this.props.chat.messages.map((message: object) => <SingleMessage
          message={message}
          key={message.id}
          deleteMessage={this.props.deleteMessage}
          user={this.props.user} />)}
        </ul>
        <ConnectNewMessageEntry />
      </div>
    );
  }
}

const mapStateToProps = (state: ChatState): ChatStateProps => {
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
