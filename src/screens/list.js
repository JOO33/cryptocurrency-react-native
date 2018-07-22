// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Graph from '../containers/graph';
import Ranges from '../containers/ranges';
import List from '../containers/list';
import type { NavigatorProps } from "../navigator";

export default class extends Component<NavigatorProps> {
  _navigateToAdd = () => {
    const { navigation } = this.props;
    navigation.navigate('add');
  };

  render() {
    return (
      <View style={styles.container}>
        <Graph />
        <Ranges />
        <List onAddCoin={this._navigateToAdd} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,        // take up the whole screen
    paddingTop: 20, // put content below status bar
    backgroundColor: 'white',
  },
});