import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, TouchableHighlight} from 'react-native';
import {Slider, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {HeaderBar} from './../components/HeaderBar.js';
import {PlayerView} from './../components/PlayerView.js';

class HomeScreen extends Component{

  render() {
    return (
      <View style = {styles.container}>
    
          <View style = {styles.headerStyle}>      
          <HeaderBar
            title = "Music"
          />

            <PlayerView
                title = 'Starboy'
                artist = 'The Weeknd'
            />
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 50 }}>
                <Slider
                    thumbTintColor='darkslateblue'
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
