import * as React from 'react'
import { WelcomeStateProps, WelcomeDispatchProps, WelcomeState } from '../types/componentTypes'
import JoinRoomForm from './join-room-form'
import CreateRoomForm from './create-room-form'


class Welcome extends React.Component<WelcomeStateProps & WelcomeDispatchProps, WelcomeState> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <header id="center">
                <img src="/hivelogotransparent.png" width={400} />
              </header>
              <div id="welcome">
                <CreateRoomForm />
                <JoinRoomForm />
              </div>
            </div>
          </div>
        </div>
    )
  }
}


export default Welcome
