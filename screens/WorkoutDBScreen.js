
import React, { Component } from "react";
import { Text, View, StyleSheet, Picker } from "react-native";
import { Button } from 'react-native-elements';
import styles from './styles';

class WorkoutDBScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Workout DB</Text>
        <Picker selectedValue = {this.state.user} onValueChange = {this.updateUser}>
          <Picker.Item label = "Chest" value = "chest" />
          <Picker.Item label = "Back" value = "back" />
          <Picker.Item label = "Arms" value = "arms" />
          <Picker.Item label = "Legs" value = "legs" />
          <Picker.Item label = "Core" value = "core" />
        </Picker>
        <Button style = {styles.buttonStyle}
          title = 'List' />

      </View>
    );
  }
}

export default WorkoutDBScreen;