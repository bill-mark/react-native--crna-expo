import React,{Component} from 'react';
import {Button,TouchableOpacity,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';
import Resolution from "./assets/Resolution"
import axios from 'axios'
import MyStatistics from './views/MyStatistics'
import Customer from './views/MyCustomer'
import MyIntegral from './views/MyIntegral'
import MyEnlist from './views/MyEnlist'
import MyAchievement from './views/MyAchievement'
import MyQr from './views/MyQr'
import {
  StackNavigator,
} from 'react-navigation';

class ChatScreen extends React.Component {
  static navigationOptions = {
    headerBackTitle:null,
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
   Home: { screen: MyStatistics },
   Customer:{screen: Customer},
   MyIntegral:{screen:MyIntegral},
   MyEnlist:{screen:MyEnlist},
   MyAchievement:{screen:MyAchievement},
   MyQr:{screen:MyQr},
   Chat: { screen: ChatScreen },
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




