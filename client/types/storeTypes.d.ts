import {GOT_NEW_MESSAGE, JOIN_MESSAGE, DELETE_MESSAGE} from '../store/Chat'

export interface Message {
  id?: number;
  content: string;
  timestamp: string;
  userId?: number;
  username?: string;
  profileImage?: string;
  channelId?: string;
}

export interface ChatState {
  messages: Array<Message>
  user?: Array<object>
}

/**
 * TYPES OF ACTIONS
 */
interface GotNewMessageAction {
  type: typeof GOT_NEW_MESSAGE
  payload: Message
}

interface GotMessagesFromServerAction {
  type: typeof JOIN_MESSAGE
  payload: Message[]
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  payload: Message
}

export type ChatActionTypes = GotNewMessageAction | DeleteMessageAction | GotMessagesFromServerAction

// interface SetUserAction {
//   type: typeof SET_USER
//   payload: {
//     name: string
//   }
// }
