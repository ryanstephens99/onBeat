import React, {Component} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TextInput} from 'react-native';
import {Button, Input, Header} from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import axios from 'axios';
import OnBeatAPI from './api/onbeat.js';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);

class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'ryan14',
            password: 'Reed1rile2',
            email: 'ryan14@gmail.com'
        }
    }
    
    onUsernameChange(text){
        this.setState({ username : text });
    }
    onPasswordChange(text){
        this.setState({ password : text });
    }
    onEmailChange(text){
        this.setState({ email : text });
    }
    handleRequest = async () => {
        var api = new OnBeatAPI()
        var response = await api.register(this.state.username, this.state.email, this.state.password)
        console.log(response);
        
    }

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
                    onChangeText={this.onEmailChange.bind(this)} 
                    containerStyle = {styles.inputStyle}
                />
                <Input style={styles.buttonStyle}
                    leftIcon={
                        <Icon
                            name='user'
                            size={20}
                            color='gray'
                        />
                    }
                    leftIconContainerStyle={styles.iconStyle}
                    label='Username'
                    placeholder='username'
                    onChangeText={this.onUsernameChange.bind(this)}
                    containerStyle={styles.inputStyle}
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
                    onChangeText={this.onPasswordChange.bind(this)}
                    containerStyle = {styles.inputStyle}
                />
                <Button style = {styles.buttonStyle}
                    title = 'Sign up'
                    onPress={this.handleRequest}
                />
                
                <Text style={styles.hyperlinkText} >Forgot Your Password?</Text>
                <Text style={styles.hyperlinkText} >Don't Have an Account? Register</Text>

                </KeyboardAvoidingView>
            </DismissKeyboard>
        );
    }

}
export default SignUp