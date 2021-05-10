import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from './redux/reducers/productReducer'
import { cartReducer } from './redux/reducers/cartReducer'
import userReducer from './redux/reducers/userReducer'

const cartItemsFromStorge = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const userInfoFromStorge = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddress = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}
const paymentMethod = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : ''
const reducer = combineReducers({
  user: userReducer,
  productState: productReducer,
  cart: cartReducer
})
const initalState = {
  cart: { cartItems: cartItemsFromStorge, shippingAddress, paymentMethod },
  user: { userInfo: userInfoFromStorge }
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
