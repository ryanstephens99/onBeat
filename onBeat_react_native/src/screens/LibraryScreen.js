import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';

class LibraryScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Calendar Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
      
    }
});

export default LibraryScreen;
