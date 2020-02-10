import * as React from 'react'
import {Whiteboard} from './whiteboard'
import Navbar from './navbar'
import Chat from './chat'
import * as createClientSocket from 'socket.io-client'

export const clientSocket: any = createClientSocket(window.location.origin)

let channelId: String


export class Home extends React.Component < {}, {} > {
    constructor(props) {
        super(props)
        this.state = {
          showLogin: false
        }
        this.toggleLogin = this.toggleLogin.bind(this)
        channelId = this.props.location.search
    }

    toggleLogin() {

    }

    componentDidMount() {
    }

    public render() {
        console.log("PROPS in HOME***", this.props);
        return (
        <div>
          <Navbar />
          <Whiteboard channelId={this.props.location.search}/>
          <Chat channelId={this.props.location.search.id}/>
        </div>
        )
    }
}

clientSocket.on('connect', () => {
  console.log('Client-Socket: I have a made a persistent two-way connection!', channelId)
  clientSocket.emit('join-drawing', channelId)
})
