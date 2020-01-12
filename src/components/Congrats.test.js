import { shallow } from 'enzyme';
import React from 'react';
import { findElementByTestId, checkProps } from '../test/testUtils';
import Congrats from './Congrats';

const defaultProps = {
    success: false
}

const setup = (props, state) => {
    const propsWithDefault = {...defaultProps, ...props }
    const wrapper = shallow(<Congrats {...propsWithDefault} />); 
    if (state) {
        wrapper.setState(state);
    }
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

test('do not throw warning with expected props', () => {
    const expectedProps = { success: false };
    checkProps(Congrats, expectedProps);
 });

