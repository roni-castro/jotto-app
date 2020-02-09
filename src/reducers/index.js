import { combineReducers } from 'redux'
import sucessReducer from './sucessReducer'
import guessedWords from './guessedWordsReducer'

export default combineReducers({
  success: sucessReducer,
  guessedWords,
})