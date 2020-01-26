import { actionTypes } from '../actions/index';
import sucessReducer from './sucessReducer';


test('return default state of `false` when no action is passed', () => {
  const newState = sucessReducer(undefined)
  expect(newState).toBe(false);
})

test('return true when action `CORRECT_GUESS` is passed', () => {
  const newState = sucessReducer(undefined, { type: actionTypes.CORRECT_GUESS })
  expect(newState).toBe(true);
})