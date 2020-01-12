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

test('do not throw warning about expected props', () => {
    checkProps(GuessedWords, defaultGuessedWords)
});

describe('if there are more than zero guessed words', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup(defaultGuessedWords)
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
        expect(guessedWordItem.length).toBe(defaultGuessedWords.guessedWords.length);
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
});




