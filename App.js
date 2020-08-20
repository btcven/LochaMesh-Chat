import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { translate } from 'react-i18next';
import { YellowBox } from 'react-native';
import { Root } from 'native-base';
import RouteContainer from './src/routes';
import store from './src/store';
import { verifyAplicationState } from './src/store/aplication';
import NativationService from './src/utils/navigationService';
import Bitcoin from './src/utils/Bitcoin';
import Database from './src/database';
import ChatService from './src/utils/chatService';

const WrappedStack = ({ t }) => (
  <RouteContainer
    ref={(ref) => {
      NativationService.setTopLevelNavigator(ref);
    }}
    screenProps={{ t }}
  />
);
const ReloadAppOnLanguageChange = translate('common', {
  bindI18n: 'languageChanged',
  bindStore: false
})(WrappedStack);

export const database = new Database();
export const bitcoin = new Bitcoin();
export const chatService = new ChatService();

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  componentDidMount() {
    YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
  }

  render() {
    store.dispatch(verifyAplicationState());
    // store.dispatch(loading());
    return (
      <Provider store={store}>
        <Root>
          <ReloadAppOnLanguageChange />
        </Root>
      </Provider>
    );
  }
}
