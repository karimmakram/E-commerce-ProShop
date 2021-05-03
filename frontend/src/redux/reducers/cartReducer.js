import { CART_ADD_ITEM, CART_REMVOE_ITEM } from '../types'
const intialState = {
  cartItems: []
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
    default:
      return state
  }
}
