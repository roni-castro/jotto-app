import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tr } from 'styled-table-component';

const GuessedWords = (props) => {
    return (
        <div test-id="component-guessed-words">
            {props.guessedWords && props.guessedWords.length ? 
            <>
                <h2>Guessed Words</h2>
                <Table theadDark md test-id='guessed-words'>
                    <thead>
                        <tr>
                            <th scope="col">Guess</th>
                            <th scope="col">Matching Letters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.guessedWords.map((item, index) => renderItems(item,index))}
                    </tbody>
                </Table>
            </>
            : <span test-id='guessed-words-instructions'>
                Try to guess the secret word
              </span>
            }
        </div>
    )
}

const renderItems = (item, index) => {
    const { guessedWord, letterMatchCount } = item
    return (
        <Tr light key={index.toString()} test-id='guessed-word'>
            <td>{guessedWord}</td>
            <td>{letterMatchCount}</td>
        </Tr>
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