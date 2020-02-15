import * as React from 'react'
import { fetchingChannel } from '../store/canvas-store'
import { connect } from 'react-redux'
import { JoinRoomState, JoinRoomDispatchProps } from '../types/componentTypes'

class JoinRoom extends React.Component<JoinRoomDispatchProps, JoinRoomState>{

  constructor(props) {
    super(props)
    this.state = {
      roomKey: '',
      userName: ''
    }
    this.userHandleChange = this.userHandleChange.bind(this)
    this.roomHandleChange = this.roomHandleChange.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
  }

  userHandleChange(event: any) {
    this.setState({
      userName: event.target.value
    })
  }
  roomHandleChange(event: any) {
    this.setState({
      roomKey: event.target.value
    })
  }

  handleJoin(event: React.SyntheticEvent) {
    event.preventDefault()

    if (event.target.roomkey.value) {
      this.props.onClickJoinRoom(event.target.roomkey.value)
    } else {
      alert('Invalid Room Key')
    }
  }

  render() {
    return (
      <form className="login100-form validate-form p-b-33 p-t-5" id="joinform" onSubmit={this.handleJoin}>
        <h1 className="login100-form-title p-b-41">Join</h1>
        <label htmlFor="Name">Set Name</label>
        <input
          className="input2 form-control"
          type="text"
          name="username"
          value={this.state.userName}
          onChange={this.userHandleChange}
          placeholder="Set your username" />

        <label htmlFor="Name">Room Key</label>
        <input
          className="input2 form-control"
          type="text"
          name="roomkey"
          value={this.state.roomKey}
          onChange={this.roomHandleChange}
          placeholder="Enter Room Key here" />
        <button className="login100-form-btn" type="submit">Join Room</button>
      </form>
    )
  }
}

const mapDispatch = (dispatch: React.Dispatch<any>) => {
  return {
    onClickJoinRoom: (key: string, username: string) => dispatch(fetchingChannel(key, username))
  }
}

export default connect(null, mapDispatch) (JoinRoom)
