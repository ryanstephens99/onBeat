import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';
import styles from './styles';

class AccountScreen extends Component {

  

  render() {
    return (
      <View style={styles.container}>
        <Button 
            title= "Connect to Spotify"
            onPress={}
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
