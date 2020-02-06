import * as React from 'react'
import * as createClientSocket from 'socket.io-client'
import { Whiteboard } from './whiteboard'
import ConnectChat from './chat'
export const clientSocket: any = createClientSocket(window.location.origin)
export const drawingName: String = '/canvas'

clientSocket.on('connect', () => {
  console.log('Client-Socket: I have a made a persistent two-way connection!')
  clientSocket.emit('join-drawing', drawingName)
})

export default class Page extends React.Component {
  public render() {
    return (
      <>
        <Whiteboard/>
        <ConnectChat/>
      </>
    )

  }
}
