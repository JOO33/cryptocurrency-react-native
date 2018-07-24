// @flow

import { combineReducers } from 'redux';

import graph from './graph';
import coins from './coin';
import type { State as GraphState } from './graph';
import type { State as CoinState } from './coin';

export type Store = {
  +graph: GraphState,
  +coins: CoinState,
};

const reducers = {
  graph,
  coins,
};

export type Reducers = typeof reducers;
export default combineReducers(reducers);