const axios = require('axios')
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
export interface User {
  id: number,
  email: string,
  password: string
}

export interface UserState {
  user: object
}

const initialState: UserState = {
  user: {}
}

/**
 * ACTION CREATORS
 */
interface GetUserAction {
  type: typeof GET_USER,
  payload: User
}

interface RemoveUserAction {
  type: typeof REMOVE_USER
}

type UserActionTypes = GetUserAction | RemoveUserAction

const getUser = (user: User) => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch: any) => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.user))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email: string, password: string, method: any) => async (dispatch: any) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    console.error(authError)
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch: any) => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state: UserState = initialState, action: UserActionTypes) {
  switch (action.type) {
    case GET_USER:
      return action.payload
    case REMOVE_USER:
      return state.user
    default:
      return state
  }
}
