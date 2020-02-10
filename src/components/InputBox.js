import React from 'react';
import { Component } from "react";
import { connect } from 'react-redux';
import { guessWord } from '../actions'

import styled from 'styled-components'; 

const Input = styled.input`
    width: 15%;
    height: 28px;
    font-size: 1em;
    border: 1px solid #000;
    border-radius: 4px;
`

const Button = styled.button`
    height: 28px;
    border: 1px solid #000;
    font-size: 1em;
    border-radius: 4px;
    margin-left: 4px;
    color: #fff;
    background-color: #000;
    padding: 0 10px;
`

export class InputBoxUncontrolled extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentGuess: ''
    }
  }

  onSubmitWord = (evt) => {
    evt.preventDefault()
    const currentGuess = this.state.currentGuess
    if(currentGuess && !!currentGuess.length) {
      this.props.guessWord(currentGuess)
      this.setState({ currentGuess: '' })
      this.nameInput.focus();
    }
  }

  render() {
    const { success } = this.props;
    let content = success 
      ? null
      : <form>
          <Input
            autoFocus
            ref={(input) => { this.nameInput = input; }} 
            test-id="input-box"
            onChange={(evt) => this.setState({ currentGuess: evt.target.value })}
            value={this.state.currentGuess}
          />
          <Button 
            test-id="submit-button"
            onClick={this.onSubmitWord}
            type="submit"
          >
            Submit
          </Button>
        </form>
    return  (
    <div test-id="component-container">
      { content }
    </div>
    )
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
}

export default connect(mapStateToProps, { guessWord })(InputBoxUncontrolled);