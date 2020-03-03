import React, { Component } from "react";
import {View} from "react-native";
import { Button, Input } from 'react-native-elements';
import styles from './styles';

class AddWorkoutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Input style = {styles.inputStyle}
            label = "Workout Name"
            placeholder = "ex. Bicep Curl"
        />
        <Input style = {styles.inputStyle}
            label = "Set Count"
            placeholder = "ex. 4"
        />
        <Input style = {styles.inputStyle}
            label = "Rep Count"
            placeholder = "ex. 12"
        />
        <Button style = {styles.buttonStyle}
            title = "Add Workout"
            onPress={() => this.props.navigation.navigate('Main')}
        />
      </View>
    );
  }
}

AddWorkoutScreen.navigationOptions = {
    title: "Add Workout",
};

export default AddWorkoutScreen;