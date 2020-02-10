import * as React from 'react'
import {Whiteboard} from './whiteboard'
import Navbar from './navbar'
import Chat from './chat'
import * as createClientSocket from 'socket.io-client'

export const clientSocket: any = createClientSocket(window.location.origin)


export class Home extends React.Component < {}, {} > {
    constructor(props) {
        super(props)
        this.state = {
          showLogin: false
        }
        this.toggleLogin = this.toggleLogin.bind(this)
    }

    toggleLogin() {

    }

    componentDidMount() {
      clientSocket.on('connect', () => {
        console.log('Client-Socket: I have a made a persistent two-way connection!', this.props.location.search)
        clientSocket.emit('join-drawing', this.props.location.search)
      })
    }

    public render() {
        console.log("PROPS in HOME***", this.props);
        return (
        <div>
          <Navbar />
          <Whiteboard channelId={this.props.location.search}/>
          <Chat channelId={this.props.location.search}/>
        </div>
        )
    }
}
