import React from 'react';
import { StyleSheet } from 'react-native';
import { height, width } from 'common/styles';
import Colors from '../../common/Colors';

const styles = StyleSheet.create( {
  containerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 200
    // flex:1
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  imgLoGo: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    marginTop: '15%'
  },
  conatinerRegitster: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '30%'
    // width:'50%'
  },
  containerContext: {
    width: '100%',
    paddingVertical: 0
  },
  textRegister: {
    color: 'red',
    fontWeight: 'bold'
  },
  btnRegister: {
    borderWidth: 0,
    paddingHorizontal: 1
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  imgRegister: {
    width: height( 35 ),
    height: height( 23 ),
    borderRadius: 20,
    marginBottom: 20
  }
} );
export default styles;
