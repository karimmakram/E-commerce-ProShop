import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from './redux/reducers/productReducer'
import { cartReducer } from './redux/reducers/cartReducer'

const cartItemsFromStorge = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
const reducer = combineReducers({
  productState: productReducer,
  cart: cartReducer
})
const initalState = {
  cart: { cartItems: cartItemsFromStorge }
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
