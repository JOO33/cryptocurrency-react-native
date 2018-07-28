//@flow

import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import type { NavigatorProps } from "../navigator";
import { Add } from "../containers";

export default class extends Component<NavigatorProps> {
  _navigateBack = () => {
    const { navigation } = this.props;
    navigation.goBack(null);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this._navigateBack}>
          <Icon name="md-close" size={30} color="white" />
        </TouchableOpacity>
        <Add onAddedCoin={this._navigateBack} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171E1C"
  },
  button: {
    margin: 8
  }
});
