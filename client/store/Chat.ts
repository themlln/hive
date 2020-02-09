const axios = require('axios').default;
import {ChatState, Message, ChatActionTypes} from '../types/storeTypes'
import {clientSocket} from '../components/canvas'
import { Dispatch } from 'react';
/**
 * INITIAL STATE
 */

const initialState: ChatState = {
  messages: []
}
/**
 * ACTIONS
 */
export const GOT_NEW_MESSAGE = "GOT_NEW_MESSAGE";
export const LOAD_MESSAGES = 'LOAD_MESSAGES'
export const DELETE_MESSAGE = "DELETE_MESSAGE";
// const SET_USER = 'SET_USER';

/**
 * ACTION CREATORS
 */
export const gotNewMessage = (newMessage: Message) => {
  clientSocket.emit('new-message', newMessage)
  return {
    type: GOT_NEW_MESSAGE,
    payload: newMessage
  }
}

export const loadMessages = (messages: Message[]) => {
  clientSocket.emit('load-messages', messages)
  console.log("CHAT ACTION MESSAGES", messages, "TYPE", typeof messages)
  return {
    type: LOAD_MESSAGES,
    payload: messages
  }
}

// const setUser = (name: string) => {
//   return {
//     type: SET_USER,
//     user: {
//       name
//     }
//   }
// }
export const deletedMessage = (id: number) => {
  return {
    type: DELETE_MESSAGE,
    id
  }
}

/**
 * THUNKS
 */

export const fetchMessages = () => async (dispatch: Dispatch<any>) => {
  try {
    const { data: messages } = await axios.get('/api/messages')
    dispatch(loadMessages(messages))
    clientSocket.emit('new-message', messages)
  } catch (error) {
    console.log('Error fetching messages: ', error)
  }

}
export const sendMessage = (message: Message) => async (dispatch: Dispatch<any>) => {
  try {
    // message.user = getState().user
    const { data: newMessage } = await axios.post('/api/messages', message)
    dispatch(gotNewMessage(newMessage))
    clientSocket.emit('new-message', newMessage)
  } catch (error) {
    console.log('Error sending a message: ', error)
  }
}

export const deleteMessage = (message: Message) => async (dispatch: Dispatch<any>) => {
  try {
    await axios.delete(`/api/message/${message.id}`, message)
    dispatch(deletedMessage(message.id))
  } catch (error) {
    console.log('Error deleting message: ', error)
  }
}

/**
 * REDUCER
 */

export const chatReducer = (state = initialState, action: ChatActionTypes): ChatState => {
  switch(action.type) {
    case GOT_NEW_MESSAGE:
      return {
        messages: [...state.messages, action.payload]
      }
    case LOAD_MESSAGES:
      return {
        messages: [...state.messages, ...action.payload]
      }
    case DELETE_MESSAGE:
      return {
        messages: state.messages.filter(message => message.id !== action.id)
      }
    default:
      return state
  }
}
