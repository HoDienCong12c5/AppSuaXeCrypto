import React from 'react';
import { StyleSheet } from 'react-native';
import TextInput from 'components/TextInput/index';
import { width, height } from 'common/styles';
import Colors from '../../common/Colors';

const styles = StyleSheet.create( {
  container:{ 
    flex: 1,
    justifyContent: 'space-between'
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
  },
  body:{
    // height:height( 80 )
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  containerSend:{
    width:width( 100 ),
    display:'flex',
    flexDirection:'row',
    height:height( 10 )
  },
  left:{
    marginVertical:5,
    alignItems: 'flex-start'
    
  },
  textLeft:{
    flexWrap: 'wrap',
    backgroundColor: '#ffdab9',
    padding:10,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 0,
    maxWidth:width( 70 )
  },
  right:{
    marginVertical:5,
    alignItems: 'flex-end'
    
  },
  textRight:{
    flexWrap: 'wrap',
    backgroundColor: '#ffdab9',
    padding:10,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 0,
    maxWidth:width( 70 )
  }
} );
export default styles;
