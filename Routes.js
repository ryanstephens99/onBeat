import React, { Component } from "react";
import { createStackNavigator} from 'react-navigation-stack';
import  {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {TabBar } from "/Users/Uluc/Desktop/Routinely/components";
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from "./screens/HomeScreen";
import HostingScreen from "./screens/HostingScreen";
import AccountScreen from "./screens/AccountScreen";
import SearchScreen from "./screens/SearchScreen";
import LibraryScreen from "./screens/LibraryScreen";
import MakePlanScreen  from './screens/MakePlanScreen';


const BottomTab = createBottomTabNavigator({
     
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon : ({ tintColor }) => 
            <Icon
                name='home'
                color = 'white'
                size = {20}
            />
          }
       },
    Hosting: {
        screen: HostingScreen,
        navigationOptions: {
            tabBarIcon : ({ tintColor }) => 
            <Icon
                name='align-justify'
                color = 'white'
                size = {20}
            />
          }
    },
    Account:{
         screen: AccountScreen,
         navigationOptions: {
            tabBarIcon : ({ tintColor }) => 
            <Icon
                name='pause'
                color = 'white'
                size = {20}
            />
          }
       },
    Search:{
        screen: SearchScreen,
        navigationOptions: {
        tabBarIcon : ({ tintColor }) => 
        <Icon
            name='search'
            color = 'white'
            size = {20}
        />
        }
    },
    Library:{
        screen: LibraryScreen,
        navigationOptions: {
        tabBarIcon : ({ tintColor }) => 
        <Icon
            name='book'
            color = 'white'
            size = {20}
        />
        }
    },
        
    },
    {
        tabBarComponent: TabBar,
        tabBarOptions: {
            activeTintColor: "#eeeeee",
            inactiveTintColor: "#898999"
          }
    }

);

const StackAppNavigator = createStackNavigator({
    
    Main: {
        screen: BottomTab,
        navigationOptions: {
            header: null,
            tabBarVisible: true ,
            
        }
    },
    MakePlanScreen:{
        screen : MakePlanScreen
    }
    
});


export default createAppContainer(StackAppNavigator);