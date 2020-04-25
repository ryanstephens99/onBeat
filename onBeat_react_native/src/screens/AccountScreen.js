import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';
import styles from './styles';
import SpotifyAPI from '../api/spotify';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HeaderBar } from './../components/HeaderBar.js';
import OnBeatAPI from "../api/onbeat";

class AccountScreen extends Component {

  constructor(props) {
    super(props)
    this.spotify = new SpotifyAPI()
    this.onBeat = new OnBeatAPI()
  }

  signUp(props){
    const display = props.isLoggedIn;
    if(!display){
      return (
      <Button
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonTitleStyle}
        title="Sign Up"
        onPress={() => this.props.navigation.navigate('SignUp')}
      />
      );
    }
  }
  
  checkOnBeatLogin(){
    if(this.onBeat.isLoggedIn()){
    }
    else{
    }
  }

  checkSpotifyLogin() {
    if(this.spotify.isLoggedIn()){
    }
    else{
      this.spotify.login()
    }
  }

  render() {
    var isLoggedInToOnBeat = this.onBeat.isLoggedIn();
    var isLoggedInToSpotify = this.spotify.isLoggedIn();

    if(isLoggedInToOnBeat){

    }
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
                onPress={
                  async () => {
                    await this.spotify.login()
                    console.log(this.spotify.library);
                    
                    await this.spotify.fetchLibrarySongs()
                  }}
            />
            <Button 
                buttonStyle={styles.buttonStyle}
                titleStyle={styles.buttonTitleStyle}
                title= "Sign Up"
                // onPress={async () => await this.onBeat.register()}
                onPress = {()=> this.props.navigation.navigate('SignUp')}
            />
            <Button
              buttonStyle={styles.buttonStyle}
              titleStyle={styles.buttonTitleStyle}
              title="Log Out"
              onPress={async () => await this.onBeat.logout()}
            // this.props.navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </View>

    );
  }
}

export default AccountScreen;
