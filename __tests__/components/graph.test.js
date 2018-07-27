import "react-native";
import React from "react";

import renderer from "react-test-renderer";

import { Line } from "../../src/components/Graph/Line";

// Draws a simple graph with given values to test the output line
test("Line renders correctly", () => {
    const lineData = {
        values: [2,4,8,4,2]
    }
  const tree = renderer.create(<Line {...lineData} />).toJSON();

  expect(tree).toMatchSnapshot();
});

