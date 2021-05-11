import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS__FAIL,
  ORDER_DETAILS__SUCCESS
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
    dispatch({ type: ORDER_DETAILS__SUCCESS, payload: data })
  } catch (error) {
    HandelError(dispatch, ORDER_DETAILS__FAIL, error)
  }
}
