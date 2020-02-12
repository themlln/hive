import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import ShareButton from './buttons/shareButton'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className = "navBackground">
      <div className = "navBar">
      <span className = "navBarLeft">
      <span> <Link to="/whiteboard">
              <img
                src="/hive-icon.png"
                height={35}
                mode="fit"
              />
            </Link>
      </span>
      </span>

      <span>
      {isLoggedIn ? (
        <span className = "navBarRight">
        <span className = "dropdown">

          {/* The navbar will show these links after you log in */}
            <button className = "dropbtn">
            <img
                src="/profileIconHive.png"
                width={40}
                height={40}
                mode="fit"
              /></button>
            <div className = "dropdown-content">
              <span className = "navItem"><a href="#" onClick={handleClick}>logout</a></span>
            </div>
        </span>
        </span>
      ) : (
        <div className = "dropdown">
          {/* The navbar will show these links before you log in */}
          <button className = "dropbtn">
            <img
                src="/profileIconHive.png"
                width={40}
                height={40}
                mode="fit"
              /></button>
          <div className = "dropdown-content">
            <span className = "navItem"> <Link to="/login">login</Link></span>
            <span className = "navItem"><Link to="/signup">sign up</Link></span>
          </div>
        </div>
      )}
     </span>
      </div>
    </nav>
    <hr />
  </div>
)
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
