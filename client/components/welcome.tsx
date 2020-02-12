import * as React from 'react'
import { creatingNewCanvas, fetchingChannel } from '../store/Canvas'
import { gettingUsername } from '../store/Chat'
import { connect } from 'react-redux'
import { WelcomeStateProps, WelcomeDispatchProps, WelcomeState } from '../types/componentTypes'

class Welcome extends React.Component<WelcomeStateProps & WelcomeDispatchProps, WelcomeState> {
  constructor(props) {
    super(props)
    this.state = {
      roomKey:'',
      createUsername: '',
      joinUsername: ''
    }

    this.handleCreate = this.handleCreate.bind(this)
    this.createUsernameHandleChange = this.createUsernameHandleChange.bind(this)
    this.joinUsernameHandleChange = this.joinUsernameHandleChange.bind(this)
    this.roomKeyHandleChange = this.roomKeyHandleChange.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
  }

  createUsernameHandleChange (event: any) {
    this.setState({
      createUsername: event.target.value
    })
  }

  joinUsernameHandleChange (event: any) {
    this.setState({
      joinUsername: event.target.value
    })
  }

  roomKeyHandleChange (event: any) {
    this.setState({
      roomKey: event.target.value
    })
  }

  handleCreate(event: React.SyntheticEvent) {
    event.preventDefault()
    if (this.state.createUsername) {
      this.props.onClickCreateCanvas()
      this.props.sendUsername(this.state.createUsername, this.props.channelId)
    } else {
      throw Error ('You need to enter a user name!')
    }
  }

  handleJoin(event: React.SyntheticEvent) {
    event.preventDefault()
    this.props.onClickJoinRoom(event.target.roomKey.value)
  }

  render(){
    return(
      <div id="welcome">
         <form id="createform" onSubmit={this.handleCreate}>
         <h1>Create</h1>
          <div>
            <label htmlFor="Username">Set Name</label>
            <input
            className="form-control"
            type="text"
            name="username"
            value={this.state.createUsername}
            onChange={this.createUsernameHandleChange}
            placeholder="Set your username"/>
          </div>
          <button className="btn btn-default" type="submit">Create Room</button>
         </form>

        <form id ="joinform" onSubmit={this.handleJoin}>
        <h1>Join</h1>

        <label htmlFor="Name">Set Name</label>
          <input
          className="form-control"
          type="text"
          name="username"
          value={this.state.joinUsername}
          onChange={this.joinUsernameHandleChange}
          placeholder="Set your username"/>
          <label htmlFor="Name">Room Key</label>
          <input
          className="form-control"
          type="text"
          name="roomkey"
          value={this.state.roomKey}
          onChange={this.roomKeyHandleChange}
          placeholder="Enter Room Key here"/>
          <button className="btn btn-default" type="submit">Join Room</button>
      </form>
      </div>
    )
  }
}

const mapState = (state: any, ownProps: any) => {
  return {
    history: ownProps.history,
    channelId: state.canvas.canvasId
  }
}
const mapDispatch = (dispatch) => {
  return { onClickCreateCanvas: () =>
    dispatch(creatingNewCanvas()),
    onClickJoinRoom:(key: string) => dispatch(fetchingChannel(key)),
    sendUsername: (username: string, channelId: string) => dispatch(gettingUsername(username, channelId))
  }
}
export default connect(mapState,mapDispatch)(Welcome)
