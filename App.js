import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './components/Homescreen'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import ContainerApp from './components/index'


export default class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      ...Ionicons.font,
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ loading: false })
  }
  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <ContainerApp />
    )
  }
}

// export default function App() {
//   return (
//     <MainScreen/>
//   );
// }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
