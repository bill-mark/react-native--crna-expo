import React, { Component } from "react";
import {
  AppRegistry,
  Alert,
  Text,
  View,
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import {px2dp} from "../assets/util.js"


let applicationStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        width: px2dp(750/4),
        marginBottom: px2dp(40),
    },
    icon: {
        width: px2dp(90),
        height: px2dp(90)
    },
    title: {
        marginTop: px2dp(18),
        height: px2dp(33),
        fontSize: px2dp(24),
        color: '#666666',
    }
})

class Application extends Component {
    render() {
        let application = this.props.application;
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate(application.main)} >
            <View style={applicationStyles.container}>
                <Image style={applicationStyles.icon} source={application.icon}/>
                <Text style={applicationStyles.title}>{application.name}</Text>
            </View>
            </TouchableOpacity>

        )
    }
}


let styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: 'wrap',
    },
})


export default class ApplicationList extends Component {
    
    render() {
        let applications = this.props.list;
        return (<View style={styles.container}>
            {applications.map((application)=>{
                return <Application key={application.id} navigation={this.props.navigation} style={styles.item} application={application}/>
            })}
        </View>)
    }
}
