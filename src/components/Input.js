import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputStyled = styled.input`
    width: 15%;
    height: 28px;
    font-size: 1em;
    border: 1px solid #000;
    border-radius: 4px;
`

export const Input = ({ secretWord }) => 
  <InputStyled
    autoFocus
    test-id="input"
  />

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
}