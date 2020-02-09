import moxios from 'moxios';
import { createStoreFactory } from '../test/testUtils';
import { setSecretWord } from './index';

describe('secret word creator', () => {
  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })


  test('getSecretWord action creator', () => {
    const secretWord = 'party'
    let store = createStoreFactory({})

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: secretWord
      })
    })
      
    return store.dispatch(setSecretWord()).then(() => {
      const currentState = store.getState()
      expect(currentState.secretWord).toBe(secretWord)
    })
  })
})