
import * as React from 'react'

/**
 * ACTION TYPES
 */
 const UPDATE_TOOL = 'UPDATE_TOOL'
 const UPDATE_COLOR = 'UPDATE_COLOR'
 const UPDATE_FILL = 'UPDATE_FILL'
 const UPDATE_STROKE_WIDTH = 'UPDATE_STROKE_WIDTH'
 const UPDATE_CANVAS = 'UPDATE_CANVAS'

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


 type PanelActionTypes = UpdateToolAction | UpdateColorAction | UpdateFillAction | UpdateStrokeWidthAction | UpdateCanvasAction
 /**
 * INITIAL STATE
 */

interface Panel {
  tool: string
  strokeWidth: number
  color: string
  fill: string
  canvasRef: any
  instructions: Array<any>
}


const initialState: Panel = {
  tool: 'draw',
  strokeWidth: 3,
  color: 'black',
  fill: '',
  canvasRef: null,
  instructions: []
}
 /**
 * ACTION CREATORS
 */

 export function updateTool(tool: string): PanelActionTypes {
   return {
     type: UPDATE_TOOL,
     tool
   }
 }

 export function updateColor(color: string): PanelActionTypes {
   return {
     type: UPDATE_COLOR,
     color
   }
 }

 export function updateFill(fill: string): PanelActionTypes {
   return {
     type: UPDATE_FILL,
     fill
   }
 }

 export function updateStrokeWidth(strokeWidth: number): PanelActionTypes {
  return {
    type: UPDATE_STROKE_WIDTH,
    strokeWidth
  }
}

export function updateCanvas(canvas: any): PanelActionTypes {
  return {
    type: UPDATE_CANVAS,
    canvas
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
       case UPDATE_FILL:
       return {
         ...state,
         fill: action.fill
       }
        case UPDATE_STROKE_WIDTH:
          return {
            ...state,
            strokeWidth: action.strokeWidth
          }
        case UPDATE_CANVAS:
          return {
            ...state,
            canvasRef: action.canvas
          }
       default:
        return state
     }
   }

