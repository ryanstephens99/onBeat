import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, TouchableHighlight, StatusBar} from 'react-native';
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

        // <TouchableOpacity>
        //     <Icon
        //         name='pause'
        //         size={18}
        //         color='gray'
        //         style={styles.iconPlayer}
        //     />
        // </TouchableOpacity>
        rightComponent={{ icon: 'menu', color: '#fff' }}
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
