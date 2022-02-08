import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { auth, snackbar, theme, users, group, addEntry } from './reducers'
import thunk from "redux-thunk" 
import { logger } from './middleware'

import { saveState, loadState } from '../helpers/localStorage'

const rootReducer = combineReducers({
  auth,
  snackbar,
  theme,
  users,
  group,
  addEntry
});

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk, logger))
)

store.subscribe(() => {
  saveState(store.getState());
});

export default store;