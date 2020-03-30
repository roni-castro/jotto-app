import { mount } from 'enzyme';
import * as React from 'react';
import { findElementByTestId } from '../test/testUtils';
import GuessedWords from './GuessedWords';
import { languageStrings } from '../helpers/strings';
import guessedWordsContext from '../contexts/guessedWordsContext';
import languageContext from '../contexts/languageContext'

const defaultGuessedWords = [
  { guessedWord: 'train', letterMatchCount: 3 },
  { guessedWord: 'agile', letterMatchCount: 1 },
]

const setup = ({ guessedWords, language } = {}) => {
  guessedWords = guessedWords || defaultGuessedWords
  language = language || 'en'
  const wrapper = mount(
    <languageContext.Provider value={language}>
      <guessedWordsContext.Provider value={[guessedWords, jest.fn()]} >
        <GuessedWords />
      </guessedWordsContext.Provider>
    </languageContext.Provider>
  );
  return wrapper
}

test('renders GuessedWords component', () => {
  const app = setup();
  expect(app).not.toBeNull();
});

describe('if there are more than zero guessed words', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: defaultGuessedWords })
  })

  test('render component guessed words', () => {
    const componentGuessedWords = findElementByTestId(wrapper, 'component-guessed-words');
    expect(componentGuessedWords.length).toBe(1);
  });

  test('render "guessed word" section', () => {
    const guessedWordsNode = findElementByTestId(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1);
  });

  test('render list of guessed words according to its size', () => {
    const guessedWordItem = findElementByTestId(wrapper, 'guessed-word');
    expect(guessedWordItem.length).toBe(defaultGuessedWords.length);
  });
});

describe('if there is zero guessed words', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords: [] });
  });

  test('render component guessed words', () => {
    const componentGuessedWords = findElementByTestId(wrapper, 'component-guessed-words');
    expect(componentGuessedWords.length).toBe(1);
  });

  test('show instructions when no guess was made', () => {
    const guessedWordsHint = findElementByTestId(wrapper, 'guessed-words-instructions');
    expect(guessedWordsHint.text()).not.toBeFalsy();
  });

  describe('language picker', () => {

    test('show instructions in english by default', () => {
      const guessedWordsHint = findElementByTestId(wrapper, 'guessed-words-instructions');
      expect(guessedWordsHint.text()).toBe(languageStrings.en.guessPrompt);
    })

    test('show instructions in emoji', () => {
      wrapper = setup({ guessedWords: [], language: 'emoji' });
      const guessedWordsHint = findElementByTestId(wrapper, 'guessed-words-instructions');

      expect(guessedWordsHint.text()).toBe(languageStrings.emoji.guessPrompt);
    })
  });
})


