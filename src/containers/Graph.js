import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateGraphPrices } from "../reducers/graph";
import Line from "../components/Graph/Line";

@connect(
  state => {
    const {
      coins: { current: symbol },
      graph: { dateRange, prices, isLoading }
    } = state;
    return {
      symbol,
      dateRange,
      prices,
      isLoading
    };
  },
  dispatch => bindActionCreators({ updateGraphPrices }, dispatch)
)
export default class Graph extends Component {
  state = {
    viewHeight: 0,
    prices: []
  };

  componentWillMount() {
    this.props.updateGraphPrices();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.symbol !== this.props.symbol ||
      nextProps.dateRange !== this.props.dateRange
    ) {
      this.props.updateGraphPrices();
    }
    this.setState({ prices: nextProps.prices });
  }

  render() {
    const { isLoading, prices } = this.props;

    return (
      <View style={styles.container}>
        {isLoading && (
          <View pointerEvents="box-none" style={styles.isLoading}>
            <ActivityIndicator size="large" />
          </View>
        )}
        {prices.length > 0 && <Line values={this.state.prices} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 38, // take 38% of the screen height
    backgroundColor: "#171E1C"
  },
  isLoading: {
    ...StyleSheet.absoluteFillObject, // overlay the graph
    alignItems: "center", // center horizontally
    justifyContent: "center", // center vertically
    zIndex: 1 // show in front of the graph
  }
});
