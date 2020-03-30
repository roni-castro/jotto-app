import { mount } from 'enzyme';
import * as React from 'react';
import guessedWordsContext from '../contexts/guessedWordsContext';
import successContext from '../contexts/successContext';
import { findElementByTestId } from "../test/testUtils";
import { InputBox } from './InputBox';
import GuessedWords from './GuessedWords';

const setup = ({ secretWord, success, guessedWords } = {}) => {
  guessedWords = guessedWords || []
  success = success || false
  const wrapper = mount(
    <guessedWordsContext.Provider>
      <successContext.SuccessProvider>
        <InputBox secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.Provider>
  )
  const input = findElementByTestId(wrapper, 'input')
  const submitButton = findElementByTestId(wrapper, 'submit-button')

  guessedWords.forEach(guessedWord => {
    const mockEvent = { target: { value: guessedWord } }
    input.simulate('change', mockEvent)
    submitButton.simulate('click')
  })
  return [wrapper, input, submitButton]
}

describe('test word guesses', () => {
  describe('Non empty guessedWords', () => {
    let wrapper, input, submitButton
    const guessedWords = ['mark']
    beforeEach(() => {
      [wrapper, input, submitButton] = setup({ guessedWords, secretWord: 'party' })
    })

    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' } }
        input.simulate('change', mockEvent)
        submitButton.simulate('click')
      })
      test('input is not rendered', () => {
        const inputBox = findElementByTestId(wrapper, 'input-box')
        expect(inputBox.children().length).toBe(0)
      })

      test('table have rows number according to the guesses made', () => {
        const guessedWordsElements = findElementByTestId(wrapper, 'guessed-word')
        expect(guessedWordsElements.length).toBe(2)
      })
    })

    describe('incorrect guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'train' } }
        input.simulate('change', mockEvent)
        submitButton.simulate('click')
      })
      test('input is rendered', () => {
        const inputBox = findElementByTestId(wrapper, 'input-box')
        expect(inputBox.exists()).toBe(true)
      })
      test('table have rows number according to the guesses made', () => {
        const guessedWordsElements = findElementByTestId(wrapper, 'guessed-word')
        expect(guessedWordsElements.length).toBe(2)
      })
    })
  })

  describe('Empty guessedWords', () => {
    let wrapper, input, submitButton
    beforeEach(() => {
      [wrapper, input, submitButton] = setup({ guessedWords: [], secretWord: 'party' })
    })
    
    describe('guessedWords shows correct guesses after incorrect guess', () => {
      test('', () => {
        const mockEvent = { target: { value: 'wrong' } }
        input.simulate('change', mockEvent)
        submitButton.simulate('click')

        const guessedWordsElements = findElementByTestId(wrapper, 'guessed-word')
        expect(guessedWordsElements.length).toBe(1)
      })
    })
  })
})