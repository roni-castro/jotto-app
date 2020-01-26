import React from 'react';
import './App.css';
import GuessedWords from './components/GuessedWords';
import Congrats from './components/Congrats';
import InputBox from './components/InputBox'

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
