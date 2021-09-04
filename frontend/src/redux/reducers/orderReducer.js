import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_REST,
  ORDER_DETAILS_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL
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
export const orderDetailsReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: payload, success: true }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: payload }
    case ORDER_DETAILS_RESET:
      return {}
    default:
      return state
  }
}
export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_PAY_REQUEST:
      return { loading: true }
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAY_FAIL:
      return { loading: false, error: payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const myOrderListReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case MY_ORDER_LIST_REQUEST:
      return { loading: true }
    case MY_ORDER_LIST_SUCCESS:
      return { loading: false, orders: payload }
    case MY_ORDER_LIST_FAIL:
      return { loading: false, error: payload }
    case MY_ORDER_LIST_REST:
      return { orders: [] }
    default:
      return state
  }
}

export const OrderListReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: payload }
    case ORDER_LIST_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
