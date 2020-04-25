
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../screens/styles';
import SpotifyAPI from './../api/spotify';

spotify = new SpotifyAPI();

export const LibraryRowItem = props => {
    const {
        song,
        image,
        title,
        artist,
        navigation
    } = props;
    
    return(
        
        <View style={styles.libraryContainerRow}>
            <Image
                source={props.image}
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
                    onPress={
                        () => {
                            spotify.play(song)
                            navigation.navigate('Home')
                        }
                    }
            />
            </TouchableOpacity>
        </View>
    );
}