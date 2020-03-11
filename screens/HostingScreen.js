import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar,
     KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Header, Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {HeaderBar} from './../components/HeaderBar.js';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class HostingScreen extends Component {

  render() {
    return (
      <DismissKeyboard>
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
              <View style = {styles.headerStyle}>      
                  <HeaderBar
                    title = "Home"
                  />
                  <View style = {styles.centerPageAlignment}>
                    <Button 
                    title = 'Host'
                    buttonStyle = {styles.buttonStyle}
                    titleStyle ={styles.buttonTitleStyle}
                    />
                    <Text style = {styles.textStyleInputText}>
                       Don't want to host? Join one instead!
                    </Text>
                    <Input
                    label ="Roomkey:"
                    placeholder='XYZ1234'
                    inputContainerStyle = {styles.inputStyle}
                    labelStyle = {styles.textStyleLabel}
                    inputStyle = {styles.textStyleInput}
                    placeholderTextColor = '#494949'
                    />
                    <Button 
                    title = 'Join'
                    buttonStyle = {styles.buttonStyle}
                    titleStyle ={styles.buttonTitleStyle}
                    />
                  </View>
              </View> 
        </KeyboardAvoidingView>
      </DismissKeyboard>
      );
  }
}


// export default TrainerScreen;