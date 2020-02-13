import * as React from 'react'
import Whiteboard from './whiteboard'
import Navbar from './navbar'
import Chat from './chat'
import store from '../store/index.js'
import { loadMessages, gotNewMessage, deletedMessage, fetchingMessages } from '../store/chat-store'
import { Message } from '../types/storeTypes'
import { connect } from 'react-redux'
import { loadingChannelId } from '../store/canvas-store'
import { HomeStateProps, HomeDispatch, HomeState } from '../types/componentTypes'

class Home extends React.Component < HomeStateProps & HomeDispatch, HomeState > {
    constructor(props) {
        super(props)
        this.state = {
          showLogin: false
        }
    }

    componentDidMount() {
      this.props.onLoadChannelId(this.props.location.search.slice(4))
      this.props.fetchMessages(this.props.channelId)
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


const mapState = (state: React.ComponentState): HomeStateProps => {
  return {
    channelId: state.canvas.channelId
  }
}

const mapDispatch = (dispatch: any): HomeDispatch => {
  return {
    onLoadChannelId:(channelId: string) => {
      dispatch(loadingChannelId(channelId))
    },
    fetchMessages: (channelId: string) => {
      dispatch(fetchingMessages(channelId))
    }
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default (connect(mapState, mapDispatch)(Home))

