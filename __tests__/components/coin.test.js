import "react-native";
import React from "react";

import renderer from "react-test-renderer";

import { AddButton } from "../../src/components/Coin/AddButton";
import { Change } from "../../src/components/Coin/Change";
import { Coin } from "../../src/components/Coin/Detail";
import { Row } from "../../src/components/Coin/Row";

test("AddButton renders correctly", () => {
  const tree = renderer.create(<AddButton />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Change on Coin view renders correctly", () => {
  const tree = renderer.create(<Change />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Change view renders with a positive value", () => {
  const tree = renderer.create(<EnterLogin value={1} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Change view renders with a negative value", () => {
  const tree = renderer.create(<EnterLogin value={-1} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Change view renders with a zero value", () => {
  const tree = renderer.create(<EnterLogin value={0} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Coin Detail view renders", () => {
  const mockData = {
    symbol: "BTC",
    name: "Bitcoin",
    price: 100,
    change: 10
  };
  const tree = renderer.create(<Coin {...mockData} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Coin Detail view renders with active state", () => {
  const mockData = {
    symbol: "BTC",
    name: "Bitcoin",
    price: 100,
    change: 10,
    active: true
  };
  const tree = renderer.create(<Coin {...mockData} />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Coin Row view renders", () => {
  const mockData = {
    symbol: "BTC",
    name: "Bitcoin"
  };
  const tree = renderer.create(<Row {...mockData} />).toJSON();

  expect(tree).toMatchSnapshot();
});
