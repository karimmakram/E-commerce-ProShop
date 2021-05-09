import {
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE,
  USER_UPDATE_PROFILE_FAIL
} from '../types'
import { config, authConfig } from '../config'
import axios from 'axios'
import { HandelError } from '../handelError'

export const userLogin = (email, password) => async dispatch => {
  dispatch({ type: USER_LOGIN })
  try {
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    HandelError(dispatch, USER_LOGIN_FAIL, error)
  }
}

export const register = (name, email, password) => async dispatch => {
  dispatch({ type: USER_REGISTER })
  try {
    const { data } = await axios.post(
      '/api/users',
      { email, password, name },
      config
    )
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    HandelError(dispatch, USER_REGISTER_FAIL, error)
  }
}

export const updateProfile = (updatedData, token) => async dispatch => {
  dispatch({ type: USER_UPDATE_PROFILE })
  const config = authConfig(token)
  try {
    const { data } = await axios.put('/api/users/profile', updatedData, config)
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: { ...data, token } })
    localStorage.setItem('userInfo', JSON.stringify({ ...data, token }))
  } catch (error) {
    HandelError(dispatch, USER_UPDATE_PROFILE_FAIL, error)
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}
