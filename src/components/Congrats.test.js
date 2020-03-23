import { mount } from 'enzyme';
import React from 'react';
import { findElementByTestId } from '../test/testUtils';
import Congrats from './Congrats';
import languageContext from '../contexts/languageContext';
import successContext from '../contexts/successContext';
import { languageStrings } from '../helpers/strings'

const setup = ({ success, language } = {}) => {
  success = success || false
  language = language || 'en'
  const wrapper = mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
  return wrapper;
}

test('renders congrats component', () => {
  const app = setup();
  expect(app).not.toBeNull();
});

test('show text message when success state is true', () => {
  const app = setup({ success: true });
  const messageComponent = findElementByTestId(app, 'congrats-message');
  expect(messageComponent.text()).toBeTruthy();
});

test('show no text message when success state is false', () => {
  const app = setup();
  const messageComponent = findElementByTestId(app, 'component-congrats');
  expect(messageComponent.text()).toBe("");
});

describe('test languagePicker', () => {
  test('correctly renders congrats string in english language', () => {
    const app = setup({ success: true });
    const messageComponent = findElementByTestId(app, 'congrats-message');
    expect(messageComponent.text()).toBe(languageStrings.en.congrats)
  });

  test('correctly renders congrats string in emoji language', () => {
    const app = setup({ success: true, language: 'emoji' });
    const messageComponent = findElementByTestId(app, 'congrats-message');
    expect(messageComponent.text()).toBe(languageStrings.emoji.congrats)
  });
})
