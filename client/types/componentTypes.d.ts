import {Message} from './storeTypes'
import {ComponentState} from 'react'

export interface NewMessageMapStateToProps {
  user: ComponentState
}

export interface NewMessageDispatchToProps {
  sendMessage: (newMessage: Message) => {newMessage: Message}
}
