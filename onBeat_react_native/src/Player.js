import React, {Component} from 'react';
import { Text, View, Image, TouchableOpacity, TouchableHighlight} from 'react-native';
import {Header, Slider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default class Player extends Component {
    
    static navigationOptions =
    {
      title: 'Player',
    };

    render() {
        return (
        <View style = {styles.container}>
            <View style = {styles.headerStyle}>      
                <Header
                    backgroundColor = 'darkslateblue'
                    centerComponent={{ text: 'Player',style: { 
                        color: '#fff', 
                        fontFamily:'Futura',
                        fontSize: 20 }}}
                />
                <View style = {styles.container}>
                    <Image 
                        source={require('/Users/Uluc/Desktop/OnBeat/Images/The_Weeknd_-_Starboy.png')}  
                        style= {styles.imageStyle}
                    />
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
                            size={18}
                            color = 'gray'
                            style = {styles.iconPlayer}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Icon
                            name='pause'
                            size={18}
                            color = 'gray'
                            style = {styles.iconPlayer}
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Icon
                            name='forward'
                            size={18}
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
