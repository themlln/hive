import * as React from 'react'
import { fetchingMessages, deleteMessage } from '../store/Chat'
import { Message, ChatState } from '../types/storeTypes'
import { ChatStateProps, ChatDispatchProps } from '../types/componentTypes'
import { SingleMessage } from './single-message'
import { ConnectNewMessageEntry } from './new-message-entry'
import { connect } from 'react-redux'

class Chat extends React.Component<ChatStateProps & ChatDispatchProps> {

  componentDidMount() {
    this.props.fetchingMessages(this.props.channelId)
  }

  render() {
    console.log("CHAT PROPS****", this.props)
    return (
      <div id = "chatBox">
        <div id = "allMessages">
        <ul className="message-list">
          {this.props.chat.messages.map((message: object) =>
          <SingleMessage
            message={message}
            key={message.id}
            deleteMessage={this.props.deleteMessage}
            user={this.props.user}
            channelId={this.props.channelId}
          />)}
        </ul>
        </div>
        <div id = "writeMessage">
        <ConnectNewMessageEntry channelId={this.props.channelId}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ChatState, ownProps:{channelId:string}): ChatStateProps => {
  return {
    chat: {
      messages: state.chat.messages
    },
    user: state.user,
    channelId: state.canvas.channelId
  }
}

const mapDispatchToProps = (dispatch: any): ChatDispatchProps => {
  return {
    fetchingMessages:(channelId: string) => dispatch((fetchingMessages(channelId))),
    deleteMessage: (message: Message, channelId: string) => dispatch(deleteMessage(message, channelId))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
