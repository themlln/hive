
import * as React from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import { UserHomeState, UserHomeProps } from '../types/componentTypes'
import { Navbar } from './index'

const UserHome = (props: UserHomeProps) => {
  const {email, username} = props

  if (!email) {
    return <Redirect to="/" />
  } else {
    return (
      <>
        <Navbar />
        <div className="userhome-container">
          <h1>Welcome back {username}!</h1>
        </div>
      </>
    )
  }
}
/**
 * CONTAINER
 */
const mapStateToProps = (state: UserHomeState) => {
  return {
    username: state.user.username,
    email: state.user.email
  }
}

export default connect(mapStateToProps)(UserHome)
