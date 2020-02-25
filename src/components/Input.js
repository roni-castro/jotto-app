import React from 'react';
import styled from 'styled-components';

const InputStyled = styled.input`
    width: 15%;
    height: 28px;
    font-size: 1em;
    border: 1px solid #000;
    border-radius: 4px;
`

export const Input = (props) => 
  <InputStyled
    autoFocus
    test-id="input"
  />