import * as React from 'react'
import { Link } from 'react-router-dom'
import { creatingNewCanvas, fetchingChannel } from '../store/Canvas'
import { connect } from 'react-redux'

interface State {
  value: string;
}

class Welcome extends React.Component<WelcomeStateProps & WelcomeDispatchProps, State> {
  constructor(props) {
    super(props)

    this.state = {
      value:''
    }

    this.handleCreate = this.handleCreate.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

 async handleCreate(event) {
   event.preventDefault()
   console.log("EVENTTARGET", event.target);

  //  await this.props.onClickCreateCanvas(event.target.username.value)
    //pass screenname to sessionId
    // this.props.history.push('/whiteboard')
  }

  async handleJoin(event) {
    event.preventDefault()
    console.log("event.target.username.value", event.target.username.value);
    await this.props.onClickJoinRoom(event.target.roomkey.value, event.target.username.value)
    // this.props.history.push('/whiteboard')

    // pass screenname to sessionId
    //call Thunk to match channelId with Room Key
  }

  handleChange (event: any) {
    this.setState({
      value: event.target.value
    })
  }

  render(){

    return(
      <div>
        <header id="center">
          <img src="/hivelogotransparent.png" width={400}/>
        </header>
      <div id="welcome">

         <form id="createform" onSubmit={this.handleCreate}>
         <h1>Create</h1>
            <label htmlFor="Name">Set Name</label>
            <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Set your username"/>
          <button className="btn btn-default" type="submit">Create Room</button>
         </form>

        <form id ="joinform" onSubmit={this.handleJoin}>
        <h1>Join</h1>
        <label htmlFor="Name">Set Name</label>
          <input
          className="form-control"
          type="text"
          name="username"
          placeholder="Set your username"/>
          <label htmlFor="Name">Room Key</label>
          <input
          className="form-control"
          type="text"
          name="roomkey"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Enter Room Key here"/>
          <button className="btn btn-default" type="submit">Join Room</button>
      </form>
      </div>
      </div>
    )
  }
}

interface WelcomeStateProps {
  history: any
  channelId: string
}

interface WelcomeDispatchProps {
  onClickCreateCanvas: (username: string) => {},
  onClickJoinRoom: (key: string, username: string) => {}
}

const mapState = (state: any, ownProps: any) => {
  return {
    history: ownProps.history,
    channelId: state.canvas.canvasId
  }
}
const mapDispatch = (dispatch) => {
  return {
    onClickCreateCanvas: (username:string) => dispatch(creatingNewCanvas(username)),
    onClickJoinRoom:(key: string, username: string) => dispatch(fetchingChannel(key, username))
  }
}
export default connect(mapState,mapDispatch)(Welcome)
