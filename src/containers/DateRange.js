// @flow

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import type { DateRange } from "../actions/graph";
import { selectRange, DATE_RANGES } from "../actions/graph";
import Switcher from "../components/DateRange/Switcher";

type Props = {
  date: DateRange,
  selectDate: ()=>void
}

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
export default class dates extends Component<Props> {
  render() {
    const { date, selectDate } = this.props;
    return (
      <View style={styles.container}>
        <Switcher dates={DATE_RANGES} current={date} onSelectDate={selectDate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#171E1C"
  }
});
