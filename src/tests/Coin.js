import "react-native";
import React from "react";
import Person from "../Person";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Person />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly the props", () => {
  const personComponent = renderer
    .create(<Person name={"Josh"} age={"30"} address={"Birmingham, AL"} />)
    .toJSON();
  let textNodes = personComponent.children.map(c => c.children).map(c => c[0]);
  expect(textNodes).toContain("Josh");
  expect(textNodes).toContain("30");
  expect(textNodes).toContain("Birmingham, AL");
});