import * as React from 'react'

/**
 * ACTION TYPES
 */
 const UPDATE_TOOL = 'UPDATE_TOOL'


 //TYPES OF ACTION TYPES
 interface UpdateToolAction {
   type: typeof UPDATE_TOOL
   tool: string
 }

 type PanelActionTypes = UpdateToolAction
 /**
 * INITIAL STATE
 */

interface Panel {
  tool: string
  strokeWidth: number
  color: string
  canvasRef: any
  instructions: Array<any>
}


const initialState: Panel = {
  tool: 'draw',
  strokeWidth: 5,
  color: 'black',
  canvasRef: null,
  instructions: []
}
 /**
 * ACTION CREATORS
 */

 export function updateTool(tool:string): UpdateToolAction {
   return {
     type: UPDATE_TOOL,
     tool
   }
 }

 /**
 * THUNK CREATORS
 */


 /**
 * REDUCER
 */

 export default function panelReducer(
   state=initialState,
   action: PanelActionTypes
   ) : Panel {
     switch(action.type) {
       case UPDATE_TOOL:
        return {
          ...state,
          tool: action.tool
        }
       default:
        return state
     }
   }

