
import React from 'react';
import { shallow } from 'enzyme';
import InputBox, { InputBoxUncontrolled } from './InputBox';
import { createStoreFactory, findElementByTestId } from '../test/testUtils';

const setup = (initialState = {}) => {
  const store = createStoreFactory(initialState)
  const wrapper = shallow(<InputBox store={store} />).dive().dive();
  return wrapper
}

describe('render component', () => {
  let wrapper;
  describe('word has not been guessed', () => {
    beforeEach(() => {
      const initialState = { success: false }
      wrapper = setup(initialState);
    })

    test('render component without error', () => {
      const componentContainer = findElementByTestId(wrapper, 'component-container');
      expect(componentContainer.length).toBe(1);
    })
    test('renders input', () => {
      const input = findElementByTestId(wrapper, 'input-box');
      expect(input.length).toBe(1);
    })
    test('renders submit button', () => {
      const submitButton = findElementByTestId(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    })
  })

  describe('word has been guessed successfully', () => {
    let wrapper
    beforeEach(() => {
      wrapper = setup({ success: true })
    })

    test('render component without error', () => {
      const componentContainer = findElementByTestId(wrapper, 'component-container');
      expect(componentContainer.length).toBe(1);
    })
    test('does not renders input', () => {
      const input = findElementByTestId(wrapper, 'input-box');
      expect(input.length).toBe(0);
    })
    test('does not renders submit button', () => {
      const submitButton = findElementByTestId(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    })
  })
})

describe('validate state props', () => {
  test('success is passed as props', () => {
    const success = true;
    let wrapper = setup({ success })
    const props = wrapper.instance().props;
    expect(props.success).toBe(success)
  })
  test('guessWord action creator is a prop', () => {
    let wrapper = setup()
    const props = wrapper.instance().props;
    expect(props.guessWord).toBeInstanceOf(Function)
  })
})

describe('validate action props', () => {
  let wrapper;
  const guessWordMock = jest.fn()
  const guessedWord = 'party'
  beforeEach(() => {
    const props = {
      success: false,
      guessWord: guessWordMock
    }
    wrapper = shallow(<InputBoxUncontrolled {...props} />)

    // Add value to input
    wrapper.setState({ currentGuess: guessedWord })

    // Click on submit button
    const submitButton = findElementByTestId(wrapper, 'submit-button')
    submitButton.simulate('click', { preventDefault() {} })
  })
  test('`guessWord` is called when submit button is clicked', () => {
    expect(guessWordMock.mock.calls.length).toBe(1)
  })
  test('`guessWord` receives the value typed in input field', () => {
    const guessWordParamValue = guessWordMock.mock.calls[0][0]
    expect(guessWordParamValue).toBe(guessedWord)
  })
  test('input box is clicked on submit', () => {
    const currentGuessState = wrapper.instance().state.currentGuess
    expect(currentGuessState).toBe('')
  })
})