import React from 'react';
import PropTypes from 'prop-types'

const Congrats = (props) => {
    const { success } = props;
    return (
        success ?
            <div test-id='component-congrats'>
                <span test-id='congrats-message'>Congratulations!! You guessed the word!</span>
            </div>
        :
            <div test-id='component-congrats' />

    )
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
}

export default Congrats;