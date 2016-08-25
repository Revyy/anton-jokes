import { combineReducers } from 'redux';
import addDialogReducer from './addDialogReducer';
import jokesReducer from './jokesReducer';

const app = combineReducers({
  addDialogReducer,
  jokesReducer
});

export default app;