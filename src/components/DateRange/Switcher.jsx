// @flow

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import DateLabel from "./DateLabel";

type Props = { dates: any, current: string, onSelectDate: any };

export default class Switcher extends Component<Props> {
  render() {
    const { dates, current, onSelectDate } = this.props;
    return (
      <View style={styles.container}>
        {dates.map((name, index) => (
          <DateLabel
            name={name}
            active={current === name}
            onPress={onSelectDate}
            key={index}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
