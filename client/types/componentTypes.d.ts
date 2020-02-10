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
  joinRoomMessage: (user: object, channelId: string) => {message: Message},
  deleteMessage: (message: Message, channelId: string) => {message: Message}
}

export interface NewMessageMapStateToProps {
  user: ComponentState,
  channelId: ComponentState
}

export interface NewMessageDispatchToProps {
  sendMessage: (newMessage: Message, channelId: string) => {newMessage: Message}
}
