import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import {Colors} from 'common/Colors'
export default function index( props ) {
  const {title, description}=props
  return (
    <View >
      {
        title && <Text style={styles.title}>{title}</Text>
      }
      <View style={styles.loading}>
        <ActivityIndicator size={60} color={Colors.YELLOW} />
      </View> 
      {
        description && <Text style={styles.description}>{description}</Text>
      }
    </View>
  )
}
const styles = StyleSheet.create( {
  container: {
    justifyContent: 'center',
    alignItems: 'center' 
  },
  loading:{
    padding:10,
    margin:10
  },
  description:{
    color:Colors.YELLOW
  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    alignSelf:'center'
  }

} )

