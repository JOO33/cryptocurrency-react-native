import "react-native";
import React from "react";

import renderer from "react-test-renderer";
import { DATE_RANGE_DEFAULT, DATE_RANGES } from "../../src/actions/graph";
import DateLabel from "../../src/components/DateRange/DateLabel";
import Switcher from "../../src/components/DateRange/Switcher";

test("DateLabel renders correctly", () => {
  const name = DATE_RANGE_DEFAULT;
  const tree = renderer.create(<DateLabel />).toJSON();

  expect(tree).toMatchSnapshot();
});

test("Datelabel renders active level correctly", () => {
  const tree = renderer.create(<DateLabel active={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Switcher view renders correctly", () => {
  const mockData = {
    dates: DATE_RANGES,
    current: DATE_RANGE_DEFAULT
  };
  const tree = renderer.create(<Switcher {...mockData} />).toJSON();

  expect(tree).toMatchSnapshot();
});
