
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../screens/styles';
import {Slider, Header} from 'react-native-elements';


export const PlayerView = props => {
    const {
        title,
        artist
    } = props;
    return (
        <View style={styles.container}>
            <View style={styles.containerRow}>

                <TouchableOpacity>
                    <Icon
                        name='heart'
                        size={20}
                        color='gray'
                        style={styles.iconStyleListening}

                    />
                </TouchableOpacity>
                <Image
                    source={require('./../Images/The_Weeknd_-_Starboy.png')}
                    style={styles.imageStyle}
                />
                <TouchableOpacity>
                    <Icon
                        name='folder'
                        size={20}
                        color='gray'
                        style={styles.iconStyleListening}

                    />
                </TouchableOpacity>

            </View>
            <View style={styles.container}>
                <Text style={styles.textStyleSong}>
                    {props.title}
                </Text>
                <Text style={styles.textStyleArtist}>
                    {props.artist}
                </Text>
            </View>
            {/* <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 50 }}>
                <Slider
                    thumbTintColor='darkslateblue'
                />
            </View> */}
        </View>
    );
}