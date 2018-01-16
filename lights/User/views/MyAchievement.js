import React,{Component} from 'react';
import {TouchableOpacity,NativeModules,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';
import Resolution from "../assets/Resolution"
import axios from 'axios'
import utils from '../assets/utils.js'
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class Customer extends Component{
     constructor(props) {
       super(props);
       this.state = {
         all_achievement:null,
         precentent:null,
         your_achievement:null,
         list:[],
       };
     }

     componentDidMount(){
          this.setState({
            all_achievement:23456.15,
            precentent:150,
            your_achievement:5678.34,
            list:[
              {
                time:'2017年11月',
                number:23456.00,
                percent:80,
              },
              {
                time:'2017年10月',
                number:1789.23,
                percent:74,
              },
              {
                time:'2017年9月',
                number:22233.98,
                percent:53,
              },
            ],
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

     formList(data) {  //表格渲染函数 
      
       return (     
           data.map((item,index) =>
             <View style={styles.form_wrap} key={index.toString()}>
                 <Text style={styles.form_left}>{item.time}</Text>
                 <Text style={styles.form_middle}>{item.number}</Text>
                 <Text style={styles.form_right}>完成度{item.percent}%</Text>
             </View>
           )  
       );
     }

     static navigationOptions = {
       headerTitle: '我的业绩',
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
                    我的业绩
                  </Text>              
            </View>
            <View style={styles.top}>
                 <Image source={require('../assets/img/myenlist.png')} style={styles.topimg}/>
                 <View style={styles.topleft}>
                     <Text style={styles.toplefttitle}>本月业绩</Text>
                     <Text style={styles.topleftmiddle}>
                        <Text style={styles.moneyico}>￥</Text>
                        {utils.formatPriceWithSymbol(this.state.all_achievement)}                   
                     </Text>
                     <Text style={styles.topleftdown}>
                          业绩完成度 <Text style={{fontSize:40}}>{this.state.precentent}%</Text> 
                     </Text>
                     <Text style={styles.topleftdown_down}>
                          您在本月20号业绩最高,业绩 <Text style={{fontSize:40}}>{this.state.your_achievement}</Text> 元
                     </Text>
                 </View>
            </View>
            <View style={styles.middle}>
                <View style={styles.middleleft}></View>
                <Text style={styles.middright}>历史业绩</Text>
            </View>
         
            {this.formList(this.state.list)}

          </View>
         </Resolution.FixWidthView>
       );
     }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
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
    marginLeft:260,
    marginTop:30,
    fontSize:36,
  },
  top:{
    width:'100%',
    height:336,
    position:'relative',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  topimg:{
    width:750,
    height:336,
    position:'absolute'
  },
  topleft:{
    height:336,
    flexDirection:'column',
    alignItems:'center',
  },
  toplefttitle:{
    marginTop:48,
    fontSize:24,
    backgroundColor:'transparent',
    color:'#fff',
    opacity:0.8,
  },
  topleftmiddle:{
     marginTop:35,
     fontSize:90,
     backgroundColor:'transparent',
     color:'#fff',
  },
  topleftmiddleright:{
    marginTop:48,
    fontSize:24,
    backgroundColor:'transparent',
    color:'#fff',
  },
  topleftdown:{
    marginTop:20,
    fontSize:24,
    backgroundColor:'transparent',
    color:'#fff',
  },
  topleftdown_down:{
    fontSize:24,
    backgroundColor:'transparent',
    color:'#fff',
  },
  topright:{
    marginTop:-220,
    width:145,
    height:44,
    borderColor:'#fff',
    borderStyle:'solid',
    borderWidth:2,
    borderRadius:4,
    opacity:0.7,
  },
  toprighttext:{
    fontSize:30,
    backgroundColor:'transparent',
    color:'#fff',
    textAlign:'center',
    lineHeight:35,
  },
  middle:{
    flexDirection:'row',
    height:90,
  },
  middleleft:{
    marginLeft:30,
    marginTop:30,
    marginRight:10,
    backgroundColor:'#f23896',
    borderRadius:2,
    width:6,
    height:24,
  },
  middright:{
    fontSize:28,
    marginTop:25,
    color:'#333',
  },
  down_title:{
    marginTop:30,
    flexDirection:'row',
    width:'100%',
    height:70,
    backgroundColor:'#f8f8f8', 
  },
  down_title_rank:{
    width:123,
    height:70,
    fontSize:24,
    color:'#999',
    textAlign:'center',
    lineHeight:70,
    borderColor:'#e5e5e5',
    borderWidth: 1,

    marginRight:2,
    shadowOffset: {width: 2, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 0,   
  },
  down_title_name:{
    width:160,
    height:70,
    fontSize:24,
    color:'#999',
    textAlign:'center',
    lineHeight:70,
    borderColor:'#e5e5e5',
    borderWidth: 1,   
  },
  down_title_number:{
    width:150,
    height:70,
    fontSize:24,
    color:'#999',
    textAlign:'center',
    lineHeight:70,
    borderColor:'#e5e5e5',
    borderWidth: 1,   
  },
  down_title_lastmonth:{
    width:175,
    height:70,
    fontSize:24,
    color:'#999',
    textAlign:'center',
    lineHeight:70,
    borderColor:'#e5e5e5',
    borderWidth: 1,   
  },
  down_title_change:{
    width:140,
    height:70,
    fontSize:24,
    color:'#999',
    textAlign:'center',
    lineHeight:70,
    borderColor:'#e5e5e5',
    borderWidth: 1,   
  },
  down_content:{
     flexDirection:'row',
     width:'100%',
     height:70,
  },
  down_content_even:{
     flexDirection:'row',
     width:'100%',
     height:70,
     backgroundColor:'#f8f8f8',
  },
  down_content_rank:{     
     borderColor:'#e5e5e5',
     borderRightWidth: 1, 
     borderBottomWidth: 1,

     marginRight:2,
     shadowOffset: {width: 2, height: 0},
     shadowColor: 'black',
     shadowOpacity: 0.2,
     shadowRadius: 0,
  },
  down_content_rank_text:{
     width:122,
     height:69,
     fontSize:24,
     color:'#333',
     textAlign:'center',
     lineHeight:69,
  },
  down_content_name:{
     borderColor:'#e5e5e5',
     borderLeftWidth: 1, 
     borderBottomWidth: 1, 
  },
  down_content_name_text:{
     width:159,
     height:69,
     fontSize:24,
     color:'#333',
     textAlign:'center',
     lineHeight:69,
  },
  down_content_number:{
     borderColor:'#e5e5e5',
     borderLeftWidth: 1, 
     borderBottomWidth: 1, 
  },
  down_content_number_text:{
     width:149,
     height:69,
     fontSize:24,
     color:'#333',
     textAlign:'center',
     lineHeight:69,
  },
  down_content_lastmonth:{
     borderColor:'#e5e5e5',
     borderLeftWidth: 1, 
     borderBottomWidth: 1, 
  },
  down_content_lastmonth_text:{
     width:174,
     height:69,
     fontSize:24,
     color:'#333',
     textAlign:'center',
     lineHeight:69,
  },
  down_content_change:{
     borderColor:'#e5e5e5',
     borderLeftWidth: 1, 
     borderBottomWidth: 1, 
     flexDirection:'row',
  },
  down_content_change_text:{
     marginLeft:5,
     width:139,
     height:69,
     fontSize:24,
     color:'#333',
     lineHeight:69,
  },
  change_img:{
    marginLeft:50,
    marginTop:22,
    width:18,
    height:27,
  },
  form_wrap:{
    height:100,
    flexDirection:'row',
    borderColor:'#e5e5e5',
    borderLeftWidth: 1, 
    borderBottomWidth: 1, 
  },
  form_left:{
    width:150,
    marginLeft:30,
    lineHeight:98,
    fontSize:28,
    color:'#999',
  },
  form_middle:{
    width:150,
    marginLeft:135,
    lineHeight:98,
    fontSize:28,
    color:'#333',
  },
  form_right:{
    width:150,
    marginLeft:95,
    lineHeight:98,
    fontSize:28,
    color:'#333',
  },
});










