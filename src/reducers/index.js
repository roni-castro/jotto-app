import { combineReducers } from 'redux'
import sucessReducer from './sucessReducer'

export default combineReducers({
  success: sucessReducer,
})