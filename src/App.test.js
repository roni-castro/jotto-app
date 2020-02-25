import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { findElementByTestId } from './test/testUtils';

const setup = () => {
  return shallow(<App />)
}


test('renders app', () => {
  const wrapper = setup();
  const componentApp = findElementByTestId(wrapper, 'component-app')
  expect(componentApp.length).toBe(1);
});
