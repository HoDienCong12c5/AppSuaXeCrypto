import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import In18 from 'common/constants'
import Colors from 'common/Colors'
export default function index( props ) {
  const {item, addUser, token, index}=props
  const isUser=addUser===item.to
  // const fromTo = item.to
  return (
    <View style={[styles.container,{backgroundColor:index%2==0?Colors.GRAY6:''}]}>
      <View style={styles.first}>
        <Text style={[styles`${isUser?`send`:`receive`}`]}>
          {isUser?'Chuyển tiền':'Gửi tiền'}
        </Text>
        <Text style={styles.date}>
          {item.date}
        </Text>
      </View>
      <View style={styles.second}>
        <Text style={styles.fromTo} >
          {isUser?'Địa':' tiền'}
        </Text>
        <Text style={[styles.amount,{color:isUser?'red':'green'}]}>
          {item.amount} {token}
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
    flexDirection:'row',
    justifyContent:'space-between'
  },
  second:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  send:{
    color:'red',
    fontSize:16,
    fontWeight:'bold'
  },
  receive:{
    color:'green'
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
