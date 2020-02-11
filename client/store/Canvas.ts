const axios = require('axios').default;
import history from '../history'

/**
 * ACTION TYPES
 */
 const CREATE_NEW = 'CREATE_NEW'

 //TYPES OF ACTION TYPES
 interface CreateNewCanvas {
   type: typeof CREATE_NEW
   canvasId: string
 }

 type CanvasActionTypes = CreateNewCanvas

 /**
 * INITIAL STATE
 */

interface Canvas {
  canvasId: string
}

const initialState: Canvas = {
  canvasId: ""
}

 /**
 * ACTION CREATORS
 */

function createNewCanvas(canvasId:string): CanvasActionTypes {
   return {
     type: CREATE_NEW,
     canvasId
   }
 }

 /**
 * THUNK CREATORS
 */
export const creatingNewCanvas = () => async dispatch => {
  try {
    const res = await axios.post('/api/canvases')
    dispatch(createNewCanvas(res.data))
    history.push('/whiteboard?id='+res.data);
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
          canvasId: action.canvasId
        }
       default:
        return state
     }
   }

