import { CART_ADD_ITEM, GET_PRODUCT_FAIL, CART_REMVOE_ITEM } from '../types'
import axios from 'axios'
import { HandelError } from '../handelError'

export const addItem = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        image: data.image,
        name: data.name,
        price: data.price,
        countInStock: data.countInStock,
        qty
      }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (error) {
    HandelError(dispatch, GET_PRODUCT_FAIL, error)
  }
}

export const removeItem = id => (dispatch, getState) => {
  dispatch({ type: CART_REMVOE_ITEM, payload: id })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
