import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from 'common/Colors'
export default function index() {
  return (
    <View style={{justifyContent:'center', alignContent:'center'}}>
      <ActivityIndicator size="large" color={Colors.YELLOW}/>
    </View>
  )
}
