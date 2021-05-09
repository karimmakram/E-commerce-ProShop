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
  USER_UPDATE_PROFILE_FAIL
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
export default userReducer
