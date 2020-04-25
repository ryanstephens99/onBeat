import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, TouchableHighlight, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { Slider, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { HeaderBar } from './../components/HeaderBar.js';
import { LibraryRowItem } from '../components/LibraryRowItem.js';
import Library from '../realm/v1/models/Library';
import realm from './../realm/realm.js';
import Contributor from '../realm/v1/models/Contributor';

class LibraryScreen extends Component {

  constructor(props){
    super(props);
    this.songs = realm.objects('Song');
    this.state = {
      refreshing : false,
    };
  }

  // Rerender = () =>{
  //   this.forceUpdate()
  // }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.forceUpdate()
    this.setState({ refreshing: false })
    
  }


  render() {
    var songsList = [];
    var contributors;
    for(var i = 0; i < this.songs.length; i++ ){
      contributors = this.songs[i]["contributors"]
      var contributorString = "";
      for (var j = 0; j < contributors.length; j++) {
        contributorString += contributors[j]["artist"]["name"] + " ";
      }
      let image = { uri: this.songs[i]["album"]["images"][0]["url"]}
      let song = { uri : this.songs[i].uri }
      songsList.push(
        <LibraryRowItem
          song={song}
          image={image}
          title={this.songs[i]["name"]}
          artist={contributorString}
          navigation={this.props.navigation}
        />
      )
      
    }
    
    return (
      
      <View style={styles.container}>
        
        <HeaderBar
          title="Library"
        />
        <ScrollView
          style = {styles.scrollView}
          directionalLockEnabled = {true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {songsList}
        </ScrollView>

      </View>
    );
  }
}

export default LibraryScreen;
