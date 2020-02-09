import {Message} from './storeTypes'
import {ComponentState} from 'react'

export interface ChatStateProps {
  chat: {
    messages: Array<Message>
  },
  user: Array<object>
}

export interface ChatDispatchProps {
  fetchMessages: () => {},
  updateMessage: (message: Message) => {message: Message},
  deleteMessage: (message: Message) => {message: Message}
}

export interface NewMessageMapStateToProps {
  user: ComponentState
}

export interface NewMessageDispatchToProps {
  sendMessage: (newMessage: Message) => {newMessage: Message}
}
