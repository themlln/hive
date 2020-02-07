import axios from 'axios'
import {clientSocket} from '../components/canvas'
/**
 * INITIAL STATE
 */
export interface Message {
  user: {
    name: string;
    image: string;
  };
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: Array<Message>
}

const initialState: ChatState = {
  messages: []
}
/**
 * ACTIONS
 */
const GOT_NEW_MESSAGE = "GOT_NEW_MESSAGE";
const LOAD_MESSAGES = 'LOAD_MESSAGES'
const DELETE_MESSAGE = "DELETE_MESSAGE";
// const SET_USER = 'SET_USER';

/**
 * TYPES OF ACTIONS
 */
interface GotNewMessageAction {
  type: typeof GOT_NEW_MESSAGE
  payload: Message
}

interface GotMessagesFromServerAction {
  type: typeof LOAD_MESSAGES
  payload: Message
}

// interface SetUserAction {
//   type: typeof SET_USER
//   payload: {
//     name: string
//   }
// }

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  timestamp: number;
}
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
export const deletedMessage = (timestamp: number) => {
  return {
    type: DELETE_MESSAGE,
    timestamp
  }
}
type ChatActionTypes = GotNewMessageAction | DeleteMessageAction | GotMessagesFromServerAction

/**
 * THUNKS
 */

export const fetchMessages = () => async (dispatch: any) => {
  try {
    const { data: messages } = await axios.get('/api/messages')
    dispatch(loadMessages(messages))
    clientSocket.emit('new-message', messages)
  } catch (error) {
    console.log('Error fetching messages: ', error)
  }

}
export const sendMessage = (message: Message) => async (dispatch: any, getState: any) => {
  try {
    message.user = getState().user
    const { data: newMessage } = await axios.post('/api/messages', message)
    dispatch(gotNewMessage(newMessage))
    clientSocket.emit('new-message', newMessage)
  } catch (error) {
    console.log('Error sending a message: ', error)
  }
}

export const deleteMessage = (message: Message) => async (dispatch: any) => {
  try {
    await axios.delete(`/api/message/${message.timestamp}`, message)
    dispatch(deletedMessage(message.timestamp))
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
        messages: state.messages
      }
    case DELETE_MESSAGE:
      return {
        messages: state.messages.filter(message => message.timestamp !== action.timestamp)
      }
    default:
      return state
  }
}
