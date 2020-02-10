const axios = require('axios').default;
import {ChatState, Message, ChatActionTypes} from '../types/storeTypes'

import {clientSocket} from '../components/fabricCanvas'
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
export const JOIN_MESSAGE = "JOIN_MESSAGE";
export const GOT_NEW_MESSAGE = "GOT_NEW_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
// const SET_USER = 'SET_USER';

/**
 * ACTION CREATORS
 */

export const joinedRoomMessage = (joinMessage: Message) => {
  return {
    type: JOIN_MESSAGE,
    payload: joinMessage
  }
}

export const gotNewMessage = (newMessage: Message) => {
  return {
    type: GOT_NEW_MESSAGE,
    payload: newMessage
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
export const joinRoomMessage = (user: object, channelId: string) => async (dispatch: Dispatch<any>) => {
  try {
    const joinMessage = `${user.name} has joined the room.`
    const { data: message } = await axios.post('/api/messages', joinMessage)
    dispatch(joinedRoomMessage(message))
    clientSocket.emit('join-room-message', channelId, message)
  } catch (error) {
    console.log('Error sending join message: ', error)
  }
}

export const sendMessage = (message: Message, channelId: string) => async (dispatch: Dispatch<any>) => {
  try {
    const { data: newMessage } = await axios.post('/api/messages', message)
    dispatch(gotNewMessage(newMessage))
    clientSocket.emit('new-message', channelId, newMessage)
  } catch (error) {
    console.log('Error sending a message: ', error)
  }
}

export const deleteMessage = (message: Message, channelId: string) => async (dispatch: Dispatch<any>) => {
  try {
    await axios.delete(`/api/messages/${message.id}`, message)
    dispatch(deletedMessage(message))
    clientSocket.emit('delete-message', channelId, message)
  } catch (error) {
    console.log('Error deleting message: ', error)
  }
}

/**
 * REDUCER
 */

export const chatReducer = (state = initialState, action: ChatActionTypes): ChatState => {
  switch(action.type) {
    case JOIN_MESSAGE:
      return {
        messages: [...state.messages, ...action.payload]
      }
    case GOT_NEW_MESSAGE:
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
