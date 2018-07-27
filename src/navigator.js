// @flow

import type {
  NavigationScreenProp,
  NavigationState,
  NavigationStateRoute,
  NavigationEventSubscription,
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation';

import List from './screens/list';
import Add from './screens/add';

export type NavigatorProps = {
  navigation: NavigationScreenProp<NavigationState>
};

export const ScreenNavigator = createStackNavigator({
  List: {
    screen: List,
    mode: 'card',
    headerMode: 'none',
  },
  Add: {
    screen: Add,
    mode: 'modal',
    headerMode: 'none',
  },
});
