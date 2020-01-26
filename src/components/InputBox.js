import React from 'react';
import { Component } from "react";
import { connect } from 'react-redux';

import styled from 'styled-components'; 

const Input = styled.input`
    width: 15%;
    height: 24px;
    border: 1px solid #000;
    border-radius: 4px;
`

const Button = styled.button`
    height: 24px;
    border: 1px solid #000;
    border-radius: 4px;
    margin-left: 4px;
    color: #fff;
    background-color: #000;
`

class InputBox extends Component {
  render() {
    const { success } = this.props;
    let content = success 
      ? null
      : <form>
          <Input test-id="input-box" />
          <Button test-id="submit-button">Submit</Button>
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

export default connect(mapStateToProps)(InputBox);