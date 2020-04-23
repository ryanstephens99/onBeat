import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';
import styles from './styles';
import SpotifyAPI from '../api/spotify';
import { createStackNavigator, createAppContainer } from 'react-navigation';

class AccountScreen extends Component {

  constructor(props) {
    super(props)
    this.spotify = new SpotifyAPI()
  }

  render() {
    return (
      <View style={styles.container}>
        <Button 
            title= "Connect to Spotify"
            onPress={async () => await this.spotify.login()}
        />
        <Button 
            title= "Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
        />
        <Button 
            title= "Workouts"
            onPress={() => this.props.navigation.navigate('WorkoutDBScreen')}
            
        />
        <Button 
            title= "1 Rep Calculator"
            
        />
      </View>
    );
  }
}

export default AccountScreen;
