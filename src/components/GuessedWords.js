import React, { useContext } from 'react';
import { Table, Tr } from 'styled-table-component';
import languageContext from '../contexts/languageContext';
import guessedWordsContext from '../contexts/guessedWordsContext';
import { t } from '../helpers/strings';

const GuessedWords = () => {
  const lang = useContext(languageContext)
  const [guessedWords] = guessedWordsContext.useGuessedWords()

  return (
    <div test-id="component-guessed-words">
      {guessedWords && guessedWords.length ?
        <>
          <h2>{t(lang, 'guessColumnHeader')}</h2>
          <Table theadDark md >
            <thead test-id='guessed-words'>
              <tr>
                <th scope="col">{t(lang, 'guessedWords')}</th>
                <th scope="col">{t(lang, 'matchingLettersColumnHeader')}</th>
              </tr>
            </thead>
            <tbody>
              {guessedWords.map((item, index) => renderItems(item, index))}
            </tbody>
          </Table>
        </>
        : <span test-id='guessed-words-instructions'>
          {t(lang, 'guessPrompt')}
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

export default GuessedWords;