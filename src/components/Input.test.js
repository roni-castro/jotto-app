
import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';
import { createStoreFactory } from '../test/testUtils';

const setup = (initialState = {}) => {
  const store = createStoreFactory(initialState)
  const wrapper = shallow(<Input store={store} />)
  return wrapper
}

describe('render component', () => {
  describe('word has not been guessed', () => {
    test('render component without error', () => {
      const wrapper = setup();
    })
    test('render component input', () => {

    })
    test('render component submit button', () => {

    })
  })
})

describe('', () => {
  
})