import {
  PRODUCTS_REQUST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL
} from '../types'
const intialState = {
  products: [],
  product: {},
  loading: false,
  error: null
}
export const productReducer = (state = intialState, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCTS_REQUST:
      return { ...state, loading: true }
    case PRODUCTS_LIST_SUCCESS:
      return { ...state, loading: false, products: payload, error: null }
    case PRODUCTS_LIST_FAIL:
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case GET_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: payload, error: null }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
