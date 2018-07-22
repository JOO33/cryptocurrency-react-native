// @flow

import { combineReducers } from 'redux';
// import reducers
import graph from './graph';
import coins from './coins';
// import types
import type { State as Graph } from './graph';
import type { State as Coins } from './coins';

export type Store = {
  +graph: Graph,
  +coins: Coins,
};

const reducers = {
  graph,
  coins,
};
export type Reducers = typeof reducers;

export default combineReducers(reducers);