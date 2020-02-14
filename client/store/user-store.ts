const axios = require('axios').default;
import history from '../history'
import { User, UserActionTypes } from '../types/storeTypes'
import { Dispatch } from 'react';

/**
 * ACTION TYPES
 */
export const GET_USER = 'GET_USER'
export const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const getUser = (user: User) => ({type: GET_USER, user})
export const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const loggingIn = () => async (dispatch: Dispatch<any>) => {
  try {
    const {data} = await axios.get('/auth/loggingin')
    dispatch(getUser(data || defaultUser))
  } catch (error) {
    console.log('LOGIN ERROR: ', error)
  }
}

export const auth = (email: string, password: string, username: string, method: string) => async (dispatch: Dispatch<any>) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password, username})
  } catch (authError) {
    console.log('Error authenticating user', authError)
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch: Dispatch<any>) => {
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
export const userReducer = (state = defaultUser, action: UserActionTypes): User => {
  switch (action.type) {
    case GET_USER:
      return action.payload ? action.payload : defaultUser
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
