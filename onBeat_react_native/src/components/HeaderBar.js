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
        backgroundColor = '#2d2658'
        centerComponent={{ text: props.title,style: { 
            color: '#fff', 
            justifyContent: 'center',
            fontFamily:'GillSans-SemiBold',
            fontSize: 19 }}}


        rightComponent={{
                icon: 'menu',
                color: '#fff',
            // < TouchableOpacity >

                // <Icon
                //     name='pause'
                //     size={18}
                //     color='gray'
                //     style={styles.iconPlayer}
                // />
            // </TouchableOpacity >
        }}
        leftComponent={{ 
            // <View>
            // </View>
            // < Icon
            //     name='pause'
            //     size={18}
            //     color='gray'
            //     style={styles.iconPlayer}
            // />
            
            icon: 'person',
            color: '#fff',
            // onPress={() => this.props.navigation.navigate('WorkoutDBScreen')},
         }}
        barStyle = 'light-content'
    /> 
    );
}
