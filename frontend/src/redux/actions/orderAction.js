import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL
} from '../types'
import axios from 'axios'
import { HandelError } from '../handelError'
import { authConfig } from '../config'

export const createOrder = orderData => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_REQUEST })
    const token = getState().user.userInfo.token
    const config = authConfig(token)
    const { data } = await axios.post(`/api/orders`, orderData, config)
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
  } catch (error) {
    HandelError(dispatch, ORDER_CREATE_FAIL, error)
  }
}

export const getOrderById = id => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST })
  const token = getState().user.userInfo.token
  const config = authConfig(token)
  try {
    const { data } = await axios.get(`/api/orders/${id}`, config)
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    HandelError(dispatch, ORDER_DETAILS_FAIL, error)
  }
}
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST })
  const token = getState().user.userInfo.token
  const config = authConfig(token)
  try {
    await axios.put(`/api/orders/${id}/pay`, paymentResult, config)
    dispatch({ type: ORDER_PAY_SUCCESS })
  } catch (error) {
    HandelError(dispatch, ORDER_PAY_FAIL, error)
  }
}

export const getMyOrderList = () => async (dispatch, getState) => {
  dispatch({ type: MY_ORDER_LIST_REQUEST })
  const token = getState().user.userInfo.token
  const config = authConfig(token)
  try {
    const { data } = await axios.get(`/api/orders/me`, config)
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    HandelError(dispatch, MY_ORDER_LIST_FAIL, error)
  }
}
