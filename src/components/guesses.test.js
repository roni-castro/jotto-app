import * as React from 'react';
import { mount } from 'enzyme';
import { findElementByTestId } from "../test/testUtils"
import { InputBox } from './InputBox';
import languageContext from '../contexts/languageContext';
import guessedWordsContext from '../contexts/guessedWordsContext';
import { languageStrings } from '../helpers/strings';
import successContext from '../contexts/successContext';

const setup = ({ secretWord, success } = {}) => {
  success = success || false
  const wrapper = mount(
    <guessedWordsContext.Provider>
      <successContext.SuccessProvider>
        <InputBox secretWord={secretWord} />
      </successContext.SuccessProvider>
    </guessedWordsContext.Provider>
  )
  const input = findElementByTestId(wrapper, 'input')
  const submitButton = findElementByTestId(wrapper, 'submit-button')
  return [wrapper, input, submitButton]
}

describe('test word guesses', () => {
  let wrapper, input, submitButton
  beforeEach(() => {
    [wrapper, input, submitButton] = setup({ secretWord: 'party' })
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
  })
})