// @flow

import React, { Component } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAllCurrentPrices, selectCoin } from '../actions/coins';

import Coin from "../components/Coin/Detail";
import AddButton from '../components/Coin/AddButton';


type Props = {
  current: Coin,
  list: Array<Object>,
  isLoading: boolean,
  selectCoin: () => void,
  updatePrices: () => void,
  onAddCoin: () => void,
}
@connect(
  (state) => {
    const {
      // pull some data out of coins reducer
      coins: {
        current,  // currently selected coin
        list,     // list of all coins
        isLoading,  // whether prices are being updated
      }
    } = state;
    return {
      current,
      list,
      isLoading,
    };
  },
  (dispatch) => bindActionCreators({ updateAllCurrentPrices, selectCoin }, dispatch)
)
export default class List extends Component<Props> {
  componentWillMount() {
    this.props.updatePrices();
  }

  render() {
    const {
      current,
      list,
      isLoading,
      selectCoin,
      updatePrices,
      onAddCoin,
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.list}
          // hide all scroll indicators
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // enable pull-to-refresh
          refreshControl={
            <RefreshControl
              refreshing={isLoading}     // show activity indicator while updating prices
              onRefresh={updatePrices} // update prices when list pulled
              tintColor="#FFFFFF"
            />
          }
        >
          {list.map((coin, index) => {
            const {
              symbol,
              name,
              price,
              priceChange,
            } = coin;
            return <Coin
              symbol={symbol}
              name={name}
              price={price}
              change={priceChange}
              active={current === symbol}
              onPress={selectCoin}
              key={index}
            />;
          })}
          <AddButton onPress={onAddCoin} /> 
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 75,
    backgroundColor: "#171E1C"
  },
  list: {
    flexDirection: 'row',       // arrange coins in rows
    flexWrap: 'wrap',           // allow multiple rows
    paddingHorizontal: 10,
  },
});