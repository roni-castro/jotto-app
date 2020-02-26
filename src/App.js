import React, { useEffect } from 'react';
import './App.css';
import GuessedWords from './components/GuessedWords';
import Congrats from './components/Congrats';
import Spinner from './components/Spinner';
import Loading from './components/Loading';
import { getSecretWord } from './actions/hookActions';
import { InputBox } from './components/InputBox';

const secretWordReducer = (state, action) => {
  switch(action.type) {
    case 'setSecretWord': 
      return { ...state, secretWord: action.payload }
    default:
      throw new Error(`cannot set state with the action ${action}`)
  }
}

function App() {
  const [state, dispatch] = React.useReducer(secretWordReducer, { secretWord: null })

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord })
  }

  useEffect(() => {
    getSecretWord(setSecretWord)
  }, [])
  return (
    state.secretWord ?
      <div className="App" test-id="component-app">
        <h1>Jotto</h1>
        <Congrats success={false}/>
        <InputBox />
        <GuessedWords 
          guessedWords={[
              { guessedWord: 'train', letterMatchCount: 3 },
              { guessedWord: 'agile', letterMatchCount: 1 },
          ]}
        />
      </div>
    : 
      <Loading test-id="spinner">
        <Spinner />
        <p>Loading...</p>
      </Loading>
  );
}

export default App;
