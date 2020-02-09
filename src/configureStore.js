import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import reactThunk from 'redux-thunk';

export const middlewares = [reactThunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

export default createStoreWithMiddleware(rootReducer);