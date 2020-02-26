import React, { useEffect, useReducer } from 'react';
import './App.css';
import GuessedWords from './components/GuessedWords';
import Congrats from './components/Congrats';
import { getSecretWord } from './actions/hookActions';

const secretWordReducer = (state, action) => {
  switch(action.type) {
    case 'setSecretWord': 
      return { ...state, secretWord: action.payload }
    default:
      throw new Error(`cannot set state with the action ${action}`)
  }
}

function App() {
  const [state, dispatch] = useReducer(secretWordReducer, { secretWord: null })

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord })
  }

  useEffect(() => {
    getSecretWord(setSecretWord)
  }, [])

  return (
    <div className="App" test-id="component-app">
      <h1>Jotto</h1>
      <Congrats success={false}/>
      <GuessedWords 
        guessedWords={[
            { guessedWord: 'train', letterMatchCount: 3 },
            { guessedWord: 'agile', letterMatchCount: 1 },
        ]}
      />
    </div>
  );
}

export default App;
