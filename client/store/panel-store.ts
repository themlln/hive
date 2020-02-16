
import * as React from 'react'
import { PanelActionTypes, Panel } from '../types/storeTypes'

/**
 * ACTION TYPES
 */
 export const UPDATE_TOOL = 'UPDATE_TOOL'
 export const UPDATE_COLOR = 'UPDATE_COLOR'
 export const UPDATE_FILL = 'UPDATE_FILL'
 export const UPDATE_STROKE_WIDTH = 'UPDATE_STROKE_WIDTH'
 export const UPDATE_CANVAS = 'UPDATE_CANVAS'

const initialState: Panel = {
  tool: 'draw',
  strokeWidth: 3,
  color: 'black',
  fill: 'black',
  canvasRef: null,
  instructions: []
}
 /**
 * ACTION CREATORS
 */

 export const updateTool = (tool: string): PanelActionTypes => {
   return {
     type: UPDATE_TOOL,
     tool
   }
 }

 export const updateColor = (color: string): PanelActionTypes => {
   return {
     type: UPDATE_COLOR,
     color
   }
 }

 export const updateFill = (fill: string): PanelActionTypes => {
   return {
     type: UPDATE_FILL,
     fill
   }
 }

 export const updateStrokeWidth = (strokeWidth: number): PanelActionTypes => {
  return {
    type: UPDATE_STROKE_WIDTH,
    strokeWidth
  }
}

export const updateCanvas = (canvas: any): PanelActionTypes => {
  return {
    type: UPDATE_CANVAS,
    canvas
  }
}

 /**
 * REDUCER
 */

 export const panelReducer = (state=initialState, action: PanelActionTypes): Panel => {
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

