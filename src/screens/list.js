// @flow
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import type { NavigatorProps } from "../navigator";
import Graph from "../containers/Graph";
import DateRange from "../containers/DateRange";
import CoinList from "../containers/CoinList";

export default class extends Component<NavigatorProps> {
  _navigateToAdd = () => {
    const { navigation } = this.props;
    navigation.navigate("add");
  };

  render() {
    return (
      <View style={styles.container}>
        <Graph />
        <DateRange />
        <CoinList onAddCoin={this._navigateToAdd} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // take up the whole screen
    paddingTop: 20, // put content below status bar
    backgroundColor: "white"
  }
});
