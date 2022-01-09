import { createStore, combineReducers, applyMiddleware } from 'redux'
import { auth, theme, user } from './reducers'
import thunk from "redux-thunk" 
import { logger } from './middleware'

import { saveState, loadState } from '../helpers/localStorage'

const rootReducer = combineReducers({
  auth,
  theme,
  user
});

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk, logger)
)

store.subscribe(() => {
  saveState(store.getState());
});

export default store;