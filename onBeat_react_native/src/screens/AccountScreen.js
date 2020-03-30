import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';
import styles from './styles';
import SpotifyAPI from './../spotify';

class AccountScreen extends Component {

  constructor(props) {
    super(props)
    this.spotify = new SpotifyAPI()
  }

  render() {
    return (
      <View style={styles.container}>
        <Button 
            title= "Make Plan"
            onPress={async () => await this.spotify.login()}
        />
        <Button 
            title= "View Plans"
            onPress={() => this.props.navigation.navigate('ViewPlanScreen')}
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
