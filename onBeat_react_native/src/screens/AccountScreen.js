import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';
import styles from './styles';
import SpotifyAPI from '../api/spotify';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HeaderBar } from './../components/HeaderBar.js';

class AccountScreen extends Component {

  constructor(props) {
    super(props)
    this.spotify = new SpotifyAPI()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <HeaderBar
            title="Account"
          />
          <View  style = {styles.centerPageAlignment}>
            <Button 
                buttonStyle = {styles.buttonStyle}
                titleStyle = {styles.buttonTitleStyle}
                title= "Connect to Spotify"
                onPress={async () => await this.spotify.login()}
            />
            <Button 
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitleStyle}
                title= "Sign Up"
                onPress={() => this.props.navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </View>

    );
  }
}

export default AccountScreen;
