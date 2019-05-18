import React, {Component} from 'react';
import {StyleSheet, Text, View, AppState} from 'react-native';
import AppLink from 'react-native-app-link';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    }
  }

  componentDidMount() {
    this.checkIfInstalled();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.checkIfInstalled();
    }
    this.setState({appState: nextAppState});
  };

  checkIfInstalled() {
    AppLink.maybeOpenURL('ms-apps://apps', { appName: 'PowerApps', appStoreId: 'id1047318566', appStoreLocale: 'us', playStoreId: 'com.microsoft.msapps' }).then(() => {
    })
    .catch((err) => {
      // handle error
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
