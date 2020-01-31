// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'

// /**
//  * COMPONENT
//  */
// export const UserHome = props => {
//   const {email} = props

//   return (
//     <div>
//       <h3>Welcome, {email}</h3>
//     </div>
//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }

// export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }

import * as React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
/**
 * COMPONENT
 */

// type Props = {
//   email: string;
// };

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

export default connect(mapState)(UserHome)
/**
 * PROP TYPES
 */
