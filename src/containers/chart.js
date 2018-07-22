import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateGraphPrices } from '../redux/graph';
import Line from '../components/graph/line';


@connect(
  (state) => {
    const {
      coins: {
        current: symbol,
      },
      graph: {
        range,
        prices,
        loading,
      },
    } = state;
    return {
      symbol,
      range,
      prices,
      loading,
    };
  },
  (dispatch) => bindActionCreators({ updateGraphPrices }, dispatch)
)
export default class Graph extends Component {

  state = {
    viewHeight: 0,
    prices: [],
  };

  componentWillMount() {
    this.props.updateGraphPrices();
  }

  componentWillReceiveProps(nextProps) {
    // Update graph data if current symbol or range were changed
    if (nextProps.symbol !== this.props.symbol
      || nextProps.range !== this.props.range) {
      this.props.updateGraphPrices();
    }
    this.setState({ prices: nextProps.prices });
  }

  render() {
    const {
      loading,
      prices,
    } = this.props;

    return (
      <View style={styles.container}>
        {loading && <View pointerEvents="box-none" style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>}
        {prices.length > 0 && <Line
          values={this.state.prices}
        />}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 38, // take 38% of the screen height
    backgroundColor: '#171E1C',
  },
  loading: {
    ...StyleSheet.absoluteFillObject, // overlay the graph
    alignItems: 'center',             // center horizontally
    justifyContent: 'center',         // center vertically
    zIndex: 1,                        // show in front of the graph
  },
});