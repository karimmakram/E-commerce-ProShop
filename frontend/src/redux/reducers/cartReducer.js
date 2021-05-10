import {
  CART_ADD_ITEM,
  CART_REMVOE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from '../types'
const intialState = {
  cartItems: [],
  shippingAddress: {},
  paymentMethod: ''
}
export const cartReducer = (state = intialState, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_ADD_ITEM:
      const itemExist = state.cartItems.find(
        item => item.product === payload.product
      )
      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product === payload.product ? payload : item
          )
        }
      } else {
        return { ...state, cartItems: [...state.cartItems, payload] }
      }
    case CART_REMVOE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product !== payload)
      }
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: payload }
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: payload }
    default:
      return state
  }
}
