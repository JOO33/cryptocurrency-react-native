// @flow
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from "redux-persist";
import { AsyncStorage } from 'react-native'
import createLogger from "redux-logger";
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import type { Store } from '../reducers';

const isDebuggingInChrome = false;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

const enhancer = applyMiddleware(thunk, logger)

export default function configureStore(): Store {
  const store = createStore(rootReducer, enhancer);
  const persistor = persistStore(store, { storage: AsyncStorage });

  if (isDebuggingInChrome) {
    window.store = store;
  }

  return store;
}