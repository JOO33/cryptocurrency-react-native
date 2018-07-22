// @flow

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DateRange from './DateRange';

type Props = { ranges: any, current: string, onSelectRange: any };

export default Switcher = (props: Props): React$Element<Props> => {
  const { ranges, current, onSelectRange } = props;
  return (
    <View style={styles.container}>
      {ranges.map((name, index): DateRange => (
        <DateRange name={name} active={current === name} onPress={onSelectRange} key={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
