// @flow

import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

type Props = {
  onPress: () => void
};
export default class AddButton extends Component<Props> {
  render() {
    const { onPress } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Icon name="md-add-circle" style={styles.icon} />
          <Text />
          <Text style={styles.text}>Add coin</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width,
    marginTop: 15
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15
  },
  icon: {
    fontSize: 24,
    color: "#FFFFFF"
  },
  text: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 16
  }
});
