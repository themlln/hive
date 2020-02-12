import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {loggingIn} from './store/user.js'
import UserHome from './components/user-home'
import { Home } from './components/home'
import Welcome from './components/welcome'
import {Login, Signup} from './components/index'
import Navbar from './components/navbar'

/**
 * COMPONENT
 */

 class App extends React.Component <AppStateProps & AppDispatchProps>{
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
      <Navbar />
      <Switch>

        {/* Routes placed here are available to all visitors */}
        <Route path="/whiteboard" component={Home}/>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/account" component={UserHome} />
          </Switch>
        )}
        <Route component={Welcome} />
      </Switch>
      </div>
    )
  }
}
/**INTERFACE **/
interface AppStateProps {
  isLoggedIn: boolean;
}

interface AppDispatchProps {
  loadInitialData: () => {};
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(loggingIn())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(App))
