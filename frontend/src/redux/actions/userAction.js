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
  USER_UPDATE_PROFILE_FAIL,
  MY_ORDER_LIST_REST,
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
  USER_LIST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL
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

export const userList = token => async dispatch => {
  dispatch({ type: USER_LIST })
  const config = authConfig(token)
  console.log(token)

  try {
    const { data } = await axios.get('/api/users', config)
    dispatch({ type: USER_LIST_SUCCESS, payload: data })
  } catch (error) {
    HandelError(dispatch, USER_LIST_FAIL, error)
  }
}

export const deleteUser = (id, token) => async dispatch => {
  dispatch({ type: USER_DELETE_REQUEST })
  const config = authConfig(token)
  try {
    const { data } = await axios.delete(`/api/users/${id}`, config)
    dispatch({ type: USER_DELETE_SUCCESS })
  } catch (error) {
    HandelError(dispatch, USER_DELETE_FAIL, error)
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: MY_ORDER_LIST_REST })
  dispatch({ type: ORDER_DETAILS_RESET })
  dispatch({ type: ORDER_PAY_RESET })
  dispatch({ type: USER_LIST_RESET })
}
