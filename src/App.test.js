import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import moxios from 'moxios'
import { findElementByTestId } from './test/testUtils';
import * as hookActions from './actions/hookActions';

const setup = () => {
  return mount(<App />)
}

beforeEach(() => {
  moxios.install()
})

afterEach(() => {
  moxios.uninstall()
})

test('renders app', () => {
  const wrapper = setup();
  const componentApp = findElementByTestId(wrapper, 'component-app')
  expect(componentApp.length).toBe(1);
});

describe('getSecretWord called', () => {
  let mockGetSecretWord;
  
  beforeEach(() => {
    mockGetSecretWord = jest.fn()
    hookActions.getSecretWord = mockGetSecretWord
  })

  afterEach(() => {
    jest.clearAllMocks();
  })
  
  test('getSecretWord is called on app render', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test('getSecretWord do not run on App update', () => {
    const wrapper = setup();
    jest.clearAllMocks();
    wrapper.setProps({ secretWord: ''})
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
})
