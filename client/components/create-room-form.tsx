import * as React from 'react'
import { creatingNewCanvas } from '../store/canvas-store'
import { connect } from 'react-redux'
import { CreateRoomState, CreateRoomDispatchProps } from '../types/componentTypes'


class CreateRoom extends React.Component<CreateRoomDispatchProps, CreateRoomState> {
  constructor(props) {
    super(props)
    this.state = {
      userName:'',
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: any) {
    this.setState({
      userName: event.target.value
    })
  }

  handleCreate(event: React.SyntheticEvent) {
    event.preventDefault()
    if (this.state.userName) {
      this.props.onClickCreateCanvas(this.state.userName)
    } else {
      alert('You need to enter a user name!')
    }
  }

  render() {
    return (
      <form className="login100-form validate-form p-b-33 p-t-5" id="createform" onSubmit={this.handleCreate}>
        <h1 className="login100-form-title p-b-41">Create</h1>
        <label htmlFor="Username">Set Name</label>
        <input className="input2 form-control"
          type="text"
          name="username"
          value={this.state.userName}
          onChange={this.handleChange}
          placeholder="Set your username" />
        <button className="login100-form-btn" type="submit"></button>
      </form>
    )
  }
}

const mapDispatch = (dispatch: React.Dispatch<any>) => {
  return {
    onClickCreateCanvas: (username: string) => dispatch(creatingNewCanvas(username))
  }
}



export default connect(null, mapDispatch) (CreateRoom)
