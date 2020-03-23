import React, { useState, createContext, useContext } from 'react';
import { useMemo } from 'react';

const successContext = createContext()

const useSuccess = () => {
  const context = useContext(successContext)

  if (!context) {
    throw new Error('useSuccess must be used inside SuccessProvider')
  }
  return context
}

const SuccessProvider = (props) => {
  const [success, setSuccess] = useState(false)

  const value = useMemo(() => [success, setSuccess], [success])

  return <successContext.Provider value={value} {...props} />
}

export default {
  useSuccess, SuccessProvider
}