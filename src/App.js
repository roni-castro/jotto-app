import React, { useEffect } from 'react';
import './App.css';
import GuessedWords from './components/GuessedWords';
import Congrats from './components/Congrats';
import Spinner from './components/Spinner';
import Loading from './components/Loading';
import { getSecretWord } from './actions/hookActions';
import { InputBox } from './components/InputBox';
import LanguageContext from './contexts/languageContext'
import LanguagePicker from './components/LanguagePicker';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload }
    case 'setLanguage':
      return { ...state, language: action.payload }
    default:
      throw new Error(`cannot set state with the action ${action}`)
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null, language: 'en'}
  )

  const setSecretWord = (secretWord) =>
    dispatch({ type: 'setSecretWord', payload: secretWord })

  const setLanguage = (language) => 
    dispatch({ type: 'setLanguage', payload: language })

  useEffect(() => {
    getSecretWord(setSecretWord)
  }, [])
  return (
    state.secretWord ?
      <div className="App" test-id="component-app">
        <h1>Jotto</h1>
        <LanguageContext.Provider
          value={state.language}
        >
          <LanguagePicker setLanguage={setLanguage} />
          <guessedWordsContext.Provider>
            <successContext.SuccessProvider>
              <Congrats />
              <InputBox secretWord={state.secretWord} />
            </successContext.SuccessProvider>
            <GuessedWords />
          </guessedWordsContext.Provider>
        </LanguageContext.Provider>
      </div>
      :
      <Loading test-id="spinner">
        <Spinner />
        <p>Loading...</p>
      </Loading>
  );
}

export default App;
