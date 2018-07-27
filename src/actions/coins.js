// @flow
import { getYesterdayData, getAllCurrentPrices } from "../api";
import type { Action, ThunkAction } from "./types";
import { defaultCoins } from "../utils/constants";

import {
  COIN_PRICE_FETCH_START,
  COIN_PRICE_FETCH_SUCCESS,
  COIN_PRICE_DAY_AGO_FETCH_START,
  COIN_PRICE_DAY_AGO_FETCH_SUCCESS,
  COIN_PRICE_DAY_AGO_FETCH_ERROR,
  COIN_ADDED,
  COIN_LOADED,
  COIN_SELECTED,
  COIN_SET
} from "./types";

export const selectCoin = (symbol: string): Action => ({
  type: COIN_SELECTED,
  symbol
});

export const addCoin = (
  symbol: string,
  name: string
): ThunkAction => async dispatch => {
  dispatch({
    type: COIN_ADDED,
    symbol,
    name
  });
  dispatch(updateAllCurrentPrices());
};

export const updateAllCurrentPrices = (): ThunkAction => async (
  dispatch,
  getState
) => {
  dispatch({ type: COIN_PRICE_FETCH_START });
  const {
    coinList: { coinList }
  } = getState();
  const symbols = coinList.map(coin => coin.symbol);
  const response = await getAllCurrentPrices(symbols);
  dispatch({
    type: COIN_PRICE_FETCH_SUCCESS,
    response
  });
  coinList.forEach(coin => dispatch(fetchYesterdayPrice(coin.symbol)));
};

export const fetchYesterdayPrice = (
  symbol: string
): ThunkAction => async dispatch => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const timestampYesterday = timestamp - 24 * 3600;

  try {
    const response = await getYesterdayData(symbol);

    if (response.Data.length > 0) {
      const price: number = response.Data[0].close;
      dispatch({
        type: COIN_PRICE_DAY_AGO_FETCH_SUCCESS,
        symbol,
        price
      });
    }
  } catch (error) {
    dispatch({
      type: COIN_PRICE_DAY_AGO_FETCH_ERROR,
      message: error
    });
  }
};
