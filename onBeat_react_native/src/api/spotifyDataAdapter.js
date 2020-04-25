import Spotify from 'rn-spotify-sdk';
import realm from './../realm/realm';
import axios from "axios"
import { uniqBy } from 'lodash'
import SavedSong from './../realm/v1/models/SavedSong'

import DefaultPreference from 'react-native-default-preference';
import BasePlatformAPI from './basePlatform'

export default class SpotifyAdapter{


    _parseContributors(contributors, itemId) {
        // need to account for simplified and full objects
        formattedContributors = []
        for (var x = 0; x < contributors.length; x++) {
            let contributor = {
                id: contributors[x].id + itemId,
                type: "Artist",
                artist: this._parseArtist(contributors[x])
            }
            formattedContributors.push(contributor)
        }
        return formattedContributors
    }

    _parseSong(song) {
        // need to account for simplified and full objects
        var formattedSong = {
            platform: "Spotify",
            name: song['name'],
            id: song['id'],
            uri: song['uri'],
            duration: parseFloat(song['duration_ms'] / 1000),
            contributors: this._parseContributors(song['artists'], song['id']),
        }
        if (song['album']) {
            formattedSong.album = this._parseAlbum(song['album'])
        }
        return formattedSong
    }

    _parseAlbum(album) {
        // need to account for simplified and full objects
        var typeKey = album["album_group"] ? "album_group" : "album_type"
        var formattedAlbum = {
            platform: "Spotify",
            name: album['name'],
            id: album['id'],
            uri: album['uri'],
            type: album[typeKey],
            uploaded_date: new Date(album['release_date']),
            contributors: this._parseContributors(album['artists'], album['id']),
            images: this._parseImages(album['images'])
        }
        return formattedAlbum
    }

    _parseArtist(artist) {
        // need to account for simplified and full objects
        var formattedArtist = {
            platform: "Spotify",
            name: artist['name'].replace(/"/g, "'"),
            id: artist['id'],
            uri: artist['uri'],
            images: []
        }
        if (artist['images']) {
            formattedArtist.images = this._parseImages(artist['images'])
        }
        return formattedArtist
    }

    _parsePlaylist(playlist) {
        // need to account for simplified and full objects
        var formattedPlaylist = {
            name: playlist['name'].replace(/"/g, "'"),
            id: playlist['id'],
            images: []  // need to get these
        }
        return formattedPlaylist
    }

    _parseImages(images) {
        formattedImages = []
        for (var x = 0; x < images.length; x++) {
            let image = {
                height: images[x].height,
                width: images[x].width,
                url: images[x].url,
            }
            formattedImages.push(image)
        }
        return formattedImages
    }


}
