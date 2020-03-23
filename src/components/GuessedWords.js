import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table, Tr } from 'styled-table-component';
import languageContext from '../contexts/languageContext';
import { getStringByLanguage } from '../helpers/strings';

const GuessedWords = (props) => {
  const lang = useContext(languageContext)
  return (
    <div test-id="component-guessed-words">
      {props.guessedWords && props.guessedWords.length ?
        <>
          <h2>{getStringByLanguage(lang, 'guessColumnHeader')}</h2>
          <Table theadDark md test-id='guessed-words'>
            <thead>
              <tr>
                <th scope="col">{getStringByLanguage(lang, 'guessedWords')}</th>
                <th scope="col">{getStringByLanguage(lang, 'matchingLettersColumnHeader')}</th>
              </tr>
            </thead>
            <tbody>
              {props.guessedWords.map((item, index) => renderItems(item, index))}
            </tbody>
          </Table>
        </>
        : <span test-id='guessed-words-instructions'>
          {getStringByLanguage(lang, 'guessPrompt')}
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