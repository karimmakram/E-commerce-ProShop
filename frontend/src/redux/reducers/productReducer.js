import {
  PRODUCTS_REQUST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  TOP_PRODUCT_REQUEST,
  TOP_PRODUCT_FAIL,
  TOP_PRODUCT_SUCCESS
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
      return {
        ...state,
        loading: false,
        products: payload.products,
        page: payload.page,
        pages: payload.pages,
        error: null
      }
    case PRODUCTS_LIST_FAIL:
    case GET_PRODUCT_FAIL:
      return {
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

export const productCreateReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: payload }
    case PRODUCT_CREATE_FAIL:
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload }
    case PRODUCT_CREATE_RESET:
    case PRODUCT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const productCreateReviewReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productTopReducer = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case TOP_PRODUCT_REQUEST:
      return { loading: true, products: [] }
    case TOP_PRODUCT_SUCCESS:
      return { loading: false, products: payload }
    case TOP_PRODUCT_FAIL:
      return { loading: false, error: payload }
    default:
      return state
  }
}
