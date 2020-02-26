import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputStyled = styled.input`
    width: 15%;
    height: 28px;
    font-size: 1em;
    border: 1px solid #000;
    border-radius: 4px;
`

const ButtonStyled = styled.button`
    height: 28px;
    border: 1px solid #000;
    font-size: 1em;
    border-radius: 4px;
    margin-left: 4px;
    color: #fff;
    background-color: #000;
    padding: 0 10px;
`

export const InputBox = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = useState('')

  return (
    <form test-id="input-box">
      <InputStyled
        autoFocus
        test-id="input"
        placeholder="Enter guess"
        value={currentGuess}
        onChange={(event) => setCurrentGuess(event.target.value)}
      />
      <ButtonStyled 
        test-id="submit-button"
        onClick={(event) => {
          // TODO: Update guessedWords
          // Check secretWord match with guess and update success
          event.preventDefault()
          setCurrentGuess('')}
        }
      >Submit
      </ButtonStyled>
    </form>
  )
}

InputBox.propTypes = {
  secretWord: PropTypes.string.isRequired
}