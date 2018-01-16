import React,{Component} from 'react';
import {Modal,SafeAreaView,Alert,TextInput,TouchableOpacity,NativeModules,AppRegistry, StyleSheet, Image,Text, View,ScrollView,Dimensions} from 'react-native';
import Resolution from "../assets/Resolution"
import axios from 'axios'
import { ifIphoneX } from 'react-native-iphone-x-helper'

var RNModules = NativeModules.RTModule;

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hintState:true,
        name:null,
        phone:null,
        wechat:null,
        note:null,
        tag_bechosed:[],
        show:false,
    };
  }

  static navigationOptions = {
    header:null,
  };

  showHint(){  //警告
     if(this.state.hintState == true){
         return(
            <View style={styles.hint}>
                <Image source={require('../assets/img/careful.png')} style={styles.carefulimg}/>
                <Text style={styles.carefultext}>手机号和微信号至少输入一项</Text>
            </View>
         )
     }else{
         return
     }
  }

  getPhone(data){ //获取手机号
     this.setState({
        phone:data,
     })
     if(data){
        this.setState({
            phone:data,
            hintState:false
        })

        this.forceUpdate()
     }
  }

  getWechat(data){ //获取微信号
        this.setState({
            wechat:data,
        })
        if(data){
            this.setState({
                hintState:false
            })
            this.forceUpdate()
        }
  }

  checkInput(){ //提示框判断
    if(!this.state.phone && !this.state.wechat){
        this.setState({
         hintState:true
        })
        this.forceUpdate()
    }
  }

  getButton (){  //确认添加
      if(!this.state.phone && !this.state.wechat){
            Alert.alert('手机号和微信号至少填一个') 
            return
      } 

      if(this.state.phone){
        if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.state.phone))){ 
            Alert.alert('手机号格式不正确') 
            return
        }
      }

      var new_tagIdList = this.state.tag_bechosed.map((item,index)=>{return item.id}).join(',')

      axios.post('https://easy-api-test.belle.net.cn/customer/add',{
         "name":this.state.name,
         "teleNo":this.state.phone,
         "wechat":this.state.wechat,
         "note":this.state.note,
         "tagIdList":new_tagIdList,
       },{
        headers:{
            "Token":'925fcfe404867a53c78cf0f6abbf2230',
            "APP-ID":'244'
        }        
      })
      .then((res)=>{
          console.log(res)
          if(res.data.code === 0){
            this._setModalVisible()
            return
          }else{
              Alert.alert(res.data.message)
          }
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  goto_child(){ //跳转到子组件
    this.props.navigation.navigate('Tag',{
        onTagChosed:(data)=>{
            this.state.tag_bechosed = data
            this.forceUpdate()
        },
        father_tag:this.state.tag_bechosed
    })
  }

  show_tags(data){//展示选中的标签
    if(data.length >1){
        return(
            data.map((item,index)=>
                <Text style={styles.tag_text} key={index}>
                   {item.name}
                   {(index+1)<data.length?('、'):(null)}
                </Text>       
            )
        )
    }
  }

  
  // 显示/隐藏 modal  
  _setModalVisible(type) {  
    if(type == 'right'){
        console.log('is right')
    }

    let isShow = this.state.show;  
    this.setState({  
      show:!isShow,
    })
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
                    添加客户
                </Text>       
        </View>
         {this.showHint()}
        <View style={styles.lineview}>
           <Text style={styles.lineleft}>姓名</Text>
           <TextInput
                 style={styles.lineright}
                 onChangeText={(name)=>this.setState({name})}
                 placeholder='请输入客户姓名'
           />
        </View>
        <View style={styles.lineview}>
           <View style={styles.line_left_wrap}>
               <Text style={styles.lineleft}>手机号</Text>
               <Text style={styles.lineleft_icon}>*</Text>
           </View>
           <TextInput
                 style={styles.lineright_phone}
                 onChangeText={ (phone)=>this.getPhone(phone) }
                 maxLength={11}
                 keyboardType='numeric'
                 placeholder='请输入客户手机号'
                 onEndEditing={()=>this.checkInput()}
           />
        </View>
        <View style={styles.lineview}>
           <View style={styles.line_left_wrap}>
               <Text style={styles.lineleft}>微信号</Text>
               <Text style={styles.lineleft_icon}>*</Text>
           </View>
           <TextInput
                 style={styles.lineright_wechart}
                 onChangeText={ (wechat)=>this.getWechat(wechat) }
                 autoCapitalize='none'
                 placeholder='请输入客户微信号'
                 onEndEditing={()=>this.checkInput()}
           />
        </View>
        <View style={styles.lineview}>
           <Text style={styles.lineleft}>标签</Text>
           <View style={styles.line_tag_right}>
            <View style={styles.linemiddle}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        automaticallyAdjustContentInsets={false}
                        contentContainerStyle={styles.tag_scrollview}
                    >
                        {this.show_tags(this.state.tag_bechosed)}
                    </ScrollView>
            </View>
            <TouchableOpacity onPress={()=>this.goto_child()}>
                <Image source={require('../assets/img/more.png')} style={styles.go_next_icon}/>
            </TouchableOpacity >
            </View>
        </View>
        <View style={styles.remarkview}>
            <Text style={styles.remark_title}>备注</Text>
            <TextInput style={styles.remark_content}
                       placeholder='请填写备注'
                       maxLength={200}
                       onChangeText={ (note)=>this.setState({note}) }
                       multiline={true}/>
            <Text style={styles.remark_careful}>200</Text>
        </View>
        <TouchableOpacity onPress={()=>this.getButton()} style={styles.buttonstyle}>           
           <Text style={styles.buttonText}>确认添加</Text>
        </TouchableOpacity>

        <Modal
          animationType='fade'  
          transparent={true}  
          visible={this.state.show}  
          onShow={() => {}}  
          onRequestClose={() => {}} >  

            <View style={styles.modalStyle}>  
                <View style={styles.subView}>  
                    <Text style={styles.modal_titleText}>  
                        客户{this.state.name}已经成功添加!
                    </Text>  
                    <Text style={styles.modal_contentText_top}>  
                    {this.state.phone?<Text>手机号{this.state.phone}</Text>:<Text>微信号{this.state.wechat}</Text>}已经是Moussy品牌会员, 已经为客户添加会员标签。      
                    </Text>  
                    <Text style={styles.modal_contentText}>你要继续完善他的资料嘛? </Text>
                    <View style={styles.horizontalLine} />  
                        <View style={styles.buttonView}>  
                            <TouchableOpacity underlayColor='transparent'  
                                style={styles.modal_buttonStyle}  
                                onPress={()=>this._setModalVisible('left')}>  
                                <Text style={styles.modal_buttonText_left}>  
                                    以后再说
                                </Text>  
                            </TouchableOpacity>  

                            <View style={styles.verticalLine} /> 

                            <TouchableOpacity underlayColor='transparent'  
                                style={styles.modal_buttonStyle}  
                                onPress={()=>this._setModalVisible('right')}>  
                                <Text style={styles.modal_buttonText_right}>  
                                    去完善
                                </Text>  
                            </TouchableOpacity>  
                    </View>  
                </View>  
            </View>  
        </Modal>
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
    touchimg_wrap:{
       width:70,
       height:'100%',
       paddingLeft: 30,
       paddingTop:30,
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
    hint:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        height:70,
        backgroundColor:'#fefcec',
    },
    carefulimg:{
        marginLeft:30,
        width:28,
        height:28,
    },
    carefultext:{
        marginLeft:20,
        fontSize:28,
        color:'#ff8c28',
    },
    lineview:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        height:90, 
        backgroundColor:'white',    
    },
    lineleft:{
        marginLeft:30,
        fontSize:28,
        lineHeight:90,
        color:'#666',
    },
    line_tag_right:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    linemiddle:{
        maxWidth:540,
    },
    tag_scrollview:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    tag_text:{
        lineHeight:90,
        fontSize:28,
        color:'#f23896',
        //marginRight:5,
    },
    lineright:{
        width:500,
        marginRight:25,
        fontSize:28,
        lineHeight:90,
        textAlign:'right',
    },
    line_left_wrap:{
        flexDirection:'row',
    },
    lineright_phone:{
        width:230,
        marginRight:25,
        fontSize:28,
        lineHeight:90,
        textAlign:'right',
    },
    lineright_wechart:{
        width:500,
        marginRight:25,
        fontSize:28,
        lineHeight:90,
        textAlign:'right',
    },
    lineleft_icon:{
        color:'red',
        fontSize:28,
        lineHeight:90,
        marginLeft:5,
    },
    go_next_icon:{
        width:13,
        height:22,
        marginRight:30,
        marginTop:39,
        marginLeft:10,
    },
    remarkview:{
        height:365,
        backgroundColor:'white',
        position:'relative',
        marginBottom:75,
    },
    remark_title:{
        height:80,         
        fontSize:28,
        color:'#666',
        paddingLeft:30,
        lineHeight:80,
    },
    remark_content:{
        paddingTop:33,
        paddingLeft:20,
        marginLeft:30,
        fontSize:28,
        height:260,
        width:690,
        borderColor: '#e5e5e5', 
        borderWidth: 1,
    },
    remark_careful:{
        left:640,
        top:290,
        position:'absolute',
        fontSize:26,
        color:'#999',
    },
    buttonstyle:{
        width:660,
        height:70,
        borderRadius:4,
        backgroundColor:'#f23896',
        
        marginLeft:45,
    },
    buttonText:{
        fontSize:28,
        color:'#fff',
        textAlign:'center',
        lineHeight:70,
    },

      //modal样式
      modalStyle: {  
        backgroundColor:'rgba(0,0,0,0.5)',  
        alignItems: 'center',  
        justifyContent:'center',  
        flex:1,  
      },  
      // modal上子View的样式  
      subView:{  
        marginLeft:50,  
        marginRight:50,  
        backgroundColor:'#fff',  
        alignSelf: 'stretch',  
        justifyContent:'center',  
        borderRadius: 10,  
        borderWidth: 0.5,  
        borderColor:'#ccc',  
      },  
      // 标题  
      modal_titleText:{  
        marginTop:10,  
        marginBottom:5,  
        fontSize:16,  
        fontWeight:'bold',  
        textAlign:'center',  
      },  
      // 内容  
      modal_contentText_top:{
         lineHeight:18,
         marginLeft:15,
         marginRight:15,
         fontSize:14,
      },
      modal_contentText:{  
        marginBottom:8, 
        lineHeight:18, 
        fontSize:14,  
        textAlign:'center',  
      },  
      // 水平的分割线  
      horizontalLine:{  
        marginTop:5,  
        height:0.5,  
        backgroundColor:'#ccc',  
      },  
      // 按钮  
      buttonView:{  
        flexDirection: 'row',  
        alignItems: 'center',  
      },  
      modal_buttonStyle:{  
        flex:1,  
        height:44,  
        alignItems: 'center',  
        justifyContent:'center',  
      },  
      // 竖直的分割线  
      verticalLine:{  
        width:0.5,  
        height:44,  
        backgroundColor:'#ccc',  
      }, 
      modal_buttonText_left:{
        color:'#666',
        fontSize:16, 
      },
      modal_buttonText_right:{  
        fontSize:16,  
        color:'#f23896',  
        textAlign:'center',  
      }, 

});