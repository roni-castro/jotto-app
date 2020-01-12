import { shallow } from 'enzyme';
import React from 'react';
import { findElementByTestId, checkProps } from '../test/testUtils';
import GuessedWords from './GuessedWords';

const defaultGuessedWords = {
    guessedWords: [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
    ]
}

const setup = (props) => {
    const propsWithDefaultValue = {...defaultGuessedWords, ...props}
    return shallow(<GuessedWords {...propsWithDefaultValue} />); 
}

test('renders GuessedWords component', () => {
    const app = setup();
    expect(app).not.toBeNull();
});

test('show list of values correctly', () => {
    const app = setup();
    const guessedWordsItems = findElementByTestId(app, 'guessed-word-item');
    expect(guessedWordsItems.length).toBe(defaultGuessedWords.guessedWords.length);
});

test('show hint when no guess was made', () => {
    const app = setup({ guessedWords: [] });
    const guessedWordsHint = findElementByTestId(app, 'guessed-words-empty');
    expect(guessedWordsHint.text()).not.toBeFalsy();
});

test('do not throw warning about expected props', () => {
    checkProps(GuessedWords, defaultGuessedWords)
});


