import React,{Component} from 'react';
import {TouchableOpacity,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';
import AddCustomer from './lights/AddCostumer/views/AddCustomer'
import Tag from './lights/AddCostumer/views/tag'
import Dashboard from './views/dashboard'

import MyStatistics from './lights/User/views/MyStatistics'
import Customer from './lights/User/views/MyCustomer'
import MyIntegral from './lights/User/views/MyIntegral'
import MyEnlist from './lights/User/views/MyEnlist'
import MyAchievement from './lights/User/views/MyAchievement'
import MyQr from './lights/User/views/MyQr'

import CustomerList from './lights/CustomerList/views/customerlist'
import FilterCustomer from './lights/FilterCustomer/views/customerlist'
import CustomerAnalyse from './lights/CustomerAnalyse/views/customerlist'
import DutyCenter from './lights/DutyCenter/views/customerlist'

import {
  StackNavigator,
} from 'react-navigation';


var SimpleApp = StackNavigator({
  Dashboard: { screen: Dashboard},
  AddCustomer: { screen: AddCustomer },
  Tag:{screen: Tag},
  MyStatistics: { screen: MyStatistics },
  Customer: { screen: Customer },
  MyIntegral: { screen: MyIntegral },
  MyEnlist: { screen: MyEnlist },
  MyAchievement: { screen: MyAchievement },
  MyQr: { screen: MyQr },
  CustomerList: { screen: CustomerList },
  FilterCustomer: { screen: FilterCustomer },
  CustomerAnalyse: { screen: CustomerAnalyse },
  DutyCenter: { screen: DutyCenter },
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




