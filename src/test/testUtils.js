import { assertPropTypes } from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers'
import { middlewares } from '../configureStore';

export const findElementByTestId = (wrapper, id) => {
    return wrapper.find(`[test-id="${id}"]`);
}

export const checkProps = (component, expectedProps) => {
    assertPropTypes(component.propTypes, expectedProps, 'prop', component.name);
}

export const createStoreFactory = (initialState) => {
    const createStoreWithMiddlewares = applyMiddleware(...middlewares)(createStore)
    return createStoreWithMiddlewares(rootReducer, initialState)
}