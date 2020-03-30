import * as React from 'react';
import { mount } from 'enzyme';
import { InputBox } from "./InputBox"
import { findElementByTestId, checkProps } from "../test/testUtils"
import languageContext from '../contexts/languageContext';
import guessedWordsContext from '../contexts/guessedWordsContext';
import { languageStrings } from '../helpers/strings';

const setupWithMount = (props = {}, language = 'en') => {
  return mount(
    <languageContext.Provider value={language}>
      <guessedWordsContext.Provider value={[[], jest.fn()]}>
        <InputBox {...props} />
      </guessedWordsContext.Provider>
    </languageContext.Provider>
  )
}

describe('test InputBox component', () => {
  test('Input is rendered correctly', () => {
    const wrapper = setupWithMount({ secretWord: 'party' })
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
      wrapper = setupWithMount({ secretWord: 'party' })
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

    test('currentGuess is set to empty when submit button is clicked', () => {
      const submitButton = findElementByTestId(wrapper, 'submit-button')
      // simulate insert input value
      const mockEvent = { target: { value: 'train' } }
      input.simulate('change', mockEvent)
      // simulate submit
      submitButton.simulate('click', { preventDefault: () => { } })

      expect(setCurrentGuess).toHaveBeenCalledWith('');
      // expect(setGuessWords).toHaveBeenCalledWith('');
    })

    test('input submit button text is in english', () => {
      wrapper = setupWithMount({ secretWord: 'party' }, 'en')
      const submitButton = findElementByTestId(wrapper, 'submit-button')
      expect(submitButton.text()).toBe(languageStrings.en.submit);
    })

    test('input submit button text is in emoji', () => {
      wrapper = setupWithMount({ secretWord: 'party' }, 'emoji')
      const submitButton = findElementByTestId(wrapper, 'submit-button')
      expect(submitButton.text()).toBe(languageStrings.emoji.submit);
    })
  })

})