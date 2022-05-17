import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import In18 from 'common/constants'
import Colors from 'common/Colors'
export default function index( props ) {
  const {isUser, item, token}=props 
  console.log( 'item',item, token, isUser );
  console.log( 'item', isUser );
  // const fromTo = item.to
  return (
    <View style={[styles.container,{backgroundColor:index%2==0?Colors.GRAY6:''}]}>
      <View style={[styles.first]}>
        <View>
          <Text style={[styles[`${isUser?`send`:`receive`}`]]}>
            {isUser?'Chuyển tiền':'Nhận tiền'}
          </Text>
          <Text style={[styles[`${isUser?`sendAmount`:`receiveAmount`}`]]}>
           Số lượng: {item?.amount}
          </Text>
        </View>
        
      </View>
      <View style={styles.second}>
        <Text style={styles.fromTo} >
          {item?.date}
        </Text>
        <Text style={styles.fromTo} >
          {isUser? 'Người gửi'+item?.sdtReceive :'Người gửi'+ item?.sdtSend}
        </Text>
         
      </View>
    </View>
  )
}
const styles = StyleSheet.create( {
  container:{
    display:'flex',
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  first:{
    // flexDirection:'row',
    // justifyContent:'space-between'
  },
  second:{
  },
  send:{
    color:'red',
    fontSize:15,
    fontWeight:'bold'
  },
  sendAmount:{
    color:'red',
    fontSize:13
  },
  receive:{
    color:'green',
    fontSize:15,
    fontWeight:'bold'
  },
  receiveAmount:{
    color:'green',
    fontSize:13
  },
  
  date:{
    fontSize:12,
    color:Colors.GRAY6
  },
  fromTo:{
    fontSize:14
  },
  amount:{

  }
} )
