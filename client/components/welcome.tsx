import * as React from 'react'
import { creatingNewCanvas, fetchingChannel } from '../store/Canvas'
import { connect } from 'react-redux'
import { WelcomeState } from '../types/componentTypes'

class Welcome extends React.Component<WelcomeStateProps & WelcomeDispatchProps, WelcomeState> {
  constructor(props) {
    super(props)
    this.state = {
      roomKey:'',
      createUsername: '',
      joinUsername: ''
    }

    this.handleCreate = this.handleCreate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
  }

 async handleCreate(event: React.SyntheticEvent) {
   event.preventDefault()
    await this.props.onClickCreateCanvas()
    //pass screenname to sessionId
    this.props.history.push('/whiteboard')
  }

  handleChange (event: React.FormEvent<HTMLInputElement>) {
    console.log('EVENT IN HANDLE CHANGE', event)
    // this.setState({
    //   [event.target.name] = event.target.value
    // })
  }

  async handleJoin(event: React.SyntheticEvent) {
    event.preventDefault()
    console.log("EVENTTT", event.target);
    await this.props.onClickJoinRoom(event.target.roomkey.value)
    this.props.history.push('/whiteboard')

    // pass screenname to sessionId
    //call Thunk to match channelId with Room Key
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
            onChange={this.handleChange}
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
          onChange={this.handleChange}
          placeholder="Set your username"/>
          <label htmlFor="Name">Room Key</label>
          <input
          className="form-control"
          type="text"
          name="roomkey"
          value={this.state.roomKey}
          onChange={this.handleChange}
          placeholder="Enter Room Key here"/>
          <button className="btn btn-default" type="submit">Join Room</button>
      </form>
      </div>
    )
  }
}

interface WelcomeStateProps {
  history: any
  channelId: string
}

interface WelcomeDispatchProps {
  onClickCreateCanvas: () => {},
  onClickJoinRoom: (key: string) => {}
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
    onClickJoinRoom:(key: string) => dispatch(fetchingChannel(key))
  }
}
export default connect(mapState,mapDispatch)(Welcome)
