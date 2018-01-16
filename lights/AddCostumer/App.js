import React,{Component} from 'react';
import {TouchableOpacity,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';

import AddCustomer from './views/AddCustomer'
import Tag from './views/tag'
import {
  StackNavigator,
} from 'react-navigation';


const SimpleApp = StackNavigator({
  AddCustomer: { screen: AddCustomer },
  Tag:{screen: Tag},
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




