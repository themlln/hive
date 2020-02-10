import * as React from 'react'
import { joinRoomMessage, deleteMessage } from '../store/Chat'
import { Message, ChatState } from '../types/storeTypes'
import { ChatStateProps, ChatDispatchProps } from '../types/componentTypes'
import { SingleMessage } from './single-message'
import { ConnectNewMessageEntry } from './new-message-entry'
import { connect } from 'react-redux'

class Chat extends React.Component<ChatStateProps & ChatDispatchProps> {

  componentDidMount() {
    this.props.joinRoomMessage(this.props.user, this.props.channelId)
  }

  render() {
    return (
      <div>
        <ul className="message-list">
          {this.props.chat.messages.map((message: object) => <SingleMessage
          message={message}
          key={message.id}
          deleteMessage={this.props.deleteMessage}
          user={this.props.user}
          channelId={this.props.channelId}
          />)}
        </ul>
        <ConnectNewMessageEntry channelId={this.props.channelId}/>
      </div>
    );
  }
}

const mapStateToProps = (state: ChatState): ChatStateProps => {
  return {
    chat: {
      messages: state.chat.messages
    },
    user: state.user,
    channelId: state.channelId
  }
}

const mapDispatchToProps = (dispatch: any): ChatDispatchProps => {
  return {
    joinRoomMessage: (user: object, channelId: string) => dispatch(joinRoomMessage(user, channelId)),
    deleteMessage: (message: Message, channelId: string) => dispatch(deleteMessage(message, channelId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
