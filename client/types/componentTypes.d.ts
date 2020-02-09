import {Message} from './storeTypes'
import {ComponentState} from 'react'

export interface ChatStateProps {
  chat: {
    messages: Array<Message>
  },
  user: object
}

export interface ChatDispatchProps {
  fetchMessages: () => {},
  deleteMessage: (message: Message) => {message: Message}
}

export interface NewMessageMapStateToProps {
  user: ComponentState
}

export interface NewMessageDispatchToProps {
  sendMessage: (newMessage: Message) => {newMessage: Message}
}
