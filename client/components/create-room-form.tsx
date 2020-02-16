import * as React from 'react'
import { creatingNewUser } from '../store/user-store'
import { creatingNewCanvas } from '../store/canvas-store'
import { connect } from 'react-redux'
import { CreateRoomState, CreateRoomDispatchProps } from '../types/componentTypes'


class CreateRoom extends React.Component<CreateRoomDispatchProps, CreateRoomState> {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
    }
    this.handleCreate = this.handleCreate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event: any) {
    this.setState({
      userName: event.target.value
    })
  }

  async handleCreate(event: React.SyntheticEvent) {
    event.preventDefault()
    if (this.state.userName) {
      await this.props.onClickCreateUser(this.state.userName)
      await this.props.onClickCreateCanvas()
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
    onClickCreateCanvas: () => dispatch(creatingNewCanvas())
  }
}



export default connect(null, mapDispatch)(CreateRoom)
