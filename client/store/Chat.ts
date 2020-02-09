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
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
// const SET_USER = 'SET_USER';

/**
 * ACTION CREATORS
 */
export const gotNewMessage = (newMessage: Message) => {
  return {
    type: GOT_NEW_MESSAGE,
    payload: newMessage
  }
}

export const loadMessages = (messages: Message[]) => {
  console.log("CHAT ACTION MESSAGES", messages, "TYPE", typeof messages)
  return {
    type: LOAD_MESSAGES,
    payload: messages
  }
}

export const updatedMessage = (message: Message) => {
  return {
    type: UPDATE_MESSAGE,
    payload: message
  }
}

export const deletedMessage = (message: Message) => {
  return {
    type: DELETE_MESSAGE,
    payload: message
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
    const { data: newMessage } = await axios.post('/api/messages', message)
    dispatch(gotNewMessage(newMessage))
    clientSocket.emit('new-message', newMessage)
  } catch (error) {
    console.log('Error sending a message: ', error)
  }
}

export const updateMessage = (message: Message) => async (dispatch: Dispatch<any>) => {
  try {
    const {data: updatedMessage} = await axios.put(`/api/messages/${message.id}`, message)
    dispatch(updatedMessage(message))
    clientSocket.emit('update-message', message)
  } catch (error) {
    console.log('Error updating a message: ', error)
  }
}

export const deleteMessage = (message: Message) => async (dispatch: Dispatch<any>) => {
  try {
    await axios.delete(`/api/messages/${message.id}`, message)
    dispatch(deletedMessage(message))
    clientSocket.emit('delete-message', message)
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
    case UPDATE_MESSAGE:
      return {
        messages: [...state.messages, action.payload]
      }
    case DELETE_MESSAGE:
      return {
        messages: state.messages.filter(message => message.id !== action.payload.id)
      }
    default:
      return state
  }
}
