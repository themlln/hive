
import * as React from 'react'

/**
 * ACTION TYPES
 */
 const UPDATE_TOOL = 'UPDATE_TOOL'
 const UPDATE_COLOR = 'UPDATE_COLOR'

 //TYPES OF ACTION TYPES
 interface UpdateToolAction {
   type: typeof UPDATE_TOOL
   tool: string
 }

 interface UpdateColorAction {
   type: typeof UPDATE_COLOR
   color: string
 }

 type PanelActionTypes = UpdateToolAction | UpdateColorAction 
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

 export function updateTool(tool:string): PanelActionTypes {
   return {
     type: UPDATE_TOOL,
     tool
   }
 }

 export function updateColor(color:string): PanelActionTypes {
   return {
     type: UPDATE_COLOR,
     color
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
   ): Panel {
     switch(action.type) {
       case UPDATE_TOOL:
        return {
          ...state,
          tool: action.tool
        }
       case UPDATE_COLOR:
        return {
          ...state,
          color: action.color
        }
       default:
        return state
     }
   }

