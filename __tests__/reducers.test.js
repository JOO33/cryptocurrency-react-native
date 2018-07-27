import configureStore from "redux-mock-store";
import {
  initialState as coinInitialState,
  reducer as coinReducer
} from "../src/reducers/coin";
import {
  initialState as graphInitialState,
  reducer as graphReducer
} from "../src/reducers/graph";
const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);

beforeEach(() => {
  store.clearActions();
});

// Test initial state of the coin reducer
test("coin reducer", () => {
  expect(
    reducer(coinInitialState).toEqual({
      ...coinInitialState
    })
  );
});

// Test initial state of the graph reducer
test("graph reducer", () => {
  expect(
    reducer(graphInitialState).toEqual({
      ...graphInitialState
    })
  );
});
