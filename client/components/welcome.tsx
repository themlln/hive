import * as React from 'react'
import { Link } from 'react-router-dom'
import { creatingNewCanvas } from '../store/Canvas'
import { connect } from 'react-redux'

class Welcome extends React.Component<WelcomeStateProps & WelcomeDispatchProps> {
  constructor(props) {
    super(props)

    this.handleCreate = this.handleCreate.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
  }

 async handleCreate(event) {
   event.preventDefault()
    await this.props.onClickCreateCanvas()
    //pass screenname to sessionId
    this.props.history.push('/whiteboard')
  }

  async handleJoin() {
    // pass screenname to sessionId
    //call Thunk to match channelId with Room Key
  }

  render(){
    return(
      <div id="welcome">

         <form id="createform" onSubmit={this.handleCreate}>
         <h1>Create</h1>
          <div>
            <label htmlFor="Name">Set Name</label>
            <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Set your screenname"/>
          </div>
          <button className="btn btn-default" type="submit">Create Room</button>
         </form>

        <form id ="joinform" onSubmit={this.handleJoin}>
        <h1>Join</h1>

        <label htmlFor="Name">Set Name</label>
          <input
          className="form-control"
          type="text"
          name="content"
          placeholder="Set your screenname"/>
          <label htmlFor="Name">Room Key</label>
          <input
          className="form-control"
          type="text"
          name="content"
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
  onClickCreateCanvas: () => {}
}

const mapState = (state: any, ownProps: any) => {
  return {
    history: ownProps.history,
    channelId: state.canvas.canvasId
  }
}
const mapDispatch = (dispatch) => {
  return { onClickCreateCanvas: () =>
    dispatch(creatingNewCanvas())
  }
}
export default connect(mapState,mapDispatch)(Welcome)
