// @flow
import type { HistoricalQueryParams } from '../api';
import type { Action, ThunkAction } from "./types";

import { get, getHistoricalData, HISTORICAL_HOURLY_DATA, HISTORICAL_DAILY_DATA } from "../api";
import {
  GRAPH_DATE_RANGE_SELECT,
  GRAPH_FETCH_START,
  GRAPH_FETCH_SUCCESS
} from "./types";

export const DATE_RANGE_1D = "1D";
export const DATE_RANGE_1W = "1W";
export const DATE_RANGE_1M = "1M";
export const DATE_RANGE_3M = "3M";
export const DATE_RANGE_6M = "6M";
export const DATE_RANGE_1Y = "1Y";
export const DATE_RANGE_ALL = "ALL";

export const DATE_RANGE_DEFAULT = DATE_RANGE_1D;
export const DATE_RANGES = [
  DATE_RANGE_1D,
  DATE_RANGE_1W,
  DATE_RANGE_1M,
  DATE_RANGE_3M,
  DATE_RANGE_6M,
  DATE_RANGE_1Y,
  DATE_RANGE_ALL
];

export type DateRange =
  | typeof DATE_RANGE_1D
  | typeof DATE_RANGE_1W
  | typeof DATE_RANGE_1M
  | typeof DATE_RANGE_3M
  | typeof DATE_RANGE_6M
  | typeof DATE_RANGE_1Y
  | typeof DATE_RANGE_ALL;

export const dateQueryParams = {
  DATE_RANGE_1D: {
    apiCategory: HISTORICAL_HOURLY_DATA,
    data: {
      tsym: "USD",
      aggregate: 1,
      limit: 24
    }
  },
  DATE_RANGE_1W: {
    apiCategory: HISTORICAL_DAILY_DATA,
    data: {
      tsym: "USD",
      aggregate: 1,
      limit: 7
    }
  },
  DATE_RANGE_1M: {
    apiCategory: HISTORICAL_DAILY_DATA,
    data: {
      tsym: "USD",
      aggregate: 1,
      limit: 30
    }
  },
  DATE_RANGE_3M: {
    apiCategory: HISTORICAL_DAILY_DATA,
    data: {
      tsym: "USD",
      aggregate: 1,
      limit: 90
    }
  },
  DATE_RANGE_6M: {
    apiCategory: HISTORICAL_DAILY_DATA,
    data: {
      tsym: "USD",
      aggregate: 15,
      limit: 12
    }
  },
  DATE_RANGE_1Y: {
    apiCategory: HISTORICAL_DAILY_DATA,
    data: {
      tsym: "USD",
      aggregate: 30,
      limit: 12
    }
  },
  DATE_RANGE_ALL: {
    apiCategory: HISTORICAL_DAILY_DATA,
    data: {
      tsym: "USD",
      aggregate: 30,
      limit: 200
    }
  }
};

export const selectRange = (dateRange: DateRange): Action => ({
  type: GRAPH_DATE_RANGE_SELECT,
  dateRange
});

export const getGraphData = (): ThunkAction => async (dispatch, getState) => {
  dispatch({ type: GRAPH_FETCH_START });
  const {
    coins: { current },
    graph: { dateRange }
  } = getState();
  const apiQuery = dateQueryParams[dateRange];
  apiQuery.data.fsym = current;
  const response = await getHistoricalData(apiQuery);

  dispatch({
    type: GRAPH_FETCH_SUCCESS,
    payload: response
  });
};
