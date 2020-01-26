
import React from 'react';
import { shallow } from 'enzyme';
import InputBox from './InputBox';
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

describe('', () => {
  
})