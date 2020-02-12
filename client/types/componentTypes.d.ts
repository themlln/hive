import {Message} from './storeTypes'
import {ComponentState} from 'react'

export interface WelcomeState {
  roomKey: string;
  createUsername: string;
  joinUsername: string;
}

export interface WelcomeStateProps {
  history: any,
  channelId: string
}

export interface WelcomeDispatchProps {
  onClickCreateCanvas: () => {},
  onClickJoinRoom: (key: string) => {},
  sendUsername: (username: string, channelId: string) => string
}

export interface ChatStateProps {
  chat: {
    messages: Array<Message>
  },
  user: object,
  channelId: string
}

export interface ChatDispatchProps {
  fetchingMessages: (channelId: string) => {messages: Array<Message>},
  deleteMessage: (message: Message, channelId: string) => {message: Message}
}

export interface NewMessageState {
  value: string
}

export interface NewMessageMapStateToProps {
  user: ComponentState,
  channelId: ComponentState
}

export interface NewMessageDispatchToProps {
  sendMessage: (newMessage: Message, channelId: string) => {newMessage: Message}
}
