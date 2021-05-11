import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS__FAIL,
  ORDER_DETAILS__SUCCESS
} from '../types'
const intialState = {
  loading: false,
  error: null,
  order: {}
}
export const orderReducer = (state = intialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, order: payload, success: true }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
export const orderDetailsReducer = (
  state = { loading: true, order: {}, error: null },
  action
) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true }
    case ORDER_DETAILS__SUCCESS:
      return { loading: false, order: payload, success: true }
    case ORDER_DETAILS__FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
