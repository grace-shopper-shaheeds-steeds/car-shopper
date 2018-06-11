import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cart from './cart'
import {productReducer} from './productReducer'
import {userManagementReducer} from './userManagement'

const reducer = combineReducers({user, productReducer, cart, userManagementReducer})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './productReducer'
export * from './cart'
export * from './userManagement'
