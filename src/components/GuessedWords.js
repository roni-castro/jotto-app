import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = (props) => {
    return (
        <div test-id="component-guessed-words">
            {props.guessedWords && props.guessedWords.length ? 
                <table test-id='guessed-words-table'>
                <tr>
                    <th>Guess</th>
                    <th>Matching Letters</th>
                </tr>
                    {props.guessedWords.map((item, index) => renderItems(item,index))}
                </table>
            : <div>
                <span test-id='guessed-words-empty'>Try a guess</span>
              </div>
            }
        </div>
    )
}

const renderItems = (item, index) => {
    const { guessedWord, letterMatchCount } = item
    return (
        <tr key={index.toString()} test-id='guessed-word-item'>
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