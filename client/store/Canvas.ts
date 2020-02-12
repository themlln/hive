const axios = require('axios').default;
import history from '../history'
import clientSocket from '../sockets/chat-sockets'

/**
 * ACTION TYPES
 */
 const CREATE_NEW = 'CREATE_NEW'
 const GET_CHANNEL_ID = 'GET_CHANNEL_ID'


 //TYPES OF ACTION TYPES
 interface CreateNewCanvas {
   type: typeof CREATE_NEW
   channelId: string
 }

 type CanvasActionTypes = CreateNewCanvas

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

function createNewCanvas(channelId: string): CanvasActionTypes {
   return {
     type: CREATE_NEW,
     channelId
   }
 }

 function getChannelId(channelId: string): CanvasActionTypes {
   return {
     type: GET_CHANNEL_ID,
     channelId
   }
 }

 /**
 * THUNK CREATORS
 */
export const creatingNewCanvas = () => async dispatch => {
  try {
    const res = await axios.post('/api/canvases')
    console.log(res.data, "DATAAA")
    dispatch(createNewCanvas(res.data))
    clientSocket.emit('join-drawing', res.data)
  } catch (err) {
    console.error(err)
  }
}

export const fetchingChannel = (channelId: string) => async dispatch => {
  try {
    //socket here
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
       case CREATE_NEW:
        return {
          channelId: action.channelId
        }
       default:
        return state
     }
   }

