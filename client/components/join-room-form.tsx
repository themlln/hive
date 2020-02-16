import * as React from 'react'
import { fetchingChannel } from '../store/canvas-store'
import { creatingNewUser } from '../store/user-store'
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

  async handleJoin(event: React.SyntheticEvent) {
    event.preventDefault()
    if (this.state.roomKey && this.state.userName) {
      await this.props.onClickCreateUser(this.state.userName)
      await this.props.onClickJoinRoom(this.state.roomKey)
    } else {
      alert('Enter a room key and username')
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
        <button className="buttonicon" type="submit">
        <img src="/hive-icon.png" width={40}/>
        </button>
      </form>
    )
  }
}

const mapDispatch = (dispatch: React.Dispatch<any>) => {
  return {
    onClickCreateUser: (username: string) => dispatch(creatingNewUser(username)),
    onClickJoinRoom: (roomKey: string) => dispatch(fetchingChannel(roomKey)),

  }
}

export default connect(null, mapDispatch) (JoinRoom)
