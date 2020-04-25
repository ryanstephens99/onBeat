import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, TouchableHighlight, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './../screens/styles';

import {Header} from 'react-native-elements';


export const HeaderBar = props => {
    const {
        title 
      } = props;

    return (

    <Header
        backgroundColor = '#778FA8'
        centerComponent={{ text: props.title,style: { 
            color: '#fff', 
            justifyContent: 'center',
            fontFamily:'GillSans-SemiBold',
            fontSize: 19 }}}


        rightComponent={{
                icon: 'menu',
                color: '#fff',
        }}
        leftComponent={{ 
            icon: 'person',
            color: '#fff',
         }}
        barStyle = 'light-content'
    /> 
    );
}
