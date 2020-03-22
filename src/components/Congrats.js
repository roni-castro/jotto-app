import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'; 
import { getStringByLanguage } from '../helpers/strings';
import languageContext from '../contexts/languageContext';

const Congrats = styled.div`
    padding: 20px;
    background-color: #208209;
    color: #ffffff;
    margin: 0 25%;
    border: 1px solid #208209;
    border-radius: 8px;
`

const CongratsStyled = (props) => {
    const language = useContext(languageContext)
    const { success } = props;
    return (
        success ?
            <Congrats test-id='component-congrats'>
                <span test-id='congrats-message'>{getStringByLanguage(language, 'congrats')}</span>
            </Congrats>
        :
            <div test-id='component-congrats' />

    )
}

CongratsStyled.propTypes = {
    success: PropTypes.bool.isRequired
}

export default CongratsStyled;