import { createStore, combineReducers, applyMiddleware } from 'redux'
import { auth, user } from './reducers'
import thunk from "redux-thunk" 
import { logger } from './middleware'

import { saveState, loadState } from '../helpers/localStorage'

const rootReducer = combineReducers({
  auth,
  user
});

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk, logger)
  // compose(persistedState, applyMiddleware(thunk, logger))
)

// store.subscribe(() => {
//   console.log(1112, store.getState())
//   saveState(store.getState());
// });

export default store;

// export default combineReducers({
//   auth
// })