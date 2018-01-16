import React,{Component} from 'react';
import {FlatList,TouchableOpacity,NativeModules,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';
import Resolution from "../assets/Resolution"
import ModalDropdown from '../components/modal-dropdown';
import axios from 'axios'
import _ from 'lodash'
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class MyIntergral extends Component{
     constructor(props) {
       super(props);
       this.state = {
         jifen:16823,
         ranking:null,
         tops:[],
         nowIndexes:[0],
         formData:[
           {
             time:'2017年10月',
             list:[
                {
                  title:'微课学习',
                  time:'2017.12.22 16:30:30',
                  number:-3,
                },
                {
                  title:'兑换优惠券',
                  time:'2017.12.12 16:30:30',
                  number:100,
                },
             ],
           },
           {
            time:'2017年9月',
            list:[
               {
                 title:'毛泽东思想学习',
                 time:'2017.11.2 16:30:30',
                 number:-78,
               },
               {
                 title:'习近平语录',
                 time:'2017.11.5 16:30:30',
                 number:100,
               },
            ],
          },
         ],
       };
     }

     componentDidMount(){
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

     checkList(index) {  //table
        if(this.state.nowIndexes.indexOf(index) === -1 ){
          this.state.nowIndexes=[]  //清空数组，来收回之前展开的菜单
          this.state.nowIndexes.push(index)
        }
        else{
          this.state.nowIndexes = _.remove(this.state.nowIndexes,(idx)=>{
                    return idx !== index
               })
        }
        this.forceUpdate()
     }

     checkActive (index) {  //table状态检测
         return this.state.nowIndexes.indexOf(index) != -1
     }

     setTable(){  //创建table的HTML
          return(
            <View style={styles.down_table}>                   
              <View style={styles.down_table_left}>
                <TouchableOpacity onPress={ ()=>{this.checkList(0) }}>
                  <Text style={[this.checkActive(0)?styles.down_table_text_red:styles.down_table_text]}>全部</Text>
                </TouchableOpacity>
                <View style={[this.checkActive(0)?styles.down_table_text_down_red:styles.down_table_text_down]}></View>
              </View>
                  
              <View style={styles.down_table_middle}>
                <TouchableOpacity onPress={ ()=>{this.checkList(1) }}>
                    <Text style={[this.checkActive(1)?styles.down_table_text_red:styles.down_table_text]}>获取</Text>
                </TouchableOpacity>
                <View style={[this.checkActive(1)?styles.down_table_text_down_red:styles.down_table_text_down]}></View>
              </View>
        
              <View style={styles.down_table_right}>
                <TouchableOpacity onPress={ ()=>{this.checkList(2) }}>
                  <Text style={[this.checkActive(2)?styles.down_table_text_red:styles.down_table_text]}>消耗</Text>
                </TouchableOpacity>
                <View style={[this.checkActive(2)?styles.down_table_text_down_red:styles.down_table_text_down]}></View>
              </View>
            </View>
          )
     }

     setForm(data){  //创建表格
       return (
         data.map((item,index) =>
            <View style={styles.form_wrap} key={index}>
                <View style={styles.form_title}>
                    <Text style={styles.form_title_text}>{item.time}</Text>
                </View>
                { item.list.map((item2,index2)=>
                     <View style={styles.form_content} key={index2}>
                     <View style={styles.content_left}>
                       <Text style={styles.content_left_title}>{item2.title}</Text>
                       <Text style={styles.content_left_time}>{item2.time}</Text>
                     </View>
                     <View style={styles.content_right}>
                       <Text style={styles.content_right_text}>{item2.number}</Text>
                       <TouchableOpacity >
                        <Image source={require('../assets/img/return.png')} style={styles.content_right_img}/>
                       </TouchableOpacity>
                     </View>
                 </View>
                ) }
            </View>
         )
       )
     }

     static navigationOptions = {
       headerTitle: '我的积分',
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
                    我的积分
                  </Text>              
            </View>
            <View style={styles.top}>
                 <Image source={require('../assets/img/mycustomer.png')} style={styles.topimg}/>
                 <View style={styles.topleft}>
                      <Image source={require('../assets/img/integraicon.png')} style={styles.topleftimg}/>
                     <Text style={styles.toplefttitle}>{this.state.jifen.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</Text>                  
                 </View>
                 <View style={styles.topright}>
                      <Text style={styles.toprighttext}>积分说明</Text>
                 </View>
            </View>
            <View style={styles.middle}>
                <Text style={styles.middleft}>积分记录</Text>
                <View style={styles.middleright}>
                  <ModalDropdown options={['全部', '十二月']}
                                 style={styles.middright_select}
                                 defaultValue='全部'
                                 defaultInde={0}
                                 textStyle={styles.middright_select_text}
                                 dropdownStyle={styles.select_dropdownStyle}/>
                  <Image source={require('../assets/img/integradown.png')} style={styles.middleright_img}/>
                </View>
            </View>

            {this.setTable()}
            {this.setForm(this.state.formData)}         
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
    width:750,
    height:190,
    position:'relative',
    flexDirection:'row',
    alignItems:'center',
  },
  topimg:{
    width:750,
    height:190,
    position:'absolute'
  },
  topleft:{
    marginLeft:230,
    marginRight:70,
    width:250,
    height:112,
    flexDirection:'row',

    // borderColor:'red',
    // borderStyle:'solid',
    // borderWidth:1,
  },
  topleftimg:{
    marginTop:40,
    marginRight:5,
    width:35,
    height:40,
  },
  toplefttitle:{
    fontSize:80,
    backgroundColor:'transparent',
    color:'#fff',
    textAlign:'left',
  },
  topright:{
    marginTop:-100,
    marginLeft:10,
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
    justifyContent:'space-between',
    height:82,
    borderColor:'#e5e5e5',
    borderStyle:'solid',
    borderBottomWidth:1,
  },
  middleft:{
    marginLeft:30,
    fontSize:30,
    fontWeight:'800',
    marginTop:25,
    color:'#333',
  },
  middleright:{
    flexDirection:'row',
  },
  middright_select:{
    marginRight:10,
    marginLeft:400,
    marginTop:25,
  },
  middright_select_text:{
    fontSize:28,
    color:'#333',
  },
  middleright_img:{
    marginTop:35,
    marginRight:30,
    width:14,
    height:8,
  },
  select_dropdownStyle:{
    marginTop:8,
    marginLeft:40,
  },
  down_table:{
    height:82,
    flexDirection:'row',
  },
  down_table_left:{
    width:'33%',
    height:82,
  },
  down_table_red:{
    width:'33%',
    height:80,
  },
  down_table_text:{
    fontSize:30,
    height:77,
    textAlign:'center',
    lineHeight:77,
  },
  down_table_text_red:{
    fontSize:30,
    height:77,
    textAlign:'center',
    lineHeight:77,
    color:'#f23896',
  },
  down_table_text_down:{
    marginLeft:105,
    marginTop:10,
    width:40,
    height:4,
  },
  down_table_text_down_red:{
    marginLeft:105,
    marginTop:10,
    backgroundColor:'#f23896',
    width:40,
    height:4,
  },
  down_table_middle:{
    width:'33%'
  },
  down_table_right:{
    width:'33%'
  },
  form_wrap:{
    marginTop:10,
  },
  form_title:{
    width:'100%',
    height:60,
    backgroundColor:'#f8f8f8',
  },
  form_title_text:{
    fontSize:30,
    color:'#333',
    lineHeight:60,
    marginLeft:30,
  },
  form_content:{
    height:124,
    marginLeft:30,
    flexDirection:'row',
    justifyContent:'space-between',
    borderColor:'#e5e5e5',
    borderStyle:'solid',
    borderBottomWidth:1,
  },
  content_left_title:{
    marginTop:25,
    fontSize:30,
    color:'#333',
  },
  content_left_time:{
    marginTop:15,
    fontSize:24,
    color:'#999',
  },
  content_right:{
    marginRight:30,
    flexDirection:'row',
  },
  content_right_text:{
    marginRight:18,
    fontSize:36,
    marginTop:40,
    color:'#ff951f',
  },
  content_right_img:{
    marginTop:50,
    width:14,
    height:26,
    transform:[{rotate:'180deg'}],
  }
});










