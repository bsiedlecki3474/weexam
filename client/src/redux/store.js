import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { auth, snackbar, theme, users, groups, tests, addEntry } from './reducers'
import thunk from "redux-thunk" 
import { logger } from './middleware'

import { saveState, loadState } from '../helpers/localStorage'

const rootReducer = combineReducers({
  auth,
  snackbar,
  theme,
  users,
  groups,
  tests,
  addEntry
});

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk, logger))
)

store.subscribe(() => {
  // do not store snackbar state on refresh
  const { snackbar, ...state } = store.getState();
  saveState(state);
});

export default store;