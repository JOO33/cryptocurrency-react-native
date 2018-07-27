// @flow

import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5,
    minHeight: 16
  },
  up: { backgroundColor: "#4CAF50" },
  down: { backgroundColor: "#F23434" },
  nochange: { backgroundColor: "#364A4C" },
  value: {
    color: "#FFFFFF",
    fontSize: 11,
    marginTop: 0
  },
  icon: {
    fontSize: 18,
    lineHeight: 16,
    marginRight: 2,
    color: "#FFFFFF",
    backgroundColor: "transparent",
    textAlign: "center"
  }
});

const getBadgeColor = (value: number) => {
  if (value < 0) return styles.down;
  if (value > 0) return styles.up;
  return styles.nochange;
};
const getBadgeStyles = (value: number): Array<any> => [
  styles.badge,
  getBadgeColor(value)
];

type Props = {
  value: ?number
};

export default class Change extends PureComponent<Props> {
  render() {
    const { value: input } = this.props;
    const value: number = input || 0;
    const icon =
      value === 0 || !value ? (
        <Text />
      ) : (
        <Icon
          name={value > 0 ? "caret-up" : "caret-down"}
          style={styles.icon}
        />
      );
    return (
      <View style={getBadgeStyles(value)}>
        {icon}
        <Text style={styles.value} numberOfLines={1}>
          {Math.abs(value)}%
        </Text>
      </View>
    );
  }
}
