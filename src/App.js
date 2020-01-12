import React from 'react';
import './App.css';
import GuessedWords from './components/GuessedWords';

function App() {
  return (
    <div className="App">
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
