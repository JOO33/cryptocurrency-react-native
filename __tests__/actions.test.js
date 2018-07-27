import configureStore from "redux-mock-store";

import * as coinActions from "../src/actions/coins";
import * as graphActions from "../src/actions/graphs";

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);

beforeEach(() => {
  store.clearActions();
});

afterEach(() => {
  expect(store.getActions()).toMatchSnapshot();
});

// Simple dispatch tests for actions
test("Dispatch COIN_SELECTED action", () => {
  const symbol = "BTC";
  store.dispatch(coinActions.selectCoin(symbol));
});

test("Dispatch COIN_ADDED action", () => {
  const symbol = "BTC";
  const name = "Bitcoin";
  store.dispatch(coinActions.addCoin(symbol, name));
});

test("Dispatch COIN_PRICE_FETCH_SUCCESS action", () => {
  const coinList = [];
  store.dispatch(coinActions.updateAllCurrentPrices(symbol, activity));
});

test("Dispatch COIN_PRICE_DAY_AGO_FETCH_SUCCESS action", () => {
  const symbol = "BTC";
  store.dispatch(coinActions.fetchYesterdayPrice(symbol, activity));
});

test("Dispatch GRAPH_DATE_RANGE_SELECT action", () => {
  const dateRange = "1D";
  store.dispatch(graphActions.selectRange(dateRange));
});

test("Dispatch GRAPH_FETCH_SUCCESS action", () => {
  const dateRange = "1D";
  store.dispatch(graphActions.getGraphData(dateRange));
});
