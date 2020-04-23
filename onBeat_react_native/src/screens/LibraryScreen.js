import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StatusBar, TouchableHighlight } from 'react-native';
import { Slider, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { HeaderBar } from './../components/HeaderBar.js';
import { LibraryRowItem } from '../components/LibraryRowItem.js';

class LibraryScreen extends Component {

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.headerStyle}>
          <HeaderBar
            title="Library"
          />
          <LibraryRowItem
            title = "Starboy"
            artist="the Weekend"
          />

          <LibraryRowItem
            title="Hell"
            artist="Yes"
          />
          <LibraryRowItem
            title="Hell"
            artist="Yes"
          />
          <LibraryRowItem
            title="Hell"
            artist="Yes"
          />
        </View>
      </View>
    );
  }
}

export default LibraryScreen;
