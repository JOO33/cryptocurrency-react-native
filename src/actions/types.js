// @flow
import type { HistoryResponse, PriceMultiResponse } from "../api";

export const COIN_ADDED = "COIN_ADDED";
export const COIN_LOADED = "COIN_LOADED";
export const COIN_SELECTED = "COIN_SELECTED";
export const COIN_SET = "COIN_SET";

export const COIN_PRICE_FETCH_START = "COIN_PRICE_FETCH_START";
export const COIN_PRICE_FETCH_SUCCESS = "COIN_PRICE_FETCH_SUCCESS";
export const COIN_PRICE_DAY_AGO_FETCH_START = "COIN_PRICE_DAY_AGO_FETCH_START";
export const COIN_PRICE_DAY_AGO_FETCH_SUCCESS = "COIN_PRICE_DAY_AGO_FETCH_SUCCESS";
export const COIN_PRICE_DAY_AGO_FETCH_ERROR = "COIN_PRICE_DAY_AGO_FETCH_ERROR";

export const GRAPH_DATE_RANGE_SELECT = "GRAPH_DATE_RANGE_SELECT";
export const GRAPH_FETCH_START = "GRAPH_FETCH_START";
export const GRAPH_FETCH_SUCCESS = "GRAPH_FETCH_SUCCESS";

export type Action =
  | { type: typeof COIN_PRICE_FETCH_START }
  | {
      type: typeof COIN_PRICE_FETCH_SUCCESS,
      payload: HistoryResponse
    }
  | { type: typeof COIN_PRICE_DAY_AGO_FETCH_START, symbol: string}
  | { type: typeof COIN_PRICE_DAY_AGO_FETCH_SUCCESS, symbol: string, price: number }
  | { type: typeof COIN_LOADED }
  | { type: typeof COIN_SELECTED, symbol: string }
  | { type: typeof COIN_SET, symbol: string }
  | { type: typeof COIN_ADDED, symbol: string, name: string }
  | { type: typeof GRAPH_DATE_RANGE_SELECT, range: string }
  | { type: typeof GRAPH_FETCH_START }
  | {
      type: typeof GRAPH_FETCH_SUCCESS,
      payload: PriceMultiResponse
    };

export type Store = {
  +graph: Graph,
  +coins: Coins
};

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
export type GetState = () => Store;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
