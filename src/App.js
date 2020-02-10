import React, { Component } from 'react';
import './App.css';
import GuessedWords from './components/GuessedWords';
import Congrats from './components/Congrats';
import InputBox from './components/InputBox'
import { setSecretWord } from './actions'
import { connect } from 'react-redux';

export class AppUnconnected extends Component {
  
  componentDidMount() {
    this.props.getSecretWord()
  }

  render() {
    const { success, guessedWords, secretWord } = this.props
    return (
      <div className="App">
        <h1>Jotto</h1>
        <h2>{secretWord}</h2>
        <Congrats success={success}/>
        <InputBox />
        <GuessedWords 
          guessedWords={guessedWords}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
}

export default connect(mapStateToProps, { getSecretWord: setSecretWord })(AppUnconnected);
