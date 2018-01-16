import React, { Component } from "react";
import {
    AppRegistry,
    SectionList,
    Text,
    View,
    Button,
    Dimensions,
    Image,
    ScrollView
} from "react-native";
import StyleSheet from "react-native-extended-stylesheet"

let { height, width } = Dimensions.get("window");
StyleSheet.build({
    $textColor: "#0275d8",
    $rem: width / 375 * 5
});
import ApplicationList from "../components/ApplicationList"
import mock from "../assets/mock"

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ backgroundColor: '#FFF' }}>
                <View style={styles.dashboard}>
                    <Image
                        style={styles.dashBoardBackground}
                        source={require("../assets/images/workbench/dashboardBackground.png")}
                    />
                    <Text style={styles.store}>北京西单大悦城店</Text>
                    <Text style={styles.titleText}>今日个人业绩</Text>
                    <View style={styles.current}>
                        <Text style={styles.sign}>¥</Text>
                        <Text style={styles.account}>19,324,00</Text>
                        <Image
                            style={styles.refresh}
                            source={require("../assets/images/workbench/刷新.png")}
                        />
                    </View>
                    <Text style={styles.last}>昨日业绩 178888.30元</Text>
                    <View style={styles.summary}>
                        <Text
                            style={[
                                styles.summaryText, styles.summary_1
                            ]}
                        >
                            销量
            </Text>
                        <Text style={[styles.summaryText, styles.summary_2]}>44</Text>
                        <Text style={[styles.summaryText, styles.summary_3]}>|</Text>
                        <Text style={[styles.summaryText, styles.summary_4]}>折扣</Text>
                        <Text style={[styles.summaryText, styles.summary_5]}>98.3%</Text>
                    </View>
                </View>
                {/* lights */}
                <ApplicationList 
                    style={styles.applicationList} 
                    list={mock.lights} 
                    navigation={this.props.navigation}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    // <dashboard>
    dashboard: {
        width: "100%",
        height: "57.4rem",
    },
    dashBoardBackground: {
        position: "absolute",
        width: "100%",
        height: "52rem",
    },
    store: {
        fontSize: "3.6rem",
        color: "#FFF",
        textAlign: "center",
        marginTop: "5.2rem",
        height: "5rem",
        backgroundColor: "transparent"
    },
    titleText: {
        fontSize: "2.8rem",
        color: "#FFF",
        textAlign: "center",
        marginTop: "7.1rem",
        backgroundColor: "transparent"
    },
    current: {
        marginTop: "0.8rem",
        backgroundColor: "transparent",
        height: "10.8rem",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    sign: {
        fontSize: "4rem",
        color: "#FFF",
        fontWeight: "500"
    },
    account: {
        fontSize: "6rem",
        color: "#FFF",
        fontWeight: "500",
        marginBottom: "1rem"
    },
    refresh: {
        width: "3.8rem",
        height: "10.8rem",
        marginLeft: "1.7rem",
        resizeMode: "center",
        justifyContent: "center"
    },
    last: {
        fontSize: "2.8rem",
        color: "#FFF",
        opacity: 0.8,
        height: "4rem",
        textAlign: "center",
        backgroundColor: "transparent"
    },

    summary: {
        flexDirection: "row",
        marginTop: "5.7rem",
        backgroundColor: "transparent",
        height: "4.2rem",
        alignItems: "center"
    },
    summaryText: {
        fontSize: "3.0rem",
        color: "#FFF"
    },
    summary_1: {
        marginLeft: "18.5rem"
    },
    summary_2: {
        marginLeft: "2rem"
    },
    summary_3: {
        marginLeft: "5.9rem"
    },
    summary_4: {
        marginLeft: "6rem"
    },
    summary_5: {
        marginLeft: "2rem"
    },
    // </dashboard>
    applicationList: {
        width: '100%',
    }
});
