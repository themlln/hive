import {GOT_NEW_MESSAGE, LOAD_MESSAGES, DELETE_MESSAGE, UPDATE_MESSAGE} from '../store/Chat'

export interface Message {
  id?: number;
  content: string;
  timestamp: string;
  userId?: number
}

export interface ChatState {
  chat: {
    messages: Array<Message>
  },
  user: Array<object>
}

/**
 * TYPES OF ACTIONS
 */
interface GotNewMessageAction {
  type: typeof GOT_NEW_MESSAGE
  payload: Message
}

interface GotMessagesFromServerAction {
  type: typeof LOAD_MESSAGES
  payload: Message[]
}

interface UpdateMessageAction {
  type: typeof UPDATE_MESSAGE;
  payload: Message
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  payload: Message
}

export type ChatActionTypes = GotNewMessageAction | DeleteMessageAction | GotMessagesFromServerAction | UpdateMessageAction

// interface SetUserAction {
//   type: typeof SET_USER
//   payload: {
//     name: string
//   }
// }
