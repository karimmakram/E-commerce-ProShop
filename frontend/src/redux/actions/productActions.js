import {
  PRODUCTS_REQUST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL
} from '../types'
import axios from 'axios'
import { HandelError } from '../handelError'
import { authConfig } from '../config'

export const getProducts = (
  keyword = '',
  pageNumber = ''
) => async dispatch => {
  dispatch({ type: PRODUCTS_REQUST })
  try {
    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    )
    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data })
  } catch (error) {
    HandelError(dispatch, PRODUCTS_LIST_FAIL, error)
  }
}
export const getProductById = id => async dispatch => {
  dispatch({ type: PRODUCTS_REQUST })
  try {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    HandelError(dispatch, GET_PRODUCT_FAIL, error)
  }
}

export const deleteProduct = (id, token) => async dispatch => {
  dispatch({ type: PRODUCT_DELETE_REQUEST })
  const config = authConfig(token)
  try {
    await axios.delete(`/api/products/${id}`, config)
    dispatch({ type: PRODUCT_DELETE_SUCCESS })
  } catch (error) {
    HandelError(dispatch, PRODUCT_DELETE_FAIL, error)
  }
}
export const createProduct = product => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST })
  const {
    user: { userInfo }
  } = getState()
  const config = authConfig(userInfo.token)
  try {
    const { data } = await axios.post(`/api/products`, product, config)
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    HandelError(dispatch, PRODUCT_CREATE_FAIL, error)
  }
}

export const updateProduct = (id, product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST })
  const {
    user: { userInfo }
  } = getState()
  const config = authConfig(userInfo.token)
  try {
    const { data } = await axios.patch(`/api/products/${id}`, product, config)
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    HandelError(dispatch, PRODUCT_UPDATE_FAIL, error)
  }
}

export const createReviewProduct = (id, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
  const {
    user: { userInfo }
  } = getState()
  const config = authConfig(userInfo.token)
  try {
    await axios.post(`/api/products/${id}/reviews`, review, config)
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
  } catch (error) {
    HandelError(dispatch, PRODUCT_CREATE_REVIEW_FAIL, error)
  }
}
