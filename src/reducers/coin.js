// @flow
import type { Action } from "../actions/types";
import {
  COIN_ADDED,
  COIN_LOADED,
  COIN_SELECTED,
  COIN_SET,
  COIN_PRICE_FETCH_START,
  COIN_PRICE_FETCH_SUCCESS,
  COIN_PRICE_DAY_AGO_FETCH_SUCCESS
} from "../actions/types";

import defaultCoins from "../utils/constants";

export type Coin = {
  symbol: string,
  name: string,
  price?: number,
  price24h?: number,
  priceChange?: number
};

export type State = {
  +isLoading: boolean,
  +currentCoin: string,
  +coinList: Array<Coin>
};

const initialState = {
  isLoading: true,
  currentCoin: "BTC",
  coinList: defaultCoins
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case COIN_PRICE_FETCH_START: {
      return {
        ...state,
        loading: true
      };
    }
    case COIN_PRICE_FETCH_SUCCESS: {
      const { coinList } = state;
      const { payload } = action;
      return {
        ...state,
        loading: false,
        coinList: coinList.map(coin => ({
          ...coin,
          price: payload[coin.symbol] ? payload[coin.symbol].USD : undefined
        }))
      };
    }
    case COIN_PRICE_DAY_AGO_FETCH_SUCCESS: {
      const { coinList } = state;
      const { symbol, price } = action;
      return {
        ...state,
        coinList: coinList.map(coin => ({
          ...coin,
          ...(coin.symbol === symbol
            ? {
                price24hAgo: price,
                priceChange: coin.price
                  ? getPriceChange(coin.price, price)
                  : undefined
              }
            : {})
        }))
      };
    }
    case COIN_ADDED: {
      const { symbol, name } = action;
      if (state.coinList.find(coin => coin.symbol === symbol)) {
        return state;
      }
      return {
        ...state,
        data: [...state.coinList, { symbol, name }]
      };
    }
    case COIN_SELECTED: {
      const { symbol } = action;
      return {
        ...state,
        current: symbol
      };
    }
    default: {
      return state;
    }
  }
}

const getPriceChange = (
  currentPrice: number,
  previousPrice: number
): number => {
  if (!previousPrice) {
    return 0;
  }
  return parseFloat(((currentPrice / previousPrice - 1) * 100).toFixed(2));
};
