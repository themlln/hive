
import * as React from 'react'
import {connect} from 'react-redux'


const UserHome: React.FC<{email: string}> = () => {

  return (
    <div>
      <h3>Welcome</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default mapState)(UserHome)
/**
 * PROP TYPES
 */
