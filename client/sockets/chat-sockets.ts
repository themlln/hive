import {clientSocket} from '../components/fabricCanvas'
import store from '../store/index.js'
import { joinedRoomMessage, gotNewMessage, deletedMessage } from '../store/Chat'
import { Message } from '../types/storeTypes'

clientSocket.on('user-joined-message', (message: Message) => {
  store.dispatch(joinedRoomMessage(message))
})

clientSocket.on('received-message', (message: Message) => {
  store.dispatch(gotNewMessage(message))
})

clientSocket.on('delete-message-from-server', (message: Message) => {
  store.dispatch(deletedMessage(message))
})
