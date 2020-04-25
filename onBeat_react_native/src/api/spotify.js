import Spotify from 'rn-spotify-sdk';
import realm from './../realm/realm';
import axios from "axios"
import { uniqBy } from 'lodash'
import SavedSong from './../realm/v1/models/SavedSong'

import DefaultPreference from 'react-native-default-preference';
import BasePlatformAPI from './basePlatform'

import SpotifyAdapter from './spotifyDataAdapter.js';


export default class SpotifyAPI extends BasePlatformAPI {

  constructor() {
    super()
    this.platformType = "private";
    this.name = "Spotify";
    this.spotifyAdapter = new SpotifyAdapter();
  }

  _displayError(functionName, message) {
    console.log(`ERROR: ${functionName} failed with error message "${message}"`)
  }

  
  async initialize() {
    if(!Spotify.isInitialized()) {
      // console.log(await this);
      
      var options = {
        "clientID":"aeeb408283b34e29922a7522bb12033b",
        "redirectURL":"onbeat://callback",
        "scopes":[ "user-read-private", "playlist-read", "playlist-read-private",'user-library-read','user-library-modify','user-top-read',"streaming"],
        "tokenSwapURL": 'http:/127.0.0.1:3380/account/spotify-authentication/',
        "tokenRefreshURL": 'http:/127.0.0.1:3380/account/spotify-refresh/',
        "tokenRefreshEarliness": 300,
        "sessionUserDefaultsKey": "OnBeatSpotifySession"+await DefaultPreference.get('user_id'),
        "revibeToken": await this.getToken("OnBeat"), //pull OnBeat accessToken from realm
        "audioSessionCategory": "AVAudioSessionCategoryPlayback"
      };
      try {
        var isLoggedIn = await Spotify.initialize(options)
      }
      catch(error) {
        this._displayError('Spotify.initialize',error)
      }
    }
    if(this.hasLoggedIn() && !isLoggedIn && !Spotify.isLoggedIn()) {
      await this.refreshToken()
    }
  }

  _handleErrors(error) {
    // https://developer.spotify.com/documentation/web-api/#response-status-codes
  }

  _formatResponse(response) {
    if(response) {
      if(response.hasOwnProperty('items')) {
        response = response.items
        response = this._formatResponse(response)
      }
      // if(response.hasOwnProperty('tracks')) {
      //   response = response.tracks
      //   response = this._formatResponse(response)
      // }
      // if(response.hasOwnProperty('albums')) {
      //   response = response.albums
      //   response = this._formatResponse(response)
      // }
      // if(response.hasOwnProperty('artists')) {
      //   response = response.artists
      //   response = this._formatResponse(response)
      // }
    }
    return response
  }


  async _execute(callback, callbackArgs=[], authenticated=false, handlePagination=false, pageSize=50, limit=null) {
    if(!Spotify.isInitialized()) {
      await this.initialize()
    }
    if (authenticated) {
      // if token id expired, refresh before sending request
      if(!this.isLoggedIn() || !Spotify.isLoggedIn()) {
        await this.refreshToken()
      }
    }

    var numRequestsSent = 0
    var maxRequestAttempts = 2
    var response = null
    while(numRequestsSent < maxRequestAttempts) {
      try {
        if(handlePagination) {
          var offset = 0
          var initialRequest = await callback(...callbackArgs,{offset: offset, limit: pageSize})
          var total = limit !== null ? limit : initialRequest['total'];
          var promiseArray = []
          offset += pageSize;
          while (offset < total) {
            promiseArray.push(callback(...callbackArgs, {offset: offset, limit: pageSize}));
            offset += pageSize;
            console.log(offset);
          }
          var response = await Promise.all(promiseArray);
          response.unshift(initialRequest);     // add tracks from initial request

          // possible root keys: items, tracks, artists,
          for(var x=0; x<response.length; x++) {
            response[x] = this._formatResponse(response[x])

          }
          // need to clean up json to get unified list or object
          response = [].concat.apply([], response);    //merge arrays of songs into one array
        }
        else {
          var response = await callback(...callbackArgs)
          response = this._formatResponse(response)
        }
        break
      }
      catch(error) {
        // need to handle errors here
        // this._displayError(callback.name,error)
        console.log(error);
        numRequestsSent += 1
      }
    }
    return response
  }





  ////////////////////////////////////////////////////////////////
  //////////////// BasePlatformAPI REQUIRED METHODS //////////////
  ////////////////////////////////////////////////////////////////
  
  async login() {
    /**
    * Summary: Login to Spotify account (required implementation).
    *
    * @see  BasePlatformAPI
    */

    var loginSuccessfull = await this._execute(Spotify.login)
    if (loginSuccessfull) {
      var session = Spotify.getSession();
      var token = {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        expiration: session.expireTime ? session.expireTime : this._generateExpiration(1),
        platform: "Spotify"
      }
      await this.saveToken(token)
      realm.write(() => {
        if (!realm.objects('Library').filtered(`platform = "Spotify"`).length) {
          console.log("NEEE");
          realm.create('Library', { platform: "Spotify" });
        }
      })
    }

  }

  async refreshToken() {
    /**
    * Summary: Swap current Spotify refresh token for new access token (required implementation).
    *
    * @see  BasePlatformAPI
    *
    */

    var token = this.getToken()
    if(this.isLoggedIn() && Spotify.isLoggedIn()) {
      await this._execute(Spotify.renewSession);
    }
    else {
      // need to add a way to update OnBeat access token or our
      // servers will kick back requests to refresh spotify token.
      var session = {
        accessToken: token.accessToken,
        expireTime: token.expiration,
        refreshToken: token.refreshToken,
        scopes:[
          "streaming",
          "user-read-private",
          "playlist-read",
          "playlist-read-private",
          'user-library-read',
          'user-library-modify',
          'user-top-read'
        ],
        tokenRefreshURL: 'http:/127.0.0.1:3380/account/spotify-refresh/?authToken='+this.getToken("OnBeat").accessToken,
      }
      await this._execute(Spotify.loginWithSession, [session])
    }
    var newSession = Spotify.getSession();
    if(newSession !== null) {
      var newToken = {
        accessToken: newSession.accessToken,
        refreshToken: newSession.refreshToken,
        expiration: newSession.expireTime ? newSession.expireTime : this._generateExpiration(1),
        platform: "Spotify"
      }
      token.update(newToken)
    }
    else {
      await this.logout()
      await this.login()
    }
  }

  async logout() {
    /**
    * Summary: Logout of Spotify account (required implementation).
    *
    * @see  BasePlatformAPI
    *
    */

    await this._execute(Spotify.logout)
    var token = this.getToken()
    this.library.delete()
  }

  async getProfile() {
    /**
    * Summary: Get user's Spotify profile.
    *
    * @return {Object} User and profile object
    */

    return await this._execute(Spotify.getMe)
  }


  _validateSong(song) {
    // structure song and all nested objects to put in realm format
    if (!song.dateSaved) {
      song.dateSaved = new Date().toLocaleString()
    }
    if (!Array.isArray(song.album.images)) {
      song.album.images = Object.keys(song.album.images).map(x => song.album.images[x])
    }
    if (!Array.isArray(song.album.contributors)) {
      song.album.contributors = Object.keys(song.album.contributors).map(x => song.album.contributors[x])
    }
    if (!Array.isArray(song.contributors)) {
      song.contributors = Object.keys(song.contributors).map(x => song.contributors[x])
    }
    for (var y = 0; y < song.album.contributors.length; y++) {
      const index = y
      if (!Array.isArray(song.album.contributors[index].artist.images)) {
        song.album.contributors[index].artist.images = Object.keys(song.album.contributors[index].artist.images).map(x => song.album.contributors[index].artist.images[x])
      }
    }
    for (var y = 0; y < song.contributors.length; y++) {
      const index = y
      if (!Array.isArray(song.contributors[index].artist.images)) {
        song.contributors[index].artist.images = Object.keys(song.contributors[index].artist.images).map(x => song.contributors[index].artist.images[x])
      }
    }
    return song
  }

  batchAddSongs(songs) {
    
    realm.write(() => {
      for (var x = 0; x < songs.length; x++) {
        var savedSongs = new SavedSong()
        var newSavedSong = realm.create('SavedSong', songs[x], true);
        this.library.songs.push(newSavedSong)
      }
    })
  }


  async fetchLibrarySongs() {
    /**
    * Summary: Fetch all songs saved to library (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @return {Object} List containing song objects
    */
    var songs = await this._execute(Spotify.getMyTracks, [], true, true, 50, 50)
    for(var x=0; x<songs.length; x++) {
      var dateSaved = songs[x].added_at
      songs[x] = this.spotifyAdapter._parseSong(songs[x].track)
      songs[x].dateSaved = dateSaved
    }

    songs = await this._fetchArtistImages(songs)

    songs = songs.map(song => ({ song: this._validateSong(song), dateSaved: song.dateSaved }))
    this.batchAddSongs(songs)
    
    
    // console.log("BRUH", this.library.allSongs);
    // this.library.batchAddSongs(songs)
    
    // const library = this.library
    // for(var x=0; x<songs.length; x++) {
    //   library.addSong(songs[x])
    // }

    return songs
  }

  async fetchAllPlaylists() {
    /**
    * Summary: Fetch all of a user's playlists (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @return {Object} List containing playlist objects
    */

    var playlists = await this._execute(Spotify.getMyPlaylists, [], true, true, 50)
    for(var x=0; x<songs.length; x++) {
      playlists[x] = this.spotifyAdapter._parsePlaylist(playlists[x])
    }
    return playlists
  }

  async fetchPlaylistSongs(id) {
    /**
    * Summary: Fetch all songs in specific playlist (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {string}   id    id of playlist to get songs from
    *
    * @return {Object} List containing song objects
    */

    var songs = await this._execute(Spotify.getPlaylistTracks, [id], true, true, 50)
    for(var x=0; x<songs.length; x++) {
      songs[x] = this.spotifyAdapter._parseSong(songs[x])
    }
    songs = await this._fetchArtistImages(songs)
    return songs
  }

  async fetchArtistAlbums(id) {
    /**
    * Summary: Fetch all albums from specific artist (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {string}   id    id of artist to get albums from
    *
    * @return {Object} List containing album objects
    */

    var albums = await this._execute(Spotify.getArtistAlbums, [id], true, true, 50)
    for(var x=0; x<albums.length; x++) {
      albums[x] = this.spotifyAdapter._parseAlbum(albums[x])
    }
    return albums
  }

  async fetchArtistTopSongs(id) {
    /**
    * Summary: Fetch top songs from specific artist (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {string}   id    id of artist to get top songs from
    *
    * @return {Object} List containing song objects
    */

    var songs = await this._execute(Spotify.getArtistTopTracks, [id, "from_token"], true)
    songs = songs.tracks
    for(var x=0; x<songs.length; x++) {
      songs[x] = this.spotifyAdapter._parseSong(songs[x])
    }
    return songs
  }

  async fetchAlbumSongs(id) {
    /**
    * Summary: Fetch all songs from specific album (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {string}   id    id of album to get songs from
    *
    * @return {Object} List containing song objects
    */

    var songs = await this._execute(Spotify.getAlbumTracks, [id], true, true, 50)
    for(var x=0; x<songs.length; x++) {
      songs[x] = this.spotifyAdapter._parseSong(songs[x])
    }
    return songs
  }

  async fetchNewReleases() {
    /**
    * NOT IMPLEMENTED *
    * Summary: Fetch list of newly released content (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @return {Object} List containing song objects
    */

    var albums = await this._execute(Spotify.getNewReleases, [{limit:35}], true)
    for(var x=0; x<albums.length; x++) {
      albums[x] = this.spotifyAdapter._parseAlbum(albums[x])
    }
    return albums
  }

  async fetchArtist(id) {
    /**
    * Summary: Fetch artist from id (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {string}   id    id of album to get songs from
    *
    * @return {Object} List containing song objects
    */
    var response = await this._execute(Spotify.getArtist, [id], true)
    return this.spotifyAdapter._parseArtist(response)
  }

  async fetchArtists(ids) {
    /**
    * Summary: Fetch artist from id (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {string}   id    id of album to get songs from
    *
    * @return {Object} List containing song objects
    */
    var response = await this._execute(Spotify.getArtists, [ids], true)
    response = response.artists
    var artists = []
    for(var x=0; x<response.length; x++) {
      artists.push(this.spotifyAdapter._parseArtist(response[x]))
    }
    return artists
  }



  async fetchAlbum(id) {
    /**
    * Summary: Fetch album from id (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {string}   id    id of album to get songs from
    *
    * @return {Object} List containing song objects
    */
    var response = await this._execute(Spotify.getAlbum, [id], true)
    return this.spotifyAdapter._parseAlbum(response)
  }

  async fetchSong(id) {
    /**
    * Summary: Fetch song from id (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {string}   id    id of album to get songs from
    *
    * @return {Object} List containing song objects
    */
    var response = await this._execute(Spotify.getTrack, [id], true)
    return this.spotifyAdapter._parseSong(response)
  }

  async search(query) {
    /**
    * Summary: Search songs, albums, and artist based on query string (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {string}   query    string to search content with
    *
    * @return {Object} List containing song objects, list containing album objects, list containing artist objects
    */

    var search = await this._execute(Spotify.search, [query,['track', 'artist', 'album'],{limit:50}])
    var results = {artists: [], songs: [], albums: []};
    if(search) {
      if(search.tracks) {
        for(var x=0; x<search.tracks.items.length; x++) {
          results.songs.push(this.spotifyAdapter._parseSong(search.tracks.items[x]));
        }
      }
      if(search.artists) {
        for(var x=0; x<search.artists.items.length; x++) {
          results.artists.push(this.spotifyAdapter._parseArtist(search.artists.items[x]));
        }
      }
      if(search.albums) {
        for(var x=0; x<search.albums.items.length; x++) {
          results.albums.push(this.spotifyAdapter._parseAlbum(search.albums.items[x]));
        }
      }
    }
    return results;
  }

  async _fetchArtistImages(songs) {
    /// Need to fetch artist images before saving to realm ///
    if(!Array.isArray(songs)) {
      songs = [songs]
    }
    var allArtistIds = []
    for(var x=0; x<songs.length; x++) {
      // add song artist ids and album artist ids to allArtistIds
      allArtistIds = allArtistIds.concat(songs[x].contributors.map(x => x.artist.id), songs[x].album.contributors.map(x => x.artist.id))
    }
    allArtistIds = uniqBy(allArtistIds)    // remove any dupicates
    if(allArtistIds.length === 1) {
      var artist = await this.fetchArtist(allArtistIds[0])
      songs[0].contributors[0].artist.images = artist.images
      songs[0].album.contributors[0].artist.images = artist.images
    }
    else {
      if(allArtistIds.length > 50) {
        artists = []
        var offset = 0
        while(offset < allArtistIds.length) {
          var artistsFromIds = await this.fetchArtists(allArtistIds.slice(offset, offset+50))
          artists = artists.concat(artistsFromIds)
          offset = offset + 50
        }
      }
      else {
        artists = await this.fetchArtists(allArtistIds)
      }
      for(var x=0; x<songs.length; x++) {
        for(var y=0; y<artists.length; y++) {
          var songContributorsIndices = songs[x].contributors.map((e, i) => e.artist.id === artists[y].id ? i : '').filter(String)
          for(var j=0; j<songContributorsIndices.length; j++) {
            songs[x].contributors[songContributorsIndices[j]].artist.images = artists[y].images
          }
          var albumContributorsIndices = songs[x].album.contributors.map((e, i) => e.artist.id === artists[y].id ? i : '').filter(String)
          for(var j=0; j<albumContributorsIndices.length; j++) {
            songs[x].album.contributors[albumContributorsIndices[j]].artist.images = artists[y].images
          }
        }
      }
    }
    return songs
  }

  async addSongToLibrary(song) {
    /**
    * Summary: Add song to OnBeat library.
    *
    * @see  BasePlatformAPI
    *
    * @param {number}   time    seconds value to seek to
    */

    /// Need to fetch artist images before saving to realm ///
    if(song.contributors[0].artist.images < 1) {
      song = await this._fetchArtistImages(song)
      song = song[0]
    }

    // save song to spotify
    var data = {ids: [song.id]}
    await this._execute(Spotify.sendRequest, ["v1/me/tracks","PUT", data, true])

    // save song to realm
    this.saveToLibrary(song)   // save to realm database
  }

  async removeSongFromLibrary(song) {
    /**
    * Summary: Remove song from OnBeat library.
    *
    * @see  BasePlatformAPI
    *
    * @param {number}   time    seconds value to seek to
    */
    var data = {ids: [song.id]}
    await this._execute(Spotify.sendRequest, ["v1/me/tracks","DELETE", data, true])

    // remove song from realm
    this.removeFromLibrary(song)   // save to realm database
  }

  async addAlbumToLibrary(album) {
    /**
    * Summary: Add all songs from album to OnBeat library. (Still need to implement)
    *
    * @param {Object}   album    album object
    */
    await this._execute("music/library/albums/", "POST", album, true)
  }

  async removeAlbumFromLibrary(album) {
    /**
    * Summary: Remove all songs from album to OnBeat library. (Still need to implement)
    *
    * @param {Object}   album    album object
    */
    await this._execute("music/library/albums/", "DELETE", album, true)
  }


  /// Player Methods ///

  async play(song) {
    /**
    * Summary: play OnBeat song by uri (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {string}   uri    uri of song to play
    */
    this._execute(Spotify.playURI, [song.uri, 0, 0])
    // TrackPlayer.getInstance().play(song)
  }

  pause() {
    /**
    * Summary: if player exists, pause song (required implementation).
    *
    * @see  BasePlatformAPI
    */
    this._execute(Spotify.setPlaying, [false])
  }

  resume() {
    /**
    * Summary: if player exists, resume song (required implementation).
    *
    * @see  BasePlatformAPI
    */
    this._execute(Spotify.setPlaying, [true])
  }

  getPosition() {
    /**
    * Summary: return current position of song (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @return {number} decimal value representing seconds
    */

    var playbackInfo = Spotify.getPlaybackState()
    if(playbackInfo !== null) {
      return playbackInfo.position
    }
    return 0;
  }

  getDuration() {
    /**
    * Summary: Get duration of song (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @return {number} decimal value representing seconds
    */

    var playbackMetadata = Spotify.getPlaybackMetadata()
    if(playbackMetadata !== null) {
      return playbackMetadata.currentTrack.duration
    }
    return 0;
  }

  seek(time) {
    /**
    * Summary: Set position of song (required implementation).
    *
    * @see  BasePlatformAPI
    *
    * @param {number}   time    seconds value to seek to
    */

    this._execute(Spotify.seek, [time])
  }
}
