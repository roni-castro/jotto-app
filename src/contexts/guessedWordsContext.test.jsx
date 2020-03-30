import React from 'react'
import guessedWordsContext from './guessedWordsContext';
import { shallow } from 'enzyme';

const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords()
  return <div />
}
test('useGuessedWords throws error when used outside GuessedWordsProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />)
  }).toThrow('useGuessedWords must be used inside GuessedWordsProvider');
})

test('useGuessedWords is valid inside GuessedWordsProvider', () => {
  expect(() => {
    shallow(
      <guessedWordsContext.Provider>
        <FunctionalComponent />
      </guessedWordsContext.Provider>
    )
  }).not.toThrow('useGuessedWords must be used inside GuessedWordsProvider');
});
