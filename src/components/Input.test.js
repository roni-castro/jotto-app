import React from 'react'
import { shallow } from 'enzyme';
import { Input } from "./Input"
import { findElementByTestId } from "../test/testUtils"

const setup = () => {
  return shallow(<Input />)
}

describe('test InputBox component', () => {

  test('Input is rendered correctly', () => {
    const wrapper = setup()
    const inputBox = findElementByTestId(wrapper, 'input')
    expect(inputBox.length).toBe(1)
  })
})