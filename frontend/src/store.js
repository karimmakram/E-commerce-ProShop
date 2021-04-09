import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer } from './redux/reducers/productReducer'
const reducer = combineReducers({ productState: productReducer })
const initalState = {}
const middleware = [thunk]
const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
