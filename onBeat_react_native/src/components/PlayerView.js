
import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../screens/styles';
import Spotify from 'rn-spotify-sdk/src/Spotify';
export class  PlayerView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            artist: "",
            title: "No song playing!\nGet Back OnBeat!",
        }
    }

    componentDidMount() {
        Spotify.addListener('metadataChange', this.updateMetadata) 
    }

    componentWillUnount() {
        Spotify.removeListener('metadataChange', this.updateMetadata)
    }

    updateMetadata = () => {
        var songState = Spotify.getPlaybackMetadata()
        var image = songState.currentTrack.albumCoverArtURL ? { uri: songState.currentTrack.albumCoverArtURL } : null;
        var artist = songState.currentTrack.artistName ? songState.currentTrack.artistName : "";
        var title = songState.currentTrack.name ? songState.currentTrack.name : "No song playing!\n    Get Back OnBeat!";
        this.setState({ image: image, artist: artist, title: title })
    }

    render() {
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
                        source={this.state.image}
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
                        {this.state.title}
                    </Text>
                    <Text style={styles.textStyleArtist}>
                        {this.state.artist}
                    </Text>
                </View>
            </View>
        );
    }
    
}