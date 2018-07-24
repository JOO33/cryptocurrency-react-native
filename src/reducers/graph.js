// @flow

import type { Action } from "../actions/types";
import {
  GRAPH_DATE_RANGE_SELECT,
  GRAPH_FETCH_START,
  GRAPH_FETCH_SUCCESS
} from "../actions/types";

import { DATE_RANGE_DEFAULT } from '../actions/graph'
export type State = {
  +isLoading: boolean,
  +dateRange: string,
  +priceData: Array<number>
};

const initialState: State = {
  isLoading: true,
  dateRange: DATE_RANGE_DEFAULT,
  priceData: []
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
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
        priceData: !!Data ? Data.map(item => item.close) : []
      };
    }

    case GRAPH_DATE_RANGE_SELECT: {
      const { dateRange } = action;
      return {
        ...state,
        dateRange
      };
    }

    default: {
      return state;
    }
  }
}
