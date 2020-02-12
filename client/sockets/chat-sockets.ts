import * as createClientSocket from 'socket.io-client'
import store from '../store/index'
import { loadMessages, gotNewMessage, deletedMessage} from '../store/Chat'

const clientSocket: any = createClientSocket(window.location.origin)
clientSocket.on('connect', () => {
  console.log('Client-Socket: I have a made a persistent two-way connection!')


  clientSocket.on('replay-messages', (messages: Array<Message>) => {
    console.log("REPLAY MESSAGES RECEIVED MESSAGES", messages)
    store.dispatch(loadMessages(messages))
  })

  clientSocket.on('receive-message', (message: Message) => {
    store.dispatch(gotNewMessage(message))
  })

  clientSocket.on('delete-message-from-server', (message: Message) => {
    store.dispatch(deletedMessage(message))
  })
})


export default clientSocket;
