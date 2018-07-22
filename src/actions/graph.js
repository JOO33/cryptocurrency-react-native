// @flow

import { get } from '../api';
import type { Action, ThunkAction } from "./types";
import {
  GRAPH_DATE_RANGE_SELECT,
  GRAPH_FETCH_START,
  GRAPH_FETCH_SUCCESS
} from "./types";

export type State = {
  +loading: boolean,
  +range: string,
  +prices: Array<number>,
};

// Change current date range
export const selectRange = (range: Range): Action => ({
  type: GRAPH_DATE_RANGE_SELECT,
  range
});

// Fetch prices using API and dispatch the data to reducer
export const getGraphData = (): ThunkAction => async (dispatch, getState) => {
  dispatch({ type: GRAPH_FETCH_START });
  const {
    coins: { current },
    graph: { range },
  } = getState();
  const response = await get(buildAPIQuery(current, range));

  dispatch({
    type: GRAPH_FETCH_SUCCESS,
    response,
  });
};

// Build API query based on symbol of interest and current date range
const buildAPIQuery = (symbol: string, range: string): string => {
  let endpoint = 'histohour';
  let aggregate = 1;
  let limit = 24;

  switch (range) {
    case '1D':
      endpoint = 'histohour';
      aggregate = 1;
      limit = 48;
      break;
    case '1W':
      endpoint = 'histoday';
      aggregate = 1;
      limit = 7;
      break;
    case '1M':
      endpoint = 'histoday';
      aggregate = 1;
      limit = 30;
      break;
    case '3M':
      endpoint = 'histoday';
      aggregate = 3;
      limit = 90;
      break;
    case '6M':
      endpoint = 'histoday';
      aggregate = 6;
      limit = 180;
      break;
    case '1Y':
      endpoint = 'histoday';
      aggregate = 12;
      limit = 200;
      break;
    case 'ALL':
      endpoint = 'histoday';
      aggregate = 200;
      limit = 2000;
      break;
  }

  return `data/${endpoint}?fsym=${symbol}&tsym=USD&aggregate=${aggregate}&limit=${limit}`;
};
