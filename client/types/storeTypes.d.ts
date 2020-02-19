import { GET_CHANNEL_ID } from '../store/canvas-store'
import { GOT_NEW_MESSAGE, LOAD_MESSAGES, DELETE_MESSAGE } from '../store/chat-store'
import { GET_USER, REMOVE_USER } from '../store/user-store'
import { UPDATE_TOOL, UPDATE_COLOR, UPDATE_FILL, UPDATE_STROKE_WIDTH, UPDATE_CANVAS } from '../store/panel-store'

/**
 * CANVAS TYPES
*/
export interface Canvas {
  channelId: string
}

interface getChannelId {
  type: typeof GET_CHANNEL_ID
  channelId: string
}

export type CanvasActionTypes = getChannelId


/**
 * MESSAGE TYPES
 */

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
  chat: {messages: Array<Message>},
  user: User,
  username: string,
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

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  payload: Message
}

export type ChatActionTypes = GotNewMessageAction | DeleteMessageAction | GotMessagesFromServerAction


/**
 * USER TYPES
 */

export interface User {}

interface getUserAction {
  type: typeof GET_USER,
  user: User
}

interface removeUserAction {
  type: typeof REMOVE_USER
}

export type UserActionTypes = getUserAction | removeUserAction

/**
 * PANEL TYPES
 */

//TYPES OF ACTION TYPES
interface UpdateToolAction {
  type: typeof UPDATE_TOOL
  tool: string
}

interface UpdateColorAction {
  type: typeof UPDATE_COLOR
  color: string
}

interface UpdateFillAction {
  type: typeof UPDATE_FILL
  fill: string
}
interface UpdateStrokeWidthAction {
 type: typeof UPDATE_STROKE_WIDTH
 strokeWidth: number
}

interface UpdateCanvasAction {
  type: typeof UPDATE_CANVAS
  canvas: any
}


export type PanelActionTypes = UpdateToolAction | UpdateColorAction | UpdateFillAction | UpdateStrokeWidthAction | UpdateCanvasAction
/**
* INITIAL STATE
*/

export interface Panel {
 tool: string
 strokeWidth: number
 color: string
 fill: string
 canvasRef: any
 instructions: Array<any>
}
