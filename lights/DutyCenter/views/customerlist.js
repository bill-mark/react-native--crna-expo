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
    };
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
            proplds:this.state.propid_array.map((item,index)=>{return item.id}).join(','),
            taglds:this.state.tagid_array.map((item,index)=>{return item.id}).join(','),
        },
        headers:  {
            "Token":  '9dd4e7f647757a58e10b946f7409df9d',
            "APP-ID":  '453'
        }
        })
        .then((res)=>{
            if(res.data.code == 0){
                console.log(res.data)
                if(res.data.code === 0){
                    
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
                    任务中心
                </Text>       
        </View>
        {/* <View style={styles.search_wrap}>
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
        <View style={styles.filter_wrap}>

        </View>
        <View style={styles.form_wrap}>
             <SectionList
                renderItem={this._renderItem}
                renderSectionHeader={this._sectionComp}
                sections={[
                    { key: "A", data: [{ title: "阿童木" }, { title: "阿玛尼" }, { title: "爱多多" }] },
                    { key: "B", data: [{ title: "表哥" }, { title: "贝贝" }, { title: "表弟" }, { title: "表姐" }, { title: "表叔" }] },
                    { key: "C", data: [{ title: "成吉思汗" }, { title: "超市快递" }] },
                    { key: "W", data: [{ title: "王磊" }, { title: "王者荣耀" }, { title: "往事不能回味" },{ title: "王小磊" }, { title: "王中磊" }, { title: "王大磊" }] },
                ]}
             />
        </View> */}
            
            <Text style={{fontSize:36,textextAlign:'center',marginLeft:300,marginTop:400}}>敬请期待</Text>
        
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
        marginTop:20,
        backgroundColor:'white',
    }
});