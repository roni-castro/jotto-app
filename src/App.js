import React from 'react';
import './App.css';
import GuessedWords from './components/GuessedWords';
import Congrats from './components/Congrats';

function App() {
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
