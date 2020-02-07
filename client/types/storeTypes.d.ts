import {GOT_NEW_MESSAGE, LOAD_MESSAGES, DELETE_MESSAGE} from '../store/Chat'

export interface Message {
  id?: number;
  content: string;
  timestamp: Date;
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
  id: number;
}

export type ChatActionTypes = GotNewMessageAction | DeleteMessageAction | GotMessagesFromServerAction
