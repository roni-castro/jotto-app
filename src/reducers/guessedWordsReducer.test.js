import { createStoreFactory } from "../test/testUtils"
import { guessWord } from "../actions"

describe('guessWord action dispather', () => {
  const secretWord = 'party'
  const unsuccessfulGuess = 'truck'
  const successGuessedWord = {
    guessedWord: secretWord,
    letterMatchCount: secretWord.length,
  }
  
  describe('No guessed words', () => {
    let store;
    const initialState = { secretWord }
    beforeEach(() => {
      store = createStoreFactory(initialState)
    })
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess))
      const newState = store.getState()
      const guessedWords = [{
        guessedWord: unsuccessfulGuess, 
        letterMatchCount: 2,
      }]
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords,
      }
      expect(newState).toEqual(expectedState)
    })

    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord))
      const newState = store.getState()
      const initialState = { secretWord }
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [successGuessedWord],
      }
      expect(newState).toEqual(expectedState)
    })
  })

  describe('Some guessed words', () => {
    let store;
    const guessedWords = [{
      guessedWord: 'train', 
      letterMatchCount: 3,
    }] 
    const initialState = { secretWord, guessedWords }
    beforeEach(() => {
      store = createStoreFactory(initialState)
    })
    test('updates state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord(unsuccessfulGuess))
      let newState = store.getState()
      const newGuessedWord = {
        guessedWord: unsuccessfulGuess, 
        letterMatchCount: 2,
      }
      const expectedState = {
        ...initialState,
        success: false,
        guessedWords: [
          ...initialState.guessedWords, newGuessedWord
        ]
      }
      expect(newState).toEqual(expectedState)
    })
    test('updates state correctly for successful guess', () => {
      store.dispatch(guessWord(secretWord))
      let newState = store.getState()
      const expectedState = {
        ...initialState,
        success: true,
        guessedWords: [
          ...initialState.guessedWords, successGuessedWord
        ]
      }
      expect(newState).toEqual(expectedState)
    })
  })
})