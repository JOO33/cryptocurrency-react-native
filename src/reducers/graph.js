// @flow

import type { Action } from "../actions/types";
import {
  GRAPH_DATE_RANGE_SELECT,
  GRAPH_FETCH_START,
  GRAPH_FETCH_SUCCESS
} from "../actions/types";

// Type the state created by reducer in this file
export type State = {
  +isLoading: boolean,
  +dateRange: string,
  +priceData: Array<number>
};

const initialState: State = {
  isLoading: true, // show activity indicator on first load
  dateRange: "1D", // default to one day range
  priceData: [] // no price data initially
};

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case GRAPH_FETCH_START: {
      return {
        ...state,
        isLoading: true
      };
    }

    case GRAPH_FETCH_SUCCESS: {
      const {
        payload: { Data }
      } = action;
      return {
        ...state,
        isLoading: false,
        coins: !!Data ? Data.map(item => item.close) : [] // use closing prices
      };
    }

    case GRAPH_DATE_RANGE_SELECT: {
      const { range } = action;
      return {
        ...state,
        range
      };
    }

    default: {
      return state;
    }
  }
}
