import React, { useState, createContext, useContext } from 'react';
import { useMemo } from 'react';

const guessedWordsContext = createContext()

const useGuessedWords = () => {
  const context = useContext(guessedWordsContext)

  if (!context) {
    throw new Error('useGuessedWords must be used inside GuessedWordsProvider')
  }
  return context
}

const Provider = (props) => {
  const [guessedWords, setGuessedWords] = useState([])
  const value = useMemo(() => [guessedWords, setGuessedWords], [guessedWords])
  return <guessedWordsContext.Provider value={value} {...props} />
}

export default {
  useGuessedWords,
  Provider,
}