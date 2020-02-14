const axios = require('axios').default;
import history from '../history'
import clientSocket from '../sockets/chat-sockets'

/**
 * ACTION TYPES
 */
 const GET_CHANNEL_ID = 'GET_CHANNEL_ID'


 //TYPES OF ACTION TYPES
 interface getChannelId {
   type: typeof GET_CHANNEL_ID
   channelId: string
 }

 type CanvasActionTypes = getChannelId

 /**
 * INITIAL STATE
 */

interface Canvas {
  channelId: string
}

const initialState: Canvas = {
  channelId: ""
}

 /**
 * ACTION CREATORS
 */

 function getChannelId(channelId: string): CanvasActionTypes {
   return {
     type: GET_CHANNEL_ID,
     channelId
   }
 }

 /**
 * THUNK CREATORS
 */
export const creatingNewCanvas = (username: string) => async dispatch => {
  try {
    const user = await axios.put('/auth/username', username)
    const res = await axios.post('/api/canvases')
    await dispatch(getChannelId(res.data))
    clientSocket.emit('join-drawing', res.data)
    history.push('/whiteboard?id='+res.data)
  } catch (err) {
    console.error(err)
  }
}

export const fetchingChannel = (channelId: string, username: string) => async dispatch => {
  try {
    clientSocket.emit('join-drawing', channelId)
    dispatch(getChannelId(channelId))
    const user = await axios.put('/auth/username', username)
    history.push('/whiteboard?id='+channelId)
  } catch (err) {
    console.error(err)
  }
}

export const loadingChannelId = (channelId: string) => async dispatch => {
  try {
    clientSocket.emit('join-drawing', channelId)
    dispatch(getChannelId(channelId))
  } catch (err) {
    console.error(err)
  }
}
 /**
 * REDUCER
 */

 export default function canvasReducer(
   state=initialState,
   action: CanvasActionTypes
   ): Canvas {
     switch(action.type) {
       case GET_CHANNEL_ID:
        return {
          channelId: action.channelId
        }
       default:
        return state
     }
   }

