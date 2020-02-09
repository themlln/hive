import * as React from 'react'
import { fetchMessages, deleteMessage, updateMessage } from '../store/Chat'
import { Message, ChatState } from '../types/storeTypes'
import { ChatStateProps, ChatDispatchProps } from '../types/componentTypes'
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
          {this.props.chat.messages.map((message: object) => <SingleMessage
          message={message}
          key={message.id}
          updateMessage={this.props.updateMessage}
          deleteMessage={this.props.deleteMessage}
          user={this.props.user} />)}
        </ul>
        <ConnectNewMessageEntry />
      </div>
    );
  }
}

const mapStateToProps = (state: ChatState): ChatStateProps => {
  console.log('STATE of CHAT', state)
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
    updateMessage: (message: Message) => dispatch(updateMessage(message)),
    deleteMessage: (message: Message) => dispatch(deleteMessage(message))
  }
}

const ConnectChat = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ConnectChat
