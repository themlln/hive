import * as React from 'react'
import {Whiteboard} from './whiteboard'
import Navbar from './navbar'
import Chat from './chat'
import * as createClientSocket from 'socket.io-client'

import store from '../store/index.js'
import { loadMessages, gotNewMessage, deletedMessage } from '../store/Chat'
import { Message } from '../types/storeTypes'


export const clientSocket: any = createClientSocket(window.location.origin)

let channelId: String


export class Home extends React.Component < {}, {} > {
    constructor(props) {
        super(props)
        this.state = {
          showLogin: false
        }
    }

    componentDidMount() {
      // channelId = this.props.location.search.slice(4)
      // clientSocket.on('connect', () => {
      //   console.log('Client-Socket: I have a made a persistent two-way connection!', channelId)
      //   clientSocket.emit('join-drawing', channelId)

      //   clientSocket.on('replay-messages', (messages: Array<Message>) => {
      //     store.dispatch(loadMessages(messages))
      //   })

      //   clientSocket.on('receive-message', (message: Message) => {
      //     store.dispatch(gotNewMessage(message))
      //   })

      //   clientSocket.on('delete-message-from-server', (message: Message) => {
      //     store.dispatch(deletedMessage(message))
      //   })
      // })

    }

    public render() {
        console.log("PROPS IN HOME", this.props)
        return (
        <div>
          <Navbar />
          <Whiteboard channelId={channelId}/>
          <Chat channelId={channelId}/>
        </div>
        )
    }
}

clientSocket.on('connect', () => {
  console.log('Client-Socket: I have a made a persistent two-way connection!', channelId)
  clientSocket.emit('join-drawing', channelId)

  clientSocket.on('replay-messages', (messages: Array<Message>) => {
    store.dispatch(loadMessages(messages))
  })

  clientSocket.on('receive-message', (message: Message) => {
    store.dispatch(gotNewMessage(message))
  })

  clientSocket.on('delete-message-from-server', (message: Message) => {
    store.dispatch(deletedMessage(message))
  })
})
