import React from 'react'
import { shallow } from 'enzyme';
import { Input } from "./Input"
import { findElementByTestId, checkProps } from "../test/testUtils"

const setup = (props = {}) => {
  return shallow(<Input {...props} />)
}

describe('test InputBox component', () => {

  test('Input is rendered correctly', () => {
    const wrapper = setup({ secretWord: 'party' })
    const inputBox = findElementByTestId(wrapper, 'input')
    expect(inputBox.length).toBe(1)
  })

  test('do not throw warning about expected props', () => {
    checkProps(Input, { secretWord: 'party' })
  });

})