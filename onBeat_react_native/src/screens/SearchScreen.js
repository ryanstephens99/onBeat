import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, TouchableHighlight} from 'react-native';
import {Slider, Header, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {HeaderBar} from '../components/HeaderBar.js';

class SearchScreen extends Component {

  render() {
    return (
        <View style = {styles.containerSearchPage}>
    
        <View style = {styles.headerStyle}>      
          <HeaderBar
            title = "Search"
          />  
          <Input
          placeholder= "  Search"
          leftIcon={
            <Icon
              name='search'
              size={12}
              color='white'
            />
          }
          inputContainerStyle = {styles.inputStyle}
          labelStyle = {styles.textStyleLabel}
          inputStyle = {styles.textStyleInput}
          placeholderTextColor = '#fff'
        />
        </View> 
        

    </View>

    );
  }
}

export default SearchScreen;
