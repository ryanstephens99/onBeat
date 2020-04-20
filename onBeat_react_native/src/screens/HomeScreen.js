import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, TouchableHighlight} from 'react-native';
import {Slider, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {HeaderBar} from './../components/HeaderBar.js';

class HomeScreen extends Component{

  render() {
    return (
      <View style = {styles.container}>
    
          <View style = {styles.headerStyle}>      
          <HeaderBar
            title = "Music"
          />
              <View style = {styles.containerRow}>
                  
                  <TouchableOpacity>
                    <Icon
                      name='heart'
                      size={20}
                      color = 'gray'
                      style = {styles.iconStyleListening}
                      
                    />
                  </TouchableOpacity>
                  <Image 
                      source={require('./../Images/The_Weeknd_-_Starboy.png')}  
                      style= {styles.imageStyle}
                  />
                  <TouchableOpacity>
                    <Icon
                      name= 'folder'
                      size={20}
                      color = 'gray'
                      style = {styles.iconStyleListening}
                      
                    />
                  </TouchableOpacity>
              
              </View>
              <View style = {styles.container}>
                  <Text style = {styles.textStyleSong}>
                      Starboy
                  </Text>
                  <Text style = {styles.textStyleArtist}>
                      The Weekend
                  </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 50 }}>
                  <Slider
                      thumbTintColor = 'darkslateblue'
                  />
              </View>
              
              <View style = {styles.playerOptionsContainer}>
                  <TouchableOpacity>
                      <Icon
                          name='backward'
                          size={24}
                          color = 'gray'
                          style = {styles.iconPlayer}
                      />
                  </TouchableOpacity>
                  
                  <TouchableOpacity>
                      <Icon
                          name='pause'
                          size={24}
                          color = 'gray'
                          style = {styles.iconPlayer}
                      />
                  </TouchableOpacity>
                  
                  <TouchableOpacity>
                      <Icon
                          name='forward'
                          size={24}
                          color = 'gray'
                          style = {styles.iconPlayer}
                      />
                  </TouchableOpacity>

              </View>

              <View style = {styles.container}>
                  <Text style = {styles.textStyleRoomKey}>
                      Roomkey : XXX1245
                  </Text>
              </View>
          </View> 
      </View>
      );
  }
}

export default HomeScreen;