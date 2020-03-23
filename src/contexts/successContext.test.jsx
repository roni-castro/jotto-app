import React from 'react'
import successContext from './successContext';
import { shallow } from 'enzyme';

const FunctionalComponent = () => {
  successContext.useSuccess()
  return <div />
}
test('useSuccess throws error when used outside SuccessProvider', () => {
  expect(() => {
    shallow(<FunctionalComponent />)
  }).toThrow('useSuccess must be used inside SuccessProvider');
})

test('useSuccess is valid inside SuccessProvider', () => {
  expect(() => {
    shallow(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    )
  }).not.toThrow('useSuccess must be used inside SuccessProvider');
});
