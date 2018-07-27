// @flow

import React, { Component } from "react";
import { ListView, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCoin } from "../actions/coins";
import Row from "../components/Coin/Row";

import colors from "../utils/colors";
// Type API response shape
type Response = {
  Data: {
    [symbol: string]: {
      CoinName: string,
      Name: string
    }
  }
};

// Type coin object
type Coin = {
  symbol: string,
  name: string
};
type Props = {
  onAddedCoin: () => void,
  addCoin: (symbol: string, name: string) => void
};
type State = {
  isLoading: boolean,
  dataSource: ListView.DataSource
};

const mapStateToProps = (state) => {}; 
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addCoin }, dispatch);
@connect(mapStateToProps, mapDispatchToProps)
export default class Add extends Component<Props, State> {
  static defaultProps = {
    onAddedCoin: () => {},
    addCoin: () => {},
  };

  state = {
    isLoading: true,
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  };

  componentWillMount() {
    this.loadListData();
  }

  loadListData = async () => {
    const response = await this.fetchCoinList();
    const coins = this.transformAPIResponse(response);
    this.updateDataSource(coins);
  };

  // Query API and return raw response
  fetchCoinList = async (): Promise<Response> => {
    const response = await fetch(
      "https://www.cryptocompare.com/api/data/coinlist"
    );
    return response.json();
  };

  // Transform API response into Array<{ symbol, name }> format
  transformAPIResponse = (response: Response): Array<Coin> => {
    const coins = response.Data;
    return Object.keys(coins).map(symbol => ({
      symbol: coins[symbol].Name,
      name: coins[symbol].CoinName
    }));
  };

  // Update the state with coin data
  updateDataSource(coins: Array<Coin>) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(coins),
      isLoading: false
    });
  }

  renderRow = (coin: Coin) => {
    const { symbol, name } = coin;
    return <Row symbol={symbol} name={name} onPress={this.onAddCoin} />;
  };

  onAddCoin = (symbol: string, name: string) => {
    const { addCoin, onAddedCoin } = this.props;
    addCoin(symbol, name);
    onAddedCoin();
  };

  render() {
    const { isLoading } = this.state;
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={this.loadListData}
            tintColor={colors.white}
          />
        }
      />
    );
  }
}
