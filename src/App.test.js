import React from 'react';
import { shallow } from 'enzyme';
import App, { AppUnconnected } from './App';

import { createStoreFactory } from './test/testUtils';
const setup = (initialState = {}) => {
  const store = createStoreFactory(initialState);
  const wrapper = shallow(<App store={store} />).dive().dive()
  return wrapper;
}

test('renders app', () => {
  const app = setup()
  expect(app).not.toBeNull();
});

describe('validate props', () => {
  test('have `success` props', () => {
    const success = true;
    const app = setup({ success })
    const props = app.instance().props
    expect(props.success).toBe(success)
  });
  test('have `secretWord` props', () => {
    const secretWord = 'party';
    const app = setup({ secretWord })
    const props = app.instance().props
    expect(props.secretWord).toEqual(secretWord)
  });
  test('have `guessedWords` props', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }]
    const app = setup({ guessedWords })
    const props = app.instance().props
    expect(props.guessedWords).toEqual(guessedWords)
  });
  test('have `getSecretWord` action creator as a prop', () => {
    const app = setup()
    const props = app.instance().props
    expect(props.getSecretWord).toBeInstanceOf(Function)
  });
  test('getSecretWord runs on componentDidMount', () => {
    const getSecretWordMock = jest.fn();
    const initialPops = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWords: [],
    }
    const wrapper = shallow(<AppUnconnected {...initialPops}/>)
    wrapper.instance().componentDidMount()
    const numberOfCallFunction = getSecretWordMock.mock.calls.length
    expect(numberOfCallFunction).toBe(1)
  });
})
