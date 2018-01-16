import React,{Component} from 'react';
import {SectionList,Modal,SafeAreaView,Alert,TextInput,TouchableOpacity,NativeModules,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';
import Resolution from "../assets/Resolution"
import axios from 'axios'
import { ifIphoneX } from 'react-native-iphone-x-helper'

var RNModules = NativeModules.RTModule;

export default class Customerlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
        search_word:null,
        name:null,
        order:null,
        orderField:null,
        pageIndex:1,
        pageSize:10,
        propid_array:[],
        tagid_array:[],

        formdata:[],
        total:null,
        namestate:null,
    }

  }

  static navigationOptions = {
    header:null,
  };

  
  goto_child(){ //跳转到子组件
    this.props.navigation.navigate('Tag',{
        onTagChosed:(data)=>{
            this.state.tag_bechosed = data
            this.forceUpdate()
        },
        father_tag:this.state.tag_bechosed
    })
  }

  componentDidMount(){
      this.push_search()
  }

  push_search(){ //发起搜索查询
      axios.get('https://easy-api-test.belle.net.cn/customer/search',{
        params:{
            name:this.state.name,
            order:this.state.order,
            orderField:this.state.orderField,
            pageIndex:this.state.pageIndex,
            pageSize:this.state.pageSize,
            propids:this.state.propid_array.map((item,index)=>{return item.id}).join(','),
            tagids:this.state.tagid_array.map((item,index)=>{return item.id}).join(','),
        },
        headers:  {
            "Token":  '9dd4e7f647757a58e10b946f7409df9d',
            "APP-ID":  '453'
        }
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data.code === 0){
                
            }else{
                alert(res.data.message)
            }
        })
        .catch((err)=>{
            alert(err)
            console.log(err)
        })
  }

  _renderItem = (info) => {
    var txt = '  ' + info.item.title;
    return <Text
      style={{ height: 60, textAlignVertical: 'center', backgroundColor: "#ffffff", color: '#5C5C5C', fontSize: 15 }}>{txt}</Text>
  }

  _sectionComp = (info) => {
    var txt = info.section.key;
    return <Text
      style={{ height: 50, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#9CEBBC', color: 'white', fontSize: 30 }}>{txt}</Text>
  }


  render() {
    let data = this.state.data
    return (
      <Resolution.FixWidthView>
        <View style={styles.title}>
                <TouchableOpacity style={styles.touchimg_wrap} onPress={() => this.props.navigation.goBack()}>
                  <Image source={require('../assets/img/return.png')} style={styles.titleimg}/>
                </TouchableOpacity>
                <Text style={styles.titletext}  >
                    客户列表
                </Text>       
        </View>
        <View style={styles.search_wrap}>
            <View style={styles.search_left}>
                <TouchableOpacity >
                   <Image source={require('../assets/img/search.png')} style={styles.searchimg}/>
                </TouchableOpacity>

                <TextInput style={styles.input_word}
                    ref="tag_textinput"
                    placeholder='请输入关键字搜索客户'
                    maxLength={30}
                    autoCapitalize='none'
                    onChangeText={(search_word)=>this.setState({search_word})}
                    clearTextOnFocus={true}
                    onSubmitEditing={()=>this.push_search()}
                />
            </View>
            <TouchableOpacity onPress={()=>this.push_search()}>
                <Text style={styles.search_right}>
                    搜索
                </Text>
            </TouchableOpacity>
        </View>

        <View style={styles.middle}>
            <View style={styles.middle_content}>
                <Text style={styles.total_text}>
                        一共有{this.state.total}名客户
                </Text>
                <TouchableOpacity style={styles.pushcustomer}>
                        <Text style={styles.total_button_text}>添加客户</Text>
                </TouchableOpacity>
            </View>
        </View>


        <View style={styles.form_title_wrap}>
            <View>
                <TouchableOpacity style={styles.form_title_name}>
                    <Text style={styles.form_title_left}>
                        姓名
                    </Text>
                    <View style={styles.form_title_right}>
                        <View style={styles.middle_touch_up}></View>
                        <View style={styles.middle_touch_down}></View>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
            
            
        
      </Resolution.FixWidthView>
      
    );
  }
}

const styles = StyleSheet.create({
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
        marginLeft:260,
        marginTop:30,
        fontSize:36,
    },
    search_wrap:{
       flexDirection:'row',
       height:96,
       backgroundColor:'#f8f8f8',
    },
    middle:{
        height:140,
        backgroundColor:'white',
    },
    middle_content:{
        flexDirection: 'row',
        height:110,
        borderColor:'#e5e5e5',
        borderBottomWidth:1,
    },
    total_text:{
        marginLeft:30,
        marginTop:40,
        fontSize:28,
        color:'#333',
        width:250,
        height:40,
    },
    pushcustomer:{
        marginTop:30,
        marginLeft:280,
        width:160,
        height:50,
        backgroundColor:'#F23896',
        borderRadius:8,
    },
    total_button_text:{
        marginTop:12,
        fontSize:24,
        color:'white',
        textAlign:'center',
    },
    search_left:{
        flexDirection:'row',
        marginLeft:30,
        marginTop:20,
        width:600,
        height:56,
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#ccc',
    },
    searchimg:{
        marginLeft:13,
        marginTop:14,
        marginRight:18,
        width:26,
        height:26,
    },
    input_word:{
       fontSize:28,
    },
    search_right:{
        marginLeft:34,
        marginTop:32,
        fontSize:28,
        color:'#f23896',
    },
    filter_wrap:{
        height:300,
        backgroundColor:'white',
    },
    form_wrap:{
        flex:1,
        backgroundColor:'white',
    },
    form_title_wrap:{
        flexDirection:'row',
    },
    form_title_name: {
        flexDirection: 'row',
        justifyContent:'space-between',
        width:160,
        height:62,
        borderColor:'#e5e5e5',
        borderTopWidth:1,
        borderRightWidth:1,

        marginRight: 2,
        shadowOffset: { width: 2, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 0, 
    },
    form_title_left:{
        marginLeft:29,
        width:50,
        height:24,
        marginTop:18,
        fontSize:24,
        color:'#999'
    },
    form_title_right:{
        marginTop:12,
        marginRight:8,
    },
    middle_touch_up:{
        borderTopWidth: 0,
        borderRightWidth: 8,
        borderBottomWidth: 16,
        borderLeftWidth: 8,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#f23896',
        borderLeftColor: 'transparent',
    },
    middle_touch_down: {
        marginTop:5,
        borderTopWidth: 16,
        borderRightWidth: 8,
        borderBottomWidth: 0,
        borderLeftWidth: 8,
        borderTopColor: '#ccc',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
});