import { combineReducers } from 'redux'
import sucessReducer from './sucessReducer'
import guessedWords from './guessedWordsReducer'
import secretWord from './secretWordReducer'

export default combineReducers({
  success: sucessReducer,
  guessedWords,
  secretWord,
})