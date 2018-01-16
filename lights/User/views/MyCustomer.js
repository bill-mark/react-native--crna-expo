import React,{Component} from 'react';
import {TouchableOpacity,NativeModules,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';
import Resolution from "../assets/Resolution"
import axios from 'axios'
import { ifIphoneX } from 'react-native-iphone-x-helper'

export default class MyCustomer extends Component{
     constructor(props) {
       super(props);
       this.state = {
         customer_total:null,
         ranking:null,
         tops:[]
       };
     }

     componentDidMount(){
       axios.get('https://easy-api-test.belle.net.cn/my_statis/my_customer',{
           params:{
           },
           headers:  {
               "Token":  '925fcfe404867a53c78cf0f6abbf2230',
               "APP-ID":  '244'
           }
         })
         .then((res)=>{
	           if(res.data.code == 0){
                 this.setState({
                    customer_total:res.data.data.customer_total,
                    ranking:res.data.data.ranking,
                    tops:res.data.data.tops,
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
             <View style={ [index%2 == 0?styles.down_content:styles.down_content_even] } key={index.toString()}>
                 <View style={styles.down_content_rank}>
                    <Text style={styles.down_content_rank_text}>{index+1}</Text>
                 </View>
                 <View style={styles.down_content_name}>
                    <Text style={styles.down_content_name_text}>{item.name}</Text>
                 </View>
                 <View style={styles.down_content_number}>
                    <Text style={styles.down_content_number_text}>{item.count}人</Text>
                 </View>
                 <View style={styles.down_content_lastmonth}>
                    <Text style={styles.down_content_lastmonth_text}>{item.last_month_sort}</Text>
                 </View>
                 <View style={styles.down_content_change}>
                    <Image source={ (item.last_month_sort - index)>0? require('../assets/img/up.png'):require('../assets/img/down.png') } style={styles.change_img}/>
                    <Text style={styles.down_content_change_text}>
                        {Math.abs(item.last_month_sort - index)}
                    </Text>
                 </View>
             </View>
           )  
       );
     }

     static navigationOptions = {
       headerTitle: '我的客户',
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
                    我的客户
                  </Text>              
            </View>
            <View style={styles.top}>
                 <Image source={require('../assets/img/mycustomer.png')} style={styles.topimg}/>
                 <View style={styles.topleft}>
                     <Text style={styles.toplefttitle}>目前共有客户</Text>
                     <Text style={styles.topleftmiddle}>
                          {this.state.customer_total}
                          <Text style={styles.topleftmiddleright}>人</Text>
                     </Text>
                     <Text style={styles.topleftdown}>
                          本店排名第 <Text style={{fontSize:40}}>{this.state.ranking}</Text> 名
                      </Text>
                 </View>
                 <View style={styles.topright}>
                      <Text style={styles.toprighttext}>去查看</Text>
                 </View>
            </View>
            <View style={styles.middle}>
                <View style={styles.middleleft}></View>
                <Text style={styles.middright}>本店总客户数 TOP100</Text>
            </View>
            <View style={styles.down_title}>
               <Text style={styles.down_title_rank}>排名</Text>
               <Text style={styles.down_title_name}>姓名</Text>
               <Text style={styles.down_title_number}>人数</Text>
               <Text style={styles.down_title_lastmonth}>上月排名</Text>
               <Text style={styles.down_title_change}>变化</Text>
            </View>
         
            {this.formList(this.state.tops)}

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
    height:304,
    position:'relative',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  topimg:{
    width:750,
    height:304,
    position:'absolute'
  },
  topleft:{
    marginLeft:240,
    marginRight:70,
    width:250,
    height:302,
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
     marginTop:30,
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
  },
  middleleft:{
    marginLeft:30,
    marginTop:32,
    marginRight:8,
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
  }
});










