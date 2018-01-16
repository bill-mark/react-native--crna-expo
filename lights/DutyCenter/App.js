import React,{Component} from 'react';
import {TouchableOpacity,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';
import Customerlist from './views/customerlist'

import {
  StackNavigator,
} from 'react-navigation';


const SimpleApp = StackNavigator({
  Customerlist: { screen: Customerlist },
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});




