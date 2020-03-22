import { shallow } from 'enzyme';
import React from 'react';
import { findElementByTestId, checkProps } from '../test/testUtils';
import LanguagePicker from './LanguagePicker';

const setup = (props) => {
    const wrapper = shallow(<LanguagePicker {...props} />); 
    return wrapper;
}

describe('test LanguagePicker component', () => {
  const setLanguage = jest.fn()

  test('renders LanguagePicker component', () => {
    const app = setup({ setLanguage });
    const languagePicker = findElementByTestId(app, 'component-language-picker');
    expect(languagePicker).not.toBeNull();
  });

  test('renders LanguagePicker with props', () => {
    checkProps(LanguagePicker, { setLanguage: jest.fn() })
  });

  test('renders language icons', () => {
    const wrapper = setup({ setLanguage });
    const languageIcons = findElementByTestId(wrapper, 'language-icon');
    expect(languageIcons.length).toBeGreaterThan(0);
  });

  test('calls setLanguage prop when icon is clicked', () => {
    const wrapper = setup({ setLanguage });
    const languageIcons = findElementByTestId(wrapper, 'language-icon');
    const firstIcon = languageIcons.first()
    firstIcon.simulate('click')
    expect(setLanguage).toHaveBeenCalled()
  });
})
