// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet } from 'react-native';
import { ScreenNavigator } from './src/navigator';
import configureStore from './src/store/configureStore';

const store = configureStore();

type Props = {};
type State = {
  isLoading?: boolean,
  storeCreated: boolean,
  storeRehydrated: boolean,
  store: any
};

export default class App extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      storeCreated: false,
      storeRehydrated: false,
      store: null,
    };
  }

  componentDidMount() {
    configureStore(_ => this.setState({ storeRehydrated: true })).then(
      // creation callback (after async compatibility)
      store => this.setState({ store, storeCreated: true }),
    );
  }

  render() {
    return (
      <Provider store={store}>
        <ScreenNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
