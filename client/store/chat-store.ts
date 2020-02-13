const axios = require('axios').default;
import {ChatState, Message, ChatActionTypes} from '../types/storeTypes'
import clientSocket from '../sockets/chat-sockets'
import { Dispatch } from 'react';
/**
 * INITIAL STATE
 */

const initialState: ChatState = {
  messages: [],
  username: ''
}
/**
 * ACTIONS
 */
export const LOAD_MESSAGES = "LOAD_MESSAGES";
export const GOT_NEW_MESSAGE = "GOT_NEW_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

/**
 * ACTION CREATORS
 */

export const loadMessages = (messages: Array<Message>) => {
  return {
    type: LOAD_MESSAGES,
    payload: messages
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

/**
 * THUNKS
 */

export const fetchingMessages = (channelId: string) => async (dispatch: Dispatch<any>) => {
  try {
    const { data: messages } = await axios.get('/api/messages')
    const filteredMessages = messages.filter((message: Message) => message.channelId === channelId)
    dispatch(loadMessages(filteredMessages || []))
  } catch (error) {
    console.log('Fetching Messages', error)
  }
}

export const sendMessage = (message: Message, channelId: string) => async (dispatch: Dispatch<any>) => {
  try {
    if (!message.username) {
      message.username = 'Anonymous bee'
    }
    const { data: newMessage } = await axios.post(`/api/messages`, message)
    dispatch(gotNewMessage(newMessage))
    clientSocket.emit('new-message', channelId, newMessage)
  } catch (error) {
    console.log('Send Message', error)
  }
}

export const deleteMessage = (message: Message, channelId: string) => async (dispatch: Dispatch<any>) => {
  try {
    await axios.delete(`/api/messages/${message.id}`, message)
    dispatch(deletedMessage(message))
    clientSocket.emit('delete-message', channelId, message)
  } catch (error) {
    console.log('Delete Message', error)
  }
}

/**
 * REDUCER
 */

export const chatReducer = (state = initialState, action: ChatActionTypes): ChatState => {
  switch(action.type) {
    case LOAD_MESSAGES:
      return {
        messages: [...action.payload],
        username: state.username
      }
    case GOT_NEW_MESSAGE:
      return {
        messages: [...state.messages, action.payload],
        username: state.username
      }
    case DELETE_MESSAGE:
      return {
        messages: state.messages.filter(message => message.id !== action.payload.id),
        username: state.username
      }
    default:
      return state
  }
}
