import {
  PRODUCTS_REQUST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST
} from '../types'
import axios from 'axios'
import { HandelError } from '../handelError'
import { authConfig } from '../config'

export const getProducts = () => async dispatch => {
  dispatch({ type: PRODUCTS_REQUST })
  try {
    const { data } = await axios.get('/api/products')
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
