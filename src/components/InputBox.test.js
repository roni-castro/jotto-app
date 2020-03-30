import * as React from 'react';
import { mount } from 'enzyme';
import { InputBox } from "./InputBox"
import { findElementByTestId, checkProps } from "../test/testUtils"
import languageContext from '../contexts/languageContext';
import guessedWordsContext from '../contexts/guessedWordsContext';
import { languageStrings } from '../helpers/strings';
import successContext from '../contexts/successContext';

const setupWithMount = ({ secretWord, language, success } = {}) => {
  secretWord = secretWord || 'party'
  language = language || 'en'
  success = success || false
  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <guessedWordsContext.Provider value={[[], jest.fn()]}>
          <InputBox secretWord={secretWord} />
        </guessedWordsContext.Provider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  )
}

describe('test InputBox component', () => {
  test('Input is rendered correctly', () => {
    const wrapper = setupWithMount()
    const inputBox = findElementByTestId(wrapper, 'input')
    expect(inputBox.length).toBe(1)
  })

  test('do not throw warning about expected props', () => {
    checkProps(InputBox, { secretWord: 'party' })
  });

  describe('test Input field state', () => {
    const setCurrentGuess = jest.fn();
    const useStateMock = (initState) => [initState, setCurrentGuess];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    let wrapper, input;
    beforeEach(() => {
      wrapper = setupWithMount()
      input = findElementByTestId(wrapper, 'input')
    })

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('state updates with value of input upon change', () => {
      const mockEvent = { target: { value: 'train' } }
      input.simulate('change', mockEvent)

      expect(setCurrentGuess).toHaveBeenCalledWith('train');
      expect(setCurrentGuess).toHaveBeenCalledTimes(1);
    })

    test('setSuccess is called when secretWord match', () => {
      const submitButton = findElementByTestId(wrapper, 'submit-button')
      const mockEvent = { target: { value: 'party' } }
      input.simulate('change', mockEvent)
      submitButton.simulate('click', { preventDefault: () => { } })

    })

    test('currentGuess is set to empty when submit button is clicked', () => {
      const submitButton = findElementByTestId(wrapper, 'submit-button')
      // simulate insert input value
      const mockEvent = { target: { value: 'train' } }
      input.simulate('change', mockEvent)
      // simulate submit
      submitButton.simulate('click', { preventDefault: () => { } })

      expect(setCurrentGuess).toHaveBeenCalledWith('');
    })

    test('input submit button text is in english', () => {
      wrapper = setupWithMount()
      const submitButton = findElementByTestId(wrapper, 'submit-button')
      expect(submitButton.text()).toBe(languageStrings.en.submit);
    })

    test('input submit button text is in emoji', () => {
      wrapper = setupWithMount({ language: 'emoji' })
      const submitButton = findElementByTestId(wrapper, 'submit-button')
      expect(submitButton.text()).toBe(languageStrings.emoji.submit);
    })
  })
  describe('test input visibility', () => {
    test('input is not rendered when success is true', () => {
      const wrapper = setupWithMount({ success: true })
      expect(wrapper.isEmptyRender()).toBe(true)
    })
  })
})