// @flow
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from "redux-persist";
import { AsyncStorage } from 'react-native'
import logger from "redux-logger";
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import type { Store } from '../reducers';

const isDebuggingInChrome = false;

// const logger = createLogger({
//   predicate: (getState, action) => isDebuggingInChrome,
//   collapsed: true,
//   duration: true
// });

const enhancer = applyMiddleware(thunk, logger)

export default async function configureStore(onComplete: ?() => void): Promise<Store> {
  const store = createStore(rootReducer, enhancer);
  const persistor = persistStore(store, {}, _ => onComplete);

  if (isDebuggingInChrome) {
    window.store = store;
  }

  return store;
}