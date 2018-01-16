import React,{Component} from 'react';
import {TouchableOpacity,NativeModules,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';
import MyCell from '../components/commonmycell';
import Resolution from "../assets/Resolution"
import axios from 'axios'
import { ifIphoneX } from 'react-native-iphone-x-helper'

var RNModules = NativeModules.RTModule;

export default class MyStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {data:[]};
  }

  componentDidMount(){
    axios.get('https://easy-api-test.belle.net.cn/my_statis/statis',{
        params:{
        },
        headers:  {
            "Token":  '925fcfe404867a53c78cf0f6abbf2230',
            "APP-ID":  '244'
        }
      })
      .then((res)=>{
        let params = []
        for(let key in res.data.data){
            params.push(res.data.data[key])
        }
        this.setState({
           data:params
        })
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  static navigationOptions = {
    headerTitle: '我的统计',
    header:null,
  };
  render() {
    let data = this.state.data
    return (
      <Resolution.FixWidthView style={styles.container}>
          <View style={styles.title}>
          <TouchableOpacity style={styles.touchimg_wrap} onPress={() => this.props.navigation.goBack()}>
               <Image source={require('../assets/img/return.png')} style={styles.titleimg}/>
              </TouchableOpacity>
                <Text style={styles.titletext}  >
                  我的统计
                </Text>            
          </View>
          <View style={styles.CellStyle}>
              <MyCell 
                   leftIconName={require('../assets/img/bp.png')}
                   leftTitle="我的积分"
                   rightTitle={data[2]+"积分"}
                   navigation={this.props.navigation}
                   navigationTitle='MyIntegral'
              />
              <MyCell 
                   leftIconName={require('../assets/img/client.png')}
                   leftTitle="我的客户"
                   rightTitle={"共"+data[1]+"位客户"}
                   navigation={this.props.navigation}
                   navigationTitle='Customer'
              />
              <MyCell 
                   leftIconName={require('../assets/img/enlist.png')}
                   leftTitle="我的招募"
                   rightTitle={"本月招募客户"+data[0]+"位"}
                   navigation={this.props.navigation}
                   navigationTitle='MyEnlist'
              />
              <MyCell 
                   leftIconName={require('../assets/img/ahcieve.png')}
                   leftTitle="我的业绩"
                   rightTitle={data[3]+"元"}
                   navigation={this.props.navigation}
                   navigationTitle='MyAchievement'
              />
              <MyCell 
                   leftIconName={require('../assets/img/qr.png')}
                   leftTitle="我的二维码"
                   navigation={this.props.navigation}
                   navigationTitle='MyQr'
              />
          </View>
      </Resolution.FixWidthView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  title:{
    flexDirection:'row',
    alignItems:'center',
    height:128,
    backgroundColor:'white',
    ...ifIphoneX({
        paddingTop: 30
    }, {
        paddingTop: 0
    })
  },
  touchimg_wrap: {
    width: 70,
    height: '100%',
    paddingLeft: 30,
    paddingTop: 30,
  },
  titleimg:{
    width:18,
    height:32,
    marginTop:30,
  },
  titletext:{
    marginLeft:245,
    marginTop:30,
    fontSize:36,
  },
  CellStyle:{
    flex: 1,
    marginLeft:30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }
});