import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGIN,
  USER_REGISTER,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS
} from '../types'
const intialState = {
  userInfo: null,
  loading: false,
  error: null
}
const userReducer = (state = intialState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_LOGIN:
    case USER_REGISTER:
    case USER_UPDATE_PROFILE:
      return { ...state, loading: true }
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return { userInfo: payload, loading: false }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { userInfo: payload, loading: false, success: true }
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_UPDATE_PROFILE_FAIL:
      return { ...state, error: payload, loading: false, success: false }
    case USER_LOGOUT:
      return { userInfo: null, loading: false }
    default:
      return state
  }
}
export const userListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_LIST:
      return { loading: true }
    case USER_LIST_SUCCESS:
      return { loading: false, users: payload }
    case USER_LIST_FAIL:
      return { error: payload, loading: false }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}
export const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { error: payload, loading: false }
    default:
      return state
  }
}
export default userReducer
