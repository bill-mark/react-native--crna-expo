import React,{Component} from 'react';
import {SafeAreaView,TextInput,TouchableOpacity,NativeModules,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';

import Resolution from "../assets/Resolution"
import axios from 'axios'
import _ from 'lodash'
import { ifIphoneX } from 'react-native-iphone-x-helper'


var RNModules = NativeModules.RTModule;

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      nowIndexes:[],
      tag_bechosed:[],
      newTag:null,
    };
  }

  componentDidMount(){
      axios.get('https://easy-api-test.belle.net.cn/easy/tag/get_staff_tags',{
            params:{
        },
        headers:  {
            "Token":  '925fcfe404867a53c78cf0f6abbf2230',
            "APP-ID":  '244'
        }
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data.code === 0){
                this.setState({
                    data:res.data.data
                })

                this.props.navigation.state.params.father_tag.map((item,index)=>this.push_totag(item))
            }else{
                alert(res.data.message)
            }
            
        })
        .catch((err)=>{
            alert(err)
            console.log(err)
        })
  }

  update_tags(){  //更新店员自定义标签
      axios.get('https://easy-api-test.belle.net.cn/easy/tag/get_staff_tags',{
        params:{
    },
    headers:  {
        "Token":  '925fcfe404867a53c78cf0f6abbf2230',
        "APP-ID":  '244'
    }
    })
    .then((res)=>{
        if(res.data.code == 0){
            console.log(res)
            if(res.data.code === 0){
                this.setState({
                    data:res.data.data
                })
                this.push_totag(this.state.data[this.state.data.length - 1])
                this.state.newTag = null
            }else{
                alert(res.data.message)
            }
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

  get_newtag(){ //输入标签,键盘回车
      console.log('get_newtag---->'+this.state.newTag)
        axios.post('https://easy-api-test.belle.net.cn/easy/tag/new_staff_tag',{
            "isOftenUsed":false,
            "tagName":this.state.newTag
        },{
            headers:{
                "Token":'925fcfe404867a53c78cf0f6abbf2230',
                "APP-ID":'244'
            }        
        })
        .then((res)=>{
            console.log(res)
            if(res.data.code === 0){
                this.refs.tag_textinput.clear() //清除input值

                this.update_tags()
                
            }else{
                alert(res.data.message)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
  }

  show_alltags(data){ //展示用户所有标签
      return (
        data.map((item,index) =>
            <TouchableOpacity 
               onPress={()=>{this.push_totag(item)}} 
               style={[this.state.nowIndexes.indexOf(item.id)<0?styles.not_chosed:styles.be_chosed]} 
               key={index}
            >
                <Text style={[this.state.nowIndexes.indexOf(item.id)<0?styles.not_chosed_text:styles.be_chosed_text]}>{item.name}</Text>
            </TouchableOpacity>
        )
      )
  }

  check_tag(data){  //被选中标签
    return ( 
        data.map((item,index)=>      
           this.show_bechecked(item)       
       )
    )
  }


  show_bechecked(data){ //被选中标签组件
     if(this.state.nowIndexes.indexOf(data.id)<0){
         return null
     }
     return (
        <View style={styles.tag_chosed} key={data.id}>
            <Text style={styles.tag_chosed_text}>{data.name}</Text>
            <TouchableOpacity onPress={()=>this.remove_tages(data)}>
              <Image source={require('../assets/img/tag-delete.png')} style={styles.deleteimg}/>
            </TouchableOpacity>
        </View>
     )
  }
  
  push_totag(item){ //从列表中选中标签添加  
    if(this.state.nowIndexes.indexOf(item.id) === -1 ){
        this.state.nowIndexes.push(item.id)

        this.state.tag_bechosed.push(item)
    }
    else{
        this.state.nowIndexes = _.remove(this.state.nowIndexes,(idx)=>{
                return idx !== item.id
        })

        this.state.tag_bechosed = _.remove(this.state.tag_bechosed,(idx)=>{
            return idx.id !== item.id
            
        })
    }
    this.forceUpdate()
  }

  remove_tages(item){ //移除选中标签
    this.state.nowIndexes = _.remove(this.state.nowIndexes,(idx)=>{
            return idx !== item.id
    })

    this.state.tag_bechosed = _.remove(this.state.tag_bechosed,(idx)=>{
        return idx.id !== item.id
        
    })
    console.log(this.state.tag_bechosed)
    this.forceUpdate()
  }

  goto_father(){ //取消->返回父级
    this.props.navigation.goBack()
  }

  goto_father_besure(){ //确定->返回父级
    this.props.navigation.state.params.onTagChosed(this.state.tag_bechosed)
    this.props.navigation.goBack()
  }

  show_surebutton(){ //根据状态是否显示确定按钮
    if(this.state.tag_bechosed.length){
        return(
            <TouchableOpacity onPress={()=>this.goto_father_besure()}>
              <Text style={styles.title_right_text}>确定</Text>
            </TouchableOpacity>   
        )
    }

    return(
        <Text style={styles.title_right_text_not}>确定</Text>
    )
  }

  static navigationOptions = {
    headerTitle:'设置标签',
    header:null,
  };
  render() {
    let data = this.state.data
    return (
        
      <Resolution.FixWidthView>
        <View style={styles.title}>
            <TouchableOpacity onPress={()=>this.goto_father()}>
              <Text style={styles.title_left_text}>取消</Text>
            </TouchableOpacity>
            <Text style={styles.titletext}  >
                设置标签
            </Text> 

            {this.show_surebutton()}

        </View>

        <View style={{minHeight:90,maxHeight:285}}>
            <ScrollView styles={styles.tag_wrap}
                        showsVerticalScrollIndicator={true}
                        automaticallyAdjustContentInsets={false}
                        contentContainerStyle={styles.tag_scrollview}
            >
                {this.check_tag(this.state.tag_bechosed)}

                <TextInput style={styles.newtag}
                    ref="tag_textinput"
                    placeholder='输入标签'
                    maxLength={10}
                    autoCapitalize='none'
                    onEndEditing={(data)=>this.get_newtag(data)}
                    onChangeText={(newTag)=>this.setState({newTag})}
                    clearTextOnFocus={true}
                />
            </ScrollView>
        </View>
            
        <Text style={styles.alltag_title}>所有标签</Text>
        <View style={styles.alltag_wrap_scroll}>
            <ScrollView
                 showsVerticalScrollIndicator={true}
                 automaticallyAdjustContentInsets={false}
                 contentContainerStyle={styles.alltag_scrollview}
            >
               {this.show_alltags(this.state.data)}
            </ScrollView>
        </View>
      </Resolution.FixWidthView>
      
    );
  }
}

const styles = StyleSheet.create({
    test:{
        height:90,
        borderColor:'red',
        borderBottomWidth:1,
    },
    title:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:30,
        height:128,
        backgroundColor:'white',
        borderColor:'#e6e6e6',
        borderBottomWidth:1,
        ...ifIphoneX({
            paddingTop: 30
        }, {
            paddingTop: 0
        })
    },
    titleimg:{
        width:18,
        height:32,
        marginTop:30,
    },
    title_left_text:{
        marginTop:30,
        fontSize:28,
    },
    titletext:{
        marginLeft:225,
        marginTop:30,
        fontSize:36,
    },
    title_right_text:{
        marginLeft:215,
        marginTop:30,
        fontSize:28,
        color:'#f23896',
    },
    title_right_text_not:{
        marginLeft:215,
        marginTop:30,
        fontSize:28,
        color:'#f23896',
        opacity:0.6,
    },

    tag_wrap:{
        //minHeight:90,
        //maxHeight:285,
    },
    tag_scrollview:{
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'white',
    },

    tag_chosed:{
        flexDirection:'row',
        minWidth:80,
        height:58,
        marginTop:20,
        marginLeft:30,
        
        borderRadius:100,
        borderColor:'#f23896',
        borderWidth:1,
    },
    tag_chosed_text:{
        marginLeft:24,
        marginRight:5,
        marginTop:14,
        fontSize:26,
        color:'#f23896',
    },
    deleteimg:{
        marginTop:14,
        marginRight:15,
        width:28,
        height:28,
    },
    newtag:{
        minWidth:150,
        height:58,
        marginTop:20,
        marginLeft:30,
        fontSize:26,
        paddingLeft:20,
        marginBottom:20,

        borderRadius:100,
        borderColor:'#e6e6e6',
        borderWidth:1,
        borderStyle:'dashed',
    },
    alltag_title:{
        fontSize:26,
        color:'#8e8e8e',
        marginLeft:30,
        marginTop:15,
    },
    alltag_wrap:{
        flexWrap:'wrap',
        flexDirection:'row',
        width:'100%',
    },
    alltag_wrap_scroll:{
        flex:1,
    },
    alltag_scrollview:{
        flexDirection:'row',
        flexWrap:'wrap',
    },
    not_chosed:{
        flexDirection:'row',
        minWidth:80,
        height:60,
        marginTop:20,
        marginLeft:30,
        
        borderRadius:90,
        borderColor:'#e5e5e5',
        borderWidth:1,
    },
    not_chosed_text:{
        marginLeft:20,
        marginRight:24,
        marginTop:14,
        fontSize:26,
        color:'black',
    },
    be_chosed:{
        flexDirection:'row',
        minWidth:80,
        height:60,
        marginTop:20,
        marginLeft:30,
        backgroundColor:'white',
        
        borderRadius:90,
        borderColor:'#e5e5e5',
        borderWidth:1,
    },
    be_chosed_text:{
        marginLeft:20,
        marginRight:24,
        marginTop:14,
        fontSize:26,
        color:'#f23896',
    },
})