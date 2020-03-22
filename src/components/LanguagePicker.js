import React from 'react';
import PropTypes from 'prop-types'

export default function LanguagePicker({ setLanguage }) {
  const languages = [
    { code: 'en', symbol: '🇺🇸' },
    { code: 'emoji', symbol: '😊' },
  ];

  const languageIcons = languages.map((language) =>
    <span
      test-id='language-icon'
      key={language.code}
      onClick={() => setLanguage(language.code)}
    >
      {language.symbol}
    </span>
  )

  return (
    <div test-id='component-language-picker'>
      {languageIcons}
    </div>
  );
}

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired,
}
