import * as React from 'react'
import { sendMessage } from '../store/Chat'
import {Message} from '../types/storeTypes'
import {NewMessageDispatchToProps, NewMessageMapStateToProps} from '../types/componentTypes'
import { connect } from 'react-redux'

class NewMessageEntry extends React.Component<NewMessageMapStateToProps & NewMessageDispatchToProps> {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (event: any) => {
    event.preventDefault()
    const content: string = event.target.content.value
    const timestamp: string = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    const userId: number = this.props.user.id
    const username: string = this.props.user.name
    const profileImage: string = this.props.user.profileImage
    const channelId: string = this.props.channelId
    const newMessage: Message = {
      content: content,
      timestamp: timestamp,
      userId: userId,
      username: username,
      profileImage: profileImage,
      channelId: channelId
    }
    console.log("SENDING MESSAGE WITH***", newMessage, this.props.channelId)
    this.props.sendMessage(newMessage, this.props.channelId)
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

const mapStateToProps = (state: React.ComponentState, ownProps:{channelId:string}): NewMessageMapStateToProps => {
  return {
    user: state.user,
    channelId: ownProps.channelId
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>): object => {
  return {
    sendMessage: (newMessage: Message, channelId: string) => dispatch(sendMessage(newMessage, channelId))
  }
}

export const ConnectNewMessageEntry = connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry)
