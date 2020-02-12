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
export const GET_USER = "GET_USER";

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

export const getUser = (username: string) => {
  return {
    type: GET_USER,
    payload: username
  }
}

/**
 * THUNKS
 */

export const fetchingMessages = (channelId: string) => async (dispatch: Dispatch<any>) => {
  try {
    console.log("fetching messages in store")
    console.log("/api/messages/"+channelId);
    const { data: messages } = await axios.get(`/api/messages/${channelId}`)
    dispatch(loadMessages(messages))
    clientSocket.emit('load-messages', channelId, messages)
  } catch (error) {
    console.log('Error fetching messages: ', error)
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

export const gettingUsername = (userName: string, channelId: string) => async (dispatch: Dispatch<any>) => {
  try {
    const {data: username} = await axios.post(`/api/messages/${channelId}`, userName)
    dispatch(getUser(username))
    clientSocket.emit('show-username', channelId, username)
  } catch (error) {
    console.log('Error getting username ', error)
  }
}

/**
 * REDUCER
 */

export const chatReducer = (state = initialState, action: ChatActionTypes): ChatState => {
  switch(action.type) {
    case LOAD_MESSAGES:
      return {
        messages: [...action.payload]
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
