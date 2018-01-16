import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';

export default class MyCell extends Component {
 constructor(props){
    super(props);
    this.state = {
      leftIconName:'',
      leftTitle:'',
      rightIconName:'',
      rightTitle:'',
    }
 }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <TouchableOpacity onPress={() => navigate(this.props.navigationTitle)}
                          style={styles.container}>                   
                 {/*--left--*/}
                  <View style={styles.leftViewStyle}>
                      <Image source={this.props.leftIconName} style={styles.leftImgStyle}/>
                      <View style={styles.leftline}></View>
                      <Text style={styles.leftTitleStyle}>{this.props.leftTitle}</Text>
                  </View> 
                  {/*--right--*/}
                  <View style={styles.rightViewStyle}>
                        {this.rightSubView()}
                  </View>         
        </TouchableOpacity >
    );
  }

 
  //右边的内容
  rightSubView(){
      
      return(      
           <View style={{flexDirection:'row',alignItems:'center'}}>
               {this.renderRightContent()}       
               <Image source={require('../assets/img/more.png')} style={{width:14,height:26,marginLeft:20,marginRight:17}}/>          
           </View>
        
      )
  }

  //右边具体返回的值
  renderRightContent(){
       if(this.state.rightIconName.length == 0){  
           return(
              <Text style={{color:'gray',fontSize:28}}>{this.props.rightTitle}</Text>
           )
       }else{
           reurn(
              <Image source={{uri:this.props.rightIconName}} style={{width:14,height:26,marginLeft:20,marginRight:17}}/>
           )
       }
  }
}

const styles = StyleSheet.create({
  container: {
    elevation:10,
     marginTop:30,
     width:690,
     height:120,
     borderRadius:10,
     flexDirection:'row',
     justifyContent:'space-between',
     backgroundColor:'white',
     alignItems:'center',
     borderBottomColor:'#e8e8e8',  //下拉框
     borderBottomWidth:0.5,
  },
  leftViewStyle:{
     flexDirection:'row',
     alignItems:'center',
     marginLeft:45,
  },
  leftline:{
     marginLeft:30,
     marginRight:30,
     backgroundColor:'#dddddd',
     borderRadius:100,
     width:2,
     height:40,
  },
  rightViewStyle:{

  },
  leftImgStyle:{  //左边的图片
      width:50,
      height:50,
      marginRight:6,
  },
  leftTitleStyle:{
      fontSize:32
  }
});
