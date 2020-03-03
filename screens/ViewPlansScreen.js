import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';
import styles from './styles';

class WorkoutScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Current Plan:</Text>
        <Button 
            title= "Make Plans"
        />
        <Text>Choose Plan:</Text>
        <Button 
            title= "Plan 1"
        />
        <Button 
            title= "Plan 2"
        />
        <Button 
            title= "Plan 3"
        />
        
      </View>
    );
  }
}

export default WorkoutScreen;