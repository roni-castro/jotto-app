import React, { useContext } from 'react';
import styled from 'styled-components';
import { t } from '../helpers/strings';
import languageContext from '../contexts/languageContext';
import successContext from '../contexts/successContext';

const Congrats = styled.div`
    padding: 20px;
    background-color: #208209;
    color: #ffffff;
    margin: 0 25%;
    border: 1px solid #208209;
    border-radius: 8px;
`

const CongratsStyled = () => {
  const language = useContext(languageContext)
  const [success] = successContext.useSuccess();
  return (
    success ?
      <Congrats test-id='component-congrats'>
        <span test-id='congrats-message'>{t(language, 'congrats')}</span>
      </Congrats>
      :
      <div test-id='component-congrats' />

  )
}

export default CongratsStyled;