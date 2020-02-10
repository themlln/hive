import {Message} from './storeTypes'
import {ComponentState} from 'react'

export interface ChatStateProps {
  chat: {
    messages: Array<Message>
  },
  user: object,
  channelId: string
}

export interface ChatDispatchProps {
  joinRoomMessage: (user: object) => {message: Message},
  deleteMessage: (message: Message) => {message: Message}
}

export interface NewMessageMapStateToProps {
  user: ComponentState
}

export interface NewMessageDispatchToProps {
  sendMessage: (newMessage: Message) => {newMessage: Message}
}
