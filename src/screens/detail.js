// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Graph from '../containers/graph';
import Ranges from '../containers/ranges';
import List from '../containers/list';
import Detail from '../containers/detail';
import type { NavigatorProps } from "../navigator";

export default class extends Component<NavigatorProps> {
  _navigateToList = () => {
    const { navigation } = this.props;
    navigation.navigate('list');
  };

  render() {
    return (
      <View style={styles.container}>
        <Button onBack={this._navigateToList} />
        <Graph />
        <Ranges />
        <Detail />
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