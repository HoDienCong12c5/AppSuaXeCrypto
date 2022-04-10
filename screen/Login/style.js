import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors, width } from 'common/styles';
// import Colors from '../../common/Colors'; 

const styles = StyleSheet.create( {
  containerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
    // flex:1
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  imgLoGo: {
    height: width( 40 ),
    // width: 150,
    width: width( 40 ),
    resizeMode: 'contain',
    marginTop: '15%'
  },
  conatinerRegitster: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
    marginLeft:width( 8 )
  },
  containerContext: {
    width: '80%',
    paddingVertical: 0
  },
  textRegister: {
    color: 'red',
    fontWeight: 'bold'
  },
  btnRegister: {
    borderWidth: 0,
    left:width( -5 )
  }
} );
export default styles;
