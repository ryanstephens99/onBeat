import React, { Component } from "react";
import { createStackNavigator} from 'react-navigation-stack';
import  {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {TabBar } from "/Users/Uluc/Desktop/Routinely/components";
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from "./screens/HomeScreen";
import TrainerScreen from "./screens/TrainerScreen";
import WorkoutScreen from "./screens/WorkoutScreen";
import SearchScreen from "./screens/SearchScreen";
import CalendarScreen from "./screens/CalendarScreen";
import WorkoutDBScreen from "./screens/WorkoutDBScreen";
import ViewPlanScreen from "./screens/ViewPlansScreen";
import AddWorkoutScreen from './screens/AddWorkoutScreen';
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
    XXXX: {
        screen: TrainerScreen,
        navigationOptions: {
            tabBarIcon : ({ tintColor }) => 
            <Icon
                name='align-justify'
                color = 'white'
                size = {20}
            />
          }
    },
       YYYYY:{
         screen: WorkoutScreen,
         navigationOptions: {
            tabBarIcon : ({ tintColor }) => 
            <Icon
                name='pause'
                color = 'white'
                size = {20}
            />
          }
       },
       ZZZZZ:{
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
           screen: CalendarScreen,
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
    WorkoutDBScreen:{
        screen :WorkoutDBScreen,
        
    },
    ViewPlanScreen:{
        screen :ViewPlanScreen
    },
    AddWorkoutScreen:{
        screen :AddWorkoutScreen
    },
    MakePlanScreen:{
        screen : MakePlanScreen
    }
    
});


export default createAppContainer(StackAppNavigator);