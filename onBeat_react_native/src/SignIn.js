import React, {Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard,  TouchableWithoutFeedback} from 'react-native';
import {Button, Input, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);

export default class SignIn extends Component {
    render() {
        return (
        <DismissKeyboard>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style = {styles.headerStyle}>      
                    <Header
                        centerComponent={{ text: 'Sign Up', style: { color: '#fff' } }}
                    />
                </View>
                <Input style = {styles.buttonStyle}
                    label = 'First Name'
                    placeholder = 'First Name' 
                    containerStyle = {styles.inputStyle}
                />
                <Input style = {styles.buttonStyle}
                    label = 'Last Name'
                    placeholder = 'Last Name' 
                    containerStyle = {styles.inputStyle}
                />
                <Input style = {styles.buttonStyle}
                    label = 'Email Address'
                    placeholder = 'example@onbeat.com' 
                    containerStyle = {styles.inputStyle}
                />
                <Input style = {styles.buttonStyle}
                    label = 'Password'
                    placeholder = '*********' 
                    containerStyle = {styles.inputStyle}
                />
                <Input style = {styles.buttonStyle}
                    label = 'Confirm Password'
                    placeholder = '********' 
                    containerStyle = {styles.inputStyle}
                />
                <Button style = {styles.buttonStyle}
                    title = 'Authorize Spotify'
                />


                <Button style = {styles.buttonStyle}
                    title = 'Register'
                />

                </KeyboardAvoidingView>
            </DismissKeyboard>
        );
    }

}
