import { assertPropTypes } from 'check-prop-types';
import { createStore } from 'redux';
import rootReducer from '../reducers'

export const findElementByTestId = (wrapper, id) => {
    return wrapper.find(`[test-id="${id}"]`);
}

export const checkProps = (component, expectedProps) => {
    assertPropTypes(component.propTypes, expectedProps, 'prop', component.name);
}

export const createStoreFactory = (initialState) => {
    return createStore(rootReducer, initialState)
}