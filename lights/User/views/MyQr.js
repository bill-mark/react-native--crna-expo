import React,{Component} from 'react';
import {TouchableOpacity,NativeModules,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';
import Resolution from "../assets/Resolution"
import axios from 'axios'
import utils from '../assets/utils.js'
import QRCode from 'react-native-qrcode'
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class Customer extends Component{
     constructor(props) {
       super(props);
       this.state = {
         name:null,
         title:null,
         qr_url:'',
         img:null,
       };
     }

     componentDidMount(){
          this.setState({
            name:'李晓曼',
            title:'Moussy 店员',
            qr_url:'https://www.baidu.com',
            img_url:'https://facebook.github.io/react-native/docs/assets/favicon.png',
          })
          
         return
       axios.get('https://easy-api-test.belle.net.cn/my_statis/my_customer',{
           params:{
           },
           headers:  {
               "Token":  '925fcfe404867a53c78cf0f6abbf2230',
               "APP_ID":  '244'
           }
         })
         .then((res)=>{
	           if(res.data.code == 0){
                 this.setState({
                    
                 })
             }else{
               alert(res.data.message)
               console.log(res.data.message)
             }
         })
         .catch((err)=>{
             alert(err)
             console.log(err)
         })
     }

     static navigationOptions = {
       headerTitle: '我的二维码',
       header:null,
     };
     render() {
       let data = this.state.data
       return (
         <Resolution.FixWidthView >
          <View style={styles.container}>
            <View style={styles.title}>
               <TouchableOpacity style={styles.touchimg_wrap} onPress={()=>this.props.navigation.goBack(null)}>
                 <Image source={require('../assets/img/return.png')} style={styles.titleimg}/>
                </TouchableOpacity>
                  <Text style={styles.titletext}  >
                    我的二维码
                  </Text>              
            </View>
            <View style={styles.content_wrap}>
                 <View style={styles.content_top}>
                      <Image source={{ uri:this.state.img_url }} style={styles.topimg}/>
                      <View style={styles.content_top_right}>
                           <Text style={styles.content_top_name}>{this.state.name}</Text>
                           <Text style={styles.content_top_title}>{this.state.title}</Text>
                      </View>
                 </View>
                 <View style={styles.content_qr}>
                    <QRCode
                        value={this.state.qr_url}
                        size={520}
                        bgColor='black'
                        fgColor='white'/>
                 </View>
                 <View style={styles.content_down}>
                      <Text style={styles.content_down_text}>
                         扫码关注Mouse品牌公众号,获取最新时尚资料和更多折扣信息!
                      </Text>
                 </View>
            </View>
          </View>
         </Resolution.FixWidthView>
       );
     }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#f2f2f2',
      ...ifIphoneX({
        paddingTop: 30
    }, {
        paddingTop: 0
    })
  },
  title:{
    flexDirection:'row',
    alignItems:'center',
    height:128,
    backgroundColor:'white',
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
  content_wrap:{
      marginLeft:40,
      marginTop:85,
      width:670,
      height:905,
      backgroundColor:'white',
  },
  content_top:{
     flexDirection:'row',
     marginTop:28,
  },
  topimg:{
    marginLeft:73,
    width:130,
    height:130,
    borderRadius:65,
  },
  content_top_right:{
     marginLeft:20,
  },
  content_top_name:{
      marginTop:20,
      fontSize:36,
      color:'#333',
  },
  content_top_title:{
     marginTop:15,
     fontSize:36,
     color:'#999',
  },
  content_qr:{
      width:520,
      height:520,
      marginLeft:74,
      marginTop:60,
  },
  content_down:{
      width:510,
      marginLeft:82,
      marginTop:44,
  },
  content_down_text:{
     fontSize:28,
     color:'#999',
  },
});










