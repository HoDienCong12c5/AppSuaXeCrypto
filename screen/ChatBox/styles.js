import React from 'react';
import { StyleSheet } from 'react-native';
import TextInput from 'components/TextInput/index';
import { width, height } from 'common/styles';
import Colors from '../../common/Colors';

const styles = StyleSheet.create( {
  containerSend:{
    flexDirection:'row',
    width:width( 100 ),
    alignItems:'center'
  },
  input:{
    flex:1,
    width:width( 70 )
  },
  iconButton:{
    borderWidth:0,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
  },
  iconSend:{
    height:height( 7 ),
    width:height( 7 )
  }
} );
export default styles;
