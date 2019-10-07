import React from 'react';

import MainScreen from './Homescreen';
import SecondScreen from './Secondscreen';

import { createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'

const InputScreen = createStackNavigator({
  Homescreen: {
    screen: MainScreen,
  },
});

const OutputScreen = createStackNavigator({
  SecondHomeScreen: {
    screen: SecondScreen,
  },
});

const RootStack = createStackNavigator({
  HomeScreen: MainScreen,
  SecondScreen: SecondScreen, 
})

const App = createBottomTabNavigator({
    InputScreen,
    OutputScreen,
})



//finalize everything for the container
const ContainerApp = createAppContainer(App);

export default ContainerApp; //export container component to be used in App.js
