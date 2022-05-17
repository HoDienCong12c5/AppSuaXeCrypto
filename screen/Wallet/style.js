import React from 'react';
import { StyleSheet } from 'react-native';
import TextInput from 'components/TextInput/index';
import { width, height } from 'common/styles';
import Colors from '../../common/Colors';

const styles = StyleSheet.create( {
  container:{
    // marginTop:20
    flex: 1,
    width: width( 90 )
  },
  containerSupport:{
    flexDirection:'row',
    justifyContent:'space-between',
    // width:width( 90 ),
    alignItems:'center',
    // borderBottomWidth:1,
    // borderColor:Colors.ORANGE,
    paddingBottom:10
  },
  supportChain:{
    fontSize: height( 3 ),
    fontWeight: 'bold',
    marginTop:20,
    marginBottom:10
  },
  iconEthereum:{
    height:height( 3.5 ),
    width:height( 3.5 )
  },
  ethereum:{
    fontSize: height( 2.5 )
    // width:width( 25 )
  },
  containerAddress:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:width( 90 ),
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:Colors.ORANGE,
    paddingBottom:20,
    marginTop:10
  },
  address:{
    fontSize: height( 3 ),
    fontWeight: 'bold',
    marginVertical:10
  },
  btnNewAddress:{
    borderWidth:0,
    paddingHorizontal:0,
    margin:0,
    height:'auto',
    width:'auto'
  },
  textBtnNewAddress:{
    padding:0,
    color:Colors.RED,
    fontWeight:'bold'
  },
  containerPlatform:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:Colors.ORANGE
  },
  containerNewTransaction:{
    marginTop:height( 3 )
  },
  btnNewTransaction:{
    backgroundColor:Colors.ORANGE,
    width:width( 20 ),
    paddingHorizontal:0,
    padding:0
  },
  containerHeaderHistory:{
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    marginTop:20

  }

} );
export default styles;
