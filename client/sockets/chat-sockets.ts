import * as createClientSocket from 'socket.io-client'
import store from '../store/index'
import { Message } from '../types/storeTypes'
import { loadMessages, gotNewMessage, deletedMessage, getUser } from '../store/chat-store'

const clientSocket: any = createClientSocket(window.location.origin)
clientSocket.on('connect', () => {
  console.log('Client-Socket: I have a made a persistent two-way connection!')


  clientSocket.on('replay-messages', (messages: Array<Message>) => {
    store.dispatch(loadMessages(messages))
  })

  clientSocket.on('receive-message', (message: Message) => {
    store.dispatch(gotNewMessage(message))
  })

  clientSocket.on('delete-message-from-server', (message: Message) => {
    store.dispatch(deletedMessage(message))
  })

  clientSocket.on('get-username', (username: string) => {
    store.dispatch(getUser(username))
  })
})


export default clientSocket;
