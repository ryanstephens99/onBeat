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

export default class Signup extends Component {
    render() {
        return (
        <DismissKeyboard>
            <KeyboardAvoidingView style={styles.container}>
                <View style = {styles.headerStyle}>      
                    <Header
                        centerComponent={{ text: 'Login', style: { color: '#fff' } }}
                    />
                </View>
                <Input style = {styles.buttonStyle}
                    leftIcon={ 
                    <Icon
                        name='user'
                        size={20}
                        color = 'gray'
                    />
                    }
                    leftIconContainerStyle = { styles.iconStyle}
                    label = 'Email Address'
                    placeholder = 'example@onbeat.com' 
                    containerStyle = {styles.inputStyle}
                />
                <Input style = {styles.buttonStyle}
                    leftIcon={ 
                    <Icon
                        name='envelope'
                        size={18}
                        color = 'gray'
                    />
                    }
                    leftIconContainerStyle = { styles.iconStyle}
                    label = 'Password'
                    placeholder = 'password' 
                    containerStyle = {styles.inputStyle}
                />
                <Button style = {styles.buttonStyle}
                    title = 'Login'
                />
                
                <Text style={styles.hyperlinkText} >Forgot Your Password?</Text>
                <Text style={styles.hyperlinkText} >Don't Have an Account? Register</Text>

                </KeyboardAvoidingView>
            </DismissKeyboard>
        );
    }

}
