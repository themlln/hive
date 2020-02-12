import * as React from 'react'
import Whiteboard from './whiteboard'
import Navbar from './navbar'
import Chat from './chat'
import store from '../store/index.js'
import { loadMessages, gotNewMessage, deletedMessage } from '../store/Chat'
import { Message } from '../types/storeTypes'
import { connect } from 'react-redux'
import { loadingChannelId } from '../store/Canvas'

// export const clientSocket: any = createClientSocket(window.location.origin)


class Home extends React.Component < {}, {} > {
    constructor(props) {
        super(props)
        this.state = {
          showLogin: false
        }
    }

    async componentDidMount() {
      this.props.onLoadChannelId(this.props.location.search.slice(4))
    }

   render() {
        return (
        <div id = "home">
            <div id = "whiteboard"><Whiteboard channelId={this.props.channelId}/></div>
            <div id = "chat"><Chat channelId={this.props.channelId}/></div>
        </div>
        )
    }
}


const mapState = state => {
  return {
    channelId: state.canvas.channelId
  }
}

const mapDispatch = dispatch => {
  return {
    onLoadChannelId:(channelId) => {
      dispatch(loadingChannelId(channelId))
    }
    }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default (connect(mapState, mapDispatch)(Home))

