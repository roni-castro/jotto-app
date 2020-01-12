import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = (props) => {
    return (
        <div test-id="component-guessed-words">
            <h2>Guessed Words</h2>
            {props.guessedWords && props.guessedWords.length ? 
                <table test-id='guessed-words'>
                    <thead>
                        <tr>
                            <th>Guess</th>
                            <th>Matching Letters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.guessedWords.map((item, index) => renderItems(item,index))}
                    </tbody>
                </table>
            : <div>
                <span test-id='guessed-words-instructions'>Try a guess</span>
              </div>
            }
        </div>
    )
}

const renderItems = (item, index) => {
    const { guessedWord, letterMatchCount } = item
    return (
        <tr key={index.toString()} test-id='guessed-word'>
            <td>{guessedWord}</td>
            <td>{letterMatchCount}</td>
        </tr>
    )
}

GuessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired,
        })
    ).isRequired,
}

export default GuessedWords;