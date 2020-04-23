
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../screens/styles';

export const LibraryRowItem = props => {
    const {
        title,
        artist
    } = props;
    return(
        
        <View style={styles.libraryContainerRow}>
            <Image
                source={require('./../Images/The_Weeknd_-_Starboy.png')}
                style={styles.libraryImageStyle}
            />
            <View style={styles.libraryContainer}>
                <Text style={styles.textStyleLibrarySong}>
                    {props.title}
                </Text>
                <Text style={styles.textStyleLibraryArtist}>
                    {props.artist}
                </Text>

            </View>
            <TouchableOpacity>
                <Icon
                    name='play'
                    size={24}
                    color='gray'
                    style={styles.iconLibrary}
                />
            </TouchableOpacity>
        </View>
    );
}