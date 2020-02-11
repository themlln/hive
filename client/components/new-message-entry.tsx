import * as React from 'react'
import { sendMessage } from '../store/Chat'
import {Message} from '../types/storeTypes'
import {NewMessageDispatchToProps, NewMessageMapStateToProps, NewMessageState} from '../types/componentTypes'
import { connect } from 'react-redux'

class NewMessageEntry extends React.Component<NewMessageMapStateToProps & NewMessageDispatchToProps, NewMessageState> {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event: any) {
    this.setState({
      value: event.target.value
    })
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
    this.props.sendMessage(newMessage, this.props.channelId)
    this.setState({
      value: ''
    })
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value= {this.state.value}
            placeholder="Type here..."
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Send</button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state: React.ComponentState, ownProps:{channelId: string}): NewMessageMapStateToProps => {
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
