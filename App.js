/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppLink from 'react-native-app-link';
import { AppInstalledChecker, CheckPackageInstallation } from 'react-native-check-app-install';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
    AppInstalledChecker
    .isAppInstalledAndroid('com.microsoft.msapps')
    .then((isInstalled) => {
        if (isInstalled) {
          AppLink.maybeOpenURL('https://web.powerapps.com/apps/', { appName: 'PowerApps', appStoreId: 'id1047318566', appStoreLocale: 'us', playStoreId: 'com.microsoft.msapps' }).then(() => {
          })
          .catch((err) => {
            // handle error
          });
        } else {
          AppLink.openInStore({ appName: 'PowerApps', appStoreId: 'id1047318566', appStoreLocale: 'us', playStoreId: 'com.microsoft.msapps' }).then(() => {
            // do stuff
          })
          .catch((err) => {
            // handle error
          });
        }
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
