import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {Header} from 'react-native-elements';


export const HeaderBar = props => {
    const {
        title 
      } = props;

    return (

    <Header
        backgroundColor = '#2d2658'
        centerComponent={{ text: props.title,style: { 
            color: '#fff', 
            justifyContent: 'center',
            fontFamily:'GillSans-SemiBold',
            fontSize: 19 }}}
        rightComponent={{ icon: 'menu', color: '#fff' }}
        leftComponent={{ icon: 'person', color: '#fff' }}
        barStyle = 'light-content'
    /> 
    );
}
