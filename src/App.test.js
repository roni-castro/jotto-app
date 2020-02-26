import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import moxios from 'moxios'
import { findElementByTestId } from './test/testUtils';
import * as hookActions from './actions/hookActions';

const setup = (secretWord = 'party') => {
  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord },
      jest.fn()
    ])
  React.useReducer = mockUseReducer
  return mount(<App />)
}

beforeEach(() => {
  moxios.install()
})

afterEach(() => {
  moxios.uninstall()
  jest.clearAllMocks();
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

describe('secretWord is null', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup(null);
  })

  test('render loading spinner when secretword is null', () => {
    const spinner = findElementByTestId(wrapper, 'spinner')
    expect(spinner.exists()).toBe(true)
  });

  test('do not render app component when secretword is null', () => {
    const componentApp = findElementByTestId(wrapper, 'component-app')
    expect(componentApp.exists()).toBe(false)
  });
})

describe('secretWord is not null', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup();
  })

  test('do not render loading spinner when secretword is not null', () => {
    const spinner = findElementByTestId(wrapper, 'spinner')
    expect(spinner.exists()).toBe(false)
  });

  test('render app component when secretword is not null', () => {
    const componentApp = findElementByTestId(wrapper, 'component-app')
    expect(componentApp.exists()).toBe(true)
  });
})
