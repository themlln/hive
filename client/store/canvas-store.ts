const axios = require('axios').default;
import { CanvasActionTypes, Canvas } from '../types/storeTypes'
import history from '../history'
import clientSocket from '../sockets/chat-sockets'
import { Dispatch } from 'react';

/**
 * ACTION TYPES
 */
 export const GET_CHANNEL_ID = 'GET_CHANNEL_ID'
 /**
 * INITIAL STATE
 */

const initialState: Canvas = {
  channelId: ""
}

/**
 * ACTION CREATORS
 */

const getChannelId = (channelId: string): CanvasActionTypes => {
  return {
    type: GET_CHANNEL_ID,
    channelId
  }
}

/**
 * THUNK CREATORS
 */
export const creatingNewCanvas = () => async (dispatch: Dispatch<any>) => {
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

export const fetchingChannel = (channelId: string) => async (dispatch: Dispatch<any>) => {
  try {
    clientSocket.emit('join-drawing', channelId)
    dispatch(getChannelId(channelId))
    const user = await axios.put('/auth/username', username)
    history.push('/whiteboard?id='+channelId)
  } catch (err) {
    console.error(err)
  }
}

export const loadingChannelId = (channelId: string) => async (dispatch: Dispatch<any>) => {
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

export const canvasReducer = (state=initialState, action: CanvasActionTypes): Canvas => {
  switch(action.type) {
    case GET_CHANNEL_ID:
      return {
        channelId: action.channelId
      }
    default:
      return state
  }
}

