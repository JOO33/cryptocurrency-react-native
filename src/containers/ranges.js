// @flow

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { selectRange } from "../redux/graph";
import Switcher from "../components/dateRange/switcher";
import { RANGES } from "../redux/graph";

@connect(
  state => {
    const {
      graph: { date }
    } = state;
    return {
      date
    };
  },
  dispatch => bindActionCreators({ selectDate }, dispatch)
)
export default class dates extends Component {
  render() {
    const { date, selectDate } = this.props;
    return (
      <View style={styles.container}>
        <Switcher dates={DATES} current={date} onSelectDate={selectDate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#171E1C"
  }
});
