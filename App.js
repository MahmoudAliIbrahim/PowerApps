import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AppState,
  Linking,
  Platform
} from "react-native";
import AppLink from "react-native-app-link";

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };
  }

  componentDidMount() {
    this.checkIfInstalled();
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.checkIfInstalled();
    }
    this.setState({ appState: nextAppState });
  };

  checkIfInstalled() {
    const urlScheme = "mspbi://app";
    const url = "https://app.powerbi.com/home";
    Linking.canOpenURL(urlScheme)
      .then(supported => {
        if (!supported) {
          return this.openApplication(urlScheme);
        } else {
          return this.openApplication(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  }

  openApplication(url) {
    AppLink.maybeOpenURL(url, {
      appName: "Power BI",
      appStoreId: "id929738808",
      appStoreLocale: "us",
      playStoreId: "com.microsoft.powerbim"
    })
      .then(() => {})
      .catch(err => {
        // handle error
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Samcrete Infrastructure!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
