// @flow

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    color: colors.inactive,
    fontSize: 12,
  },
  active: {
    color: colors.white,
  },
});

const TextLabel = styled.Text`
  background-color: papayawhip;
  color: ${(props:Props): Object => (props.active ? colors.white : colors.inactive)}
`;

type Props = {
  name: string,
  active: boolean,
  onPress: (date: string) => void
};

export default class DateRange extends Component<Props> {
  onPress = () => {
    const { name, onPress } = this.props;
    onPress(name);
  };

  render() {
    const { name, active } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <TextLabel style={[styles.text, active ? styles.active : {}]}>
          {name}
        </TextLabel>
      </TouchableOpacity>
    );
  }
}
